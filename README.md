# Salon Aristocratic

Site Next.js pentru prezentarea locației Salon Aristocratic, cu design light elegant, video fullscreen în hero, galerie modernă și calendar public pentru cereri de rezervare.

## Pornire locală

```bash
npm install
npm run dev
```

Deschide apoi `http://localhost:3000`.

## Video hero

Adaugă clipul tău în:

`public/video/hero.mp4`

Dacă fișierul nu este încă prezent, browserul va folosi imaginea de poster din proiect.

## Supabase

1. Copiază `.env.example` în `.env.local`
2. Completează cheile Supabase
3. Rulează SQL-ul din `supabase/schema.sql`

Dacă nu configurezi încă Supabase, calendarul va folosi date locale pentru demonstrarea disponibilității.

## Structură utilă

- `public/images/gallery` — fotografiile locației
- `public/images/branding` — logo
- `src/data` — textele și conținutul site-ului
- `src/components` — secțiunile și componentele UI
- `src/app/api` — endpoint-urile pentru disponibilitate și cereri de rezervare
