"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, ChefHat, ShoppingBag } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { MagneticButton } from "@/components/interaction/magnetic-button";
import { siteConfig } from "@/lib/data";
import { whatsappLink, cn } from "@/lib/utils";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden bg-brand-ink"
    >
      <Image
        src="/images/hero-pollo.jpg"
        alt="Pollo asandose lentamente al carbon en Candela Pollos"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-hero-scrim" />

      {/* Smoke particles */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="absolute bottom-10 block h-24 w-24 rounded-full bg-white/10 blur-2xl animate-smoke"
            style={{
              left: `${15 + i * 14}%`,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container relative z-10 flex flex-col items-center pt-20 text-center"
      >
        <motion.span
          variants={item}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md"
        >
          <ChefHat className="h-4 w-4 text-brand-gold" />
          Asado a la brasa, receta tradicional
        </motion.span>

        <motion.h1
          variants={item}
          className="max-w-4xl text-balance font-display text-5xl font-bold leading-[1.05] text-white sm:text-6xl md:text-7xl"
        >
          El sabor que reune{" "}
          <span className="bg-gradient-to-r from-brand-gold via-brand-orange to-brand-red bg-clip-text text-transparent">
            a la familia
          </span>
          .
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-lg text-white/80 md:text-xl"
        >
          Pollo fresco marinado 24 horas y asado lentamente al carbon, en{" "}
          {siteConfig.city}. Pide en linea y recibelo caliente en minutos.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-col gap-4 sm:flex-row">
          <MagneticButton
            className={cn(buttonVariants({ size: "lg" }))}
            onClick={() =>
              window.open(whatsappLink(`Hola ${siteConfig.name}, quiero pedir!`), "_blank")
            }
          >
            <span className="text-xl">🍗</span> Pedir ahora
          </MagneticButton>
          <Button variant="secondary" size="lg"
            onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
          >
            <ShoppingBag className="h-5 w-5" /> Ver menu
          </Button>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-16 flex items-center gap-8 text-white/70"
        >
          <div className="text-center">
            <p className="font-display text-2xl font-bold text-white">5.000+</p>
            <p className="text-xs uppercase tracking-wide">Clientes felices</p>
          </div>
          <div className="h-8 w-px bg-white/20" />
          <div className="text-center">
            <p className="font-display text-2xl font-bold text-white">4.9/5</p>
            <p className="text-xs uppercase tracking-wide">Calificacion</p>
          </div>
          <div className="h-8 w-px bg-white/20" />
          <div className="text-center">
            <p className="font-display text-2xl font-bold text-white">28 min</p>
            <p className="text-xs uppercase tracking-wide">Entrega promedio</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/70"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <ChevronDown className="h-7 w-7" />
        </motion.div>
      </motion.div>
    </section>
  );
}
