import Image from 'next/image';
import { siteContent } from '@/data/site-content';

export function StorySection() {
  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <div className="section-shell grid gap-6 lg:grid-cols-[1fr,1fr] lg:items-center">
        <div className="overflow-hidden rounded-xl shadow-float order-2 lg:order-1">
          <Image
            src="/images/gallery/gallery-05.jpeg"
            alt="Fotolii elegante în Salon Aristocratic"
            width={1200}
            height={1600}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="card-soft border-gradient order-1 p-7 sm:p-9 lg:order-2 lg:p-12 space-y-6">
          <p className="section-kicker">Filosofie</p>
          <h2 className="font-didot text-[2rem] leading-[1.05] tracking-[0.04em] text-gold sm:text-[2.75rem]">
            {siteContent.storyTitle}
          </h2>
          <p className="body-copy max-w-xl">{siteContent.storyText}</p>
          <blockquote className="rounded-xl bg-[#f5efe7] p-5 sm:p-6">
            <p className="font-didot text-[1.15rem] italic leading-relaxed text-espresso">
              „{siteContent.testimonialText}"
            </p>
            <footer className="mt-3 text-[11px] uppercase tracking-[0.22em] text-bronze">
              — {siteContent.testimonialAuthor}
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
