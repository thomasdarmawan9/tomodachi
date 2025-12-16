"use client";

import { useEffect, useMemo, useState } from "react";
import { OnboardingPanel } from "@/components/onboarding/OnboardingPanel";
import { ProfileSummary } from "@/components/profile/ProfileSummary";
import { FlashcardReview } from "@/components/srs/FlashcardReview";
import { TrackBoard } from "@/components/tracks/TrackBoard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useLearning } from "@/lib/learning-context";
import Image from "next/image";
import heroPerson from "@/assets/peoplehome.png";
import { AuthCard } from "@/components/auth/AuthCard";
import { useAuth } from "@/lib/auth-context";
import { ToriiIllustration } from "@/components/illustrations/Torii";
import { fetchHistory, type PracticeAttempt } from "@/lib/practice-api";
import { fetchNextUnit } from "@/lib/tracks-api";
import type { TrackUnit } from "@/lib/types";

export default function HomePage() {
  const { onboardingComplete, profile } = useLearning();
  const { user, logout, token } = useAuth();
  const [history, setHistory] = useState<PracticeAttempt[]>([]);
  const [nextUnit, setNextUnit] = useState<TrackUnit | null>(null);
  const [levelTab, setLevelTab] = useState<
    "beginner" | "n5" | "n4" | "n3" | "n2" | "n1"
  >("beginner");
  const isN5Track = profile.track === "n5";
  const isAuthenticated = Boolean(user);

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

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    const load = async () => {
      try {
        const h = await fetchHistory(token);
        if (!cancelled) setHistory(h.slice(0, 5));
        const n = await fetchNextUnit(profile.track, token);
        if (!cancelled) setNextUnit(n.unit || null);
      } catch (err) {
        console.warn("Failed to load dashboard extras", err);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [token, profile.track]);

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 md:py-10">
      <header className="rounded-2xl bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 px-5 py-6 text-white shadow-card sm:px-6 sm:py-7">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-wide text-white/80">Tomodachi · Japanese Learning</p>
            <h1 className="text-2xl font-bold sm:text-3xl">Halo, mari lanjutkan belajarmu</h1>
            <p className="text-sm leading-relaxed text-white/85">
              Beginner: fokus hiragana/katakana + audio + kuis. N5: vocab, grammar, kanji dengan latihan campuran dan SRS flashcard.
            </p>
          </div>
          <div className="hidden items-center justify-center md:flex">
            <div className="h-44 w-44 overflow-hidden rounded-full bg-white/10 p-1.5 shadow-lg shadow-brand-900/20">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-white/20">
                <Image
                  src={heroPerson}
                  alt="Belajar bersama Tomodachi"
                  className="h-full w-full object-cover"
                  sizes="176px"
                  priority
                />
              </div>
            </div>
          </div>
          {isAuthenticated ? (
            <div className="flex flex-col items-end gap-2">
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/85">
                {user?.email}
              </span>
              <Button variant="outline" className="bg-white/10 text-white hover:bg-white/20" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : null}
        </div>
      </header>

      <section className="flex flex-col gap-4">
        {!isAuthenticated ? (
          <AuthCard />
        ) : null}

        {!isAuthenticated ? (
          <div className="card border border-slate-200 bg-slate-50 p-5 shadow-card">
            <p className="text-sm font-semibold text-slate-800">Masuk untuk membuka latihan</p>
            <p className="text-xs text-slate-500">
              Progres, XP, dan streak akan tersimpan setelah kamu login atau daftar.
            </p>
          </div>
        ) : !onboardingComplete ? (
          <OnboardingPanel />
        ) : (
          <div className="card border border-slate-100 bg-white p-5 shadow-card">
            <div className="grid gap-4 md:grid-cols-[1.2fr,0.8fr] md:items-center">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
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
                  <Link href="/practice?mode=placement">
                    <Button variant="outline" className="px-4">
                      Placement Test
                    </Button>
                  </Link>
                  {isN5Track ? (
                    <Link href="/practice?mode=kanji">
                      <Button variant="outline" className="px-4">
                        Latihan Kanji
                      </Button>
                    </Link>
                  ) : null}
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
        {isAuthenticated ? <ProfileSummary /> : null}

        {isAuthenticated ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="space-y-2 border border-slate-100 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-800">Riwayat latihan terbaru</p>
                <Badge tone="info">{history.length} sesi</Badge>
              </div>
              {history.length ? (
                <div className="space-y-1 text-sm text-slate-700">
                  {history.map((h) => (
                    <div key={h.id} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                      <span>{new Date(h.createdAt || h.created_at || h.CreatedAt || Date.now()).toLocaleDateString()}</span>
                      <span className="font-semibold">{h.score}/{h.total}</span>
                      <span className="text-xs uppercase text-slate-500">{h.mode}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500">Belum ada sesi latihan.</p>
              )}
            </Card>
            <Card className="space-y-2 border border-slate-100 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-800">Lanjutkan belajar</p>
                <Badge tone="warning">{profile.track === "beginner" ? "Beginner" : "N5"}</Badge>
              </div>
              {nextUnit ? (
                <div className="rounded-lg bg-slate-50 px-3 py-2 text-sm">
                  <p className="font-semibold text-slate-800">{nextUnit.title}</p>
                  <p className="text-xs text-slate-500">Unit berikut untuk jalur aktifmu.</p>
                  <div className="mt-2 flex gap-2">
                    <Link href="/practice">
                      <Button variant="primary" className="px-3">Mulai latihan</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-500">Semua unit selesai! Lanjutkan review atau coba placement.</p>
              )}
            </Card>
          </div>
        ) : null}

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

        {isAuthenticated ? (
          levelTab === "beginner" || levelTab === "n5" ? (
            <TrackBoard activeTrack={levelTab} />
          ) : (
            <div className="card border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-600">
              Jalur {levelTab.toUpperCase()} akan hadir setelah konten siap.
            </div>
          )
        ) : (
          <div className="card border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-600">
            Login untuk melihat unit & materi yang tersedia.
          </div>
        )}

        {isAuthenticated ? <FlashcardReview /> : null}
      </section>
    </main>
  );
}
