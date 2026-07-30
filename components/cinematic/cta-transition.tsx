"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";
import { MagneticButton } from "@/components/interaction/magnetic-button";
import { siteConfig } from "@/lib/data";
import { whatsappLink } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function CtaTransition() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  React.useEffect(() => {
    if (reducedMotion) return;
    let ctx: any;

    import("@/lib/gsap").then(({ gsap, ScrollTrigger }) => {
      if (!sectionRef.current) return;
      ctx = gsap.context(() => {
        gsap.fromTo(
          sectionRef.current,
          { backgroundColor: "#0d0906" },
          {
            backgroundColor: "#FFF8ED",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "top center",
              scrub: true,
            },
          }
        );
      }, sectionRef);
    });

    return () => ctx?.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center"
      style={{ backgroundColor: reducedMotion ? "#FFF8ED" : undefined }}
    >
      <span className="inline-block rounded-full bg-brand-orange/10 px-4 py-1 text-xs font-display font-semibold uppercase tracking-widest text-brand-maroon">
        Escena 09
      </span>
      <h2 className="max-w-2xl font-display text-4xl sm:text-5xl font-bold text-brand-ink">
        Ahora te toca a ti probarlo.
      </h2>
      <p className="max-w-md text-brand-ink/70">
        El mismo pollo que acabas de ver, listo para llegar a tu mesa.
      </p>
      <MagneticButton
        onClick={() =>
          window.open(whatsappLink(`Hola ${siteConfig.name}, quiero pedir!`), "_blank")
        }
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-flame-gradient px-8 py-4 font-display text-lg font-semibold text-white shadow-glow"
      >
        <MessageCircle className="h-5 w-5" /> Pedir ahora
      </MagneticButton>
    </section>
  );
}
