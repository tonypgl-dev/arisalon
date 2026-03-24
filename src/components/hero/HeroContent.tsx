'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { siteContent } from '@/data/site-content';

export function HeroContent() {
  return (
    <div className="relative z-10 flex min-h-screen items-center pb-[100px] pt-0">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="max-w-3xl text-white md:max-w-5xl"
        >
          <p className="text-[11px] uppercase tracking-[0.32em] text-white/65">{siteContent.heroEyebrow}</p>
          <h1 className="mt-4 font-cormorant text-[3.4rem] italic leading-[1.05] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] sm:text-[5rem] md:text-[7rem]">
            {siteContent.heroTitle}
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-7 text-white/75 sm:text-base">
            {siteContent.heroText}
          </p>
          <div className="mt-8 flex flex-nowrap items-center gap-3">
            <Button href="#rezervare" className="border border-white/80 bg-transparent text-white hover:bg-white hover:text-espresso">
              {siteContent.heroPrimaryCta}
            </Button>
            <Button href="#galerie" variant="ghost" className="text-white/80 hover:text-white">
              {siteContent.heroSecondaryCta}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
