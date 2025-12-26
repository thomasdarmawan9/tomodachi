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
import tomodachiLogo from "@/assets/tomodachiapp.png";
import { AuthCard } from "@/components/auth/AuthCard";
import { useAuth } from "@/lib/auth-context";
import { ToriiIllustration } from "@/components/illustrations/Torii";
import { loadDashboardData } from "@/lib/store/dashboard-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

export default function HomePage() {
  const { onboardingComplete, profile, setOnboardingComplete } = useLearning();
  const { user, logout, token } = useAuth();
  const dispatch = useAppDispatch();
  const { history, nextUnit, loading: dashboardLoading, error: dashboardError } = useAppSelector((state) => state.dashboard);
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

  const historyDateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "UTC"
      }),
    []
  );

  const formatHistoryDate = (value: string | number | Date | null | undefined) => {
    if (!value) return "Tanggal tidak tersedia";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Tanggal tidak tersedia";
    return historyDateFormatter.format(date);
  };

  useEffect(() => {
    if (!token) return;
    dispatch(loadDashboardData({ token, track: profile.track }));
  }, [dispatch, token, profile.track]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Banner Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-500 to-purple-600">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6TTI0IDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00ek0xMiAzNGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-2 backdrop-blur-sm shadow-md">
          <div className="relative h-8 w-8 overflow-hidden rounded-full bg-white/80 p-1">
            <Image src={tomodachiLogo} alt="Tomodachi App" fill className="object-contain" sizes="32px" />
          </div>
          <span className="text-sm font-semibold text-white">Tomodachi App</span>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-6">
              <div className="inline-flex">
                <Badge className="bg-white/20 text-white backdrop-blur-sm border-white/30 px-4 py-1.5">
                  🎌 Platform Belajar Bahasa Jepang
                </Badge>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Belajar Bahasa Jepang dengan{" "}
                <span className="bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                  Tomodachi
                </span>
              </h1>
              <p className="text-lg leading-relaxed text-white/90 sm:text-xl">
                Mulai dari Hiragana, Katakana, hingga JLPT N5-N1. 
                Belajar dengan sistem SRS, flashcard interaktif, dan kuis yang menyenangkan!
              </p>
              
              {!isAuthenticated ? (
                <div className="flex flex-wrap gap-4">
                  <Link href="#auth-section">
                    <Button className="border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm shadow-xl px-8 py-6 text-lg">
                      Mulai Belajar Gratis
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm px-8 py-6 text-lg">
                      Lihat Fitur
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-4">
                  <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                    👋 {user?.email}
                  </span>
                  <Button
                    variant="outline"
                    className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                    onClick={() => setOnboardingComplete(false)}
                  >
                    Ganti Preferensi
                  </Button>
                  <Button variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20" onClick={logout}>
                    Logout
                  </Button>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 opacity-30 blur-2xl"></div>
                <div className="relative h-64 w-64 overflow-hidden rounded-full bg-white/10 p-2 shadow-2xl backdrop-blur-sm sm:h-80 sm:w-80 lg:h-96 lg:w-96">
                  <div className="h-full w-full overflow-hidden rounded-full bg-gradient-to-br from-white/20 to-white/5">
                    <Image
                      src={heroPerson}
                      alt="Belajar bersama Tomodachi"
                      className="h-full w-full object-cover"
                      sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(248, 250, 252)"/>
          </svg>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Features Section */}
        {!isAuthenticated && (
          <section id="features" className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">
                Kenapa Memilih Tomodachi?
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Platform pembelajaran bahasa Jepang yang komprehensif dengan berbagai fitur menarik
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <Card className="overflow-hidden border-2 border-slate-100 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="h-48 bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 p-8 flex items-center justify-center">
                  <div className="text-8xl">📚</div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-slate-900">Materi Lengkap</h3>
                  <p className="text-slate-600">
                    Dari Hiragana/Katakana hingga JLPT N5. Vocab, grammar, kanji, dan audio pelafalan.
                  </p>
                </div>
              </Card>

              {/* Feature 2 */}
              <Card className="overflow-hidden border-2 border-slate-100 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="h-48 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8 flex items-center justify-center">
                  <div className="text-8xl">🎯</div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-slate-900">Sistem SRS</h3>
                  <p className="text-slate-600">
                    Spaced Repetition System untuk mengingat lebih efektif dengan flashcard pintar.
                  </p>
                </div>
              </Card>

              {/* Feature 3 */}
              <Card className="overflow-hidden border-2 border-slate-100 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="h-48 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 p-8 flex items-center justify-center">
                  <div className="text-8xl">✨</div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-slate-900">Gamifikasi</h3>
                  <p className="text-slate-600">
                    Dapatkan XP, streak harian, dan badge. Belajar jadi lebih seru dan memotivasi!
                  </p>
                </div>
              </Card>

              {/* Feature 4 */}
              <Card className="overflow-hidden border-2 border-slate-100 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="h-48 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-8 flex items-center justify-center">
                  <div className="text-8xl">🎵</div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-slate-900">Audio Native</h3>
                  <p className="text-slate-600">
                    Dengar pelafalan asli dari native speaker untuk setiap kana dan vocab.
                  </p>
                </div>
              </Card>

              {/* Feature 5 */}
              <Card className="overflow-hidden border-2 border-slate-100 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="h-48 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-8 flex items-center justify-center">
                  <div className="text-8xl">📊</div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-slate-900">Progress Tracking</h3>
                  <p className="text-slate-600">
                    Pantau perkembangan belajarmu dengan statistik detail dan riwayat latihan.
                  </p>
                </div>
              </Card>

              {/* Feature 6 */}
              <Card className="overflow-hidden border-2 border-slate-100 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="h-48 bg-gradient-to-br from-pink-400 via-rose-500 to-purple-600 p-8 flex items-center justify-center">
                  <div className="text-8xl">🗾</div>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-slate-900">Kamus Interaktif</h3>
                  <p className="text-slate-600">
                    Cari kata, kanji, atau frasa dengan kamus lengkap dan mudah digunakan.
                  </p>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Auth Section for Non-Authenticated Users */}
        {!isAuthenticated && (
          <section id="auth-section" className="mb-16">
            <div className="max-w-2xl mx-auto">
              <AuthCard />
            </div>
          </section>
        )}

        {/* Cultural Banner */}
        <section className="mb-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 shadow-2xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
            
            <div className="relative px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="text-6xl sm:text-8xl">🏯</div>
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  Belajar Bahasa & Budaya Jepang
                </h2>
                <p className="max-w-2xl text-lg text-white/90">
                  困難は成長の機会だ (Konnan wa seichou no kikai da)
                  <br />
                  <span className="text-white/75 text-base">
                    &quot;Kesulitan adalah kesempatan untuk bertumbuh&quot;
                  </span>
                </p>
                <div className="flex flex-wrap gap-4 justify-center pt-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                    <div className="text-2xl font-bold text-white">50+</div>
                    <div className="text-sm text-white/80">Unit Pelajaran</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                    <div className="text-2xl font-bold text-white">1000+</div>
                    <div className="text-sm text-white/80">Vocab & Kanji</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                    <div className="text-2xl font-bold text-white">100%</div>
                    <div className="text-sm text-white/80">Gratis</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content for Authenticated Users */}
        {isAuthenticated && (
          <>
            {!onboardingComplete ? (
              <section className="mb-8" id="steps">
                <OnboardingPanel />
              </section>
            ) : (
              <section className="mb-8" id="steps">
                <Card className="overflow-hidden border-2 border-slate-100 bg-white shadow-xl">
                  <div className="bg-gradient-to-r from-brand-50 to-purple-50 px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-brand-600 text-white">Step 2</Badge>
                      <h2 className="text-xl font-bold text-slate-900">Latihan Inti</h2>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid gap-6 lg:grid-cols-[1.5fr,1fr]">
                      <div className="space-y-4">
                        <p className="text-slate-700 leading-relaxed">
                          Mulai latihan sesuai jalur. Pilih &quot;Final Test&quot; untuk menguji kemampuanmu dan menyesuaikan jalur belajar.
                        </p>
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
                          <p className="text-sm text-amber-900 font-medium">
                            💡 困難は成長の機会だ - Kesulitan adalah kesempatan untuk bertumbuh
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <Link href="/practice">
                            <Button variant="primary" className="px-6 py-5 text-base font-semibold shadow-lg">
                              🎯 Buka Latihan Inti
                            </Button>
                          </Link>
                          <Link href="/practice?mode=placement">
                            <Button variant="outline" className="px-6 py-5 text-base">
                              📝 Final Test
                            </Button>
                          </Link>
                          {isN5Track && (
                            <Link href="/practice?mode=kanji">
                              <Button variant="outline" className="px-6 py-5 text-base">
                                ㊙️ Latihan Kanji
                              </Button>
                            </Link>
                          )}
                          <Link href="/dictionary">
                            <Button variant="outline" className="px-6 py-5 text-base">
                              📖 Kamus
                            </Button>
                          </Link>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-amber-50 via-white to-sky-50 p-8 border border-slate-100">
                        <ToriiIllustration />
                      </div>
                    </div>
                  </div>
                </Card>
              </section>
            )}

            <section className="mb-8">
              <ProfileSummary />
            </section>

            {/* Dashboard Cards */}
            <section className="mb-8">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-2 border-slate-100 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-slate-900">📊 Riwayat Latihan</h3>
                      <Badge tone="info">{dashboardLoading ? "Memuat..." : `${history.length} sesi`}</Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    {dashboardError && (
                      <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
                        Gagal memuat: {dashboardError}
                      </p>
                    )}
                    {history.length ? (
                      <div className="space-y-2">
                        {history.map((h) => {
                          const createdAt = h.createdAt || h.created_at || h.CreatedAt;
                          const dateLabel = formatHistoryDate(createdAt);
                          return (
                            <div key={h.id} className="flex items-center justify-between rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 px-4 py-3 border border-slate-200">
                              <span className="text-sm text-slate-700">{dateLabel}</span>
                              <span className="font-bold text-brand-600">{h.score}/{h.total}</span>
                              <Badge className="text-xs uppercase">{h.mode}</Badge>
                            </div>
                          );
                        })}
                      </div>
                    ) : dashboardLoading ? (
                      <p className="text-sm text-slate-500">Memuat riwayat...</p>
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-2">📝</div>
                        <p className="text-sm text-slate-500">Belum ada sesi latihan.</p>
                      </div>
                    )}
                  </div>
                </Card>

                <Card className="border-2 border-slate-100 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-slate-900">🚀 Lanjutkan Belajar</h3>
                      <Badge tone="warning">{profile.track === "beginner" ? "Beginner" : "N5"}</Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    {dashboardLoading ? (
                      <p className="text-sm text-slate-500">Memuat rekomendasi...</p>
                    ) : nextUnit ? (
                      <div className="rounded-xl bg-gradient-to-br from-brand-50 to-purple-50 border border-brand-200 px-4 py-4 space-y-3">
                        <p className="font-bold text-slate-900">{nextUnit.title}</p>
                        <p className="text-sm text-slate-600">Unit berikut untuk jalur aktifmu.</p>
                        <Link href="/practice">
                          <Button variant="primary" className="w-full py-5 text-base font-semibold">
                            Mulai Latihan →
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-2">🎉</div>
                        <p className="text-sm text-slate-600 mb-4">Semua unit selesai!</p>
                        <p className="text-xs text-slate-500">Lanjutkan review atau coba placement test.</p>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </section>
          </>
        )}

        {/* Level Selection */}
        <section className="mb-8">
          <Card className="border-2 border-slate-100 bg-white shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">🎓 Pilih Level Jalur</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Beginner = Kana · N5 = Vocab, Grammar, Kanji · N4-N1 (Coming Soon)
                  </p>
                </div>
                <Badge className="bg-gradient-to-r from-brand-500 to-purple-500 text-white self-start sm:self-auto">
                  💡 Tip: Fokus satu jalur
                </Badge>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {tabs.map((tab) => {
                  const active = levelTab === tab.id;
                  return (
                    <Button
                      key={tab.id}
                      disabled={tab.disabled}
                      variant={active ? "primary" : "outline"}
                      className={`h-auto py-4 w-full justify-center rounded-xl px-3 text-sm font-semibold transition-all ${
                        active ? "shadow-lg scale-105" : ""
                      } ${tab.disabled ? "cursor-not-allowed opacity-50" : "hover:scale-105"}`}
                      onClick={() => !tab.disabled && setLevelTab(tab.id)}
                    >
                      <span className="block">
                        {tab.label}
                        {tab.disabled && <span className="block text-xs mt-1">🔒 Locked</span>}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </div>
          </Card>
        </section>

        {/* Track Board or Login Prompt */}
        <section className="mb-8">
          {isAuthenticated ? (
            levelTab === "beginner" || levelTab === "n5" ? (
              <TrackBoard activeTrack={levelTab} />
            ) : (
              <Card className="border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center">
                <div className="text-6xl mb-4">🔒</div>
                <p className="text-lg font-semibold text-slate-700 mb-2">
                  Jalur {levelTab.toUpperCase()} Segera Hadir!
                </p>
                <p className="text-sm text-slate-500">
                  Konten untuk level ini sedang dalam pengembangan.
                </p>
              </Card>
            )
          ) : (
            <Card className="border-2 border-dashed border-brand-200 bg-gradient-to-br from-brand-50 to-purple-50 p-12 text-center">
              <div className="text-6xl mb-4">🔐</div>
              <p className="text-lg font-semibold text-slate-800 mb-2">
                Login untuk Melihat Unit & Materi
              </p>
              <p className="text-sm text-slate-600 mb-6">
                Dapatkan akses ke semua materi pembelajaran, tracking progress, dan fitur lainnya!
              </p>
              <Link href="#auth-section">
                <Button variant="primary" className="px-8 py-4 text-base font-semibold">
                  Login / Daftar Sekarang
                </Button>
              </Link>
            </Card>
          )}
        </section>

        {/* Flashcard Review */}
        {isAuthenticated && (
          <section className="mb-8">
            <FlashcardReview />
          </section>
        )}
      </div>
    </main>
  );
}
