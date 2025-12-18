"use client";

import { apiFetch } from "./api-client";
import { Question } from "./types";

export type PracticeMode = "beginner" | "n5" | "kanji" | "placement";

export type PracticeAttempt = {
  id: string;
  userId?: string;
  score: number;
  total: number;
  mode: string;
  track?: string;
  createdAt?: string;
  CreatedAt?: string;
  created_at?: string;
};

export type PracticeAnswerResponse = {
  questionId: string;
  questionOrdinal?: number;
  promptSnapshot?: string;
  type?: string;
  selected?: string;
  correct?: string;
  isCorrect?: boolean;
};

export async function fetchQuestions(mode: PracticeMode, token: string, opts?: { index?: number }) {
  const params = new URLSearchParams({ mode });
  if (typeof opts?.index === "number") {
    params.set("index", String(opts.index));
  }
  return apiFetch<Question[]>(`/practice/questions?${params.toString()}`, { token });
}

export async function submitAnswers(
  mode: PracticeMode,
  answers: { questionId: string; selected: string }[],
  token: string
) {
  return apiFetch<{ score: number; total: number; passed: boolean; answers: PracticeAnswerResponse[] }>(
    "/practice/submit",
    { method: "POST", token, body: { mode, answers } }
  );
}

export async function fetchHistory(token: string) {
  return apiFetch<PracticeAttempt[]>("/practice/history", { token });
}

export async function fetchPlacementQuestions(token: string) {
  return apiFetch<Question[]>("/placement/questions", { token });
}
