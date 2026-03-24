export function SectionTitle({ kicker, title, text }: { kicker: string; title: string; text?: string }) {
  return (
    <div className="mx-auto max-w-3xl space-y-4 text-center">
      <p className="section-kicker">{kicker}</p>
      <h2 className="section-title">{title}</h2>
      {text ? <p className="body-copy mx-auto max-w-2xl">{text}</p> : null}
    </div>
  );
}
