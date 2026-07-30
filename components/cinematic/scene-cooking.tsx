"use client";

import Image from "next/image";
import { CinematicScene } from "./cinematic-scene";

export function SceneCooking() {
  return (
    <CinematicScene
      id="escena-coccion"
      eyebrow="Escena 05"
      title="Fuego lento. Tiempo real."
      description="Ni microondas, ni horno industrial: rotacion constante sobre brasa viva hasta el punto exacto."
      align="right"
      background={
        <Image
          src="/images/scene-cooking.jpg"
          alt="Coccion sobre brasas"
          fill
          className="object-cover"
          sizes="100vw"
        />
      }
    />
  );
}
