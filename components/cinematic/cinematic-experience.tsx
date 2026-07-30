"use client";

import { SceneOpening } from "./scene-opening";
import { SceneFire } from "./scene-fire";
import { SceneChicken3D } from "./scene-chicken-3d";
import { SceneSmoke } from "./scene-smoke";
import { SceneIngredients } from "./scene-ingredients";
import { SceneCooking } from "./scene-cooking";
import { SceneResult } from "./scene-result";
import { SceneCustomer } from "./scene-customer";
import { SceneFamily } from "./scene-family";
import { CtaTransition } from "./cta-transition";

/**
 * El "prologo inmersivo": recorrido cinematografico controlado por scroll
 * (escenas 1-9 del storyboard, ver 07_Storyboard_y_Prompts_IA). Se ubica
 * entre el Hero y el Menu -- ver app/page.tsx.
 */
export function CinematicExperience() {
  return (
    <div className="relative bg-[#0d0906]">
      <SceneOpening />
      <SceneFire />
      <SceneChicken3D />
      <SceneSmoke />
      <SceneIngredients />
      <SceneCooking />
      <SceneResult />
      <SceneCustomer />
      <SceneFamily />
      <CtaTransition />
    </div>
  );
}
