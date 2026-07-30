"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export { gsap, ScrollTrigger };

let registered = false;

/**
 * Registra el plugin ScrollTrigger una sola vez en el cliente. Se debe
 * llamar dentro de un useEffect (nunca en el render del servidor).
 */
export function registerGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}
