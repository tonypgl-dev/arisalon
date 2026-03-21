import Image from 'next/image';
import { siteContent } from '@/data/site-content';
import { SectionTitle } from '@/components/ui/SectionTitle';

export function AboutSection() {
  return (
    <section id="despre" className="py-20 sm:py-24 lg:py-28">
      <div className="section-shell grid gap-6 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
        <div className="card-soft border-gradient p-6 sm:p-8 lg:p-10">
          <SectionTitle kicker={siteContent.aboutKicker} title={siteContent.aboutTitle} text={siteContent.aboutText} />
        </div>
        <div className="overflow-hidden rounded-[32px] shadow-float">
          <Image
            src="/images/gallery/gallery-04.png"
            alt="Salon Aristocratic interior"
            width={1400}
            height={1050}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="section-shell mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {siteContent.featureItems.map((item) => (
          <div key={item} className="card-soft border-gradient p-5 text-sm leading-7 text-inksoft">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
