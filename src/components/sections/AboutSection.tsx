'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { siteContent } from '@/data/site-content';

export function AboutSection() {
  const [open, setOpen] = useState(false);

  return (
    <section id="despre" className="pt-4 pb-8 sm:pt-5 sm:pb-10 lg:pt-6 lg:pb-12">
      <div className="section-shell grid gap-6 lg:grid-cols-[1.25fr,0.75fr] lg:items-center">
        <div className="space-y-5 p-4 sm:p-5 lg:p-6">
          <p className="section-kicker text-center">{siteContent.aboutKicker}</p>
          <p className="body-copy text-center">
            {siteContent.aboutText}
          </p>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
                className="space-y-3 overflow-hidden"
              >
                <p className="text-[15px] leading-8 text-inksoft sm:text-base">
                  Este un spațiu care a supraviețuit timpului pentru a onora momentele tale speciale. Un loc în care poți organiza:
                </p>
                <ul className="space-y-1 text-[15px] leading-8 text-inksoft sm:text-base">
                  <li>- cină în doi</li>
                  <li>- lansare de produs</li>
                  <li>- ședințe foto</li>
                  <li>- evenimente restrânse</li>
                  <li>- sau un moment care nu are încă un nume</li>
                </ul>
                <p className="text-[15px] leading-8 text-inksoft sm:text-base">
                  Totul, fără presiunea standardelor rigide.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setOpen((v) => !v)}
            className="mx-auto block text-center text-[11px] uppercase tracking-[0.22em] text-bronze transition-colors hover:text-espresso"
          >
            {open ? 'AFLĂ MAI PUȚINE' : 'AFLĂ MAI MULTE'}
          </button>

          <p className="text-center font-didot text-[1.35rem] italic leading-snug text-gold sm:text-[1.6rem]">
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

