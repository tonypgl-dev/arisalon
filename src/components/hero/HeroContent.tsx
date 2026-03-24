'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { siteContent } from '@/data/site-content';

export function HeroContent() {
  return (
    <div className="absolute inset-0 z-10 flex items-center pt-16">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="text-white"
        >
          <h1 className="font-cormorant text-[3rem] italic leading-[1.05] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] sm:text-[4rem] lg:text-[4.5rem] xl:text-[5.5rem]">
            {siteContent.heroTitle}
          </h1>
          <p className="mt-4 text-[11px] uppercase tracking-[0.32em] text-white">{siteContent.heroEyebrow}</p>
          <div className="mt-8 flex flex-nowrap items-center gap-3">
            <Button href="#rezervare" className="rounded-[20px] border border-bronze/40 bg-taupe px-4 py-2 text-[11px] text-espresso hover:bg-sand hover:text-espresso">
              {siteContent.heroPrimaryCta}
            </Button>
            <Button href="#galerie" variant="ghost" className="rounded-[20px] border border-bronze/40 bg-taupe px-4 py-2 text-[11px] text-espresso hover:bg-sand hover:text-espresso">
              {siteContent.heroSecondaryCta}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


