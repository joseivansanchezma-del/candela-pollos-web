"use client";

import * as React from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Cursor personalizado que sigue al mouse con inercia (lerp) y se agranda
 * sobre elementos interactivos. Solo se activa en dispositivos con mouse
 * (pointer: fine) y si el usuario no prefiere menos movimiento.
 */
export function CustomCursor() {
  const dotRef = React.useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    setEnabled(hasFinePointer && !reducedMotion);
  }, [reducedMotion]);

  React.useEffect(() => {
    if (!enabled) return;

    let mouseX = 0;
    let mouseY = 0;
    let curX = 0;
    let curY = 0;
    let raf: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onOverInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor='hover']");
      if (dotRef.current) {
        dotRef.current.style.transform += interactive ? "" : "";
        dotRef.current.style.width = interactive ? "56px" : "22px";
        dotRef.current.style.height = interactive ? "56px" : "22px";
      }
    };

    function loop() {
      curX += (mouseX - curX) * 0.18;
      curY += (mouseY - curY) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.left = `${curX}px`;
        dotRef.current.style.top = `${curY}px`;
      }
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onOverInteractive);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onOverInteractive);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed left-0 top-0 z-[100] h-[22px] w-[22px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-orange/70 bg-brand-orange/20 mix-blend-difference transition-[width,height] duration-200 ease-out"
      aria-hidden="true"
    />
  );
}
