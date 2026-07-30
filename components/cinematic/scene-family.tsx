"use client";

import Image from "next/image";
import { CinematicScene } from "./cinematic-scene";

export function SceneFamily() {
  return (
    <CinematicScene
      id="escena-familia"
      eyebrow="Escena 08"
      title="El sabor que reune a la familia."
      description="Al final, de eso se trata todo."
      align="right"
      background={
        <Image
          src="/images/scene-family.jpg"
          alt="Familia compartiendo la mesa"
          fill
          className="object-cover"
          sizes="100vw"
        />
      }
    />
  );
}
