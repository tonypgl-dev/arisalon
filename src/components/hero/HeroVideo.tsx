'use client';

import { useEffect, useRef } from 'react';

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const attempt = () => {
      video.play().catch(() => {});
    };

    attempt();

    // Fallback: retry on first user touch (some mobile browsers block until interaction)
    const onInteraction = () => {
      video.play().catch(() => {});
    };
    document.addEventListener('touchstart', onInteraction, { once: true });
    document.addEventListener('click', onInteraction, { once: true });

    return () => {
      document.removeEventListener('touchstart', onInteraction);
      document.removeEventListener('click', onInteraction);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#d8cab8]">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/hero/poster.jpeg"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_60%,rgba(42,39,37,0.45)_100%)]" />
    </div>
  );
}
