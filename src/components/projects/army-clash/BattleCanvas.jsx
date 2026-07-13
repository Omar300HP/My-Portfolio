import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { TYPE_NAMES } from "@/lib/army-clash";
import { buildUnitGeometries } from "./geometries";
import { ARMY_COLORS, UNIT_CAP, formatClock } from "./ui-data";

const SIM_STEP = 1 / 30;
const DEATH_ANIM = 0.9;
const ARROW_CAP = 260;

// The live 3D battle: instanced silhouettes over a gridded field, a camera
// director keyed to the simulation's phases, and direct-DOM HUD updates.
// Everything mutable rides on `game`; React re-renders play no part per frame.
export default function BattleCanvas({ game, bridge }) {
  return (
    <Canvas
      camera={{ fov: 42, near: 0.1, far: 500, position: [46, 30, 0] }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 1.8]}
      style={{ position: "absolute", inset: 0 }}
    >
      <color attach="background" args={["#0a0c11"]} />
      <fog attach="fog" args={["#0a0c11", 90, 210]} />
      <hemisphereLight args={["#9fb4c8", "#0a0c11", 0.85]} />
      <directionalLight position={[40, 70, 20]} intensity={1.25} />
      <Battlefield />
      <Units game={game} bridge={bridge} />
    </Canvas>
  );
}

function Battlefield() {
  return (
    <>
      <mesh rotation-x={-Math.PI / 2} position-y={-0.02}>
        <planeGeometry args={[500, 500]} />
        <meshStandardMaterial color="#0c0f15" roughness={0.95} />
      </mesh>
      <gridHelper
        args={[320, 160, "#39404e", "#1c212c"]}
        ref={(g) => {
          if (g) {
            g.material.transparent = true;
            g.material.opacity = 0.5;
          }
        }}
      />
      {/* Deploy zone stripes */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.01, -32]}>
        <planeGeometry args={[90, 0.35]} />
        <meshBasicMaterial color={ARMY_COLORS.A} transparent opacity={0.35} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.01, 32]}>
        <planeGeometry args={[90, 0.35]} />
        <meshBasicMaterial color={ARMY_COLORS.B} transparent opacity={0.35} />
      </mesh>
    </>
  );
}

function Units({ game, bridge }) {
  const geometries = useMemo(() => buildUnitGeometries(), []);
  useEffect(
    () => () => Object.values(geometries).forEach((g) => g.dispose()),
    [geometries],
  );

  // One InstancedMesh per army × Unit Type (8 draw calls) + one for arrows.
  const meshRefs = useRef({});
  const arrowRef = useRef(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);
  const baseColors = useMemo(
    () => [new THREE.Color(ARMY_COLORS.A), new THREE.Color(ARMY_COLORS.B)],
    [],
  );
  const camPos = useMemo(() => new THREE.Vector3(46, 30, 0), []);
  const camTgt = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const fps = useRef({ frames: 0, time: 0 });

  useFrame((state, rawDt) => {
    const dt = Math.min(0.05, rawDt || 0.016);
    const sim = game.sim;

    // --- advance the simulation on a fixed timestep -----------------------
    if (sim && game.running) {
      game.acc += dt * game.timeScale;
      let ticks = 0;
      while (game.acc >= SIM_STEP && ticks < 5) {
        sim.tick();
        game.acc -= SIM_STEP;
        ticks++;
      }

      // Slow-motion climax: one-shot, skipped under reduced motion.
      if (sim.climax && !game.climaxHandled) {
        game.climaxHandled = true;
        if (!game.reduced && sim.phase !== "ROUT") {
          game.timeScale = 0.28;
          game.uiPhase = "CLIMAX";
          game.climaxEndAt = performance.now() + 2400;
        }
      }
      if (game.uiPhase === "CLIMAX" && performance.now() > game.climaxEndAt) {
        game.timeScale = 1;
        game.uiPhase = null;
      }
      if (sim.phase === "ROUT" && game.timeScale !== 1) {
        game.timeScale = 1;
        game.uiPhase = null;
      }

      // The Battle is decided — let the rout play out, then show results.
      if (sim.isOver() && !game.endScheduled) {
        game.endScheduled = true;
        setTimeout(() => {
          if (game.mode === "battle" && game.onDecided) game.onDecided(sim.getResult());
        }, 1400);
      }

      updateHud(bridge, sim, game);
    }

    // --- draw units -------------------------------------------------------
    const counts = {};
    for (const key of Object.keys(meshRefs.current)) counts[key] = 0;
    const t = state.clock.elapsedTime;

    if (sim) {
      const { n, posX, posZ, hp, maxHp, team, type, alive, yaw } = sim.world;
      const clocks = game.deathClock;
      for (let i = 0; i < n; i++) {
        const key = sim.world.ids[team[i]] + TYPE_NAMES[type[i]];
        const mesh = meshRefs.current[key];
        if (!mesh) continue;

        let y = 0;
        let scaleY = 1;
        if (!alive[i]) {
          // Collapse animation, then gone.
          if (clocks[i] < 0) clocks[i] = 0;
          else clocks[i] += dt;
          if (clocks[i] > DEATH_ANIM) continue;
          scaleY = 0.12 + 0.88 * (1 - clocks[i] / DEATH_ANIM);
        } else if (game.running) {
          y = Math.abs(Math.sin(t * 7 + i * 0.7)) * 0.06;
        }

        const idx = counts[key];
        counts[key] = idx + 1;
        dummy.position.set(posX[i], y, posZ[i]);
        dummy.rotation.set(0, yaw[i], 0);
        dummy.scale.set(1, scaleY, 1);
        dummy.updateMatrix();
        mesh.setMatrixAt(idx, dummy.matrix);

        const brightness = alive[i] ? 0.45 + 0.55 * Math.max(0, hp[i] / maxHp[i]) : 0.25;
        tmpColor.copy(baseColors[team[i]]).multiplyScalar(brightness);
        mesh.setColorAt(idx, tmpColor);
      }
    }
    for (const [key, mesh] of Object.entries(meshRefs.current)) {
      if (!mesh) continue;
      mesh.count = counts[key] || 0;
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }

    // --- arrows -----------------------------------------------------------
    const arrowMesh = arrowRef.current;
    if (arrowMesh) {
      let count = 0;
      if (sim) {
        for (let i = 0; i < sim.arrows.length && count < ARROW_CAP; i++) {
          const a = sim.arrows[i];
          const k = Math.min(1, a.t / a.dur);
          const dist = Math.hypot(a.tx - a.sx, a.tz - a.sz);
          dummy.position.set(
            a.sx + (a.tx - a.sx) * k,
            1.2 + dist * 0.64 * k * (1 - k),
            a.sz + (a.tz - a.sz) * k,
          );
          dummy.rotation.set(0, Math.atan2(a.tx - a.sx, a.tz - a.sz), 0);
          dummy.scale.set(1, 1, 1);
          dummy.updateMatrix();
          arrowMesh.setMatrixAt(count++, dummy.matrix);
        }
      }
      arrowMesh.count = count;
      arrowMesh.instanceMatrix.needsUpdate = true;
    }

    // --- fps chip ---------------------------------------------------------
    fps.current.frames++;
    fps.current.time += dt;
    if (fps.current.time >= 0.5) {
      if (bridge.fps) {
        bridge.fps.textContent = `${Math.round(fps.current.frames / fps.current.time)} FPS`;
      }
      fps.current.frames = 0;
      fps.current.time = 0;
    }

    // --- camera director ----------------------------------------------------
    updateCamera(state.camera, game, camPos, camTgt, dt, t);
  });

  const armies = ["A", "B"];
  return (
    <>
      {armies.map((army) =>
        TYPE_NAMES.map((typeName) => (
          <instancedMesh
            key={army + typeName}
            ref={(m) => {
              meshRefs.current[army + typeName] = m;
              if (m) m.count = 0;
            }}
            args={[geometries[typeName], undefined, UNIT_CAP]}
            frustumCulled={false}
          >
            <meshStandardMaterial roughness={0.55} metalness={0.15} flatShading />
          </instancedMesh>
        )),
      )}
      <instancedMesh
        ref={(m) => {
          arrowRef.current = m;
          if (m) m.count = 0;
        }}
        args={[undefined, undefined, ARROW_CAP]}
        frustumCulled={false}
      >
        <boxGeometry args={[0.05, 0.05, 1.0]} />
        <meshBasicMaterial color="#d8e2c8" />
      </instancedMesh>
    </>
  );
}

function updateHud(bridge, sim, game) {
  const { world } = sim;
  let aliveA = 0;
  let aliveB = 0;
  for (let i = 0; i < world.n; i++) {
    if (!world.alive[i]) continue;
    if (world.team[i] === 0) aliveA++;
    else aliveB++;
  }
  if (bridge.aliveA) bridge.aliveA.textContent = String(aliveA);
  if (bridge.aliveB) bridge.aliveB.textContent = String(aliveB);
  if (bridge.moraleA) bridge.moraleA.style.width = `${(sim.morale[0] * 100).toFixed(1)}%`;
  if (bridge.moraleB) bridge.moraleB.style.width = `${(sim.morale[1] * 100).toFixed(1)}%`;
  if (bridge.phase) {
    const routed = sim.getResult()?.routed;
    bridge.phase.textContent =
      game.uiPhase ?? (sim.phase === "ROUT" && routed ? `ROUT — ARMY ${routed}` : sim.phase);
  }
  if (bridge.clock) bridge.clock.textContent = formatClock(sim.simTime);
  if (bridge.speed) bridge.speed.textContent = game.timeScale < 1 ? "0.3× SLOW-MO" : "1.0×";
}

function updateCamera(camera, game, camPos, camTgt, dt, t) {
  const sim = game.sim;
  let tx = 0;
  let ty = 0;
  let tz = 0;
  let px;
  let py;
  let pz;

  if (game.manual) {
    const c = game.mode !== "setup" && sim ? sim.fight : { x: 0, z: 0 };
    const o = game.orbit;
    tx = c.x;
    ty = 1.5;
    tz = c.z;
    px = c.x + Math.sin(o.theta) * Math.cos(o.phi) * o.r;
    py = Math.sin(o.phi) * o.r;
    pz = c.z + Math.cos(o.theta) * Math.cos(o.phi) * o.r;
  } else if (game.mode === "setup" || !game.running || !sim) {
    const th = t * (game.reduced ? 0.02 : 0.06);
    px = Math.sin(th) * 58;
    py = 34;
    pz = Math.cos(th) * 58;
  } else {
    const f = sim.fight;
    const phase = game.uiPhase ?? sim.phase;
    const th = t * (game.reduced ? 0.03 : 0.09);
    if (phase === "DEPLOY") {
      px = 44;
      py = 26;
      pz = 0;
    } else if (phase === "ADVANCE") {
      const a = sim.centroids[0];
      const b = sim.centroids[1];
      const mx = (a.x + b.x) / 2;
      const mz = (a.z + b.z) / 2;
      tx = mx;
      ty = 1.5;
      tz = mz;
      px = mx + Math.sin(th) * 34;
      py = 11;
      pz = mz + Math.cos(th) * 34;
    } else if (phase === "CLIMAX") {
      tx = f.x;
      ty = 1.2;
      tz = f.z;
      px = f.x + Math.sin(th * 2.2) * 15;
      py = 7;
      pz = f.z + Math.cos(th * 2.2) * 15;
    } else if (phase === "ROUT") {
      const routed = sim.getResult()?.routed;
      const lc = sim.centroids[routed === sim.world.ids[0] ? 0 : 1];
      tx = lc.x;
      ty = 1.5;
      tz = lc.z;
      px = f.x + Math.sin(th) * 30;
      py = 15;
      pz = f.z + Math.cos(th) * 30;
    } else {
      tx = f.x;
      ty = 1.2;
      tz = f.z;
      px = f.x + Math.sin(th) * 26;
      py = 13;
      pz = f.z + Math.cos(th) * 26;
    }
  }

  const k = 1 - Math.exp(-(game.manual ? 8 : 2.6) * dt);
  camPos.x += (px - camPos.x) * k;
  camPos.y += (py - camPos.y) * k;
  camPos.z += (pz - camPos.z) * k;
  camTgt.x += (tx - camTgt.x) * k;
  camTgt.y += (ty - camTgt.y) * k;
  camTgt.z += (tz - camTgt.z) * k;
  camera.position.copy(camPos);
  camera.lookAt(camTgt);
}
