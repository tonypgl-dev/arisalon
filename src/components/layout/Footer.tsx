'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { siteContent } from '@/data/site-content';

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.75 });

  return (
    <footer className="relative flex h-screen flex-col overflow-hidden border-t border-line/60">
      {/* Centered logo */}
      <div className="flex flex-1 items-center justify-center px-6">
        <motion.div
          ref={ref}
          className="rounded-[24px]"
          animate={{
            opacity: isInView ? 1 : 0,
            boxShadow: isInView
              ? '0 32px 100px rgba(42,39,37,0.50)'
              : '0 0px 0px rgba(42,39,37,0)',
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Image
            src="/images/branding/logofinal.png"
            alt="Salon Aristocratic"
            width={3000}
            height={800}
            className="h-auto w-[700px] max-w-[88vw]"
          />
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="w-full border-t border-line/40 py-5 font-didot text-[18px] leading-8 tracking-[0.02em] text-inksoft/70">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-1 px-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p>Calea Călărași 163, București · locație boutique</p>
          <p>{siteContent.contactPhone} · {siteContent.contactEmail}</p>
          <p>© {new Date().getFullYear()} Salon Aristocratic</p>
        </div>
      </div>
    </footer>
  );
}
