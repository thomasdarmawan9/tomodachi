"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { useAuth } from "@/lib/auth-context";
import { createCustomFlashcard, fetchDueFlashcards, fetchSrsStats, gradeFlashcard } from "@/lib/srs-api";
import { Flashcard, TrackKey } from "@/lib/types";

export function FlashcardReview() {
  const { token } = useAuth();
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reveal, setReveal] = useState(false);
  const [stats, setStats] = useState<{ reviewedToday: number; totalCards: number; dueCards: number } | null>(null);
  const [creating, setCreating] = useState(false);
  const [newCard, setNewCard] = useState<{ prompt: string; answer: string; level: TrackKey; type: Flashcard["type"]}>({
    prompt: "",
    answer: "",
    level: "beginner",
    type: "kana"
  });

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchDueFlashcards(token);
        const stat = await fetchSrsStats(token);
        if (!cancelled) {
          setCards(data);
          setStats(stat);
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Gagal memuat flashcard");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const dueCards = useMemo(
    () =>
      [...cards]
        .sort((a, b) => a.due - b.due)
        .filter((card) => card.due <= Date.now())
        .slice(0, 1),
    [cards]
  );

  const active = dueCards[0];

  const handleGrade = async (quality: "again" | "good" | "easy") => {
    if (!active || !token) return;
    try {
      await gradeFlashcard(active.id, quality, token);
      setCards((prev) => prev.filter((c) => c.id !== active.id));
      setReveal(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengirim penilaian");
    }
  };

  return (
    <Card className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="section-title">SRS & Flashcard</p>
          <p className="muted">Mulai dari kana lalu vocab/kanji N5.</p>
        </div>
        <Badge tone="info">
          {loading ? "Memuat..." : active ? "Siap Review" : "Semua up to date"}
        </Badge>
      </div>

      {error ? (
        <Card className="border border-amber-200 bg-amber-50 p-3">
          <p className="text-sm font-semibold text-amber-800">Gagal memuat review</p>
          <p className="text-xs text-amber-800/80">{error}</p>
        </Card>
      ) : null}

      {stats ? (
        <div className="grid grid-cols-1 gap-2 rounded-lg bg-slate-50 p-3 text-xs text-slate-700 sm:grid-cols-3">
          <div>Total kartu: <span className="font-semibold">{stats.totalCards}</span></div>
          <div>Due: <span className="font-semibold">{stats.dueCards}</span></div>
          <div>Review hari ini: <span className="font-semibold">{stats.reviewedToday}</span></div>
        </div>
      ) : null}

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

      <div className="rounded-xl border border-slate-100 bg-white p-4 space-y-2">
        <p className="text-sm font-semibold text-slate-800">Tambah kartu sendiri</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="space-y-1">
            <p className="text-xs text-slate-600">Prompt</p>
            <Input value={newCard.prompt} onChange={(e) => setNewCard((p) => ({ ...p, prompt: e.target.value }))} />
          </div>
          <div className="space-y-1">
            <p className="text-xs text-slate-600">Jawaban</p>
            <Input value={newCard.answer} onChange={(e) => setNewCard((p) => ({ ...p, answer: e.target.value }))} />
          </div>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="space-y-1">
            <p className="text-xs text-slate-600">Level</p>
            <select
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              value={newCard.level}
              onChange={(e) => setNewCard((p) => ({ ...p, level: e.target.value as "beginner" | "n5" }))}
            >
              <option value="beginner">Beginner</option>
              <option value="n5">N5</option>
            </select>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-slate-600">Jenis</p>
            <select
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              value={newCard.type}
              onChange={(e) => setNewCard((p) => ({ ...p, type: e.target.value as Flashcard["type"] }))}
            >
              <option value="kana">Kana</option>
              <option value="vocab">Vocab</option>
              <option value="kanji">Kanji</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="primary"
            className="px-4"
            disabled={!newCard.prompt || !newCard.answer || creating || !token}
            onClick={async () => {
              if (!token) return;
              setCreating(true);
              setError(null);
              try {
                await createCustomFlashcard(token, newCard);
                const data = await fetchDueFlashcards(token);
                const stat = await fetchSrsStats(token);
                setCards(data);
                setStats(stat);
                setNewCard({ prompt: "", answer: "", level: newCard.level, type: newCard.type });
              } catch (err) {
                setError(err instanceof Error ? err.message : "Gagal menambah kartu");
              } finally {
                setCreating(false);
              }
            }}
          >
            {creating ? "Menyimpan..." : "Tambah kartu"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
