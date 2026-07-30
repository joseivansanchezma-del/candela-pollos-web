"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { faqItems } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-24 dark:bg-brand-ink sm:py-32">
      <div className="container">
        <SectionHeading eyebrow="Preguntas frecuentes" title="Resolvemos tus dudas" />

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-brand-ink/10 dark:divide-white/10">
          {faqItems.map((faqItem, idx) => {
            const isOpen = open === idx;
            return (
              <div key={faqItem.question} className="py-2">
                <button
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-base font-semibold text-brand-ink dark:text-white sm:text-lg">
                    {faqItem.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "flex h-9 w-9 flex-none items-center justify-center rounded-full",
                      isOpen
                        ? "bg-flame-gradient text-white"
                        : "bg-brand-ink/5 text-brand-ink dark:bg-white/10 dark:text-white"
                    )}
                  >
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 text-brand-ink/60 dark:text-white/60">
                        {faqItem.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
