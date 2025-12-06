"use client";

import { useState } from "react";
import { useLearning } from "@/lib/learning-context";
import { SkillFocus, TrackKey } from "@/lib/types";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

const skillOptions: { value: SkillFocus; label: string }[] = [
  { value: "reading", label: "Reading" },
  { value: "listening", label: "Listening" },
  { value: "writing", label: "Writing" },
  { value: "speaking", label: "Speaking" }
];

export function OnboardingPanel() {
  const { profile, updateProfile, completeOnboarding } = useLearning();
  const [localName, setLocalName] = useState(profile.name);
  const [targetMinutes, setTargetMinutes] = useState(profile.targetMinutes);
  const [selectedFocuses, setSelectedFocuses] = useState<SkillFocus[]>(profile.focuses);
  const [track, setTrack] = useState<TrackKey>(profile.track);

  const toggleFocus = (focus: SkillFocus) => {
    setSelectedFocuses((prev) =>
      prev.includes(focus) ? prev.filter((f) => f !== focus) : [...prev, focus]
    );
  };

  const handleSave = () => {
    updateProfile({
      name: localName || profile.name,
      track,
      targetMinutes,
      focuses: selectedFocuses
    });
    completeOnboarding();
  };

  return (
    <Card className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="section-title">Onboarding & Profil</p>
          <p className="muted">Pilih jalur: Beginner (kana) atau N5 konten dasar.</p>
        </div>
        <Badge tone="info">Step 1</Badge>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1 text-sm">
          <span className="text-slate-700">Nama tampilan</span>
          <input
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none"
            placeholder="Isi nama kamu"
          />
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-slate-700">Target harian (menit)</span>
          <input
            type="number"
            min={5}
            max={90}
            value={targetMinutes}
            onChange={(e) => setTargetMinutes(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none"
          />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-800">Pilih jalur</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setTrack("beginner")}
              className={`rounded-lg border px-3 py-3 text-left text-sm ${
                track === "beginner"
                  ? "border-brand-500 bg-brand-50 text-brand-700"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="font-semibold">Beginner</div>
              <p className="text-xs text-slate-500">Hiragana & Katakana dasar</p>
            </button>
            <button
              type="button"
              onClick={() => setTrack("n5")}
              className={`rounded-lg border px-3 py-3 text-left text-sm ${
                track === "n5"
                  ? "border-brand-500 bg-brand-50 text-brand-700"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="font-semibold">N5</div>
              <p className="text-xs text-slate-500">Vocab, kanji, grammar dasar</p>
            </button>
          </div>
          <p className="text-xs text-slate-500">
            Beginner fokus kana saja; konten lain lanjut di jalur N5.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-800">Fokus skill</p>
          <div className="flex flex-wrap gap-2">
            {skillOptions.map((skill) => {
              const active = selectedFocuses.includes(skill.value);
              return (
                <button
                  key={skill.value}
                  type="button"
                  onClick={() => toggleFocus(skill.value)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                    active
                      ? "border-brand-500 bg-brand-50 text-brand-700"
                      : "border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {skill.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-800">Status saat ini</p>
          <p className="text-xs text-slate-500">
            {profile.name} · {profile.focuses.join(", ")} · {profile.targetMinutes}m/hari
          </p>
        </div>
        <Button className="px-4" onClick={handleSave}>
          Simpan preferensi
        </Button>
      </div>
    </Card>
  );
}
