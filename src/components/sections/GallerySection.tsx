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
    <section id="galerie" className="py-20 sm:py-24 lg:py-28">
      <div className="section-shell space-y-10">
        <SectionTitle
          kicker="Galerie"
          title="Detalii reale ale locației."
          text="Lumina, texturile și mobilierul vorbesc de la sine."
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {galleryImages.map((image, i) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setLightbox(i)}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl shadow-elegant"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-[#2a2725]/0 transition duration-300 group-hover:bg-[#2a2725]/20" />
            </button>
          ))}
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
