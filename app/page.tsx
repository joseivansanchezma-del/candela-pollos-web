import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { CinematicExperience } from "@/components/cinematic/cinematic-experience";
import { MenuSection } from "@/components/menu-section";
import { Promotions } from "@/components/promotions";
import { Gallery } from "@/components/gallery";
import { Testimonials } from "@/components/testimonials";
import { WhyUs } from "@/components/why-us";
import { HowToOrder } from "@/components/how-to-order";
import { Coverage } from "@/components/coverage";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <CinematicExperience />
      <MenuSection />
      <Promotions />
      <Gallery />
      <Testimonials />
      <WhyUs />
      <HowToOrder />
      <Coverage />
      <Faq />
      <Footer />
    </main>
  );
}
