'use client';

import { useState } from 'react';

export function PrototypeBadge() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-[200] flex items-center justify-end">
      {open ? (
        <div className="flex items-center gap-2 rounded-full bg-espresso/90 px-4 py-2 shadow-float backdrop-blur-sm">
          <button
            onClick={() => setOpen(false)}
            className="text-[11px] uppercase tracking-[0.18em] text-white/70 transition hover:text-white"
          >
            Prototip ·
          </button>
          <a
            href="https://v1.hostezi.ro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] uppercase tracking-[0.18em] text-blue-400 transition hover:text-blue-300"
          >
            Hostezi.ro
          </a>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          aria-label="Prototip Hostezi.ro"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-espresso/90 shadow-float backdrop-blur-sm transition hover:bg-espresso"
        >
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-gold" />
          </span>
        </button>
      )}
    </div>
  );
}
