# Tomodachi (Frontend)

Tomodachi adalah aplikasi belajar bahasa Jepang yang ringan dan fokus pada beginner (kana) dan N5. Antarmuka ini dibangun dengan Next.js + React + TypeScript + Tailwind, menghadirkan onboarding, board materi, latihan kuis, dan sesi flashcard SRS untuk membantu progres harian.

## Fitur Utama
- **Onboarding & Profil**: set nama, pilih jalur (Beginner/N5), fokus skill, dan target harian; ringkasan profil menampilkan progres dasar.
- **Track Board**: kartu unit per jalur (Beginner kana atau N5) untuk orientasi materi yang sedang aktif.
- **Latihan Inti**: kuis pilihan ganda 10 soal acak sesuai jalur; mendukung tipe matching/typing/ordering/reading/listening.
- **Latihan Kanji**: mode khusus menebak bacaan hiragana + arti Indonesia untuk kanji N5 (soal acak dari `src/assets/kanji_n5.json`), 10 soal multiple choice.
- **Navigasi Praktis**: tombol kembali ke beranda dengan konfirmasi agar tidak kehilangan jawaban.
- **SRS Flashcard**: loop review simple (again/good/easy) untuk mengulang kana, vocab, atau kanji.
- **Desain Responsif**: layout Tailwind yang nyaman untuk desktop maupun mobile.

## Prasyarat
- Node.js 18+ (disarankan 20+)
- npm (bawaan Node) atau yarn/pnpm jika diinginkan

## Cara Menjalankan
```bash
npm install
npm run dev
```
Buka http://localhost:3000.

## Perintah Lain
- `npm run build` — build produksi.
- `npm start` — menjalankan hasil build produksi.
- `npm run lint` — pengecekan linting.

## Struktur & Catatan
- **Latihan**: `src/app/practice/page.tsx` mengatur mode Beginner/N5/Kanji dan skor hasil.
- **Bank Kanji**: `src/assets/kanji_n5.json` menjadi sumber soal kanji (hiragana + arti).
- **Komponen UI**: `src/components/ui/*` (button, badge, card, progress) dan ilustrasi `src/components/illustrations`.
- **Konfigurasi**: Next.js standar dengan Tailwind; lihat `package.json` untuk skrip.
