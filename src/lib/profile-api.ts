"use client";

import { apiFetch } from "./api-client";
import type { Profile } from "./types";

export async function updateProfileApi(
  payload: Partial<Pick<Profile, "name" | "track" | "targetMinutes" | "focuses">>,
  token: string
) {
  return apiFetch<Profile>("/profile", { method: "PUT", body: payload, token });
}

export async function completeOnboardingApi(token: string) {
  return apiFetch<void>("/profile/complete-onboarding", { method: "POST", token });
}
