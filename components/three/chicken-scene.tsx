"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { ChickenModel } from "./chicken-model";

function RotatingRig({ progress }: { progress: React.MutableRefObject<number> }) {
  const group = React.useRef<any>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    // Rotacion continua y lenta (documental, no videojuego)
    group.current.rotation.y += delta * 0.35;

    // La camara se acerca levemente segun el progreso de scroll de la escena
    const targetZ = 5 - progress.current * 1.6;
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.06;
    state.camera.lookAt(0, 0.1, 0);
  });

  return (
    <group ref={group}>
      <ChickenModel />
    </group>
  );
}

/** Textura procedural de brasas (radial glow con manchas), generada en canvas. */
let cachedEmberTexture: THREE.CanvasTexture | null = null;
function getEmberTexture(): THREE.CanvasTexture {
  if (cachedEmberTexture) return cachedEmberTexture;
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#0d0906";
  ctx.fillRect(0, 0, size, size);

  let seed = 7;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  for (let i = 0; i < 45; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const r = 6 + rand() * 20;
    const hot = rand();
    const color = hot > 0.6 ? "#ffb347" : hot > 0.3 ? "#ff6b1a" : "#c92f0e";
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, color);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  cachedEmberTexture = texture;
  return texture;
}

/** Cama de brasas debajo del pollo: plano emisivo + parpadeo sutil de intensidad. */
function EmberBed() {
  const [texture, setTexture] = React.useState<THREE.CanvasTexture | null>(null);
  const lightRef = React.useRef<THREE.PointLight>(null);
  const t = React.useRef(0);

  React.useEffect(() => {
    setTexture(getEmberTexture());
  }, []);

  useFrame((_, delta) => {
    t.current += delta;
    if (lightRef.current) {
      // Parpadeo suave tipo brasa real (no estroboscopico)
      lightRef.current.intensity =
        1.6 + Math.sin(t.current * 3.1) * 0.25 + Math.sin(t.current * 7.7) * 0.12;
    }
  });

  return (
    <group position={[0, -1.9, -0.3]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.2, 2.4]} />
        <meshBasicMaterial
          map={texture ?? undefined}
          color={texture ? undefined : "#c92f0e"}
          transparent
          opacity={0.9}
        />
      </mesh>
      <pointLight ref={lightRef} position={[0, 0.4, 0]} intensity={1.6} color="#ff7a2e" distance={5} />
    </group>
  );
}

/** Rejilla oscura de la parrilla, apenas insinuada en la parte baja del encuadre. */
function GrillGrate() {
  const bars = Array.from({ length: 7 }, (_, i) => -1.8 + i * 0.6);
  return (
    <group position={[0, -2.05, 0.3]}>
      {bars.map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 3.6, 8]} />
          <meshStandardMaterial color="#161311" metalness={0.6} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

export function ChickenScene({
  progress,
  className,
}: {
  progress: React.MutableRefObject<number>;
  className?: string;
}) {
  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.2, 5], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#0d0906"]} />
        <fog attach="fog" args={["#0d0906", 5, 11]} />

        {/* Luz de relleno calida tenue */}
        <ambientLight intensity={0.28} color="#ffdcb0" />
        {/* Luz clave: simula el resplandor de las brasas desde abajo-frente */}
        <pointLight position={[2.6, 1.4, 3.2]} intensity={2.4} color="#ff8a3d" castShadow />
        {/* Contraluz fria sutil para separar la silueta del fondo */}
        <pointLight position={[-3, 0.5, -2.5]} intensity={0.5} color="#3d6bff" />
        {/* Rim light superior calido */}
        <pointLight position={[0, 3, -3]} intensity={0.7} color="#ffb347" />
        {/* Luz de brasas desde abajo (rebote) */}
        <pointLight position={[0, -1.6, 1]} intensity={0.9} color="#ff5a1f" />

        <GrillGrate />
        <EmberBed />
        <RotatingRig progress={progress} />

        <EffectComposer>
          <Bloom
            intensity={0.65}
            luminanceThreshold={0.32}
            luminanceSmoothing={0.2}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
