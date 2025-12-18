"use client";

import { useMemo } from "react";
import {
  completeOnboarding,
  gradeCard,
  markUnit,
  setOnboardingComplete,
  setProfile,
  updateProfile
} from "./store/learning-slice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import type { Profile, TrackKey } from "./types";

export function LearningProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useLearning() {
  const dispatch = useAppDispatch();
  const learning = useAppSelector((state) => state.learning);

  const actions = useMemo(
    () => ({
      setProfile: (profile?: Profile) => dispatch(setProfile(profile)),
      updateProfile: (patch: Partial<Profile>) => dispatch(updateProfile(patch)),
      markUnit: (trackId: TrackKey, unitId: string, status: "in_progress" | "completed") =>
        dispatch(markUnit({ trackId, unitId, status })),
      gradeCard: (cardId: string, quality: "again" | "good" | "easy") =>
        dispatch(gradeCard({ cardId, quality })),
      completeOnboarding: () => dispatch(completeOnboarding()),
      setOnboardingComplete: (value: boolean) => dispatch(setOnboardingComplete(value))
    }),
    [dispatch]
  );

  return { ...learning, ...actions };
}
