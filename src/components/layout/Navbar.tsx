'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { siteContent } from '@/data/site-content';

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="section-shell pt-6 sm:pt-8">
          <div className="flex items-center justify-between">
            <a href="#top">
              <Image
                src="/images/branding/logo-black.png"
                alt="Salon Aristocratic"
                width={800}
                height={800}
                className="logo-filter h-auto w-[260px] sm:w-[400px]"
                priority
              />
            </a>

            <motion.button
              type="button"
              onClick={() => setOpen((v) => !v)}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Deschide meniul"
              aria-expanded={open}
              className="group relative flex h-10 w-10 items-center justify-center"
            >
              {[0, 1, 2].map((line) => (
                <motion.span
                  key={line}
                  initial={false}
                  animate={
                    open
                      ? line === 0
                        ? { rotate: 45, y: 7, opacity: 1 }
                        : line === 1
                        ? { opacity: 0 }
                        : { rotate: -45, y: -7, opacity: 1 }
                      : { rotate: 0, y: line === 0 ? -7 : line === 2 ? 7 : 0, opacity: 1 }
                  }
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                  className="absolute h-[1.5px] w-6 rounded-full bg-white/90 transition-colors duration-200 group-hover:bg-gold"
                />
              ))}
            </motion.button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#2a2725]/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <nav
              className="section-shell flex h-full flex-col justify-center gap-4 sm:gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              {siteContent.menu.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.05 * index, duration: 0.3 }}
                  className="w-fit font-didot text-[2.2rem] uppercase tracking-[0.12em] text-white/85 transition-colors duration-200 hover:text-gold sm:text-[3rem]"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
