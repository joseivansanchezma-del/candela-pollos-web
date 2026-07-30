"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Timer, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/data";
import { whatsappLink } from "@/lib/utils";

function useCountdown(targetHoursFromNow: number) {
  const [target] = React.useState(() => Date.now() + targetHoursFromNow * 3600 * 1000);
  const [remaining, setRemaining] = React.useState(target - Date.now());

  React.useEffect(() => {
    const id = setInterval(() => {
      setRemaining(Math.max(0, target - Date.now()));
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  const h = Math.floor(remaining / 3600000);
  const m = Math.floor((remaining % 3600000) / 60000);
  const s = Math.floor((remaining % 60000) / 1000);
  return { h, m, s };
}

export function Promotions() {
  const { h, m, s } = useCountdown(30);

  return (
    <section id="promociones" className="relative overflow-hidden bg-brand-ink py-24 sm:py-28">
      <div className="absolute inset-0 bg-flame-gradient opacity-20" />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto flex max-w-4xl flex-col items-center rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl sm:p-14"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-gold/20 px-4 py-1 text-xs font-display font-semibold uppercase tracking-widest text-brand-gold">
            <Timer className="h-4 w-4" /> Promocion por tiempo limitado
          </span>
          <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
            Combo familiar con 15% de descuento
          </h2>
          <p className="mt-4 max-w-xl text-white/70">
            Pollo entero + 4 acompanantes + gaseosa familiar. Valido para pedidos
            hechos hoy por WhatsApp.
          </p>

          <div className="mt-8 flex gap-4 sm:gap-6">
            {[
              { label: "Horas", value: h },
              { label: "Min", value: m },
              { label: "Seg", value: s },
            ].map((t) => (
              <div
                key={t.label}
                className="flex h-20 w-20 flex-col items-center justify-center rounded-2xl bg-white/10 sm:h-24 sm:w-24"
              >
                <span className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {String(t.value).padStart(2, "0")}
                </span>
                <span className="text-xs uppercase tracking-wide text-white/60">
                  {t.label}
                </span>
              </div>
            ))}
          </div>

          <Button
            size="lg"
            className="mt-10"
            onClick={() =>
              window.open(
                whatsappLink(`Hola ${siteConfig.name}, quiero el combo familiar con descuento!`),
                "_blank"
              )
            }
          >
            <MessageCircle className="h-5 w-5" /> Comprar promocion
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
