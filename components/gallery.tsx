"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const images = [
  { src: "/images/gallery-1.jpg", alt: "Pollo asandose al carbon", span: "row-span-2" },
  { src: "/images/gallery-2.jpg", alt: "Preparacion en cocina", span: "" },
  { src: "/images/gallery-3.jpg", alt: "Combo familiar servido", span: "" },
  { src: "/images/gallery-4.jpg", alt: "Detalle de la brasa", span: "" },
  { src: "/images/gallery-5.jpg", alt: "Interior del local", span: "row-span-2" },
  { src: "/images/gallery-6.jpg", alt: "Empaque para domicilio", span: "" },
];

export function Gallery() {
  const [selected, setSelected] = React.useState<string | null>(null);

  return (
    <section id="galeria" className="bg-brand-cream py-24 dark:bg-black/40 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Galeria"
          title="Cada detalle, a fuego lento"
          description="Un vistazo a nuestra cocina, nuestro carbon y nuestros combos."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 [grid-auto-rows:180px]">
          {images.map((img, idx) => (
            <motion.button
              key={img.src}
              onClick={() => setSelected(img.src)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              whileHover={{ scale: 1.02 }}
              className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-6"
          >
            <button
              className="absolute right-6 top-6 text-white"
              onClick={() => setSelected(null)}
              aria-label="Cerrar"
            >
              <X className="h-8 w-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative h-[70vh] w-full max-w-3xl"
            >
              <Image src={selected} alt="Vista ampliada" fill className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
