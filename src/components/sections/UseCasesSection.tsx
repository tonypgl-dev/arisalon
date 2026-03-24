'use client';

import { useCallback } from 'react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCases } from '@/data/use-cases';
import { siteContent } from '@/data/site-content';
import { SectionTitle } from '@/components/ui/SectionTitle';

export function UseCasesSection() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const handleContactScroll = useCallback(() => {
    const target = document.getElementById('contact');
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.dispatchEvent(new Event('flash-contact-cta'));
  }, []);

  return (
    <section id="evenimente" className="py-8 sm:py-10 lg:py-12">
      <div className="section-shell space-y-6">
        <SectionTitle
          kicker="Tipuri de evenimente"
          title="Un spațiu. Zeci de scenarii."
          text={siteContent.useCasesText}
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {useCases.map((item) => {
            const Icon = item.icon;
            const isOpen = expanded === item.title;
            return (
              <article key={item.title} className="card-soft border-gradient flex flex-col p-6 sm:p-7">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f4ede4] text-bronze">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-didot text-[1.45rem] tracking-[0.04em] text-gold">{item.title}</h3>
                <p className="mt-3 text-[1.05rem] leading-8 text-inksoft sm:text-[1.12rem]">{item.description}</p>
                <AnimatePresence>
                  {isOpen && (
                    <motion.p
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden text-[1.02rem] leading-8 text-espresso/70 sm:text-[1.08rem]"
                    >
                      {item.details}
                    </motion.p>
                  )}
                </AnimatePresence>
                <button
                  onClick={() => setExpanded(isOpen ? null : item.title)}
                  className="mt-5 w-fit text-[11px] uppercase tracking-[0.22em] text-bronze transition-colors hover:text-espresso"
                >
                  {isOpen ? 'Restrânge ↑' : 'Detalii ↓'}
                </button>
              </article>
            );
          })}
        </div>

        <div className="py-6 text-center sm:py-10">
          <h2 className="font-didot text-[1.9rem] tracking-[0.04em] text-gold sm:text-[2.5rem]">
            {siteContent.storyTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[1.08rem] leading-8 text-inksoft sm:text-[1.18rem]">
            {siteContent.storyText}
          </p>
          <button
            type="button"
            onClick={handleContactScroll}
            aria-label="Mergi la contact"
            className="mx-auto mt-4 block text-[22px] leading-none text-bronze transition hover:text-gold"
          >
            ↓
          </button>
        </div>
      </div>
    </section>
  );
}
