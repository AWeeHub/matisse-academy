"use client";

import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { intro } from "@/lib/motion";

const CH = intro.chamber;

/** Shared cursor + entrance state, mutated per-frame (never triggers React). */
type Vec2 = { x: number; y: number };
type HeroState = {
  pointer: Vec2; // eased drift actually applied
  target: Vec2; // raw cursor target
  began: boolean; // has the entrance been cued (curtain lifted)?
  startAt: number; // clock time the entrance began (-1 = not yet)
};

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

/** The gold seal, floating mid-hall as a lit billboard. Resolves up from black
 *  during the entrance, counter-drifts with the cursor for depth, then
 *  dissolves as the camera advances so it never collides with the hero copy. */
function Seal({
  progress,
  hero,
}: {
  progress: MutableRefObject<number>;
  hero: MutableRefObject<HeroState>;
}) {
  const tex = useTexture("/logo-3d-clean.png");
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  useFrame((state) => {
    const m = ref.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    const p = progress.current;
    const h = hero.current;
    // How far into the load-entrance we are (0 before the curtain lifts).
    const enter =
      h.began && h.startAt >= 0
        ? THREE.MathUtils.smoothstep((t - h.startAt) / CH.entranceSec, 0, 1)
        : 0;
    // Cursor parallax fades out as you dive so it never fights the descent.
    const rest = 1 - THREE.MathUtils.smoothstep(p, 0, 0.5);
    m.position.y = 1.1 + Math.sin(t * 0.6) * 0.12;
    m.position.x = -h.pointer.x * CH.sealSwayX * rest;
    m.rotation.y = Math.sin(t * 0.3) * 0.1 + h.pointer.x * 0.05 * rest;
    // A small emblem behind the headline at rest; grows + dissolves as you
    // scroll so it never fights the copy for the centre.
    m.scale.setScalar((0.62 + enter * 0.06) * (1 + p * 1.15));
    if (matRef.current) {
      const dissolve = 1 - THREE.MathUtils.smoothstep(p, 0.34, 0.72);
      // Kept faint at rest so it reads as a gold ghost behind the text, then
      // blooms brighter only as the copy dives away.
      const restCap = 0.4 + THREE.MathUtils.smoothstep(p, 0.1, 0.4) * 0.6;
      matRef.current.opacity = enter * dissolve * restCap;
    }
  });
  return (
    <mesh ref={ref} position={[0, 1.1, -3]}>
      <planeGeometry args={[4.3, 5.2]} />
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
      {/* Soft additive halo — bloom turns this into a god-ray glow. */}
      <mesh position={[0, 0, -0.5]}>
        <circleGeometry args={[7.5, 48]} />
        <meshBasicMaterial
          color="#ffcf7a"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <pointLight color="#ffcf7a" intensity={110} distance={95} decay={1.5} />
    </group>
  );
}

/** The camera. Three moves compose on one frame:
 *   1. Entrance — an autoplay dolly-in when the curtain lifts (the "wow").
 *   2. Cursor parallax — the whole rig drifts toward the pointer; near columns
 *      shift more than the far light, so the hall gains real layered depth.
 *   3. Scroll dive — flies forward down the hall toward the light on scroll.
 *  Parallax eases out as you dive so it never fights the descent. */
function Rig({
  progress,
  hero,
}: {
  progress: MutableRefObject<number>;
  hero: MutableRefObject<HeroState>;
}) {
  const { camera } = useThree();
  useFrame((state, delta) => {
    const p = progress.current;
    const h = hero.current;
    const t = state.clock.elapsedTime;

    // Ease the applied drift toward the raw cursor target (frame-rate aware).
    const k = 1 - Math.pow(1 - CH.pointerEase, delta * 60);
    h.pointer.x += (h.target.x - h.pointer.x) * k;
    h.pointer.y += (h.target.y - h.pointer.y) * k;

    // Entrance dolly: held far behind the curtain, then eases to rest depth.
    if (h.began && h.startAt < 0) h.startAt = t;
    const enter =
      h.began && h.startAt >= 0
        ? THREE.MathUtils.smoothstep((t - h.startAt) / CH.entranceSec, 0, 1)
        : 0;
    const startZ = THREE.MathUtils.lerp(CH.dollyFromZ, CH.restZ, enter);
    const z = THREE.MathUtils.lerp(startZ, CH.diveZ, p);

    // Parallax sway, present at rest, gone by the time you've dived in.
    const sway = (1 - THREE.MathUtils.smoothstep(p, 0, 0.5)) * enter;
    camera.position.set(
      h.pointer.x * CH.swayX * sway,
      1.3 + h.pointer.y * CH.swayY * sway,
      z
    );
    camera.lookAt(0, 1.2 + h.pointer.y * 0.16 * sway, -52);
  });
  return null;
}

export default function ChamberScene({
  progress,
}: {
  progress: MutableRefObject<number>;
}) {
  // Cursor + entrance state, mutated per-frame without re-rendering React.
  const hero = useRef<HeroState>({
    pointer: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
    began: false,
    startAt: -1,
  });

  // Cue the entrance when the preloader curtain lifts (with a failsafe in
  // case the signal is missed), and track the cursor for parallax.
  useEffect(() => {
    const begin = () => {
      hero.current.began = true;
    };
    window.addEventListener("ma:intro-start", begin, { once: true });
    const fb = window.setTimeout(begin, intro.entrance.fallbackMs);

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const onMove = (e: PointerEvent) => {
      hero.current.target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      hero.current.target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (fine) window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("ma:intro-start", begin);
      window.clearTimeout(fb);
      if (fine) window.removeEventListener("pointermove", onMove);
    };
  }, []);

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
      <Seal progress={progress} hero={hero} />
      <Dust />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -7.4, -14]}>
        <planeGeometry args={[40, 90]} />
        <meshStandardMaterial color="#0c0912" roughness={0.35} metalness={0.5} />
      </mesh>
      <Rig progress={progress} hero={hero} />
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
