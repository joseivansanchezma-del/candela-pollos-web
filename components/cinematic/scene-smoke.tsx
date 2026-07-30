"use client";

import Image from "next/image";
import { CinematicScene } from "./cinematic-scene";

export function SceneSmoke() {
  return (
    <CinematicScene
      id="escena-humo"
      eyebrow="Escena 03"
      title="El humo que anuncia lo que viene."
      description="Un aroma que se reconoce a una cuadra de distancia."
      align="right"
      background={
        <Image
          src="/images/scene-smoke.jpg"
          alt="Humo elevandose"
          fill
          className="object-cover"
          sizes="100vw"
        />
      }
    />
  );
}
