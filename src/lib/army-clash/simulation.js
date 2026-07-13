import {
  ARCHER,
  ARCHER_KITE_DIST,
  ARCHER_KITE_SPEED,
  ARCHER_MELEE_COOLDOWN,
  ARCHER_MELEE_DAMAGE,
  ARCHER_MELEE_RANGE,
  ARCHER_MIN_VOLLEY_DIST,
  ARROW_HIT_RADIUS,
  ARROW_SPEED,
  BOUNDS,
  CLIMAX_MORALE,
  DT,
  FLEE_SPEED_MULT,
  MAX_STEPS,
  MORALE_FLOOR,
  MORALE_PRESSURE,
  STALEMATE_TIME,
  NEAREST_MAX_RING,
  RETARGET_BASE,
  RETARGET_JITTER,
  SEPARATION_DIST_SQ,
  SEPARATION_PUSH,
  STATS,
  TYPE_NAMES,
  counterMultiplier,
} from "./constants";
import { buildWorld } from "./world";
import { buildGrid, cellKey, nearestEnemy } from "./grid";
import { makeRng } from "./rng";

// Create a battle simulation from a config `{ armies: [A, B], seed, deployGap }`.
// Drive it one fixed-timestep `tick()` at a time (renderer) or to completion
// via `run()` (headless / tests). Fully deterministic for a given config.
export function createSimulation(config) {
  const world = buildWorld(config);
  const { n } = world;
  const rand = makeRng((config.seed ?? 0) ^ 0x9e37);
  const bounds = config.fieldBounds ?? BOUNDS;

  const arrows = []; // in-flight volleys: {sx,sz,tx,tz,t,dur,tgt,team,dmg}
  const centroids = [
    { x: 0, z: 0, count: 0 },
    { x: 0, z: 0, count: 0 },
  ];
  const fight = { x: 0, z: 0 }; // running centre of the actual fighting

  let step = 0;
  let simTime = 0;
  let phase = "DEPLOY";
  let decided = false; // winner known (rout happened); sim may keep ticking
  let result = null; // frozen at the moment of decision
  let climax = false; // one-shot: either Army's Morale first dipped critical

  // Initial morale weight per team — the denominator of the surviving fraction.
  const initialWeight = [0, 0];
  for (let i = 0; i < n; i++) initialWeight[world.team[i]] += STATS.weight[world.type[i]];
  const morale = [1, 1];

  function updateMorale() {
    const aliveWeight = [0, 0];
    for (let i = 0; i < n; i++) {
      if (world.alive[i] && !world.fleeing[i]) {
        aliveWeight[world.team[i]] += STATS.weight[world.type[i]];
      }
    }
    for (let t = 0; t < 2; t++) {
      const frac = initialWeight[t] ? aliveWeight[t] / initialWeight[t] : 0;
      const enemyFrac = initialWeight[1 - t] ? aliveWeight[1 - t] / initialWeight[1 - t] : 0;
      const pressure = Math.max(0, enemyFrac - frac) * MORALE_PRESSURE;
      morale[t] = Math.max(
        0,
        Math.min(1, (frac - MORALE_FLOOR) / (1 - MORALE_FLOOR) - pressure),
      );
    }
    if (!climax && (morale[0] < CLIMAX_MORALE || morale[1] < CLIMAX_MORALE)) climax = true;
  }

  function routArmy(team) {
    for (let i = 0; i < n; i++) {
      if (world.team[i] === team && world.alive[i]) world.fleeing[i] = 1;
    }
    phase = "ROUT";
    decided = true;
    result = buildResult(team);
  }

  function updateCentroids() {
    centroids[0].x = centroids[0].z = centroids[0].count = 0;
    centroids[1].x = centroids[1].z = centroids[1].count = 0;
    for (let i = 0; i < n; i++) {
      if (!world.alive[i]) continue;
      const c = centroids[world.team[i]];
      c.x += world.posX[i];
      c.z += world.posZ[i];
      c.count++;
    }
    for (const c of centroids) {
      if (c.count) {
        c.x /= c.count;
        c.z /= c.count;
      }
    }
  }

  function hit(v, dmg) {
    if (!world.alive[v]) return;
    world.hp[v] -= dmg;
    fight.x += (world.posX[v] - fight.x) * 0.06;
    fight.z += (world.posZ[v] - fight.z) * 0.06;
    if (world.hp[v] <= 0) world.alive[v] = 0;
  }

  function tick() {
    const { posX, posZ, alive, fleeing, target, yaw, cd, retarget, team, type } = world;
    const grid = buildGrid(world);
    simTime += DT;

    updateCentroids();

    for (let i = 0; i < n; i++) {
      if (!alive[i]) continue;
      const tid = type[i];
      const spd = STATS.speed[tid];

      if (fleeing[i]) {
        // Routed — run directly away from the enemy centroid.
        const ec = centroids[1 - team[i]];
        const dx = posX[i] - ec.x;
        const dz = posZ[i] - ec.z;
        const len = Math.hypot(dx, dz) || 1;
        posX[i] += (dx / len) * spd * 1.35 * DT;
        posZ[i] += (dz / len) * spd * 1.35 * DT;
        yaw[i] = Math.atan2(dx / len, dz / len);
        continue;
      }

      cd[i] -= DT;
      retarget[i] -= DT;

      let t = target[i];
      if (retarget[i] <= 0 || t < 0 || !alive[t]) {
        t = nearestEnemy(grid, world, i, NEAREST_MAX_RING);
        target[i] = t;
        retarget[i] = RETARGET_BASE + rand() * RETARGET_JITTER;
      }

      if (t < 0) {
        // No enemy nearby — march toward the enemy centroid.
        const ec = centroids[1 - team[i]];
        if (ec.count) {
          const dx = ec.x - posX[i];
          const dz = ec.z - posZ[i];
          const len = Math.hypot(dx, dz) || 1;
          posX[i] += (dx / len) * spd * DT;
          posZ[i] += (dz / len) * spd * DT;
          yaw[i] = Math.atan2(dx / len, dz / len);
        }
        continue;
      }

      const dx = posX[t] - posX[i];
      const dz = posZ[t] - posZ[i];
      const dist = Math.hypot(dx, dz) || 1;
      const isArcher = tid === ARCHER;
      const inRange = dist <= STATS.range[tid];
      const kite = isArcher && dist < ARCHER_KITE_DIST && type[t] !== ARCHER;

      if (kite) {
        posX[i] -= (dx / dist) * spd * ARCHER_KITE_SPEED * DT;
        posZ[i] -= (dz / dist) * spd * ARCHER_KITE_SPEED * DT;
        yaw[i] = Math.atan2(dx / dist, dz / dist);
      } else if (!inRange) {
        posX[i] += (dx / dist) * spd * DT;
        posZ[i] += (dz / dist) * spd * DT;
        yaw[i] = Math.atan2(dx / dist, dz / dist);
      } else {
        yaw[i] = Math.atan2(dx / dist, dz / dist);
      }

      // Separation — push off the first too-close ally in this unit's cell.
      const bucket = grid.get(cellKey(posX[i], posZ[i]));
      if (bucket) {
        for (let b = 0; b < bucket.length; b++) {
          const j = bucket[b];
          if (j === i) continue;
          const sx = posX[i] - posX[j];
          const sz = posZ[i] - posZ[j];
          const sd2 = sx * sx + sz * sz;
          if (sd2 > 0.000001 && sd2 < SEPARATION_DIST_SQ) {
            const sd = Math.sqrt(sd2);
            posX[i] += (sx / sd) * SEPARATION_PUSH * DT;
            posZ[i] += (sz / sd) * SEPARATION_PUSH * DT;
            break;
          }
        }
      }

      posX[i] = Math.max(-bounds, Math.min(bounds, posX[i]));
      posZ[i] = Math.max(-bounds, Math.min(bounds, posZ[i]));

      // Attack.
      if (cd[i] <= 0) {
        if (isArcher && dist > ARCHER_MIN_VOLLEY_DIST && inRange) {
          cd[i] = STATS.cooldown[ARCHER];
          arrows.push({
            sx: posX[i],
            sz: posZ[i],
            tx: posX[t],
            tz: posZ[t],
            t: 0,
            dur: dist / ARROW_SPEED,
            tgt: t,
            team: team[i],
            dmg: STATS.damage[ARCHER] * counterMultiplier(ARCHER, type[t], true),
          });
        } else if (dist <= (isArcher ? ARCHER_MELEE_RANGE : STATS.range[tid])) {
          cd[i] = isArcher ? ARCHER_MELEE_COOLDOWN : STATS.cooldown[tid];
          const dmg =
            (isArcher ? ARCHER_MELEE_DAMAGE : STATS.damage[tid]) *
            counterMultiplier(tid, type[t], false);
          hit(t, dmg);
          if (phase !== "CLASH") phase = "CLASH";
        }
      }
    }

    // Arrows land after their flight time; they hit only if the target is
    // still near the aim point (leading is not modelled — mobs dodge volleys).
    for (let i = arrows.length - 1; i >= 0; i--) {
      const a = arrows[i];
      a.t += DT;
      if (a.t >= a.dur) {
        if (world.alive[a.tgt]) {
          const d = Math.hypot(world.posX[a.tgt] - a.tx, world.posZ[a.tgt] - a.tz);
          if (d < ARROW_HIT_RADIUS) {
            hit(a.tgt, a.dmg);
            if (phase !== "CLASH") phase = "CLASH";
          }
        }
        arrows.splice(i, 1);
      }
    }

    if (phase === "DEPLOY" && simTime > 2.2) phase = "ADVANCE";
    step++;

    // The Battle is decided the moment an Army's Morale breaks and it Routs.
    // Ticking may continue afterwards (the rout plays out for the camera),
    // but the result is frozen at this moment.
    if (!decided) {
      updateMorale();
      if (morale[0] <= 0.001) routArmy(0);
      else if (morale[1] <= 0.001) routArmy(1);
      else if (simTime > STALEMATE_TIME || step >= MAX_STEPS) {
        routArmy(morale[0] <= morale[1] ? 0 : 1);
      }
    }
  }

  function countByType(team, { includeFleeing = true } = {}) {
    const out = {};
    for (let i = 0; i < n; i++) {
      if (!world.alive[i] || world.team[i] !== team) continue;
      if (!includeFleeing && world.fleeing[i]) continue;
      const name = TYPE_NAMES[world.type[i]];
      out[name] = (out[name] || 0) + 1;
    }
    return out;
  }

  const fielded = {
    [world.ids[0]]: countByType(0),
    [world.ids[1]]: countByType(1),
  };

  function buildResult(routedTeam) {
    const [idA, idB] = world.ids;
    const winTeam = 1 - routedTeam;
    const survivors = { [idA]: {}, [idB]: {} };
    survivors[world.ids[winTeam]] = countByType(winTeam, { includeFleeing: false });
    return {
      winner: world.ids[winTeam],
      loser: world.ids[routedTeam],
      routed: world.ids[routedTeam],
      routedAt: simTime,
      steps: step,
      simTime,
      survivors,
      standing: { [idA]: countByType(0), [idB]: countByType(1) },
      fielded,
      world,
    };
  }

  function run() {
    while (!decided) tick();
    return result;
  }

  return {
    world,
    arrows,
    centroids,
    fight,
    morale,
    tick,
    run,
    getResult: () => result,
    isOver: () => decided,
    get phase() {
      return phase;
    },
    get climax() {
      return climax;
    },
    get simTime() {
      return simTime;
    },
    get step() {
      return step;
    },
  };
}
