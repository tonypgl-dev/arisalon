'use client';

import Image from 'next/image';
import { siteContent } from '@/data/site-content';

export function Footer() {
  return (
    <footer className="min-h-screen border-t border-line/80">
      <div className="section-shell flex min-h-screen flex-col items-center justify-center py-10">
        <div
          className="inline-block rounded-[24px] bg-transparent shadow-[0_40px_140px_rgba(42,39,37,0.65)]"
          style={{ transformOrigin: 'center center' }}
        >
          <Image
            src="/images/branding/logo-black.png"
            alt="Salon Aristocratic"
            width={3000}
            height={800}
            className="h-auto w-[750px] max-w-[92vw]"
          />
        </div>

        <div className="mt-auto w-full pt-10 text-sm leading-7 text-inksoft">
          <div className="grid gap-4 sm:grid-cols-2 sm:items-end">
          <p className="text-left leading-7">Calea Călărași 163, București<br />locație boutique pentru evenimente private și producții vizuale</p>
          <div className="text-left sm:text-right">
            <p>{siteContent.contactPhone}</p>
            <p>{siteContent.contactEmail}</p>
            <p>© {new Date().getFullYear()} Salon Aristocratic</p>
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
}


