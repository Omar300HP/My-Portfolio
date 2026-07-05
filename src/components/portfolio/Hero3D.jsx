import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ACCENT, ACCENT_SECONDARY } from "./data";
import { usePrefersReducedMotion, useTypingText } from "./hooks";

/* ------------------------------------------------------------------ *
 * GLSL — simplex noise + the displaced-icosahedron "core" shaders.
 * Ported verbatim from the imported design's Three.js hero.
 * ------------------------------------------------------------------ */
const NOISE_GLSL = `
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }`;

const CORE_VERTEX = `${NOISE_GLSL}
  uniform float uTime; uniform float uAmp;
  varying vec3 vN; varying vec3 vView; varying float vD;
  void main(){
    vec3 nrm = normalize(position);
    float d = snoise(nrm*1.5 + vec3(0.0,0.0,uTime*0.28))*0.55
            + snoise(nrm*3.1 + vec3(uTime*0.18))*0.22
            + snoise(nrm*6.0 - vec3(uTime*0.10))*0.08;
    vD = d;
    vec3 pos = position + nrm * d * 0.34 * uAmp;
    vN = normalize(normalMatrix * nrm);
    vec4 mv = modelViewMatrix * vec4(pos,1.0);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }`;

const CORE_FRAGMENT = `
  uniform vec3 uColorA; uniform vec3 uColorB;
  varying vec3 vN; varying vec3 vView; varying float vD;
  void main(){
    float fres = pow(1.0 - max(dot(normalize(vN), normalize(vView)), 0.0), 2.3);
    vec3 body = mix(vec3(0.02,0.035,0.06), uColorA*0.16, smoothstep(-0.35,0.4,vD));
    vec3 rim = mix(uColorA, uColorB, clamp(vD*0.6+0.5,0.0,1.0));
    vec3 col = body + rim * fres * 1.9 + uColorA * 0.04;
    gl_FragColor = vec4(col, 1.0);
  }`;

/* Soft radial sprite used for both the particle fields and the core glow. */
function makeSprite() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.3, "rgba(255,255,255,0.55)");
  grd.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  return tex;
}

/* Spherical-shell point cloud, flattened on Y into a disc-ish nebula. */
function makeFieldGeometry(count, rMin, rMax, flat) {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    const r = rMin + Math.random() * (rMax - rMin);
    arr[i * 3] = r * Math.sin(ph) * Math.cos(th);
    arr[i * 3 + 1] = r * Math.cos(ph) * flat;
    arr[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
  }
  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.BufferAttribute(arr, 3));
  return geom;
}

function PointField({
  count,
  rMin,
  rMax,
  size,
  color,
  flat,
  sprite,
  materialRef,
}) {
  const geom = useMemo(
    () => makeFieldGeometry(count, rMin, rMax, flat),
    [count, rMin, rMax, flat],
  );
  useEffect(() => () => geom.dispose(), [geom]);
  return (
    <points>
      <primitive object={geom} attach="geometry" />
      <pointsMaterial
        ref={materialRef}
        size={size}
        map={sprite}
        color={color}
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function Scene({ accent, reduced, autoRotate, interaction }) {
  const groupRef = useRef();
  const coreRef = useRef();
  const coreMatRef = useRef();
  const wireRef = useRef();
  const ringRef = useRef();
  const ringMatRef = useRef();
  const orbitRef = useRef();
  const glowMatRef = useRef();
  const nebulaRef = useRef();
  const fieldMatRef = useRef();

  const sprite = useMemo(() => makeSprite(), []);
  useEffect(() => () => sprite.dispose(), [sprite]);

  const wireGeom = useMemo(
    () => new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.02, 5)),
    [],
  );
  useEffect(() => () => wireGeom.dispose(), [wireGeom]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 1 },
      uColorA: { value: new THREE.Color(accent) },
      uColorB: { value: new THREE.Color(ACCENT_SECONDARY) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // Re-theme every accent-driven material when the accent changes.
  useEffect(() => {
    const c = new THREE.Color(accent);
    uniforms.uColorA.value.copy(c);
    ringMatRef.current?.color.copy(c);
    glowMatRef.current?.color.copy(c);
    fieldMatRef.current?.color.copy(c);
  }, [accent, uniforms]);

  useFrame((state) => {
    const s = interaction.current;
    const t = state.clock.getElapsedTime();
    const auto = 0.0026;

    if (!s.dragging) {
      s.rotY += (autoRotate && !reduced ? auto : 0) + s.velY;
      s.rotX += s.velX;
      s.rotX = Math.max(-0.7, Math.min(0.7, s.rotX));
      s.velY *= 0.94;
      s.velX *= 0.9;
    }

    if (groupRef.current) groupRef.current.rotation.set(s.rotX, s.rotY, 0);
    if (coreRef.current)
      coreRef.current.scale.setScalar(1 + Math.sin(t * 0.9) * 0.015);
    if (wireRef.current) wireRef.current.rotation.y = t * 0.06;

    if (!reduced) {
      if (coreMatRef.current) coreMatRef.current.uniforms.uTime.value = t;
      if (nebulaRef.current) {
        nebulaRef.current.rotation.y = t * 0.04 + s.camTX * 0.4;
        nebulaRef.current.rotation.x = 0.2 + s.camTY * 0.25;
      }
      const p = (t * 0.16) % 1;
      const yy = 1.12 - p * 2.24;
      const sc = Math.sqrt(Math.max(0.02, 1 - (yy / 1.18) * (yy / 1.18)));
      if (ringRef.current) {
        ringRef.current.position.y = yy;
        ringRef.current.scale.set(sc, sc, sc);
      }
      if (ringMatRef.current) ringMatRef.current.opacity = 0.6 * sc;
      if (orbitRef.current) orbitRef.current.rotation.z = 0.4 + t * 0.05;
      if (glowMatRef.current)
        glowMatRef.current.opacity = 0.28 + 0.08 * Math.sin(t * 1.5);
      state.camera.position.x += (s.camTX - state.camera.position.x) * 0.05;
      state.camera.position.y += (s.camTY - state.camera.position.y) * 0.05;
    } else if (coreMatRef.current) {
      coreMatRef.current.uniforms.uTime.value = 0;
    }

    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <group ref={groupRef}>
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1, 40]} />
          <shaderMaterial
            ref={coreMatRef}
            uniforms={uniforms}
            vertexShader={CORE_VERTEX}
            fragmentShader={CORE_FRAGMENT}
          />
        </mesh>

        <lineSegments ref={wireRef}>
          <primitive object={wireGeom} attach="geometry" />
          <lineBasicMaterial
            color={ACCENT_SECONDARY}
            transparent
            opacity={0.09}
          />
        </lineSegments>

        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.2, 0.006, 8, 160]} />
          <meshBasicMaterial
            ref={ringMatRef}
            color={accent}
            transparent
            opacity={0.55}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh ref={orbitRef} rotation={[Math.PI / 2.5, 0, 0.4]}>
          <torusGeometry args={[1.5, 0.004, 8, 160]} />
          <meshBasicMaterial
            color={ACCENT_SECONDARY}
            transparent
            opacity={0.22}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>

        <sprite scale={[4.8, 4.8, 1]}>
          <spriteMaterial
            ref={glowMatRef}
            map={sprite}
            color={accent}
            transparent
            opacity={0.32}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </sprite>
      </group>

      <group ref={nebulaRef} rotation={[0.2, 0, 0]}>
        <PointField
          count={1900}
          rMin={1.35}
          rMax={2.5}
          size={0.05}
          color={accent}
          flat={0.62}
          sprite={sprite}
          materialRef={fieldMatRef}
        />
        <PointField
          count={650}
          rMin={1.5}
          rMax={2.9}
          size={0.03}
          color={ACCENT_SECONDARY}
          flat={0.62}
          sprite={sprite}
        />
      </group>
    </>
  );
}

const TERMINAL_TEXT =
  "> init 3d.viewer\n> load model.stl … ok\n> 48,231 verts · render session [ok]";

export default function Hero3D({ accent = ACCENT, autoRotate = true }) {
  const reduced = usePrefersReducedMotion();
  const panelRef = useRef(null);
  const crossRef = useRef(null);
  const [grabbing, setGrabbing] = useState(false);
  const typed = useTypingText(TERMINAL_TEXT, { enabled: !reduced });

  const interaction = useRef({
    dragging: false,
    rotX: 0.18,
    rotY: 0.5,
    velX: 0,
    velY: 0,
    camTX: 0,
    camTY: 0,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    const up = () => {
      interaction.current.dragging = false;
      setGrabbing(false);
    };
    window.addEventListener("pointerup", up);
    return () => window.removeEventListener("pointerup", up);
  }, []);

  const onPointerDown = (e) => {
    const s = interaction.current;
    s.dragging = true;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    s.velX = 0;
    s.velY = 0;
    setGrabbing(true);
  };

  const onPointerMove = (e) => {
    const s = interaction.current;
    const panel = panelRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    if (crossRef.current) {
      crossRef.current.style.left = `${e.clientX - r.left}px`;
      crossRef.current.style.top = `${e.clientY - r.top}px`;
      crossRef.current.style.opacity = "1";
    }
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    s.camTX = px * 0.55;
    s.camTY = -py * 0.4;
    if (s.dragging) {
      const dx = e.clientX - s.lastX;
      const dy = e.clientY - s.lastY;
      s.rotY += dx * 0.007;
      s.rotX += dy * 0.007;
      s.rotX = Math.max(-0.7, Math.min(0.7, s.rotX));
      s.velY = dx * 0.007;
      s.velX = dy * 0.007;
      s.lastX = e.clientX;
      s.lastY = e.clientY;
    }
  };

  const onPointerLeave = () => {
    const s = interaction.current;
    if (crossRef.current) crossRef.current.style.opacity = "0";
    s.camTX = 0;
    s.camTY = 0;
  };

  const bracket = (pos) => {
    const base = {
      position: "absolute",
      width: 16,
      height: 16,
      borderColor: "color-mix(in srgb, var(--accent) 70%, transparent)",
    };
    const map = {
      tl: {
        top: 14,
        left: 14,
        borderLeft: "1.5px solid",
        borderTop: "1.5px solid",
      },
      tr: {
        top: 14,
        right: 14,
        borderRight: "1.5px solid",
        borderTop: "1.5px solid",
      },
      bl: {
        bottom: 14,
        left: 14,
        borderLeft: "1.5px solid",
        borderBottom: "1.5px solid",
      },
      br: {
        bottom: 14,
        right: 14,
        borderRight: "1.5px solid",
        borderBottom: "1.5px solid",
      },
    };
    return { ...base, ...map[pos] };
  };

  return (
    <div>
      <div
        ref={panelRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{
          position: "relative",
          height: "clamp(380px,54vh,600px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 20,
          overflow: "hidden",
          background:
            "radial-gradient(120% 120% at 50% 20%,#12161f 0%,#0a0d13 70%)",
          cursor: grabbing ? "grabbing" : "grab",
          touchAction: "none",
        }}
      >
        {/* Fading measurement grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.035) 1px,transparent 1px)",
            backgroundSize: "44px 44px",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 45%,#000 30%,transparent 78%)",
            maskImage:
              "radial-gradient(circle at 50% 45%,#000 30%,transparent 78%)",
          }}
        />
        {/* Concentric guide rings */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "min(78%,440px)",
            aspectRatio: "1",
            transform: "translate(-50%,-50%)",
            border:
              "1px solid color-mix(in srgb, var(--accent) 22%, transparent)",
            borderRadius: "50%",
            opacity: 0.35,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "min(52%,300px)",
            aspectRatio: "1",
            transform: "translate(-50%,-50%)",
            border:
              "1px solid color-mix(in srgb, var(--accent) 30%, transparent)",
            borderRadius: "50%",
            opacity: 0.3,
          }}
        />

        {/* The WebGL canvas */}
        <Canvas
          camera={{ fov: 34, position: [0, 0, 3.5], near: 0.1, far: 100 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 2]}
          style={{ position: "absolute", inset: 0 }}
        >
          <Scene
            accent={accent}
            reduced={reduced}
            autoRotate={autoRotate}
            interaction={interaction}
          />
        </Canvas>

        {/* Cursor crosshair (moved imperatively for zero re-render cost) */}
        <div
          ref={crossRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 26,
            height: 26,
            pointerEvents: "none",
            opacity: 0,
            transition: "opacity .2s",
            transform: "translate(-50%,-50%)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: 1,
              background: "var(--accent)",
              opacity: 0.7,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 1,
              background: "var(--accent)",
              opacity: 0.7,
            }}
          />
        </div>

        {/* Corner brackets */}
        <div style={bracket("tl")} />
        <div style={bracket("tr")} />
        <div style={bracket("bl")} />
        <div style={bracket("br")} />

        {/* DRAG TO ORBIT hint */}
        <div
          className="pf-mono"
          style={{
            position: "absolute",
            top: 22,
            right: 26,
            display: "flex",
            alignItems: "center",
            gap: 7,
            fontSize: "0.66rem",
            letterSpacing: "0.08em",
            color: "#7b8391",
            pointerEvents: "none",
          }}
        >
          <span className="animate-pf-spin" style={{ display: "inline-block" }}>
            ⟳
          </span>
          DRAG TO ORBIT
        </div>

        {/* Terminal readout */}
        <div
          className="pf-mono"
          style={{
            position: "absolute",
            bottom: 22,
            left: 24,
            fontSize: "0.7rem",
            lineHeight: 1.7,
            color: "#8b93a2",
            pointerEvents: "none",
            whiteSpace: "pre",
          }}
        >
          <span>{typed}</span>
          <span
            className="animate-pf-blink"
            style={{
              display: "inline-block",
              width: 7,
              height: 13,
              background: "var(--accent)",
              verticalAlign: "-2px",
              marginLeft: 2,
            }}
          />
        </div>

        {/* Diameter badge */}
        <div
          className="pf-mono"
          style={{
            position: "absolute",
            bottom: 22,
            right: 26,
            fontSize: "0.7rem",
            color: "var(--accent)",
            pointerEvents: "none",
            border:
              "1px solid color-mix(in srgb, var(--accent) 30%, transparent)",
            borderRadius: 7,
            padding: "4px 9px",
            background: "color-mix(in srgb, var(--accent) 8%, transparent)",
          }}
        >
          ⌀ 12.4 mm
        </div>
      </div>
      <p
        className="pf-mono"
        style={{
          fontSize: "0.68rem",
          letterSpacing: "0.05em",
          color: "#626b7a",
          margin: "12px 4px 0",
          textAlign: "center",
        }}
      >
        Live Three.js demo. Drag to orbit.
      </p>
    </div>
  );
}
