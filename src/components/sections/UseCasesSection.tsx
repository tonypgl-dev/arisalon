'use client';

import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCases } from '@/data/use-cases';
import { siteContent } from '@/data/site-content';
import { SectionTitle } from '@/components/ui/SectionTitle';

export function UseCasesSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleContactScroll = useCallback(() => {
    // Prime audio so the browser allows playback later.
    window.dispatchEvent(new Event('prime-contact-audio'));

    const ctaAnchor = document.getElementById('contact-primary-cta-anchor');
    if (!ctaAnchor) return;

    // Step 1 — quick smooth-scroll to bring CTA roughly into view (centered).
    ctaAnchor.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Step 2 — wait for the native smooth-scroll to settle.
    let lastY = -1;
    let stableFrames = 0;

    function waitThenSlowScroll() {
      const y = window.scrollY;
      if (y === lastY) {
        stableFrames++;
      } else {
        stableFrames = 0;
        lastY = y;
      }

      // Wait ~250ms of no movement before starting slow scroll.
      if (stableFrames < 15) {
        requestAnimationFrame(waitThenSlowScroll);
        return;
      }

      // Step 3 — slow scroll until CTA sits near the top of the viewport.
      if (!ctaAnchor) return;
      const rect = ctaAnchor.getBoundingClientRect();
      const topPadding = 24;
      const distance = rect.top - topPadding;

      if (Math.abs(distance) < 5) {
        window.dispatchEvent(new Event('flash-contact-cta'));
        return;
      }

      const scrollStart = window.scrollY;
      const duration = Math.min(2200, Math.max(900, Math.abs(distance) * 2.5));
      const t0 = performance.now();

      function animate(now: number) {
        const t = Math.min((now - t0) / duration, 1);
        const eased = 1 - (1 - t) ** 3; // easeOutCubic
        window.scrollTo({ top: scrollStart + distance * eased, behavior: 'auto' });

        if (t < 1) {
          requestAnimationFrame(animate);
        } else {
          // Step 4 — CTA is at the top ➜ flash + sound.
          window.dispatchEvent(new Event('flash-contact-cta'));
        }
      }

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(waitThenSlowScroll);
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
              <article key={item.title} className="card-soft border-gradient flex flex-col p-4 sm:p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f4ede4] text-bronze sm:h-14 sm:w-14">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="mt-4 font-didot text-[1.12rem] leading-tight tracking-[0.03em] text-gold sm:mt-5 sm:text-[1.45rem] sm:tracking-[0.04em]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.95rem] leading-6 text-inksoft sm:mt-3 sm:text-[1.12rem] sm:leading-8">
                  {item.description}
                </p>
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
          <p className="mx-auto mt-4 max-w-xl text-[1.08rem] leading-8 text-inksoft sm:text-[1.18rem]">
            {siteContent.storyText}
          </p>
          <motion.button
            type="button"
            onClick={handleContactScroll}
            aria-label="Mergi la contact"
            className="mx-auto mt-4 block text-[22px] leading-none text-bronze transition hover:text-gold"
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
