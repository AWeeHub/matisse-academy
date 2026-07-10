"use client";

import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

/* LAW re-grade of ChamberScene: same architecture (receding columns + brand
 * seal + hall of light), regraded from cathedral-purple/heaven to a solemn
 * classical law hall — warm stone columns, restrained daylight from the end,
 * low bloom. Preview only (/law-intro); the live chamber is untouched. */

const PER_SIDE = 9;
const SPACING = 4.2;
const HALL_X = 5.2;

/** Two receding rows of walnut pilasters capped and based in brushed brass —
 *  the panelling of a heritage law library / boardroom, not a nave. Brass is
 *  metallic but NOT emissive, so it reflects the warm key light instead of
 *  glowing like a divine source. 18 columns → individual meshes, cheap. */
function Columns() {
  const cols = useMemo(() => {
    const out: [number, number, number][] = [];
    for (let s = -1; s <= 1; s += 2) {
      for (let c = 0; c < PER_SIDE; c++) {
        out.push([s * HALL_X, 0, 3 - c * SPACING]);
      }
    }
    return out;
  }, []);

  const walnut = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#3a2717", // walnut — light enough to catch the key light
        roughness: 0.5,
        metalness: 0.14,
      }),
    []
  );
  const brass = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#8a6d33", // brushed brass — reflective, not glowing
        roughness: 0.42,
        metalness: 0.9,
      }),
    []
  );
  const pillarGeo = useMemo(() => new THREE.BoxGeometry(1, 15, 1), []);
  const bandGeo = useMemo(() => new THREE.BoxGeometry(1.12, 0.3, 1.12), []);

  useEffect(
    () => () => {
      walnut.dispose();
      brass.dispose();
      pillarGeo.dispose();
      bandGeo.dispose();
    },
    [walnut, brass, pillarGeo, bandGeo]
  );

  return (
    <>
      {cols.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh geometry={pillarGeo} material={walnut} />
          <mesh geometry={bandGeo} material={brass} position={[0, 6.8, 0]} />
          <mesh geometry={bandGeo} material={brass} position={[0, -6.8, 0]} />
        </group>
      ))}
    </>
  );
}

/** The brand seal, floating mid-hall. Same behaviour as live. */
function Seal({ progress }: { progress: MutableRefObject<number> }) {
  const tex = useTexture("/logo-3d-clean.png");
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  useFrame((state) => {
    const m = ref.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    const p = progress.current;
    m.position.y = 1.1 + Math.sin(t * 0.6) * 0.12;
    m.rotation.y = Math.sin(t * 0.3) * 0.1;
    m.scale.setScalar(1 + p * 1.0);
    if (matRef.current) {
      matRef.current.opacity = 1 - THREE.MathUtils.smoothstep(p, 0.34, 0.72);
    }
  });
  return (
    <mesh ref={ref} position={[0, 1.1, -3]}>
      <planeGeometry args={[4.3, 5.2]} />
      <meshBasicMaterial ref={matRef} map={tex} transparent toneMapped={false} />
    </mesh>
  );
}

/** Slow brass dust motes — dimmer than the live gold. */
function Dust({ count = 300 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 16;
      a[i * 3 + 1] = Math.random() * 12 - 2;
      a[i * 3 + 2] = 6 - Math.random() * 40;
    }
    return a;
  }, [count]);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.014;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#c9b088"
        transparent
        opacity={0.42}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}

/** Warm daylight from the end of the hall — a restrained opening, not a
 *  divine orb. Smaller, paler, dimmer so bloom can't turn it into 'heaven'. */
function EndLight() {
  return (
    <group position={[0, 1.4, -52]}>
      <mesh>
        <circleGeometry args={[1.9, 48]} />
        <meshBasicMaterial color="#f1e2bf" toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, -0.5]}>
        <circleGeometry args={[5.2, 48]} />
        <meshBasicMaterial
          color="#e9d3a0"
          transparent
          opacity={0.07}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <pointLight color="#f0dcae" intensity={72} distance={95} decay={1.5} />
    </group>
  );
}

/** Scroll-driven camera fly-forward. Identical motion to the live scene. */
function Rig({ progress }: { progress: MutableRefObject<number> }) {
  const { camera } = useThree();
  useFrame(() => {
    const p = progress.current;
    const z = THREE.MathUtils.lerp(11, -2, p);
    camera.position.set(0, 1.3, z);
    camera.lookAt(0, 1.2, -52);
  });
  return null;
}

export default function ChamberSceneLaw({
  progress,
}: {
  progress: MutableRefObject<number>;
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ fov: 60, near: 0.1, far: 120, position: [0, 1.3, 15] }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor("#050505", 1);
        scene.fog = new THREE.Fog("#0b0a08", 8, 46); // warm near-black, no purple
      }}
    >
      <ambientLight intensity={0.24} color="#8a7c63" />
      {/* Warm key from above — restrained, like recessed library lighting. */}
      <spotLight
        position={[0, 10, 6]}
        angle={0.95}
        penumbra={1}
        intensity={30}
        color="#e6d2a4"
        distance={42}
      />
      {/* Low amber fill near the seal — the glow of a reading lamp, grounding
          the space as an interior rather than an open hall of light. */}
      <pointLight position={[0, 2, 2]} intensity={9} color="#e7b877" distance={16} decay={1.6} />
      <Columns />
      <EndLight />
      <Seal progress={progress} />
      <Dust />
      {/* Polished walnut floor with a faint brass-catching sheen. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -7.4, -14]}>
        <planeGeometry args={[40, 90]} />
        <meshStandardMaterial color="#1a130c" roughness={0.42} metalness={0.35} />
      </mesh>
      <Rig progress={progress} />
      <EffectComposer>
        <Bloom
          intensity={0.45}
          luminanceThreshold={0.4}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.28} darkness={0.95} />
      </EffectComposer>
    </Canvas>
  );
}
