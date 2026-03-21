'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { siteContent } from '@/data/site-content';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';

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
        <div className="section-shell pt-4 sm:pt-6">
          <div className="flex items-start justify-between gap-4 rounded-[28px] border border-white/30 bg-white/12 px-4 py-4 shadow-float backdrop-blur-md sm:px-5">
            <a href="#top" className="flex min-w-0 items-center gap-3">
              <Image
                src="/images/branding/logo-black.png"
                alt="Salon Aristocratic"
                width={180}
                height={48}
                className="logo-filter h-auto w-[138px] sm:w-[180px]"
                priority
              />
            </a>
            <motion.button
              type="button"
              onClick={() => setOpen((value) => !value)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              aria-label="Deschide meniul"
              aria-expanded={open}
              className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/75 shadow-soft"
            >
              <span className="sr-only">Meniu</span>
              {[0, 1, 2].map((line) => (
                <motion.span
                  key={line}
                  animate={
                    open
                      ? line === 0
                        ? { rotate: 45, y: 6 }
                        : line === 1
                        ? { opacity: 0 }
                        : { rotate: -45, y: -6 }
                      : { rotate: 0, y: 0, opacity: 1 }
                  }
                  className={cn(
                    'absolute h-[1.5px] w-5 rounded-full bg-espresso transition-colors group-hover:bg-bronze',
                    line === 0 && '-translate-y-[6px]',
                    line === 2 && 'translate-y-[6px]'
                  )}
                />
              ))}
            </motion.button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#f9f7f4]/95 backdrop-blur-xl"
          >
            <div className="section-shell flex min-h-screen flex-col py-6">
              <div className="flex items-center justify-between">
                <Image
                  src="/images/branding/logo-black.png"
                  alt="Salon Aristocratic"
                  width={200}
                  height={52}
                  className="h-auto w-[150px] sm:w-[200px]"
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-line bg-white px-4 py-2 text-xs uppercase tracking-[0.25em] text-espresso"
                >
                  Închide
                </button>
              </div>

              <nav className="flex flex-1 flex-col items-start justify-center gap-6 py-10">
                {siteContent.menu.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * index }}
                    className="menu-link"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              <div className="space-y-4 border-t border-line pt-6">
                <p className="max-w-xl text-sm leading-7 text-inksoft">
                  Locație premium din București pentru evenimente private restrânse, ședințe foto, filmări și proiecte creative cu atmosferă aristocratică.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button href="#rezervare" onClick={() => setOpen(false)}>
                    Rezervare
                  </Button>
                  <Button href="#contact" variant="secondary" onClick={() => setOpen(false)}>
                    Contact
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
