"use client";

import Image from "next/image";
import { CinematicScene } from "./cinematic-scene";

/**
 * Escena 02 del recorrido cinematografico: antes usaba un modelo 3D hecho
 * con geometria primitiva (esferas/capsulas) que, sin un escaneo 3D real
 * o un asset comprado, terminaba pareciendo un maniqui en vez de un pollo.
 * Se reemplazo por una fotografia real con el mismo efecto de zoom/parallax
 * que el resto de las escenas (ver cinematic-scene.tsx), lo que ademas
 * elimina del bundle todo el motor 3D (three.js + @react-three/fiber +
 * postprocessing), una de las mayores causas de carga lenta del sitio.
 */
export function SceneChicken3D() {
  return (
    <CinematicScene
      id="escena-pollo"
      eyebrow="Escena 02"
      title="Marinado 24 horas. Asado al carbon. Sin prisa."
      description="Cada pollo se marina un dia entero y se asa lento sobre brasas reales, hasta lograr ese dorado crocante que lo distingue."
      background={
        <Image
          src="/images/hero-pollo.jpg"
          alt="Pollo entero asado al carbon"
          fill
          className="object-cover"
          sizes="100vw"
        />
      }
    />
  );
}
