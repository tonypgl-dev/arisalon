'use client';

import { useState } from 'react';
import { faqItems } from '@/data/faq';
import { SectionTitle } from '@/components/ui/SectionTitle';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <div className="section-shell grid gap-8 lg:grid-cols-[0.95fr,1.05fr] lg:items-start">
        <SectionTitle
          kicker="Întrebări frecvente"
          title="Tot ce trebuie să știi înainte să alegi data și intervalul."
          text="Am păstrat răspunsurile clare, astfel încât să poți decide rapid dacă locația este potrivită pentru tipul tău de eveniment."
        />
        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const open = openIndex === index;
            return (
              <article key={item.question} className="card-soft border-gradient overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                >
                  <span className="font-didot text-[1.15rem] tracking-[0.03em] text-espresso">{item.question}</span>
                  <span className="text-xl text-gold">{open ? '−' : '+'}</span>
                </button>
                {open ? <p className="px-5 pb-5 text-sm leading-7 text-inksoft sm:px-6 sm:pb-6">{item.answer}</p> : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
