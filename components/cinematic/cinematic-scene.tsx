"use client";

import * as React from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface CinematicSceneProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  background: React.ReactNode;
  align?: "left" | "center" | "right";
  dark?: boolean;
  heightVh?: number;
  children?: React.ReactNode;
}

/**
 * Motor reutilizable de las escenas cinematograficas: fondo de escena
 * "sticky" mientras se hace scroll dentro de la seccion, con el texto
 * animandose con GSAP ScrollTrigger (scrub) segun el progreso. Si el
 * usuario prefiere menos movimiento, se muestra estatico sin scrub.
 */
export function CinematicScene({
  id,
  eyebrow,
  title,
  description,
  background,
  align = "left",
  dark = true,
  heightVh = 180,
  children,
}: CinematicSceneProps) {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const textRef = React.useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  React.useEffect(() => {
    if (reducedMotion) return;
    let ctx: any;

    import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
      if (!sectionRef.current || !textRef.current) return;
      ctx = gsap.context(() => {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 60, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "top 30%",
              scrub: 0.6,
            },
          }
        );

        gsap.to(sectionRef.current?.querySelector(".scene-bg") ?? sectionRef.current, {
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }, sectionRef);
    });

    return () => ctx?.revert();
  }, [reducedMotion]);

  const alignClass =
    align === "center"
      ? "items-center text-center"
      : align === "right"
      ? "items-end text-right"
      : "items-start text-left";

  return (
    <section
      id={id}
      ref={sectionRef}
      style={{ minHeight: `${heightVh}vh` }}
      className="relative flex items-center justify-center overflow-hidden"
    >
      <div className="scene-bg sticky top-0 h-screen w-full">
        <div className="absolute inset-0">{background}</div>
        <div
          className={`absolute inset-0 ${
            dark ? "bg-black/45" : "bg-white/10"
          }`}
        />

        <div
          className={`relative z-10 flex h-full w-full flex-col justify-center gap-4 px-6 sm:px-12 lg:px-24 ${alignClass}`}
        >
          <div ref={textRef} className="max-w-xl">
            <span
              className={`mb-4 inline-block rounded-full px-4 py-1 text-xs font-display font-semibold uppercase tracking-widest ${
                dark ? "bg-white/10 text-brand-gold" : "bg-black/10 text-brand-maroon"
              }`}
            >
              {eyebrow}
            </span>
            <h3
              className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight ${
                dark ? "text-white" : "text-brand-ink"
              }`}
            >
              {title}
            </h3>
            {description && (
              <p className={`mt-4 text-base sm:text-lg ${dark ? "text-white/70" : "text-brand-ink/70"}`}>
                {description}
              </p>
            )}
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
