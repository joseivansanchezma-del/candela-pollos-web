"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import Image from "next/image";

const ChickenScene = dynamic(
  () => import("@/components/three/chicken-scene").then((m) => m.ChickenScene),
  { ssr: false }
);

/**
 * Escena 02 del recorrido cinematografico: el pollo girando en 3D. Se
 * reemplaza por una imagen estatica si el usuario prefiere menos
 * movimiento o el dispositivo es de gama baja (ver useReducedMotion).
 */
export function SceneChicken3D() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const progress = React.useRef(0);
  const reducedMotion = useReducedMotion();

  React.useEffect(() => {
    if (reducedMotion) return;
    let ctx: any;

    import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
      if (!sectionRef.current) return;
      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            progress.current = self.progress;
          },
        });
      }, sectionRef);
    });

    return () => ctx?.revert();
  }, [reducedMotion]);

  return (
    <section
      id="escena-pollo-3d"
      ref={sectionRef}
      style={{ minHeight: "200vh" }}
      className="relative flex items-center justify-center bg-[#0d0906]"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {reducedMotion ? (
          <Image
            src="/images/hero-pollo.jpg"
            alt="Pollo girando en el asador"
            fill
            className="object-cover opacity-80"
            sizes="100vw"
          />
        ) : (
          <ChickenScene progress={progress} className="absolute inset-0 h-full w-full" />
        )}

        <div className="pointer-events-none absolute inset-0 flex flex-col items-start justify-center px-6 sm:px-12 lg:px-24">
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-display font-semibold uppercase tracking-widest text-brand-gold">
            Escena 02
          </span>
          <h3 className="max-w-md font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
            Marinado 24 horas. Asado al carbon. Sin prisa.
          </h3>
        </div>
      </div>
    </section>
  );
}
