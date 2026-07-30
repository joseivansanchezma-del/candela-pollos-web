"use client";

/**
 * Textura de grano/noise muy sutil sobre toda la experiencia, para evitar
 * el aspecto "demasiado plano" de una plantilla generica. Opacidad baja a
 * proposito (3-4%) para no afectar legibilidad ni accesibilidad.
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] opacity-[0.035] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}
