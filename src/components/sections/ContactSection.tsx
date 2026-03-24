import { siteContent } from '@/data/site-content';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';

export function ContactSection() {
  return (
    <section id="contact" className="py-8 sm:py-10 lg:py-12">
      <div className="section-shell">
        <div className="card-soft border-gradient grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.08fr,0.92fr] lg:p-10">
          <SectionTitle kicker="Contact" title={siteContent.contactTitle} text={siteContent.contactText} />
          <div className="space-y-4">
            <div className="rounded-xl bg-[#f7f0e8] p-5">
              <p className="text-[11px] uppercase tracking-[0.24em] text-bronze">Telefon</p>
              <a href={`tel:${siteContent.contactPhone.replace(/\s+/g, '')}`} className="mt-2 block text-lg text-espresso hover:text-bronze">
                {siteContent.contactPhone}
              </a>
            </div>
            <div className="rounded-xl bg-[#f7f0e8] p-5">
              <p className="text-[11px] uppercase tracking-[0.24em] text-bronze">Email</p>
              <a href={`mailto:${siteContent.contactEmail}`} className="mt-2 block text-lg text-espresso hover:text-bronze">
                {siteContent.contactEmail}
              </a>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href={siteContent.whatsappUrl}>{siteContent.contactCta}</Button>
              <Button href="#rezervare" variant="secondary">
                Calendar rezervare
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
