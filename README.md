# Tomodachi (Frontend)

React + Next.js + TypeScript + Tailwind UI for the Tomodachi learning app (Beginner kana + N5). Includes onboarding/profile, track boards, quizzes, and a lightweight SRS/flashcard loop.

## Prasyarat
- Node.js 18+ (disarankan 20+)
- npm (bawaan Node) atau yarn/pnpm jika ingin

## Jalankan secara lokal
```bash
npm install
npm run dev
```
Akses di http://localhost:3000.

## Perintah lainnya
- `npm run build` — build produksi.
- `npm start` — menjalankan build produksi.
- `npm run lint` — pengecekan linting.

## Catatan fitur
- Jalur Beginner (hiragana/katakana) dan N5 dengan kuis contoh.
- Onboarding: pilih jalur, fokus skill, target harian.
- SRS ringan + flashcard (kana → vocab/kanji) dengan opsi grade again/good/easy.
- Audio: mencoba Speech Synthesis (JA) di browser; fallback nada sederhana. Ganti dengan audio asli di `/public` saat tersedia.
# tomodachi
