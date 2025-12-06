"use client";

import { useMemo } from "react";
import { useLearning } from "@/lib/learning-context";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { ProgressBar } from "../ui/progress";

export function ProfileSummary() {
  const { profile, tracks, reviewedToday } = useLearning();

  const trackProgress = useMemo(() => {
    return tracks.map((track) => {
      const totalUnits = track.units.length;
      const completed = track.units.filter((u) => u.status === "completed").length;
      const inProgress = track.units.filter((u) => u.status === "in_progress").length;
      return {
        id: track.id,
        title: track.title,
        completed,
        totalUnits,
        inProgress
      };
    });
  }, [tracks]);

  return (
    <Card className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-gradient-to-r from-brand-500/10 via-white to-brand-100/60 p-4">
        <div>
          <p className="section-title">Halo, {profile.name}</p>
          <p className="muted">
            Track aktif: {profile.track === "beginner" ? "Beginner (kana)" : "N5"} · Fokus:{" "}
            {profile.focuses.join(", ")}
          </p>
        </div>
        <Badge tone="success">Streak {profile.streakDays} hari</Badge>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg bg-brand-50 px-4 py-3 text-brand-800">
          <p className="text-xs uppercase tracking-wide text-brand-700/80">XP</p>
          <p className="text-2xl font-bold">{profile.xp}</p>
          <p className="text-xs">+{reviewedToday * 8} dari review hari ini</p>
        </div>
        <div className="rounded-lg bg-slate-50 px-4 py-3 text-slate-800">
          <p className="text-xs uppercase tracking-wide text-slate-600">Target harian</p>
          <p className="text-2xl font-bold">{profile.targetMinutes}m</p>
          <p className="text-xs">Fokus: {profile.focuses.join(", ")}</p>
        </div>
        <div className="rounded-lg bg-green-50 px-4 py-3 text-green-800">
          <p className="text-xs uppercase tracking-wide text-green-700/90">Review selesai</p>
          <p className="text-2xl font-bold">{reviewedToday}</p>
          <p className="text-xs">Kartu hari ini</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {trackProgress.map((progress) => (
          <div
            key={progress.id}
            className="rounded-xl border border-slate-100 bg-slate-50 p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-800">{progress.title}</p>
              <Badge tone={progress.completed > 0 ? "success" : "info"}>
                {progress.completed}/{progress.totalUnits} unit
              </Badge>
            </div>
            <div className="mt-3">
              <ProgressBar
                value={progress.completed + progress.inProgress * 0.5}
                max={progress.totalUnits}
              />
              <p className="mt-1 text-xs text-slate-500">
                {progress.inProgress} unit on-going · {progress.completed} selesai
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
