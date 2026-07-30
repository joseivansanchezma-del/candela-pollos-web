"use client";

import * as React from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  strength?: number;
}

/**
 * Boton con "hover magnetico": se desplaza levemente hacia el cursor
 * cuando el mouse esta cerca, y vuelve a su posicion con resorte al salir.
 * Se desactiva si el usuario prefiere menos movimiento.
 */
export function MagneticButton({
  children,
  className,
  strength = 0.35,
  ...props
}: MagneticButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out will-change-transform ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
