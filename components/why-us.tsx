"use client";

import { motion } from "framer-motion";
import { Flame, Leaf, Clock, Star, ChefHat, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";

const reasons = [
  { icon: Flame, title: "Pollo fresco a diario", desc: "Sin congelados. Marinamos y asamos cada dia." },
  { icon: Leaf, title: "Ingredientes premium", desc: "Seleccionamos proveedores de confianza para cada insumo." },
  { icon: ChefHat, title: "Receta tradicional", desc: "Sazon familiar transmitida por generaciones." },
  { icon: Clock, title: "Entrega rapida", desc: "Domicilios en 25-35 minutos dentro de Copacabana." },
  { icon: Star, title: "Excelente servicio", desc: "Atencion cercana, calida y siempre a tiempo." },
  { icon: ShieldCheck, title: "Preparacion diaria", desc: "Higiene y frescura garantizadas en cada porcion." },
];

export function WhyUs() {
  return (
    <section id="nosotros" className="bg-brand-cream py-24 dark:bg-black/40 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Por que elegirnos"
          title="Calidad que se nota desde el primer bocado"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, idx) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              whileHover={{ y: -6 }}
            >
              <Card className="h-full p-8">
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-flame-gradient text-white shadow-glow">
                  <r.icon className="h-6 w-6" />
                </span>
                <h3 className="font-display text-lg font-bold text-brand-ink dark:text-white">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm text-brand-ink/60 dark:text-white/60">{r.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
