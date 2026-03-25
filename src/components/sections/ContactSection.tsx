'use client';

import { useEffect, useRef, useState } from 'react';
import { siteContent } from '@/data/site-content';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';

export function ContactSection() {
  const [flashCta, setFlashCta] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    let flashTimer: number | null = null;

    function onFlash() {
      setFlashCta(true);

      // Short click cue when highlight starts.
      try {
        const audioContext = audioContextRef.current ?? new window.AudioContext();
        audioContextRef.current = audioContext;
        if (audioContext.state === 'suspended') {
          void audioContext.resume();
        }
        const duration = 0.11;
        const sampleRate = audioContext.sampleRate;
        const frameCount = Math.floor(sampleRate * duration);
        const buffer = audioContext.createBuffer(1, frameCount, sampleRate);
        const channel = buffer.getChannelData(0);
        for (let i = 0; i < frameCount; i += 1) {
          // Filtered noise envelope for a subtle paper-rustle character.
          const t = i / frameCount;
          const envelope = Math.exp(-10 * t);
          channel[i] = (Math.random() * 2 - 1) * envelope * 0.5;
        }

        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        const bandpass = audioContext.createBiquadFilter();
        bandpass.type = 'bandpass';
        bandpass.frequency.value = 2900;
        bandpass.Q.value = 1.2;

        const gain = audioContext.createGain();
        gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
        gain.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);

        source.connect(bandpass);
        bandpass.connect(gain);
        gain.connect(audioContext.destination);
        source.start();
        source.stop(audioContext.currentTime + duration);
      } catch {
        // Ignore autoplay/audio-context restrictions silently.
      }

      flashTimer = window.setTimeout(() => setFlashCta(false), 1400);
    }

    const handler = () => onFlash();
    const primeAudioHandler = () => {
      try {
        if (!audioContextRef.current) audioContextRef.current = new window.AudioContext();
        if (audioContextRef.current.state === 'suspended') {
          void audioContextRef.current.resume();
        }
      } catch {
        // Ignore unsupported scenarios.
      }
    };

    window.addEventListener('flash-contact-cta', handler);
    window.addEventListener('prime-contact-audio', primeAudioHandler);
    return () => {
      window.removeEventListener('flash-contact-cta', handler);
      window.removeEventListener('prime-contact-audio', primeAudioHandler);
      if (flashTimer) window.clearTimeout(flashTimer);
    };
  }, []);

  return (
    <section id="contact" className="py-8 sm:py-10 lg:py-12">
      <div className="section-shell">
        <div className="card-soft border-gradient grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.08fr,0.92fr] lg:p-10">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <p className="section-kicker">Contact</p>
            <h2 className="section-title">{siteContent.contactTitle}</h2>
            <p className="body-copy mx-auto max-w-2xl font-bold sm:font-normal">{siteContent.contactText}</p>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl bg-[#f7f0e8] p-5">
              <p className="text-base uppercase tracking-[0.24em] text-bronze">Telefon</p>
              <a href={`tel:${siteContent.contactPhone.replace(/\s+/g, '')}`} className="mt-2 block text-2xl text-espresso hover:text-bronze sm:text-3xl">
                {siteContent.contactPhone}
              </a>
            </div>
            <div className="rounded-xl bg-[#f7f0e8] p-5">
              <p className="text-base uppercase tracking-[0.24em] text-bronze">Email</p>
              <a href={`mailto:${siteContent.contactEmail}`} className="mt-2 block text-2xl text-espresso hover:text-bronze sm:text-3xl">
                {siteContent.contactEmail}
              </a>
            </div>
            <div className="flex flex-wrap gap-3">
              <div id="contact-primary-cta-anchor">
                <Button
                  href={siteContent.whatsappUrl}
                  className={flashCta ? 'contact-cta-flash' : undefined}
                >
                  {siteContent.contactCta}
                </Button>
              </div>
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
