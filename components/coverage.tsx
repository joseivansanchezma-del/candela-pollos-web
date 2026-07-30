"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Truck } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { coverageZones, siteConfig } from "@/lib/data";

export function Coverage() {
  return (
    <section id="cobertura" className="bg-brand-cream py-24 dark:bg-black/40 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Cobertura"
          title="Llegamos calientes a tu barrio"
          description={`Domicilios en ${siteConfig.city} y alrededores.`}
        />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden rounded-3xl shadow-soft"
          >
            <iframe
              title="Mapa de cobertura Candela Pollos"
              src={siteConfig.mapsEmbedUrl}
              className="h-[360px] w-full border-0 sm:h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Card className="p-8">
              <div className="mb-6 flex items-center gap-3 text-brand-orange">
                <Truck className="h-5 w-5" />
                <p className="font-display text-sm font-semibold uppercase tracking-wide">
                  Zonas de entrega
                </p>
              </div>
              <div className="divide-y divide-brand-ink/5 dark:divide-white/10">
                {coverageZones.map((z) => (
                  <div key={z.neighborhood} className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-brand-ink/40 dark:text-white/40" />
                      <span className="font-medium text-brand-ink dark:text-white">
                        {z.neighborhood}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-brand-ink/60 dark:text-white/60">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" /> {z.time}
                      </span>
                      <span className="font-display font-semibold text-brand-maroon dark:text-brand-gold">
                        {z.fee}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
