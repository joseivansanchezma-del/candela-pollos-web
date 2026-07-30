"use client";

import Image from "next/image";
import { CinematicScene } from "./cinematic-scene";

export function SceneCustomer() {
  return (
    <CinematicScene
      id="escena-cliente"
      eyebrow="Escena 07"
      title="El primer bocado, siempre vale la pena."
      background={
        <Image
          src="/images/scene-customer.jpg"
          alt="Cliente disfrutando su pedido"
          fill
          className="object-cover"
          sizes="100vw"
        />
      }
    />
  );
}
