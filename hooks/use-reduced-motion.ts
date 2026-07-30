"use client";

import * as React from "react";

/**
 * Devuelve true si el usuario prefiere menos movimiento (accesibilidad,
 * WCAG 2.2 AA) o si el dispositivo parece de gama baja (pocos nucleos de
 * CPU). En ambos casos, las escenas cinematograficas pesadas (GSAP scrub,
 * canvas 3D) deben desactivarse o simplificarse.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const lowEndDevice =
      typeof navigator !== "undefined" &&
      "hardwareConcurrency" in navigator &&
      navigator.hardwareConcurrency > 0 &&
      navigator.hardwareConcurrency <= 3;

    const update = () => setReduced(mq.matches || lowEndDevice);
    update();

    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
