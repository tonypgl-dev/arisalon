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
      <section className="flex flex-col overflow-hidden lg:h-screen lg:flex-row">
        <div className="relative flex min-h-[60vh] flex-col bg-espresso lg:min-h-0 lg:w-1/2">
          <Navbar />
          <HeroContent />
        </div>
        <div className="relative h-[40vh] lg:h-auto lg:w-1/2">
          <HeroVideo />
        </div>
      </section>
      <GallerySection />
      <AboutSection />
      <UseCasesSection />
      <FeaturesSection />
      <StorySection />
      <FaqSection />
      <BookingSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
