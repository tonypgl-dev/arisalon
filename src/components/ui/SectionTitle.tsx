export function SectionTitle({ kicker, title, text }: { kicker: string; title: string; text?: string }) {
  return (
    <div className="max-w-3xl space-y-4">
      <p className="section-kicker">{kicker}</p>
      <h2 className="section-title">{title}</h2>
      {text ? <p className="body-copy max-w-2xl">{text}</p> : null}
    </div>
  );
}
