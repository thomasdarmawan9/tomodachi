"use client";

import { apiFetch } from "./api-client";
import { Flashcard } from "./types";

export type GradeQuality = "again" | "good" | "easy";

export async function fetchDueFlashcards(token: string) {
  return apiFetch<Flashcard[]>("/srs/due", { token });
}

export async function gradeFlashcard(cardId: string, quality: GradeQuality, token: string) {
  return apiFetch<Flashcard>(`/srs/${cardId}/grade`, {
    method: "POST",
    token,
    body: { quality }
  });
}

export async function fetchSrsStats(token: string) {
  return apiFetch<{ reviewedToday: number; totalCards: number; dueCards: number }>("/srs/stats", { token });
}

export async function createCustomFlashcard(
  token: string,
  payload: { prompt: string; answer: string; level: "beginner" | "n5"; type: "kana" | "vocab" | "kanji" }
) {
  return apiFetch<Flashcard>("/srs/custom", { method: "POST", token, body: payload });
}
