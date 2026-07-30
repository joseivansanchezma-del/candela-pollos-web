"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { menuItems, type MenuCategory, siteConfig } from "@/lib/data";
import { cn, formatCOP, whatsappLink } from "@/lib/utils";

const categories: { id: MenuCategory | "todos"; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "pollos", label: "Pollos" },
  { id: "alitas", label: "Alitas" },
  { id: "combos", label: "Combos" },
  { id: "acompanantes", label: "Acompanantes" },
  { id: "bebidas", label: "Bebidas" },
];

export function MenuSection() {
  const [active, setActive] = React.useState<MenuCategory | "todos">("todos");
  const [query, setQuery] = React.useState("");

  const filtered = menuItems.filter((it) => {
    const matchesCategory = active === "todos" || it.category === active;
    const matchesQuery = it.name.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="menu" className="bg-white py-24 dark:bg-brand-ink sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Nuestro menu"
          title="Preparado a diario, con receta tradicional"
          description="Del carbon a tu mesa. Elige tu porcion favorita y pide en un clic por WhatsApp."
        />

        <div className="mt-12 flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-display font-semibold transition-all",
                  active === cat.id
                    ? "bg-flame-gradient text-white shadow-glow"
                    : "bg-brand-ink/5 text-brand-ink/70 hover:bg-brand-ink/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-ink/40 dark:text-white/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar en el menu..."
              className="w-full rounded-full border border-brand-ink/10 bg-brand-ink/5 py-2.5 pl-11 pr-4 text-sm outline-none ring-brand-orange transition focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </div>
        </div>

        <motion.div
          layout
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                whileHover={{ y: -6 }}
              >
                <Card className="group overflow-hidden p-0">
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {product.tag && (
                      <Badge
                        variant={product.tag}
                        className="absolute left-4 top-4 shadow-md"
                      >
                        {product.tag === "mas-vendido"
                          ? "Mas vendido"
                          : product.tag === "recomendado"
                          ? "Recomendado"
                          : "Nuevo"}
                      </Badge>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-lg font-bold text-brand-ink dark:text-white">
                        {product.name}
                      </h3>
                      <p className="whitespace-nowrap font-display text-lg font-bold text-brand-orange">
                        {formatCOP(product.price)}
                      </p>
                    </div>
                    <p className="mt-2 text-sm text-brand-ink/60 dark:text-white/60">
                      {product.description}
                    </p>
                    <Button
                      variant="whatsapp"
                      size="sm"
                      className="mt-5 w-full"
                      onClick={() =>
                        window.open(
                          whatsappLink(
                            `Hola ${siteConfig.name}, quiero pedir: ${product.name}`
                          ),
                          "_blank"
                        )
                      }
                    >
                      <MessageCircle className="h-4 w-4" /> Pedir por WhatsApp
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
