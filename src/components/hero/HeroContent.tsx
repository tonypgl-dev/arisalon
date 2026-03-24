'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { siteContent } from '@/data/site-content';

export function HeroContent() {
  return (
    <div className="absolute inset-0 z-10 flex items-center pt-16">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="text-center text-white sm:text-left"
        >
          <h1 className="font-cormorant text-[1.8rem] italic leading-[1.05] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] sm:text-[2.4rem] lg:text-[2.7rem] xl:text-[3.3rem]">
            {siteContent.heroTitle}
          </h1>
          <p className="mt-4 text-[11px] uppercase tracking-[0.32em] text-white">{siteContent.heroEyebrow}</p>
          <div className="mt-8 flex flex-nowrap items-center justify-center gap-2 sm:justify-start sm:gap-3">
            <Link
              href="#galerie"
              className="flex flex-col items-center rounded-[7px] border border-white/60 bg-black/20 px-4 py-2.5 text-[15px] font-medium leading-tight text-white transition sm:rounded-[10px] sm:bg-transparent sm:px-5 sm:py-2.5 sm:text-[17px] hover:bg-white hover:text-espresso"
            >
              <span>Descoperă</span>
              <span>Salonul</span>
            </Link>
            <Link
              href="#rezervare"
              className="flex flex-col items-center rounded-[7px] border border-white/60 bg-black/20 px-4 py-2.5 text-[15px] font-medium leading-tight text-white transition sm:rounded-[10px] sm:bg-transparent sm:px-5 sm:py-2.5 sm:text-[17px] hover:bg-white hover:text-espresso"
            >
              <span>Rezervă</span>
              <span>Vizionare</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
