"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type AnswerDetail = {
  id: string;
  number: number;
  prompt: string;
  type: string;
  selected?: string;
  correct: string;
  isCorrect: boolean;
};

function ScoreDonut({ score, total }: { score: number; total: number }) {
  const safeTotal = total > 0 ? total : 1;
  const pct = Math.min(100, Math.round((score / safeTotal) * 100));
  const gradient = `conic-gradient(#4ade80 ${pct * 3.6}deg, #e2e8f0 0deg)`;
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative h-28 w-28 rounded-full"
        style={{ backgroundImage: gradient }}
        aria-label={`Score ${score} dari ${total}`}
      >
        <div className="absolute inset-3 rounded-full bg-white flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-bold text-slate-900">
              {score}/{total}
            </p>
            <p className="text-xs text-slate-500">{pct}%</p>
          </div>
        </div>
      </div>
      <p className="text-xs text-slate-500">Nilai akhir</p>
    </div>
  );
}

export default function ResultPage() {
  const params = useSearchParams();
  const score = Number(params.get("score") || 0);
  const total = Number(params.get("total") || 10);
  const level = params.get("level") || "beginner";
  const passed = score >= 8;

  const [details, setDetails] = useState<AnswerDetail[]>([]);
  const [detailLoaded, setDetailLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = sessionStorage.getItem("last_result_detail");
    if (!raw) {
      setDetailLoaded(true);
      return;
    }

    try {
      const parsed = JSON.parse(raw) as { detail?: AnswerDetail[] };
      if (Array.isArray(parsed?.detail)) {
        setDetails(parsed.detail);
      }
    } catch (err) {
      console.error("Gagal memuat detail jawaban", err);
    } finally {
      setDetailLoaded(true);
    }
  }, []);

  const statusText = useMemo(
    () => (passed ? "Lulus! Bisa lanjut" : "Belum lulus, coba lagi"),
    [passed]
  );

  const incorrect = useMemo(() => details.filter((item) => !item.isCorrect), [details]);

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-5 px-4 py-6 md:py-10">
      <header className="rounded-2xl bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 px-5 py-6 text-white shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-wide text-white/80">Step 3 · Hasil Latihan</p>
            <h1 className="text-3xl font-bold">Result {level === "beginner" ? "Beginner (Kana)" : "N5"}</h1>
            <p className="text-sm text-white/85">
              Skor di atas 8/10 dianggap lulus dan bisa lanjut ke level berikutnya.
            </p>
          </div>
          <Badge tone={passed ? "success" : "warning"}>{passed ? "Lulus" : "Review dulu"}</Badge>
        </div>
      </header>

      <Card className="flex flex-wrap items-center justify-between gap-4 border border-slate-100 p-5">
        <ScoreDonut score={score} total={total} />
        <div className="space-y-2">
          <p className="text-lg font-semibold text-slate-900">{statusText}</p>
          <p className="text-sm text-slate-600">
            Level: {level === "beginner" ? "Beginner (Kana)" : "N5"} · Lulus jika 8/10 atau lebih.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link href="/">
              <Button variant="ghost" className="px-4">
                Ke Beranda
              </Button>
            </Link>
            <Link href="/practice">
              <Button variant="outline" className="px-4">
                Coba lagi
              </Button>
            </Link>
            {passed ? (
              <Link href="/">
                <Button variant="primary" className="px-4">
                  Lanjut ke N5 / Next Level
                </Button>
              </Link>
            ) : (
              <Button variant="ghost" disabled className="px-4">
                Lanjut ke N5 (kunci)
              </Button>
            )}
          </div>
        </div>
      </Card>

      <Card className="space-y-4 border border-slate-100 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">Review Jawaban</p>
            <p className="text-xs text-slate-500">Soal yang salah ditampilkan di bawah dengan kunci jawabannya.</p>
          </div>
          <Badge tone="info">{incorrect.length} Salah</Badge>
        </div>

        {!detailLoaded ? (
          <p className="text-sm text-slate-600">Memuat detail jawaban…</p>
        ) : incorrect.length ? (
          <div className="space-y-3">
            {incorrect.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-amber-700">Soal {item.number}</p>
                    <p className="text-sm font-bold text-slate-900">{item.prompt}</p>
                    <p className="text-xs text-slate-500 capitalize">{item.type}</p>
                  </div>
                  <Badge tone="warning">Salah</Badge>
                </div>
                <div className="mt-2 space-y-1 text-sm">
                  <p className="font-semibold text-amber-800">
                    Jawabanmu: <span className="font-normal text-slate-800">{item.selected || "Kosong"}</span>
                  </p>
                  <p className="font-semibold text-slate-900">
                    Seharusnya: <span className="font-normal text-slate-800">{item.correct}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : details.length ? (
          <Card className="border-green-100 bg-green-50 px-4 py-3">
            <p className="text-sm font-semibold text-green-700">Semua jawaban sudah benar 🎉</p>
            <p className="text-xs text-green-800/80">Tidak ada soal yang perlu diperbaiki.</p>
          </Card>
        ) : (
          <p className="text-sm text-slate-600">Belum ada detail jawaban. Selesaikan latihan untuk melihat review.</p>
        )}
      </Card>
    </main>
  );
}
