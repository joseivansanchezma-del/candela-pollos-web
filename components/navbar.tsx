"use client";

import * as React from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { whatsappLink } from "@/lib/utils";
import { siteConfig } from "@/lib/data";

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#promociones", label: "Promociones" },
  { href: "#galeria", label: "Galeria" },
  { href: "#nosotros", label: "Por que elegirnos" },
  { href: "#cobertura", label: "Cobertura" },
  { href: "#faq", label: "Preguntas" },
];

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 shadow-[0_1px_0_0_rgba(0,0,0,0.06)] backdrop-blur-xl dark:bg-brand-ink/80"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-20 items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold">
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-full bg-flame-gradient text-white transition-transform group-hover:rotate-12`}
          >
            <Flame className="h-5 w-5" />
          </span>
          <span className={scrolled ? "text-brand-ink dark:text-white" : "text-white"}>
            {siteConfig.name}
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-brand-orange ${
                scrolled ? "text-brand-ink/80 dark:text-white/80" : "text-white/90"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Button size="md" onClick={() => window.open(whatsappLink(`Hola ${siteConfig.name}, quiero pedir!`), "_blank")}>
            Pedir ahora
          </Button>
        </div>

        <button
          className={`lg:hidden ${scrolled ? "text-brand-ink dark:text-white" : "text-white"}`}
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
        >
          <Menu className="h-7 w-7" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brand-ink/95 backdrop-blur-xl lg:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="ml-auto flex h-full w-4/5 max-w-sm flex-col gap-2 bg-brand-ink p-8"
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar menu"
                className="mb-8 ml-auto text-white"
              >
                <X className="h-7 w-7" />
              </button>
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-4 text-lg font-display font-semibold text-white/90 hover:bg-white/10"
                >
                  {link.label}
                </a>
              ))}
              <Button
                className="mt-6"
                size="lg"
                onClick={() => window.open(whatsappLink(`Hola ${siteConfig.name}, quiero pedir!`), "_blank")}
              >
                Pedir ahora
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
