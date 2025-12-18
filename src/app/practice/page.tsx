"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLearning } from "@/lib/learning-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { AuthCard } from "@/components/auth/AuthCard";
import { fetchPlacementQuestions, fetchQuestions, submitAnswers } from "@/lib/practice-api";
import { Question } from "@/lib/types";

function QuestionCard({
  question,
  index,
  selected,
  onSelect
}: {
  question: Question;
  index: number;
  selected?: string;
  onSelect: (choice: string) => void;
}) {
  const letters = ["A", "B", "C", "D"];
  const isKanjiQuestion = question.type === "kanji";

  return (
    <Card className="space-y-4 border border-slate-100 p-4 sm:p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-900">
            {index + 1}. {isKanjiQuestion ? "Pilih bacaan (hiragana) + arti untuk kanji berikut" : question.prompt}
          </p>
          {isKanjiQuestion ? <p className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">{question.prompt}</p> : null}
          <p className="text-xs text-slate-500 capitalize">{question.type}</p>
        </div>
        <Badge tone="info" className="self-start">A-D</Badge>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {question.choices.map((choice, idx) => {
          const active = selected === choice;
          const base =
            "flex items-center justify-between gap-2 rounded-xl border px-3 py-3 text-base font-semibold transition text-left sm:px-4 sm:py-4 sm:text-lg";
          return (
            <button
              key={choice}
              className={`${base} ${
                active ? "border-brand-500 bg-brand-50 text-brand-800" : "border-slate-200 bg-white hover:border-slate-300"
              }`}
              onClick={() => onSelect(choice)}
            >
              <span className="text-sm font-bold text-brand-600">{letters[idx]}.</span>
              <span className="text-slate-900">{choice}</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function PracticeContent() {
  const { user, loading: authLoading, token } = useAuth();
  const { profile } = useLearning();
  const searchParams = useSearchParams();
  const isPlacement = searchParams.get("mode") === "placement";
  const isKanjiMode = searchParams.get("mode") === "kanji";
  const isBeginner = profile.track === "beginner";
  const router = useRouter();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [current, setCurrent] = useState(0);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const total = questions.length || 10;
  const answeredCount = Object.keys(answers).length;
  const canSubmit = answeredCount === total && !loadingQuestions;
  const questionIndex = useMemo(
    () => (isKanjiMode ? Math.floor(Math.random() * 1000) : undefined),
    [isKanjiMode]
  );

  const handleSubmit = async () => {
    if (!questions.length) return;
    if (!token) return;
    const level = mode;

    const payload = questions.map((q) => ({
      questionId: q.id,
      selected: answers[q.id] ?? ""
    }));

    try {
      const resp = await submitAnswers(level, payload, token);

      const detailedAnswers = (resp.answers || []).map((item, idx: number) => ({
        id: item.questionId || `q-${idx}`,
        number: item.questionOrdinal || idx + 1,
        prompt: item.promptSnapshot || "",
        type: item.type || "matching",
        selected: item.selected,
        correct: item.correct,
        isCorrect: item.isCorrect
      }));

      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "last_result_detail",
          JSON.stringify({ detail: detailedAnswers, level, total: resp.total, score: resp.score })
        );
      }

      router.push(`/result?score=${resp.score}&total=${resp.total}&level=${level}`);
    } catch (err) {
      console.error("Submit gagal", err);
      alert(err instanceof Error ? err.message : "Gagal mengirim jawaban");
    }
  };

  const handleGoHome = () => {
    const proceed = window.confirm("Jawaban tidak akan tersimpan. Yakin ingin kembali ke beranda?");
    if (!proceed) return;
    router.push("/");
  };

  const activeQuestion = questions[current];
  const levelLabel = isPlacement ? "Placement Beginner" : isKanjiMode ? "Kanji N5" : isBeginner ? "Beginner (Kana)" : "N5 Dasar";
  const mode: "kanji" | "beginner" | "n5" | "placement" =
    searchParams.get("mode") === "placement" ? "placement" : isKanjiMode ? "kanji" : isBeginner ? "beginner" : "n5";

  useEffect(() => {
    if (!user || !token) return;
    let cancelled = false;
    const load = async () => {
      setLoadingQuestions(true);
      setLoadError(null);
      try {
        const data = isPlacement
          ? await fetchPlacementQuestions(token)
          : await fetchQuestions(mode, token, { index: questionIndex });
        // Randomize choices so jawaban benar tidak selalu di posisi pertama.
        const shuffled = data.map((q) => {
          const choices = [...q.choices];
          for (let i = choices.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [choices[i], choices[j]] = [choices[j], choices[i]];
          }
          return { ...q, choices };
        });
        if (!cancelled) {
          setQuestions(shuffled);
          setAnswers({});
          setCurrent(0);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Gagal memuat soal";
        setLoadError(msg);
      } finally {
        if (!cancelled) setLoadingQuestions(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [isPlacement, mode, token, user, questionIndex]);

  if (!user && !authLoading) {
    return (
      <main className="mx-auto flex max-w-4xl flex-col gap-4 px-4 py-8">
        <Card className="space-y-3 border border-slate-100 p-5 text-center">
          <p className="text-lg font-semibold text-slate-900">Masuk dulu untuk mulai latihan</p>
          <p className="text-sm text-slate-600">
            Simpan jawaban, skor, dan progresmu dengan akun Tomodachi.
          </p>
          <AuthCard />
        </Card>
      </main>
    );
  }

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-5 md:gap-5 md:py-10">
      <header className="rounded-2xl bg-gradient-to-r from-brand-700 via-brand-600 to-brand-500 px-4 py-5 text-white shadow-card sm:px-5 sm:py-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-white/80">Step 2 · {isKanjiMode ? "Latihan Kanji" : "Latihan Inti"}</p>
            <h1 className="text-2xl font-bold sm:text-3xl">{isPlacement ? "Placement Test" : `Latihan ${levelLabel}`}</h1>
            <p className="text-sm leading-relaxed text-white/85">
              {isKanjiMode
                ? "Mode kanji: tebak bacaan hiragana + arti bahasa Indonesia untuk tiap kanji. Soal diambil acak dari bank Kanji N5."
                : isPlacement
                  ? "Placement beginner: konversi kata/kalimat hiragana/katakana ↔ romaji untuk cek dasar sebelum mulai."
                  : "Mode latihan disesuaikan dengan jalur yang dipilih di onboarding. Ubah jalur di halaman utama jika perlu."}
            </p>
          </div>
          <div className="flex items-center gap-2 md:self-start">
            <Badge tone="warning">{isPlacement ? "Placement" : isKanjiMode ? "Kanji" : isBeginner ? "Beginner" : "N5"}</Badge>
            <Link href="/">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                Ganti preferensi
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="h-10 w-10 p-0 text-white hover:bg-white/10"
              onClick={handleGoHome}
              aria-label="Kembali ke beranda"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 10L12 3l9 7" />
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      <section className="space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-800">
              Soal {current + 1}/{total} · pilihan A-D
            </p>
            <p className="text-xs text-slate-500">
              {isKanjiMode
                ? "Kanji: baca (hiragana) + arti bahasa Indonesia"
                : isPlacement
                  ? "Placement: konversi kata/kalimat kana ↔ romaji"
                  : "Matching, typing, ordering sesuai level"}
            </p>
          </div>
          <Badge tone="info">Level: {levelLabel}</Badge>
        </div>

        {loadingQuestions ? (
          <Card className="flex flex-col items-center justify-center gap-3 border border-slate-100 p-6 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50">
              <svg
                className="h-5 w-5 animate-spin text-brand-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12a9 9 0 1 1-6-8.485" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Memuat soal latihan…</p>
              <p className="text-xs text-slate-500">Diambil dari server sesuai mode latihan.</p>
            </div>
          </Card>
        ) : null}

        {loadError ? (
          <Card className="space-y-2 border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-semibold text-amber-800">Gagal memuat soal</p>
            <p className="text-xs text-amber-800/80">{loadError}</p>
            <Button variant="primary" className="w-fit" onClick={() => router.refresh()}>
              Coba lagi
            </Button>
          </Card>
        ) : null}

        {activeQuestion ? (
          <div className="space-y-3">
            <QuestionCard
              question={activeQuestion}
              index={current}
              selected={answers[activeQuestion.id]}
              onSelect={(choice) => setAnswers((prev) => ({ ...prev, [activeQuestion.id]: choice }))}
            />
            <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-slate-700">
                Terjawab: {answeredCount}/{total}
              </div>
              <div className="grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
                <Button
                  variant="outline"
                  className="w-full px-3 sm:w-auto"
                  onClick={() => setCurrent((prev) => Math.max(0, prev - 1))}
                  disabled={current === 0}
                >
                  ← Sebelumnya
                </Button>
                {current < total - 1 ? (
                  <Button
                    variant="primary"
                    className="w-full px-3 sm:w-auto"
                    onClick={() => setCurrent((prev) => Math.min(total - 1, prev + 1))}
                  >
                    Berikutnya →
                  </Button>
                ) : null}
                <Button
                  variant="primary"
                  className="w-full px-4 sm:w-auto"
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                >
                  Submit jawaban
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}

export default function PracticePage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-10">
          <Card className="border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-700">Memuat latihan...</p>
          </Card>
        </main>
      }
    >
      <PracticeContent />
    </Suspense>
  );
}
