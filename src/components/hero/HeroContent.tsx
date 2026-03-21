'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { siteContent } from '@/data/site-content';

export function HeroContent() {
  return (
    <div className="relative z-10 flex min-h-screen items-end pb-8 pt-28 sm:pb-10 sm:pt-32">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="max-w-3xl rounded-[32px] border border-white/30 bg-white/14 p-6 text-white shadow-float backdrop-blur-sm sm:p-8 md:max-w-4xl"
        >
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#f3e7d6]">{siteContent.heroEyebrow}</p>
          <h1 className="mt-4 font-didot text-[2.3rem] uppercase leading-[0.95] tracking-[0.08em] sm:text-[3.3rem] md:text-[4.9rem]">
            {siteContent.heroTitle}
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-white/88 sm:text-base">
            {siteContent.heroText}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="#rezervare" className="bg-white text-espresso hover:bg-[#f7f1ea]">
              {siteContent.heroPrimaryCta}
            </Button>
            <Button href="#galerie" variant="secondary" className="border-white/50 bg-white/10 text-white hover:bg-white/20">
              {siteContent.heroSecondaryCta}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
