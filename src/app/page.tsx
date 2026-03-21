import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { HeroVideo } from '@/components/hero/HeroVideo';
import { HeroContent } from '@/components/hero/HeroContent';
import { AboutSection } from '@/components/sections/AboutSection';
import { UseCasesSection } from '@/components/sections/UseCasesSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { StorySection } from '@/components/sections/StorySection';
import { FaqSection } from '@/components/sections/FaqSection';
import { BookingSection } from '@/components/sections/BookingSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <main id="top" className="overflow-x-hidden">
      <section className="relative video-safe min-h-screen">
        <HeroVideo />
        <Navbar />
        <HeroContent />
      </section>
      <AboutSection />
      <UseCasesSection />
      <FeaturesSection />
      <GallerySection />
      <StorySection />
      <FaqSection />
      <BookingSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
