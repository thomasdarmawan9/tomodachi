"use client";

import { useMemo } from "react";
import { useLearning } from "@/lib/learning-context";
import { Lesson, TrackKey } from "@/lib/types";
import { useTonePlayer } from "@/hooks/useTonePlayer";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { QuizCard } from "../quiz/QuizCard";

function LessonRow({
  lesson,
  onPlay
}: {
  lesson: Lesson;
  onPlay: (audioHint: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-slate-100 px-3 py-2 bg-slate-50">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-slate-900">{lesson.title}</p>
        <div className="flex gap-2">
          <Badge tone="info">{lesson.estimatedMinutes}m</Badge>
          <Badge tone={lesson.level === "beginner" ? "warning" : "info"}>
            {lesson.level === "beginner" ? "Kana" : "N5"}
          </Badge>
        </div>
      </div>
      <p className="text-xs text-slate-600">{lesson.summary}</p>
      <div className="flex flex-wrap gap-2 text-xs text-slate-500">
        {lesson.skillTags.map((tag) => (
          <span key={tag} className="rounded-full bg-white border px-2 py-1">
            {tag}
          </span>
        ))}
        {lesson.audioHint ? (
          <Button
            type="button"
            variant="ghost"
            className="text-xs px-2 py-1"
            onClick={() => onPlay(lesson.audioHint!)}
          >
            ▶ Audio
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export function TrackBoard({ activeTrack }: { activeTrack: TrackKey }) {
  const { tracks, markUnit } = useLearning();
  const { playTone } = useTonePlayer();

  const orderedTracks = useMemo(() => {
    const clone = [...tracks];
    return clone.sort((a, b) =>
      a.id === "beginner" ? -1 : b.id === "beginner" ? 1 : 0
    );
  }, [tracks]);

  const handleMark = (trackId: TrackKey, unitId: string) => {
    markUnit(trackId, unitId, "completed");
  };

  const visibleTracks = orderedTracks.filter((track) => track.id === activeTrack);

  if (!visibleTracks.length) {
    return (
      <Card className="w-full bg-slate-50 text-slate-700">
        Track belum tersedia. Pilih Beginner atau N5 untuk melihat konten yang aktif.
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {visibleTracks.map((track) => {
        const highlightLesson = track.units[0]?.lessons[0];
        const isBeginner = track.id === "beginner";
        const bg =
          isBeginner
            ? "bg-gradient-to-r from-amber-100 via-white to-amber-50 border-amber-100"
            : "bg-gradient-to-r from-sky-100 via-white to-sky-50 border-sky-100";
        return (
          <Card key={track.id} className={`space-y-4 w-full ${bg}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="section-title">{track.title}</p>
                <p className="muted">{track.description}</p>
              </div>
              <Badge tone={isBeginner ? "warning" : "info"}>
                {isBeginner ? "Beginner" : "N5"}
              </Badge>
            </div>

            <div className="space-y-3">
              {track.units.map((unit) => (
                <div
                  key={unit.id}
                  className={`rounded-xl p-3 border ${
                    isBeginner
                      ? "border-amber-200 bg-white/70"
                      : "border-sky-200 bg-white/70"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {unit.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        {unit.lessons.length} pelajaran · status:{" "}
                        {unit.status.replace("_", " ")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge tone={unit.status === "completed" ? "success" : "info"}>
                        {unit.status === "completed" ? "Selesai" : "Belajar"}
                      </Badge>
                      <Button
                        variant="ghost"
                        className="text-xs"
                        onClick={() => handleMark(track.id, unit.id)}
                      >
                        Tandai selesai
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2 space-y-2">
                    {unit.lessons.slice(0, 2).map((lesson) => (
                      <LessonRow
                        key={lesson.id}
                        lesson={lesson}
                        onPlay={(hint) => playTone(hint)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {highlightLesson && highlightLesson.quiz.length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-800">Contoh kuis</p>
                <QuizCard item={highlightLesson.quiz[0]} />
              </div>
            ) : null}
          </Card>
        );
      })}
    </div>
  );
}
