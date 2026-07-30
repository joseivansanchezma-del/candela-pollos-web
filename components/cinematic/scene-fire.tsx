"use client";

import Image from "next/image";
import { CinematicScene } from "./cinematic-scene";

export function SceneFire() {
  return (
    <CinematicScene
      id="escena-fuego"
      eyebrow="Escena 01"
      title="Todo empieza con el fuego."
      description="Carbon real, encendido lento. Sin atajos, sin gas: la brasa que le da su sabor a cada pollo."
      background={
        <Image
          src="/images/scene-fire.jpg"
          alt="Brasas encendidas"
          fill
          className="object-cover"
          sizes="100vw"
        />
      }
    />
  );
}
