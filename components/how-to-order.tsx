"use client";

import { motion } from "framer-motion";
import { MousePointerClick, MessageSquareText, PackageCheck, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const steps = [
  { icon: MousePointerClick, title: "Selecciona tu producto", desc: "Elige del menu lo que se te antoje." },
  { icon: MessageSquareText, title: "Escribe por WhatsApp", desc: "Confirma tu pedido y direccion en segundos." },
  { icon: PackageCheck, title: "Recibe tu pedido", desc: "Tu pollo llega caliente y a tiempo." },
];

export function HowToOrder() {
  return (
    <section className="bg-white py-24 dark:bg-brand-ink sm:py-32">
      <div className="container">
        <SectionHeading eyebrow="Como pedir" title="Pedir es tan facil como 1, 2, 3" />

        <div className="mt-16 grid grid-cols-1 items-start gap-8 sm:grid-cols-3">
          {steps.map((s, idx) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="relative flex flex-col items-center text-center"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-flame-gradient text-white shadow-glow">
                <s.icon className="h-9 w-9" />
              </span>
              <span className="mt-4 font-display text-sm font-bold uppercase tracking-widest text-brand-orange">
                Paso {idx + 1}
              </span>
              <h3 className="mt-1 font-display text-xl font-bold text-brand-ink dark:text-white">
                {s.title}
              </h3>
              <p className="mt-2 max-w-[220px] text-sm text-brand-ink/60 dark:text-white/60">
                {s.desc}
              </p>

              {idx < steps.length - 1 && (
                <ArrowRight className="absolute -right-4 top-8 hidden h-6 w-6 text-brand-orange/40 sm:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
