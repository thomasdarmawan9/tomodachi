"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function ScoreDonut({ score, total }: { score: number; total: number }) {
  const pct = Math.min(100, Math.round((score / total) * 100));
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

  const statusText = useMemo(
    () => (passed ? "Lulus! Bisa lanjut" : "Belum lulus, coba lagi"),
    [passed]
  );

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
    </main>
  );
}
