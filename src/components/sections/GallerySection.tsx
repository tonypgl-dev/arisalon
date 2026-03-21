import Image from 'next/image';
import { galleryImages } from '@/data/gallery';
import { SectionTitle } from '@/components/ui/SectionTitle';

export function GallerySection() {
  return (
    <section id="galerie" className="py-20 sm:py-24 lg:py-28">
      <div className="section-shell space-y-10">
        <SectionTitle
          kicker="Galerie"
          title="Detalii reale ale locației, integrate într-un layout modern și aerisit."
          text="Am păstrat imaginea autentică a salonului și am construit o galerie care lasă lumina, texturile și mobilierul să vorbească de la sine."
        />
        <div className="grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[180px]">
          {galleryImages.map((image, index) => (
            <div
              key={image.src}
              className={[
                'group relative overflow-hidden rounded-[28px] shadow-soft',
                image.wide ? 'lg:col-span-7' : 'lg:col-span-5',
                image.tall ? 'sm:row-span-2 lg:row-span-3' : 'lg:row-span-2',
                index === 1 ? 'lg:col-span-7' : '',
              ].join(' ')}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/35 via-black/0 to-transparent p-4 text-white/92 opacity-0 transition duration-300 group-hover:opacity-100">
                <p className="text-xs uppercase tracking-[0.22em]">Salon Aristocratic</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
