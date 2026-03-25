'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { galleryImages } from '@/data/gallery';
import { SectionTitle } from '@/components/ui/SectionTitle';

function playSwipeSound() {
  try {
    const ctx = new AudioContext();
    const dur = 0.08;
    const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
    const ch = buf.getChannelData(0);
    for (let i = 0; i < ch.length; i++) {
      const t = i / ch.length;
      ch[i] = (Math.random() * 2 - 1) * Math.exp(-12 * t) * 0.3;
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 3200;
    bp.Q.value = 1;
    src.connect(bp);
    bp.connect(ctx.destination);
    src.start();
    src.stop(ctx.currentTime + dur);
  } catch { /* ignore */ }
}

export function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [dir, setDir] = useState(0); // -1 = prev (down), 1 = next (up)
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  function go(next: number, direction: number) {
    if (next < 0 || next >= galleryImages.length) return;
    setDir(direction);
    playSwipeSound();
    setLightbox(next);
  }

  function prev() { if (lightbox !== null && lightbox > 0) go(lightbox - 1, -1); }
  function next() { if (lightbox !== null && lightbox < galleryImages.length - 1) go(lightbox + 1, 1); }

  function onTouchStart(e: React.TouchEvent) {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    // Prioritize vertical swipe
    if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 50) {
      if (diffY > 0) next(); // swipe up = next
      else prev(); // swipe down = prev
    } else if (Math.abs(diffX) > 50) {
      if (diffX > 0) next(); // swipe left = next
      else prev();
    }
  }

  // Show hint animation when lightbox opens
  useEffect(() => {
    if (lightbox !== null) {
      setShowHint(true);
      const t = setTimeout(() => setShowHint(false), 2800);
      return () => clearTimeout(t);
    }
    setShowHint(false);
  }, [lightbox]);

  // Keyboard navigation
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (lightbox === null) return;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') prev();
    else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next();
    else if (e.key === 'Escape') setLightbox(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [lightbox]);

  return (
    <section id="galerie" className="py-8 sm:py-10 lg:py-12">
      <div className="section-shell space-y-6">
        <SectionTitle
          kicker="Galerie"
          title="Detalii reale ale locației."
          text="Lumina, texturile și mobilierul vorbesc de la sine."
        />

        <div className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
          {galleryImages.map((image, i) => {
            const tileHeight = image.tall
              ? 'h-[360px] sm:h-[430px]'
              : image.wide
                ? 'h-[190px] sm:h-[220px]'
                : i % 3 === 0
                  ? 'h-[240px] sm:h-[290px]'
                  : i % 3 === 1
                    ? 'h-[210px] sm:h-[260px]'
                    : 'h-[280px] sm:h-[330px]';

            const staggerOffset = i % 2 === 1 ? 'mt-4 sm:mt-6' : 'mt-0';

            return (
              <div key={image.src} className={`mb-3 break-inside-avoid sm:mb-4 ${staggerOffset}`}>
                <button
                  type="button"
                  onClick={() => { setDir(0); setLightbox(i); }}
                  className={`group relative w-full overflow-hidden rounded-xl shadow-elegant ${tileHeight}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-[#2a2725]/0 transition duration-300 group-hover:bg-[#2a2725]/20" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#1a1816]"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Image */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={lightbox}
                initial={{ opacity: 0, y: dir * 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: dir * -60 }}
                transition={{ duration: 0.3 }}
                className="flex h-full w-full items-center justify-center"
              >
                <Image
                  src={galleryImages[lightbox].src}
                  alt={galleryImages[lightbox].alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Close button */}
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60"
              aria-label="Închide"
            >
              <span className="text-xl leading-none">✕</span>
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/40 px-4 py-1.5 text-[13px] tracking-[0.15em] text-white/70">
              {lightbox + 1} / {galleryImages.length}
            </div>

            {/* Desktop arrows */}
            {lightbox > 0 && (
              <button
                type="button"
                onClick={prev}
                className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-black/40 px-3 py-2 text-3xl text-white transition hover:bg-black/60 sm:flex"
                aria-label="Anterior"
              >
                ‹
              </button>
            )}
            {lightbox < galleryImages.length - 1 && (
              <button
                type="button"
                onClick={next}
                className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-black/40 px-3 py-2 text-3xl text-white transition hover:bg-black/60 sm:flex"
                aria-label="Următor"
              >
                ›
              </button>
            )}

            {/* Swipe hint overlay */}
            <AnimatePresence>
              {showHint && lightbox < galleryImages.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-end pb-20 sm:hidden"
                >
                  <motion.div
                    className="flex flex-col items-center gap-2"
                    animate={{ y: [0, -16, 0, -16, 0] }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                    onAnimationStart={() => {
                      setTimeout(() => playSwipeSound(), 200);
                      setTimeout(() => playSwipeSound(), 1000);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white/80"
                    >
                      <polyline points="18 15 12 9 6 15" />
                    </svg>
                    <span className="text-[13px] uppercase tracking-[0.2em] text-white/80">
                      Swipe în sus
                    </span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
