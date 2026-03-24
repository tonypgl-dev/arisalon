'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { galleryImages } from '@/data/gallery';
import { SectionTitle } from '@/components/ui/SectionTitle';

export function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  function prev() { setLightbox((i) => (i !== null && i > 0 ? i - 1 : i)); }
  function next() { setLightbox((i) => (i !== null && i < galleryImages.length - 1 ? i + 1 : i)); }

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
                  onClick={() => setLightbox(i)}
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

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2a2725]/92 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative mx-4 flex max-h-[90vh] max-w-5xl flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[lightbox].src}
                alt={galleryImages[lightbox].alt}
                width={1400}
                height={950}
                className="max-h-[80vh] w-auto rounded-xl object-contain shadow-float"
              />

              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="absolute -top-10 right-0 text-white/60 transition hover:text-white"
                aria-label="Închide"
              >
                <span className="text-2xl leading-none">✕</span>
              </button>

              {lightbox > 0 && (
                <button
                  type="button"
                  onClick={prev}
                  className="absolute left-0 top-1/2 -translate-x-10 -translate-y-1/2 text-white/60 transition hover:text-white"
                  aria-label="Anterior"
                >
                  <span className="text-4xl leading-none">‹</span>
                </button>
              )}
              {lightbox < galleryImages.length - 1 && (
                <button
                  type="button"
                  onClick={next}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-10 text-white/60 transition hover:text-white"
                  aria-label="Următor"
                >
                  <span className="text-4xl leading-none">›</span>
                </button>
              )}

              <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-white/40">
                {lightbox + 1} / {galleryImages.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
