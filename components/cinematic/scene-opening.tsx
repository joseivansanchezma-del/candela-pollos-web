"use client";

import * as React from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { siteConfig } from "@/lib/data";

/**
 * Escena 00 -- apertura: pantalla negra, una brasa diminuta que crece, y
 * el nombre de la marca revelandose letra por letra (split manual, sin
 * el plugin de pago SplitText de GSAP -- ver nota en el README).
 */
export function SceneOpening() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const emberRef = React.useRef<HTMLSpanElement>(null);
  const lettersRef = React.useRef<HTMLSpanElement[]>([]);
  const reducedMotion = useReducedMotion();

  const letters = siteConfig.name.split("");

  React.useEffect(() => {
    if (reducedMotion) return;
    let ctx: any;

    import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
      if (!sectionRef.current) return;
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=100%",
            scrub: 0.5,
            pin: true,
          },
        });

        tl.fromTo(
          emberRef.current,
          { scale: 0.2, opacity: 0.4 },
          { scale: 14, opacity: 1, ease: "power2.out", duration: 1 }
        ).fromTo(
          lettersRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, stagger: 0.04, ease: "power2.out", duration: 0.6 },
          "-=0.4"
        );
      }, sectionRef);
    });

    return () => ctx?.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full items-center justify-center bg-black"
    >
      <span
        ref={emberRef}
        className="absolute h-2 w-2 rounded-full bg-brand-orange shadow-[0_0_40px_20px_rgba(255,107,53,0.6)]"
      />
      <div className="relative z-10 flex flex-col items-center gap-4 text-center">
        <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-widest text-white">
          {letters.map((letter, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) lettersRef.current[i] = el;
              }}
              className="inline-block"
            >
              {letter === " " ? " " : letter}
            </span>
          ))}
        </h1>
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">
          Desliza para comenzar
        </p>
      </div>
    </section>
  );
}
