"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { testimonials, stats } from "@/lib/data";

export function Testimonials() {
  return (
    <section className="bg-white py-24 dark:bg-brand-ink sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Testimonios"
          title="Lo que dicen nuestros clientes"
          description="Miles de familias y oficinas ya hacen de Candela Pollos su opcion favorita."
        />

        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="text-center"
            >
              <p className="font-display text-3xl font-bold text-brand-orange sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs text-brand-ink/60 dark:text-white/60 sm:text-sm">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              <Card className="flex h-full flex-col p-8">
                <div className="flex gap-1 text-brand-gold">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-brand-ink/80 dark:text-white/80">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-flame-gradient font-display text-sm font-bold text-white">
                    {t.initials}
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-brand-ink dark:text-white">
                      {t.name}
                    </p>
                    <p className="text-xs text-brand-ink/50 dark:text-white/50">{t.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
