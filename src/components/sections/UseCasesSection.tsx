'use client';

import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCases } from '@/data/use-cases';
import { siteContent } from '@/data/site-content';
import { SectionTitle } from '@/components/ui/SectionTitle';

export function UseCasesSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleContactScroll = useCallback(() => {
    window.dispatchEvent(new Event('prime-contact-audio'));

    const ctaAnchor = document.getElementById('contact-primary-cta-anchor');
    if (!ctaAnchor) return;

    const rect = ctaAnchor.getBoundingClientRect();
    const startY = window.scrollY;

    // Step 1 — fast scroll to bring CTA to center of viewport.
    const centerY = startY + rect.top - window.innerHeight / 2;
    const dist1 = centerY - startY;
    const dur1 = Math.min(1200, Math.max(600, Math.abs(dist1) * 0.8));
    const t0 = performance.now();

    function scrollToCenter(now: number) {
      const t = Math.min((now - t0) / dur1, 1);
      const eased = 1 - (1 - t) ** 3;
      window.scrollTo({ top: startY + dist1 * eased, behavior: 'auto' });

      if (t < 1) {
        requestAnimationFrame(scrollToCenter);
      } else {
        // Step 2 — pause briefly, then slow-scroll CTA to top.
        setTimeout(slowScrollToTop, 300);
      }
    }

    function slowScrollToTop() {
      if (!ctaAnchor) return;
      const rect2 = ctaAnchor.getBoundingClientRect();
      const topPadding = 24;
      const dist2 = rect2.top - topPadding;

      if (Math.abs(dist2) < 5) {
        window.dispatchEvent(new Event('flash-contact-cta'));
        return;
      }

      const scrollStart2 = window.scrollY;
      const dur2 = Math.min(2200, Math.max(900, Math.abs(dist2) * 2.5));
      const t1 = performance.now();

      function animate(now: number) {
        const t = Math.min((now - t1) / dur2, 1);
        const eased = 1 - (1 - t) ** 3;
        window.scrollTo({ top: scrollStart2 + dist2 * eased, behavior: 'auto' });

        if (t < 1) {
          requestAnimationFrame(animate);
        } else {
          window.dispatchEvent(new Event('flash-contact-cta'));
        }
      }

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(scrollToCenter);
  }, []);

  return (
    <section id="evenimente" className="py-8 sm:py-10 lg:py-12">
      <div className="section-shell space-y-6">
        <SectionTitle
          kicker="Tipuri de evenimente"
          title="Un spațiu. Zeci de scenarii."
          text={siteContent.useCasesText}
        />
        <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
          {useCases.map((item) => {
            const Icon = item.icon;
            const isOpen = expanded === item.title;
            return (
              <article key={item.title} onClick={() => setExpanded(isOpen ? null : item.title)} className={`card-soft border-gradient flex cursor-pointer flex-col overflow-hidden p-4 sm:aspect-auto sm:cursor-default sm:p-7 ${isOpen ? '' : 'aspect-square'}`}>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f4ede4] text-bronze sm:h-14 sm:w-14">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="mt-4 font-didot text-[1.12rem] leading-tight tracking-[0.03em] text-gold sm:mt-5 sm:text-[1.9rem] sm:tracking-[0.04em]">
                  {item.title}
                </h3>
                <p className="mt-1 text-[0.75rem] leading-4 text-inksoft sm:mt-3 sm:text-[1.45rem] sm:leading-9">
                  {item.description}
                </p>
                <AnimatePresence>
                  {isOpen && (
                    <motion.p
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden text-[0.75rem] leading-4 text-espresso/70 sm:text-[1.4rem] sm:leading-9"
                    >
                      {item.details}
                    </motion.p>
                  )}
                </AnimatePresence>
                <button
                  onClick={() => setExpanded(isOpen ? null : item.title)}
                  className="mt-4 w-fit text-[10px] uppercase tracking-[0.18em] text-bronze transition-colors hover:text-espresso sm:mt-5 sm:text-[11px] sm:tracking-[0.22em]"
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
          <p className="mx-auto mt-4 max-w-xl text-[1.08rem] leading-8 text-inksoft sm:text-[1.55rem] sm:leading-9">
            {siteContent.storyText}
          </p>
          <motion.button
            type="button"
            onClick={handleContactScroll}
            aria-label="Mergi la contact"
            className="mx-auto mt-4 hidden h-12 w-12 cursor-pointer items-center justify-center rounded-full text-[26px] leading-none text-bronze transition hover:text-gold active:scale-95 sm:flex"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↓
          </motion.button>
        </div>
      </div>
    </section>
  );
}
