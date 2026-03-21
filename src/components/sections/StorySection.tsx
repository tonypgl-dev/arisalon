import Image from 'next/image';
import { siteContent } from '@/data/site-content';

export function StorySection() {
  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <div className="section-shell grid gap-6 lg:grid-cols-[1fr,1fr] lg:items-center">
        <div className="overflow-hidden rounded-[32px] shadow-float order-2 lg:order-1">
          <Image
            src="/images/gallery/gallery-05.jpeg"
            alt="Fotolii elegante în Salon Aristocratic"
            width={1200}
            height={1600}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="card-soft border-gradient order-1 p-7 sm:p-9 lg:order-2 lg:p-12">
          <p className="section-kicker">Atmosferă</p>
          <h2 className="mt-4 font-didot text-[2rem] uppercase leading-[1.02] tracking-[0.08em] text-espresso sm:text-[2.75rem]">
            {siteContent.storyTitle}
          </h2>
          <p className="mt-5 body-copy max-w-xl">{siteContent.storyText}</p>
          <div className="mt-8 rounded-[24px] bg-[#f5efe7] p-5 text-sm leading-7 text-inksoft">
            Ideal pentru gazde, creatori și branduri care vor un spațiu cu prezență vizuală reală, nu doar un decor generic.
          </div>
        </div>
      </div>
    </section>
  );
}
