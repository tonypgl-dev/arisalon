'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { siteContent } from '@/data/site-content';

export function StorySection() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const items = siteContent.testimonials;
  const touchStartX = useRef(0);

  function go(next: number) {
    setDir(next > index ? 1 : -1);
    setIndex(next);
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) < 40) return;
    if (diff > 0) {
      go((index + 1) % items.length);
    } else {
      go((index - 1 + items.length) % items.length);
    }
  }

  return (
    <section className="py-8 sm:py-10 lg:py-12">
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
        <div className="card-soft border-gradient order-1 p-7 sm:p-9 lg:order-2 lg:p-12">
          <div className="flex items-center justify-between">
            <p className="section-kicker">Testimoniale</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => go((index - 1 + items.length) % items.length)}
                aria-label="Anterior"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-bronze transition hover:border-bronze hover:text-espresso"
              >
                ‹
              </button>
              <button
                onClick={() => go((index + 1) % items.length)}
                aria-label="Următor"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-bronze transition hover:border-bronze hover:text-espresso"
              >
                ›
              </button>
            </div>
          </div>

          <div className="mt-6 overflow-hidden" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl bg-[#f5efe7] p-5 sm:p-6"
              >
                <p className="font-didot text-[1.5rem] italic leading-relaxed text-espresso">
                  „{items[index].text}"
                </p>
                <footer className="mt-3 text-[14px] uppercase tracking-[0.22em] text-bronze">
                  — {items[index].author}
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <p className="mt-4 text-right text-[11px] text-bronze/60">
            {index + 1} / {items.length}
          </p>
        </div>
      </div>
    </section>
  );
}
