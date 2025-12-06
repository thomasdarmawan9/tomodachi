"use client";

import { useMemo, useState } from "react";
import { OnboardingPanel } from "@/components/onboarding/OnboardingPanel";
import { ProfileSummary } from "@/components/profile/ProfileSummary";
import { FlashcardReview } from "@/components/srs/FlashcardReview";
import { TrackBoard } from "@/components/tracks/TrackBoard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLearning } from "@/lib/learning-context";
import { ToriiIllustration } from "@/components/illustrations/Torii";

export default function HomePage() {
  const { onboardingComplete } = useLearning();
  const [levelTab, setLevelTab] = useState<
    "beginner" | "n5" | "n4" | "n3" | "n2" | "n1"
  >("beginner");

  const tabs = useMemo(
    () => [
      { id: "beginner", label: "Beginner (Kana)", disabled: false },
      { id: "n5", label: "N5 Dasar", disabled: false },
      { id: "n4", label: "N4", disabled: true },
      { id: "n3", label: "N3", disabled: true },
      { id: "n2", label: "N2", disabled: true },
      { id: "n1", label: "N1", disabled: true }
    ] as const,
    []
  );

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 md:py-10">
      <header className="rounded-2xl bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 px-6 py-7 text-white shadow-card">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-wide text-white/80">Tomodachi · Japanese Learning</p>
            <h1 className="text-3xl font-bold">Halo, mari lanjutkan belajarmu</h1>
            <p className="text-sm text-white/85">
              Beginner: fokus hiragana/katakana + audio + kuis. N5: vocab, grammar, kanji dengan latihan campuran dan SRS flashcard.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-white/20 px-3 py-1 font-semibold">Track aktif: pilih Beginner atau N5</span>
              <span className="rounded-full bg-white/15 px-3 py-1 font-semibold">Target harian: atur menit & fokus skill</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-white/10 p-4 text-sm backdrop-blur">
            <div className="rounded-lg bg-white/15 px-3 py-3">
              <p className="text-xs text-white/80">Mulai cepat</p>
              <p className="text-lg font-semibold">Onboarding</p>
              <p className="text-[11px] text-white/80">Set nama, jalur, target.</p>
            </div>
            <div className="rounded-lg bg-white/15 px-3 py-3">
              <p className="text-xs text-white/80">Track</p>
              <p className="text-lg font-semibold">Beginner / N5</p>
              <p className="text-[11px] text-white/80">Lihat unit & kuis.</p>
            </div>
            <div className="rounded-lg bg-white/15 px-3 py-3">
              <p className="text-xs text-white/80">Review</p>
              <p className="text-lg font-semibold">SRS & Flashcard</p>
              <p className="text-[11px] text-white/80">Kana → Vocab/Kanji.</p>
            </div>
            <div className="rounded-lg bg-white/15 px-3 py-3">
              <p className="text-xs text-white/80">Progres</p>
              <p className="text-lg font-semibold">Ringkasan</p>
              <p className="text-[11px] text-white/80">XP, streak, unit.</p>
            </div>
          </div>
        </div>
      </header>

      <section className="flex flex-col gap-4">
        {!onboardingComplete ? (
          <OnboardingPanel />
        ) : (
          <div className="card border border-slate-100 bg-white p-5 shadow-card">
            <div className="grid gap-4 md:grid-cols-[1.2fr,0.8fr] md:items-center">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                    Step 2
                  </span>
                  <p className="text-sm font-semibold text-slate-800">Latihan Inti</p>
                </div>
                <p className="text-sm text-slate-600">
                  Mulai latihan sesuai jalur (Beginner kana atau N5). Audio & Pelafalan serta Kamus menyusul.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/practice">
                    <Button variant="primary" className="px-4">
                      Buka Latihan Inti
                    </Button>
                  </Link>
                  <Link href="/practice?mode=kanji">
                    <Button variant="outline" className="px-4">
                      Latihan Kanji
                    </Button>
                  </Link>
                  <Button variant="ghost" disabled className="px-4">
                    Audio & Pelafalan (soon)
                  </Button>
                  <Button variant="ghost" disabled className="px-4">
                    Kamus (soon)
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-50 via-white to-sky-50 p-4">
                <ToriiIllustration />
              </div>
            </div>
          </div>
        )}
        <ProfileSummary />

        <div className="card space-y-4 border border-slate-100 bg-white p-5 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-800">Pilih level jalur</p>
              <p className="text-xs text-slate-500">
                Beginner = kana; N5 = vocab, grammar, kanji. N4-N1 disiapkan (locked).
              </p>
            </div>
            <span className="text-xs rounded-full bg-slate-100 px-4 py-1.5 text-slate-600">
              Tip: pilih satu jalur untuk fokus harian.
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {tabs.map((tab) => {
              const active = levelTab === tab.id;
              return (
                <Button
                  key={tab.id}
                  disabled={tab.disabled}
                  variant={active ? "primary" : "outline"}
                  className={`h-11 w-full justify-center rounded-full px-4 text-sm font-semibold ${
                    tab.disabled ? "cursor-not-allowed" : ""
                  }`}
                  onClick={() => !tab.disabled && setLevelTab(tab.id)}
                >
                  {tab.label}
                  {tab.disabled ? " · locked" : ""}
                </Button>
              );
            })}
          </div>
        </div>

        {levelTab === "beginner" || levelTab === "n5" ? (
          <TrackBoard activeTrack={levelTab} />
        ) : (
          <div className="card border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-600">
            Jalur {levelTab.toUpperCase()} akan hadir setelah konten siap.
          </div>
        )}

        <FlashcardReview />
      </section>
    </main>
  );
}
