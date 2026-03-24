'use client';

import Image from 'next/image';
import { siteContent } from '@/data/site-content';

export function Footer() {
  return (
    <footer className="border-t border-line/80 py-10">
      <div className="section-shell flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <div style={{ transformOrigin: 'left center', display: 'inline-block' }}>
            <Image
              src="/images/branding/logo-black.png"
              alt="Salon Aristocratic"
              width={3000}
              height={800}
              className="logo-filter h-auto w-[750px]"
            />
          </div>
          <p className="max-w-md text-sm leading-7 text-inksoft">
            {siteContent.addressLine}
          </p>
        </div>
        <div className="space-y-1 text-sm text-inksoft md:text-right">
          <p>{siteContent.contactPhone}</p>
          <p>{siteContent.contactEmail}</p>
          <p>© {new Date().getFullYear()} Salon Aristocratic</p>
        </div>
      </div>
    </footer>
  );
}
