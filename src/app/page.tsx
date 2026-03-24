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
      <section className="relative flex flex-col overflow-hidden lg:h-screen lg:flex-row">
        <Navbar />
        <div className="relative h-[60vh] w-full lg:h-auto lg:w-[60%]">
          <HeroVideo />
          <HeroContent />
        </div>
        <div className="hidden bg-espresso lg:block lg:w-[40%]" />
      </section>
      <AboutSection />
      <GallerySection />
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
