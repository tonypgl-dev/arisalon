import Image from 'next/image';
import { siteContent } from '@/data/site-content';
import { SectionTitle } from '@/components/ui/SectionTitle';

export function FeaturesSection() {
  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <div className="section-shell grid gap-6 lg:grid-cols-[0.92fr,1.08fr] lg:items-start">
        <div className="p-6 sm:p-8 lg:sticky lg:top-6">
          <SectionTitle kicker="Avantaje" title={siteContent.featuresTitle} text={siteContent.featuresText} />
        </div>
        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            {siteContent.highlights.map((item) => (
              <div key={item.title} className="card-soft border-gradient p-6">
                <h3 className="font-didot text-[1.35rem] tracking-[0.04em] text-gold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-inksoft">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="overflow-hidden rounded-2xl shadow-float">
            <Image
              src="/images/gallery/gallery-06.jpeg"
              alt="Salon Aristocratic amenajat pentru întâlniri"
              width={1600}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
