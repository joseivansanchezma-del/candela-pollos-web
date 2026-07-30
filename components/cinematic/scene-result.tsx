"use client";

import Image from "next/image";
import { CinematicScene } from "./cinematic-scene";

export function SceneResult() {
  return (
    <CinematicScene
      id="escena-resultado"
      eyebrow="Escena 06"
      title="Piel dorada. Jugo real."
      description="El resultado de no apurar el proceso."
      align="center"
      background={
        <Image
          src="/images/scene-result.jpg"
          alt="Pollo asado terminado"
          fill
          className="object-cover"
          sizes="100vw"
        />
      }
    />
  );
}
