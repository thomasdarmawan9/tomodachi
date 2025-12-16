"use client";

import { apiFetch } from "./api-client";
import { LearningTrack, TrackUnit } from "./types";

export async function fetchTracks(token: string) {
  return apiFetch<LearningTrack[]>("/tracks", { token });
}

export async function fetchUnits(trackId: string, token: string) {
  return apiFetch<TrackUnit[]>(`/tracks/${trackId}/units`, { token });
}

export async function updateUnitStatus(unitId: string, status: "in_progress" | "completed", token: string) {
  return apiFetch(`/units/${unitId}/status`, {
    method: "POST",
    token,
    body: { status }
  });
}

export async function fetchNextUnit(trackId: string, token: string) {
  return apiFetch<{ unit: TrackUnit | null }>(`/tracks/${trackId}/next-unit`, { token });
}
