'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { siteContent } from '@/data/site-content';

export function AboutSection() {
  const [open, setOpen] = useState(false);

  return (
    <section id="despre" className="pt-4 pb-8 sm:pt-5 sm:pb-10 lg:pt-6 lg:pb-12">
      <div className="section-shell grid gap-6 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
        <div className="p-6 sm:p-8 lg:p-10 space-y-5">
          <p className="section-kicker text-center">{siteContent.aboutKicker}</p>
          <p className="text-[15px] leading-8 text-inksoft sm:text-base text-center">
            {siteContent.aboutText}
          </p>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden space-y-3"
              >
                <p className="text-[15px] leading-8 text-inksoft sm:text-base">
                  Este un spațiu care a supraviețuit timpului pentru a onora momentele tale speciale. Un loc în care poți organiza:
                </p>
                <ul className="space-y-1 text-[15px] leading-8 text-inksoft sm:text-base">
                  <li>– cină în doi</li>
                  <li>– lansare de produs</li>
                  <li>– ședințe foto</li>
                  <li>– evenimente restrânse</li>
                  <li>– sau un moment care nu are încă un nume</li>
                </ul>
                <p className="text-[15px] leading-8 text-inksoft sm:text-base">
                  Totul, fără presiunea standardelor rigide.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setOpen((v) => !v)}
            className="text-[11px] uppercase tracking-[0.22em] text-bronze transition-colors hover:text-espresso"
          >
            {open ? 'Restrânge ↑' : 'Descoperă povestea locului ↓'}
          </button>

          <p className="font-didot text-[1.35rem] italic leading-snug text-gold sm:text-[1.6rem] text-center">
            Nu este doar un salon de evenimente, nici un studio clasic. Este spațiul dintre ele.
          </p>
        </div>
        <div className="overflow-hidden rounded-xl shadow-float">
          <Image
            src="/images/gallery/gallery-04.png"
            alt="Salon Aristocratic interior"
            width={1400}
            height={1050}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
