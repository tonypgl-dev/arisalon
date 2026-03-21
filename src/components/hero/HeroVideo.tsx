export function HeroVideo() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#d8cab8]">
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero/poster.jpeg"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(39,31,24,0.18)_35%,rgba(39,31,24,0.58))]" />
    </div>
  );
}
