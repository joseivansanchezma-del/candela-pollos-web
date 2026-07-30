export type MenuCategory =
  | "pollos"
  | "alitas"
  | "combos"
  | "bebidas"
  | "acompanantes"
  | "promociones";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: MenuCategory;
  tag?: "recomendado" | "mas-vendido" | "nuevo";
}

export const siteConfig = {
  name: "Candela Pollos",
  tagline: "El sabor que reune a la familia.",
  description:
    "Asadero de pollos al carbon en Copacabana, Antioquia. Pollo fresco, receta tradicional y entrega rapida a domicilio.",
  city: "Copacabana, Antioquia",
  address: "CL 48 N 50A-105 LC, Copacabana, Antioquia",
  phoneDisplay: "+57 300 123 4567",
  phoneWhatsapp: "573001234567",
  email: "hola@candelapollos.co",
  hours: [
    { day: "Lunes a viernes", time: "11:00 a.m. - 9:00 p.m." },
    { day: "Sabados", time: "11:00 a.m. - 10:00 p.m." },
    { day: "Domingos y festivos", time: "11:00 a.m. - 9:00 p.m." },
  ],
  social: {
    instagram: "https://instagram.com/candelapollos",
    facebook: "https://facebook.com/candelapollos",
    tiktok: "https://tiktok.com/@candelapollos",
  },
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Copacabana+Antioquia&output=embed",
};

export const menuItems: MenuItem[] = [
  // Pollo por porcion
  {
    id: "cuarto-pollo",
    name: "Cuarto de pollo",
    description: "1 presa (pierna-pernil o pechuga), marinada 24 horas y asada al carbon.",
    price: 17900,
    image: "/images/menu-cuarto-pollo.jpg",
    category: "pollos",
  },
  {
    id: "medio-pollo",
    name: "Medio pollo a la brasa",
    description: "2 presas grandes, jugosas y doradas al carbon.",
    price: 31900,
    image: "/images/menu-medio-pollo.jpg",
    category: "pollos",
    tag: "recomendado",
  },
  {
    id: "pollo-entero",
    name: "Pollo entero a la brasa",
    description:
      "4 presas, marinado 24 horas y asado lentamente al carbon. Ideal para compartir.",
    price: 54900,
    image: "/images/menu-pollo-entero.jpg",
    category: "pollos",
    tag: "mas-vendido",
  },

  // Alitas
  {
    id: "alitas-x6",
    name: "Alitas x6",
    description: "Banadas en salsa a eleccion: BBQ, picante o miel-mostaza.",
    price: 19900,
    image: "/images/menu-alitas.jpg",
    category: "alitas",
  },
  {
    id: "alitas-x12",
    name: "Alitas x12",
    description: "Ideal para compartir, con la salsa que prefieras.",
    price: 36900,
    image: "/images/menu-alitas.jpg",
    category: "alitas",
    tag: "recomendado",
  },

  // Combos personales
  {
    id: "combo-personal-clasico",
    name: "Combo Personal Clasico",
    description: "1/4 de pollo + 1 acompanante a eleccion + gaseosa personal.",
    price: 25900,
    image: "/images/menu-combo-personal.jpg",
    category: "combos",
    tag: "mas-vendido",
  },
  {
    id: "combo-doble-presa",
    name: "Combo Doble Presa",
    description: "2 presas + 1 acompanante + gaseosa personal.",
    price: 32900,
    image: "/images/menu-combo-personal.jpg",
    category: "combos",
  },
  {
    id: "combo-alitas-personal",
    name: "Combo Alitas Personal",
    description: "6 alitas + papas en fosforo + gaseosa personal.",
    price: 27900,
    image: "/images/menu-alitas.jpg",
    category: "combos",
  },
  {
    id: "combo-infantil",
    name: "Combo Infantil",
    description: "2 presas pequenas + papas + jugo + sorpresa.",
    price: 16900,
    image: "/images/menu-combo-infantil.jpg",
    category: "combos",
    tag: "nuevo",
  },

  // Combos familiares
  {
    id: "combo-familiar-3-4",
    name: "Combo Familiar x3-4",
    description: "Medio pollo doble (2 medios) + 2 acompanantes + gaseosa 1.5L.",
    price: 69900,
    image: "/images/menu-combo-familiar.jpg",
    category: "combos",
  },
  {
    id: "combo-familiar-5-6",
    name: "Combo Familiar x5-6",
    description: "Pollo entero + 3 acompanantes + gaseosa 1.5L.",
    price: 84900,
    image: "/images/menu-combo-familiar.jpg",
    category: "combos",
    tag: "recomendado",
  },
  {
    id: "combo-pareja",
    name: "Combo Pareja",
    description: "Medio pollo + medio pollo + 2 acompanantes + 2 gaseosas personales.",
    price: 59900,
    image: "/images/menu-combo-pareja.jpg",
    category: "combos",
  },
  {
    id: "combo-fiesta",
    name: "Combo Fiesta x8-10",
    description: "2 pollos enteros + 4 acompanantes + gaseosa 3L. Para reuniones grandes.",
    price: 149900,
    image: "/images/menu-combo-fiesta.jpg",
    category: "combos",
  },

  // Acompanamientos a la carta
  {
    id: "papas-fosforo",
    name: "Papas en fosforo",
    description: "Papa fresca pelada y cortada en fosforo, fritas al momento y con sal justa.",
    price: 8000,
    image: "/images/menu-papas-francesa.jpg",
    category: "acompanantes",
  },
  {
    id: "arroz-blanco",
    name: "Arroz blanco",
    description: "Arroz blanco preparado a diario, en su punto.",
    price: 6000,
    image: "/images/menu-papas.jpg",
    category: "acompanantes",
  },
  {
    id: "ensalada",
    name: "Ensalada",
    description: "Repollo y zanahoria fresca rallados, cremosa, estilo clasico de pollo asado.",
    price: 7000,
    image: "/images/menu-ensalada.jpg",
    category: "acompanantes",
  },
  {
    id: "arepa",
    name: "Arepa",
    description: "Arepa asada en plancha, receta casera.",
    price: 3500,
    image: "/images/menu-papas.jpg",
    category: "acompanantes",
  },
  {
    id: "yuca-frita",
    name: "Yuca frita",
    description: "Yuca fresca, cocida y frita hasta quedar crocante.",
    price: 8000,
    image: "/images/menu-yuca-frita.jpg",
    category: "acompanantes",
  },
  {
    id: "platano-maduro",
    name: "Platano maduro cocido",
    description: "Platano maduro cocido, dulce y suave, el acompanante clasico del pollo asado.",
    price: 6000,
    image: "/images/menu-platano-maduro.jpg",
    category: "acompanantes",
    tag: "nuevo",
  },

  // Bebidas
  {
    id: "gaseosa-personal",
    name: "Gaseosa personal 400ml",
    description: "Bien fria, para acompanar tu combo.",
    price: 4000,
    image: "/images/menu-bebida.jpg",
    category: "bebidas",
  },
  {
    id: "gaseosa-familiar-15",
    name: "Gaseosa familiar 1.5L",
    description: "Para compartir en familia.",
    price: 9000,
    image: "/images/menu-bebida.jpg",
    category: "bebidas",
  },
  {
    id: "gaseosa-familiar-3l",
    name: "Gaseosa familiar 3L",
    description: "Ideal para reuniones y combos grandes.",
    price: 14000,
    image: "/images/menu-bebida.jpg",
    category: "bebidas",
  },
  {
    id: "jugo-natural",
    name: "Jugo natural",
    description: "Mora, lulo o maracuya, preparado al momento.",
    price: 6500,
    image: "/images/menu-bebida.jpg",
    category: "bebidas",
  },
  {
    id: "limonada-coco",
    name: "Limonada de coco",
    description: "Limonada cremosa con leche de coco, bien fria.",
    price: 8000,
    image: "/images/menu-bebida.jpg",
    category: "bebidas",
  },
];

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Marcela Restrepo",
    role: "Cliente frecuente",
    quote:
      "El pollo mas jugoso que he probado en Copacabana. El sabor a carbon se siente de verdad.",
    rating: 5,
    initials: "MR",
  },
  {
    id: "t2",
    name: "Andres Gomez",
    role: "Domicilio semanal",
    quote:
      "Pido cada viernes para la oficina. Llega caliente y a tiempo, siempre.",
    rating: 5,
    initials: "AG",
  },
  {
    id: "t3",
    name: "Familia Zapata",
    role: "Cliente familiar",
    quote:
      "El combo familiar rinde muchisimo y a los ninos les encanta. Nuestro domingo de siempre.",
    rating: 5,
    initials: "FZ",
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "En cuanto tiempo llega mi domicilio?",
    answer:
      "El tiempo promedio de entrega en Copacabana es de 25 a 35 minutos, dependiendo del sector y la hora del dia.",
  },
  {
    question: "Hacen pedidos para eventos o empresas?",
    answer:
      "Si, manejamos combos especiales para reuniones familiares, oficinas y eventos. Escribenos por WhatsApp con la cantidad de personas y te armamos una cotizacion.",
  },
  {
    question: "Puedo pagar con tarjeta?",
    answer:
      "Aceptamos efectivo, transferencia y datafono contra entrega. Proximamente habilitaremos pago en linea desde la pagina.",
  },
  {
    question: "Cual es el costo del domicilio?",
    answer:
      "El domicilio tiene un costo fijo segun el barrio (ver seccion de cobertura). Para pedidos superiores a $80.000 el domicilio es gratis dentro de Copacabana.",
  },
  {
    question: "El pollo es preparado el mismo dia?",
    answer:
      "Si. Marinamos y asamos el pollo a diario, sin congelados. Si se agota el pollo del dia, cerramos la cocina antes de la hora habitual.",
  },
];

export interface CoverageZone {
  neighborhood: string;
  time: string;
  fee: string;
}

export const coverageZones: CoverageZone[] = [
  { neighborhood: "Centro de Copacabana", time: "15-20 min", fee: "Gratis" },
  { neighborhood: "El Cabildo / La Vega", time: "20-25 min", fee: "$4.000" },
  { neighborhood: "El Convento / San Juan", time: "25-30 min", fee: "$5.000" },
  { neighborhood: "Vegas de la Maria", time: "30-35 min", fee: "$6.000" },
];

export const stats = [
  { label: "Clientes satisfechos", value: "5.000+" },
  { label: "Anos de tradicion familiar", value: "10+" },
  { label: "Calificacion promedio", value: "4.9/5" },
  { label: "Tiempo promedio de entrega", value: "28 min" },
];
