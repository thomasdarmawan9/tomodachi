"use client";

import { useMemo, useState } from "react";
import { useLearning } from "@/lib/learning-context";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export function FlashcardReview() {
  const { flashcards, gradeCard } = useLearning();
  const [reveal, setReveal] = useState(false);

  const dueCards = useMemo(
    () =>
      [...flashcards]
        .sort((a, b) => a.due - b.due)
        .filter((card) => card.due <= Date.now())
        .slice(0, 1),
    [flashcards]
  );

  const active = dueCards[0];

  const handleGrade = (quality: "again" | "good" | "easy") => {
    if (!active) return;
    gradeCard(active.id, quality);
    setReveal(false);
  };

  return (
    <Card className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="section-title">SRS & Flashcard</p>
          <p className="muted">Mulai dari kana lalu vocab/kanji N5.</p>
        </div>
        <Badge tone="info">{active ? "Siap Review" : "Semua up to date"}</Badge>
      </div>

      {active ? (
        <div className="space-y-4">
          <div className="rounded-xl bg-slate-900 text-white p-5">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-wide opacity-75">
              <span className="rounded-full bg-white/10 px-2 py-1">
                {active.type}
              </span>
              <span className="rounded-full bg-white/10 px-2 py-1">
                {active.level === "beginner" ? "Kana" : "N5"}
              </span>
            </div>
            <p className="mt-4 text-3xl font-semibold">{active.prompt}</p>
            {reveal ? (
              <p className="mt-3 rounded-lg bg-emerald-100/20 px-3 py-2 text-lg text-emerald-100">
                Jawaban: {active.answer}
              </p>
            ) : (
              <Button
                variant="ghost"
                className="mt-4 text-xs text-white hover:bg-white/10"
                onClick={() => setReveal(true)}
              >
                Tunjukkan jawaban
              </Button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="px-4" onClick={() => handleGrade("again")}>
              Again
            </Button>
            <Button variant="primary" className="px-4" onClick={() => handleGrade("good")}>
              Good
            </Button>
            <Button variant="ghost" className="px-4" onClick={() => handleGrade("easy")}>
              Easy
            </Button>
          </div>
          <p className="text-xs text-slate-500">
            SRS ringan: interval meningkat dengan kualitas (again/good/easy).
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-slate-200 p-5 text-sm text-slate-600">
          Semua kartu telah direview. Tambahkan vocab baru atau lanjut jalur N5.
        </div>
      )}
    </Card>
  );
}
