"use client";

import { Flame, Instagram, Facebook, MapPin, Phone, Clock, Mail } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { whatsappLink } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="bg-brand-ink py-16 text-white/80">
      <div className="container">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-flame-gradient">
                <Flame className="h-5 w-5" />
              </span>
              {siteConfig.name}
            </a>
            <p className="mt-4 max-w-xs text-sm text-white/60">{siteConfig.description}</p>
            <div className="mt-5 flex gap-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={whatsappLink(`Hola ${siteConfig.name}!`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                aria-label="WhatsApp"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-brand-gold">
              Navegacion
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="#menu" className="hover:text-white">Menu</a></li>
              <li><a href="#promociones" className="hover:text-white">Promociones</a></li>
              <li><a href="#galeria" className="hover:text-white">Galeria</a></li>
              <li><a href="#faq" className="hover:text-white">Preguntas frecuentes</a></li>
            </ul>
          </div>

          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-brand-gold">
              Contacto
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-none" /> {siteConfig.address}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-none" /> {siteConfig.phoneDisplay}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-none" /> {siteConfig.email}
              </li>
            </ul>
          </div>

          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-brand-gold">
              Horario
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              {siteConfig.hours.map((h) => (
                <li key={h.day} className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 flex-none" />
                  <span>
                    {h.day}
                    <br />
                    <span className="text-white/50">{h.time}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/70">Politica de privacidad</a>
            <a href="#" className="hover:text-white/70">Terminos y condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
