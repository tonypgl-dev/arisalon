'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCases } from '@/data/use-cases';
import { SectionTitle } from '@/components/ui/SectionTitle';

export function UseCasesSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="evenimente" className="py-20 sm:py-24 lg:py-28">
      <div className="section-shell space-y-10">
        <SectionTitle
          kicker="Tipuri de evenimente"
          title="Un spațiu. Zeci de scenarii."
          text="Salonul se potrivește natural atât proiectelor vizuale, cât și întâlnirilor sau evenimentelor restrânse în care designul, lumina și impresia generală contează cu adevărat."
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {useCases.map((item) => {
            const Icon = item.icon;
            const isOpen = expanded === item.title;
            return (
              <article key={item.title} className="card-soft border-gradient flex flex-col p-6 sm:p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f4ede4] text-bronze">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-didot text-[1.45rem] uppercase tracking-[0.08em] text-espresso">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-inksoft">{item.description}</p>
                <AnimatePresence>
                  {isOpen && (
                    <motion.p
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden text-sm leading-7 text-espresso/70"
                    >
                      {item.details}
                    </motion.p>
                  )}
                </AnimatePresence>
                <button
                  onClick={() => setExpanded(isOpen ? null : item.title)}
                  className="mt-5 w-fit text-[11px] uppercase tracking-[0.22em] text-bronze transition-colors hover:text-espresso"
                >
                  {isOpen ? 'Restrânge ↑' : 'Detalii ↓'}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
