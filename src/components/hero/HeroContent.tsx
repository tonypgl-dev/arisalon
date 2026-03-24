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
          <h1 className="font-cormorant text-[2.4rem] italic leading-[1.05] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] sm:text-[3.2rem] lg:text-[3.6rem] xl:text-[4.4rem]">
            {siteContent.heroTitle}
          </h1>
          <p className="mt-4 text-[11px] uppercase tracking-[0.32em] text-white">{siteContent.heroEyebrow}</p>
          <div className="mt-8 flex flex-nowrap items-center gap-3">
            <Button href="#galerie" variant="ghost" className="rounded-[20px] border-2 border-white bg-transparent px-4 py-2 text-[11px] text-white hover:bg-white hover:text-espresso">
              {siteContent.heroPrimaryCta}
            </Button>
            <Button href="#rezervare" variant="ghost" className="rounded-[20px] border-2 border-white bg-transparent px-4 py-2 text-[11px] text-white hover:bg-white hover:text-espresso">
              {siteContent.heroSecondaryCta}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}





