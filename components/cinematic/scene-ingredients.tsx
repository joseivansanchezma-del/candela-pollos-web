"use client";

import Image from "next/image";
import { CinematicScene } from "./cinematic-scene";

const ingredients = ["Ajo fresco", "Limon", "Sal en grano", "Hierbas", "Especias", "Pimienta"];

export function SceneIngredients() {
  return (
    <CinematicScene
      id="escena-ingredientes"
      eyebrow="Escena 04"
      title="Ingredientes reales, marinados 24 horas."
      description="Nada de atajos: cada pollo se marina un dia entero antes de tocar el carbon."
      background={
        <Image
          src="/images/scene-ingredients.jpg"
          alt="Ingredientes frescos"
          fill
          className="object-cover"
          sizes="100vw"
        />
      }
    >
      <div className="mt-6 flex flex-wrap gap-2">
        {ingredients.map((ing) => (
          <span
            key={ing}
            className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-md"
          >
            {ing}
          </span>
        ))}
      </div>
    </CinematicScene>
  );
}
