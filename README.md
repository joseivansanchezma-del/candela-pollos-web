# Candela Pollos — Sitio web premium + experiencia cinematografica

Sitio de una sola pagina (landing) construido con Next.js 14 (App Router), TypeScript,
Tailwind CSS, Framer Motion, GSAP + ScrollTrigger, Lenis (smooth scroll) y
React Three Fiber (escena 3D), pensado para un asadero de pollos al carbon en
Copacabana, Antioquia.

Incluye un recorrido cinematografico controlado por scroll (Hero → 9 escenas
narrativas: apertura, fuego, pollo girando en 3D, humo, ingredientes, coccion,
resultado, cliente, familia, CTA) antes de llegar al sitio funcional (menu,
promociones, galeria, testimonios, etc.). Ver el storyboard completo en
`../07_Storyboard_y_Prompts_IA/Storyboard_Cinematografico.md`.

## Como ejecutarlo en tu computador

Requisitos: Node.js 18.18 o superior.

```bash
npm install
npm run dev
```

Abre http://localhost:3000

Para produccion:

```bash
npm run build
npm run start
```

## Antes de publicar — checklist obligatorio

1. **Numero de WhatsApp real**: reemplaza `573001234567` en `lib/utils.ts`
   (funcion `whatsappLink`) y en `lib/data.ts` (`siteConfig.phoneWhatsapp`).
2. **Fotografia real**: todas las imagenes en `public/images/` son
   placeholders de marca (gradientes con los colores de Candela Pollos), NO
   son fotografia gastronomica real. Reemplazalas por fotos profesionales del
   pollo, el local y los combos, manteniendo los mismos nombres de archivo o
   actualizando las rutas en `lib/data.ts` y en cada componente.
3. **Datos del negocio**: direccion, horario, redes sociales y mapa de
   Google Maps estan en `lib/data.ts` (`siteConfig`). Actualiza el
   `mapsEmbedUrl` con la ubicacion exacta del local.
4. **Dominio real**: cambia `https://www.candelapollos.co` en
   `app/layout.tsx`, `app/sitemap.ts` y `app/robots.ts` por el dominio final.
5. **Precios y menu**: `menuItems` en `lib/data.ts` ya refleja el menu completo
   definido en `../10_Menu_Candela_Pollos.md` (pollo por porcion, alitas,
   4 combos personales, 4 combos familiares, 7 acompanamientos y 5 bebidas).
   Ajusta precios solo cuando se validen los costos reales de insumos con
   proveedores (ver `../09_Recetas_y_Operaciones/`).
6. **Fotos/videos de las escenas cinematograficas**: `public/images/scene-*.jpg`
   tambien son placeholders de marca. Usa los prompts en
   `../07_Storyboard_y_Prompts_IA/Prompts_Imagenes_IA.md` y
   `Prompts_Video_IA.md` para generarlos con Midjourney/GPT Image/Veo/Runway.
7. **Modelo 3D del pollo**: `components/three/chicken-model.tsx` usa geometria
   primitiva estilizada (placeholder intencional). Ver
   `../07_Storyboard_y_Prompts_IA/Modelo_3D_Pollo.md` para reemplazarlo por un
   modelo `.glb` real.

## Estructura del proyecto

```
app/
  layout.tsx        Fuentes, metadata SEO, JSON-LD Schema.org Restaurant
  page.tsx           Ensambla todas las secciones de la landing
  globals.css         Variables de tema (claro/oscuro) y estilos base
  sitemap.ts          Sitemap dinamico
  robots.ts           robots.txt dinamico
components/
  navbar.tsx           Navbar transparente que cambia al hacer scroll
  hero.tsx              Seccion hero a pantalla completa con humo animado
  menu-section.tsx      Menu filtrable con buscador y pedido por WhatsApp
  promotions.tsx         Banner de promocion con cuenta regresiva
  gallery.tsx             Galeria tipo grid con lightbox
  testimonials.tsx        Testimonios y estadisticas
  why-us.tsx                Razones para elegir el negocio
  how-to-order.tsx           Pasos para pedir
  coverage.tsx                 Mapa y zonas de domicilio
  faq.tsx                       Preguntas frecuentes (acordeon)
  footer.tsx                     Pie de pagina con contacto y horario
  whatsapp-float.tsx              Boton flotante de WhatsApp
  theme-toggle.tsx / theme-provider.tsx   Modo claro/oscuro
  ui/                                       Button, Badge, Card (estilo shadcn)
lib/
  data.ts     Todo el contenido: menu, testimonios, FAQ, cobertura, config
  utils.ts     Helpers: formato de moneda COP, link de WhatsApp, cn()
  cinematic/       Las 9 escenas del recorrido narrativo (ver storyboard)
    cinematic-experience.tsx  Ensambla las escenas en orden
    cinematic-scene.tsx        Motor generico reutilizable (sticky + GSAP scrub)
    scene-opening.tsx            Escena 00: apertura en negro, letra por letra
    scene-fire.tsx / scene-smoke.tsx / scene-ingredients.tsx / etc.
    scene-chicken-3d.tsx           Escena 02: monta el canvas de Three.js
    cta-transition.tsx              Escena 09: transicion a fondo claro + CTA
  three/
    chicken-scene.tsx    Canvas R3F, luces, camara ligada al scroll, bloom
    chicken-model.tsx     Geometria del pollo (placeholder, ver punto 7 abajo)
  interaction/
    custom-cursor.tsx      Cursor personalizado con inercia
    magnetic-button.tsx     Boton con hover magnetico
    grain-overlay.tsx        Textura de grano/noise sutil sobre todo el sitio
  providers/
    smooth-scroll-provider.tsx  Lenis + sincronizacion con GSAP ScrollTrigger
hooks/
  use-reduced-motion.ts   Detecta prefers-reduced-motion y dispositivos de gama baja
public/images/  Imagenes (placeholders de marca — ver puntos 2 y 6 arriba)
```

## Notas tecnicas

- **Modo oscuro/claro**: automatico segun el sistema operativo, con boton
  manual en el navbar (usa `next-themes`).
- **Animaciones**: Framer Motion en cada seccion (fade, slide, scale, reveal
  al hacer scroll, hover elegante, microinteracciones en botones).
- **SEO**: metadata completa (title, description, Open Graph, Twitter Cards),
  JSON-LD de tipo `Restaurant`, `sitemap.xml` y `robots.txt` generados
  automaticamente por Next.js.
- **Rendimiento**: `next/image` con `sizes` correctos, fuentes optimizadas con
  `next/font`, code splitting automatico de Next.js. Para Lighthouse >95,
  ademas de este codigo, es indispensable comprimir bien las fotos reales que
  reemplacen los placeholders (WebP/AVIF, menos de ~200kb cada una).

- **Escena 3D (`chicken-scene.tsx`)**: usa React Three Fiber + postprocessing
  (bloom). Se desactiva automaticamente (se reemplaza por una imagen estatica)
  si el usuario tiene `prefers-reduced-motion` activo o si el dispositivo
  parece de gama baja (`navigator.hardwareConcurrency <= 3`), para proteger
  Core Web Vitals en moviles economicos.
- **Scroll cinematografico**: Lenis (smooth scroll) + GSAP ScrollTrigger con
  `scrub` (no `pin` salvo en la escena de apertura), para que el efecto de
  parallax/zoom siga exactamente la posicion del scroll sin depender de
  temporizadores. Se desactiva por completo con `prefers-reduced-motion`.
- **Accesibilidad (WCAG 2.2 AA)**: `hooks/use-reduced-motion.ts` +
  regla CSS global en `globals.css` como red de seguridad adicional; el sitio
  sigue siendo 100% navegable (contenido visible, enlaces funcionales) con
  animaciones desactivadas.

## Notas honestas sobre el alcance 3D/cinematografico

- El "modelo 3D del pollo" es geometria primitiva estilizada (pechuga, muslos,
  piernas, alas y patas armados con esferas/capsulas/conos), no un escaneo
  fotorrealista. Para que no se vea "de videojuego generico" se le agrego una
  textura procedural generada en canvas (piel dorada con manchas de tostado
  y brillos de grasa, sin depender de ninguna imagen externa) y una cama de
  brasas con parpadeo sutil + rejilla de parrilla insinuada debajo, para dar
  contexto visual de asador real. Sigue siendo una decision de diseño
  deliberada (formas simples + luz cuidada), y la unica opcion realista sin
  un artista 3D o un asset comprado. Ver `07_Storyboard_y_Prompts_IA/Modelo_3D_Pollo.md`
  para como reemplazarlo por un modelo `.glb` real cuando se consiga uno.
- No se incluyen efectos de profundidad de campo, motion blur ni ambient
  occlusion (si se pidieron en el brief) para mantener el codigo verificable
  y el rendimiento movil bajo control; el bloom (brillo de las brasas) si esta
  implementado. Se pueden agregar despues con `@react-three/postprocessing`
  si las pruebas de rendimiento en dispositivos reales lo permiten.
- La vista previa estatica en `06_Vista_Previa_Web` (para abrir con doble
  clic) muestra la version "premium" original, sin el recorrido
  cinematografico ni la escena 3D — esas dependen de GSAP/Lenis/Three.js
  reales y solo funcionan dentro de este proyecto Next.js.

## Limitacion de este entorno

Este proyecto fue generado en un entorno sin acceso al registro de npm, por lo
que el codigo no pudo compilarse/ejecutarse aqui para verificacion automatica.
En su lugar, cada archivo `.ts`/`.tsx` fue verificado con `tsx` (transpilacion
esbuild) para confirmar que la sintaxis es valida — 44 archivos, 0 errores de
sintaxis (los unicos "errores" que arroja esa verificacion son de modulos no
instalados, esperado sin `node_modules`). El codigo esta escrito a mano
siguiendo las convenciones oficiales de Next.js 14 / App Router, React Three
Fiber y GSAP. Ejecuta `npm install && npm run dev` en tu computador (con
internet) para levantarlo; si aparece algun error de compilacion o de tipos,
compartelo y lo corregimos.
