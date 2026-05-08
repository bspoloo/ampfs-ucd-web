"use client";

import { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/RaquetModel.glb";

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function RacketScene() {
  const { scene } = useGLTF(MODEL_PATH);
  const groupRef   = useRef<THREE.Group>(null!);
  const entranceRef = useRef(0);
  const scrollRef   = useRef(0);
  const mouseRef    = useRef({ x: 0, y: 0 });
  const rotYRef     = useRef(0);

  useEffect(() => {
    const onScroll = () => { scrollRef.current = window.scrollY; };
    const onMouse  = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth  - 0.5);
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("scroll",    onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse,  { passive: true });
    return () => {
      window.removeEventListener("scroll",    onScroll);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // ── Entrada (0 → 1 en ~1.8 s) ──────────────────────
    entranceRef.current = Math.min(1, entranceRef.current + delta * 0.55);
    const enter = easeOutExpo(entranceRef.current);

    // ── Progreso de scroll ──────────────────────────────
    const scrollPct = Math.min(1, scrollRef.current / (window.innerHeight * 0.7));

    // ── Posición ────────────────────────────────────────
    // Target: desplazado a la izquierda para no tapar el texto
    groupRef.current.position.x = THREE.MathUtils.lerp(8,  -1.8, enter);
    groupRef.current.position.y = THREE.MathUtils.lerp(-9, -0.6, enter) - scrollPct * 7;
    groupRef.current.position.z = THREE.MathUtils.lerp(-6, -0.5, enter);

    // ── Rotación ────────────────────────────────────────
    rotYRef.current += delta * 0.28;
    groupRef.current.rotation.y = rotYRef.current + mouseRef.current.x * 0.3;
    // Inclinación fija en Z (ladeado) + parallax en X con mouse
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      -0.55 + mouseRef.current.x * 0.1,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      0.35 + mouseRef.current.y * 0.25 + scrollPct * 0.4,
      0.06
    );

    // ── Fade al salir del hero ──────────────────────────
    const opacity = Math.max(0, 1 - scrollPct * 2.2);
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mats = Array.isArray((child as THREE.Mesh).material)
          ? (child as THREE.Mesh).material as THREE.Material[]
          : [(child as THREE.Mesh).material as THREE.Material];
        mats.forEach((m) => {
          const mat = m as THREE.MeshStandardMaterial;
          mat.transparent = true;
          mat.opacity     = opacity;
          mat.needsUpdate = true;
        });
      }
    });
  });

  return <primitive ref={groupRef} object={scene} scale={5.5} />;
}

export function HeroModel() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 1, 8], fov: 65 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 8, 5]}  intensity={1.4} />
        <directionalLight position={[-4, 2, -3]} intensity={0.3} color="#ffffff" />
        <pointLight position={[-3, 1, 4]} intensity={1.4} color="#b11212" />
        <Suspense fallback={null}>
          <RacketScene />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_PATH);
