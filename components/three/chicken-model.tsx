"use client";

import * as React from "react";
import * as THREE from "three";

/**
 * Placeholder estilizado del pollo, construido con geometria primitiva
 * (no fotorrealista a proposito -- ver 07_Storyboard_y_Prompts_IA/Modelo_3D_Pollo.md
 * para como reemplazarlo por un modelo .glb real). Esta version usa una
 * textura procedural generada en canvas (sin depender de ningun asset
 * externo) para simular piel dorada con manchas de tostado, ademas de
 * una silueta con pechuga, muslos, piernas, alas y patas -- mucho mas
 * reconocible como "pollo entero" que la esfera + 2 capsulas anterior.
 */

let cachedSkinTexture: THREE.CanvasTexture | null = null;

function getSkinTexture(): THREE.CanvasTexture {
  if (cachedSkinTexture) return cachedSkinTexture;

  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Base dorada (gradiente sutil)
  const base = ctx.createLinearGradient(0, 0, size, size);
  base.addColorStop(0, "#E9B25C");
  base.addColorStop(0.5, "#D89A45");
  base.addColorStop(1, "#C2822F");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, size, size);

  // Manchas de "tostado" (carbon/asado) distribuidas de forma pseudo-aleatoria
  // pero determinista (misma semilla siempre) para que el resultado sea estable.
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  for (let i = 0; i < 140; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const r = 4 + rand() * 22;
    const tone = rand();
    const alpha = 0.12 + rand() * 0.22;
    const color =
      tone > 0.75
        ? `rgba(90, 45, 15, ${alpha})`
        : tone > 0.4
        ? `rgba(150, 80, 30, ${alpha})`
        : `rgba(230, 180, 100, ${alpha})`;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, color);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Brillo/grasa (highlights especulares simulados)
  for (let i = 0; i < 30; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const r = 3 + rand() * 8;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, "rgba(255, 235, 190, 0.35)");
    grad.addColorStop(1, "rgba(255, 235, 190, 0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  cachedSkinTexture = texture;
  return texture;
}

function useSkinTexture() {
  const [texture, setTexture] = React.useState<THREE.CanvasTexture | null>(null);
  React.useEffect(() => {
    setTexture(getSkinTexture());
  }, []);
  return texture;
}

export function ChickenModel(props: JSX.IntrinsicElements["group"]) {
  const groupRef = React.useRef<THREE.Group>(null);
  const skinMap = useSkinTexture();

  const skinProps = skinMap
    ? { map: skinMap, roughness: 0.45, metalness: 0.04 }
    : { color: "#E2A24B", roughness: 0.45, metalness: 0.04 };
  const darkerSkinProps = skinMap
    ? { map: skinMap, roughness: 0.55, metalness: 0.03, color: "#D9A25E" }
    : { color: "#C97A3D", roughness: 0.55, metalness: 0.03 };

  return (
    <group ref={groupRef} {...props}>
      {/* --- Cuerpo / pechuga --- */}
      <mesh position={[0, 0.08, 0]} scale={[1, 0.92, 1.08]} castShadow receiveShadow>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial {...skinProps} />
      </mesh>
      {/* Bulto de la pechuga (mas volumen al frente) */}
      <mesh position={[0, 0.18, 0.55]} scale={[0.78, 0.6, 0.55]} castShadow>
        <sphereGeometry args={[0.85, 32, 32]} />
        <meshStandardMaterial {...skinProps} />
      </mesh>

      {/* --- Muslos (thigh) --- */}
      <mesh position={[-0.62, -0.62, 0.05]} rotation={[0.15, 0, 0.55]} castShadow>
        <capsuleGeometry args={[0.3, 0.5, 8, 16]} />
        <meshStandardMaterial {...darkerSkinProps} />
      </mesh>
      <mesh position={[0.62, -0.62, 0.05]} rotation={[0.15, 0, -0.55]} castShadow>
        <capsuleGeometry args={[0.3, 0.5, 8, 16]} />
        <meshStandardMaterial {...darkerSkinProps} />
      </mesh>

      {/* --- Piernas (drumstick), mas delgadas, apuntando hacia atras/arriba como pollo trussed --- */}
      <mesh position={[-0.98, -0.98, -0.35]} rotation={[0.9, 0, 0.35]} castShadow>
        <capsuleGeometry args={[0.16, 0.55, 8, 16]} />
        <meshStandardMaterial {...darkerSkinProps} />
      </mesh>
      <mesh position={[0.98, -0.98, -0.35]} rotation={[0.9, 0, -0.35]} castShadow>
        <capsuleGeometry args={[0.16, 0.55, 8, 16]} />
        <meshStandardMaterial {...darkerSkinProps} />
      </mesh>

      {/* --- Patas / puntas oscuras (efecto "carbonizado") --- */}
      <mesh position={[-1.12, -1.32, -0.62]} rotation={[0.9, 0, 0.35]}>
        <coneGeometry args={[0.09, 0.22, 10]} />
        <meshStandardMaterial color="#3A2416" roughness={0.7} />
      </mesh>
      <mesh position={[1.12, -1.32, -0.62]} rotation={[0.9, 0, -0.35]}>
        <coneGeometry args={[0.09, 0.22, 10]} />
        <meshStandardMaterial color="#3A2416" roughness={0.7} />
      </mesh>

      {/* --- Alas, pegadas a los costados --- */}
      <mesh position={[-0.95, 0.05, -0.1]} rotation={[0.2, 0.3, 0.25]} castShadow>
        <capsuleGeometry args={[0.16, 0.42, 6, 12]} />
        <meshStandardMaterial {...skinProps} />
      </mesh>
      <mesh position={[0.95, 0.05, -0.1]} rotation={[0.2, -0.3, -0.25]} castShadow>
        <capsuleGeometry args={[0.16, 0.42, 6, 12]} />
        <meshStandardMaterial {...skinProps} />
      </mesh>

      {/* --- Eje del asador (espiga metalica que atraviesa el pollo) --- */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 3.6, 16]} />
        <meshStandardMaterial color="#2A2A2A" metalness={0.85} roughness={0.25} />
      </mesh>
    </group>
  );
}
