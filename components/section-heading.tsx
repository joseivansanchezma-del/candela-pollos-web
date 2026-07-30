"use client";

import { motion } from "framer-motion";

export function SectionHeading({
  eyebrow,
  title,
  description,
  light,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto max-w-2xl text-center"
    >
      <span
        className={`mb-3 inline-block rounded-full px-4 py-1 text-xs font-display font-semibold uppercase tracking-widest ${
          light
            ? "bg-white/10 text-brand-gold"
            : "bg-brand-orange/10 text-brand-maroon dark:text-brand-gold"
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`font-display text-4xl font-bold sm:text-5xl ${
          light ? "text-white" : "text-brand-ink dark:text-white"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-lg ${
            light ? "text-white/70" : "text-brand-ink/60 dark:text-white/60"
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
