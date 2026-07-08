"use client";

import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

const PER_SIDE = 9; // columns per side
const SPACING = 4.2; // z-gap between columns
const HALL_X = 5.2; // half-width of the hall

/** Two receding rows of columns, drawn in a single instanced call per side. */
function Columns() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const geo = useMemo(() => new THREE.BoxGeometry(1, 15, 1), []);
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#171020",
        roughness: 0.5,
        metalness: 0.35,
      }),
    []
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    let i = 0;
    for (let s = -1; s <= 1; s += 2) {
      for (let c = 0; c < PER_SIDE; c++) {
        dummy.position.set(s * HALL_X, 0, 3 - c * SPACING);
        dummy.updateMatrix();
        mesh.setMatrixAt(i++, dummy.matrix);
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, [dummy]);

  useEffect(() => () => {
    geo.dispose();
    mat.dispose();
  }, [geo, mat]);

  return (
    <instancedMesh ref={ref} args={[geo, mat, PER_SIDE * 2]} castShadow={false} />
  );
}

/** The gold seal, floating mid-hall as a lit billboard. Dissolves as the
 *  camera advances so it never collides with the revealed hero copy. */
function Seal({ progress }: { progress: MutableRefObject<number> }) {
  const tex = useTexture("/logo-3d.png");
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  useFrame((state) => {
    const m = ref.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    m.position.y = 1.1 + Math.sin(t * 0.6) * 0.12;
    m.rotation.y = Math.sin(t * 0.3) * 0.12;
    if (matRef.current) {
      // Fade out over progress 0.22 -> 0.46.
      const p = progress.current;
      matRef.current.opacity = 1 - THREE.MathUtils.smoothstep(p, 0.22, 0.46);
    }
  });
  return (
    <mesh ref={ref} position={[0, 1.1, -3]}>
      <planeGeometry args={[5.4, 3.6]} />
      <meshBasicMaterial ref={matRef} map={tex} transparent toneMapped={false} />
    </mesh>
  );
}

/** Slow-drifting gold dust motes. */
function Dust({ count = 380 }: { count?: number }) {
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
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.015;
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
        size={0.05}
        color="#e7c477"
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}

/** The gold light at the far end of the hall — a distant glow, not a wall.
 *  Bloom turns the small disc into a soft god-ray halo. */
function EndLight() {
  return (
    <group position={[0, 1.4, -52]}>
      <mesh>
        <circleGeometry args={[2.6, 48]} />
        <meshBasicMaterial color="#ffdd93" toneMapped={false} />
      </mesh>
      <pointLight color="#ffcf7a" intensity={110} distance={95} decay={1.5} />
    </group>
  );
}

/** Scroll-driven camera fly-forward down the hall toward the light. Stops
 *  short of the light so the columns keep framing the shot. */
function Rig({ progress }: { progress: MutableRefObject<number> }) {
  const { camera } = useThree();
  useFrame(() => {
    const p = progress.current;
    const z = THREE.MathUtils.lerp(15, -1.5, p);
    camera.position.set(0, 1.3, z);
    camera.lookAt(0, 1.2, -52);
  });
  return null;
}

export default function ChamberScene({
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
        scene.fog = new THREE.Fog("#0a0713", 8, 46);
      }}
    >
      <ambientLight intensity={0.12} color="#6a4b8a" />
      <spotLight
        position={[0, 10, 6]}
        angle={0.9}
        penumbra={1}
        intensity={30}
        color="#b98bd6"
        distance={40}
      />
      <Columns />
      <EndLight />
      <Seal progress={progress} />
      <Dust />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -7.4, -14]}>
        <planeGeometry args={[40, 90]} />
        <meshStandardMaterial color="#0c0912" roughness={0.35} metalness={0.5} />
      </mesh>
      <Rig progress={progress} />
      <EffectComposer>
        <Bloom
          intensity={1.05}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.25} darkness={0.9} />
      </EffectComposer>
    </Canvas>
  );
}
