"use client";

import { createContext, useContext, useMemo, useReducer } from "react";
import { defaultProfile, flashcardsSeed, tracks as trackSeed } from "./data";
import type {
  Flashcard,
  LearningTrack,
  Profile,
  TrackKey
} from "./types";

interface LearningState {
  profile: Profile;
  tracks: LearningTrack[];
  flashcards: Flashcard[];
  reviewedToday: number;
  onboardingComplete: boolean;
}

type Action =
  | { type: "setProfile"; payload?: Profile }
  | { type: "updateProfile"; payload: Partial<Profile> }
  | {
      type: "updateTrackStatus";
      payload: { trackId: TrackKey; unitId: string; status: "in_progress" | "completed" };
    }
  | {
      type: "gradeCard";
      payload: { cardId: string; quality: "again" | "good" | "easy" };
    }
  | { type: "completeOnboarding" }
  | { type: "setOnboardingComplete"; payload: boolean };

const LearningContext = createContext<
  | (LearningState & {
      setProfile: (profile?: Profile) => void;
      updateProfile: (patch: Partial<Profile>) => void;
      markUnit: (trackId: TrackKey, unitId: string, status: "in_progress" | "completed") => void;
      gradeCard: (cardId: string, quality: "again" | "good" | "easy") => void;
      completeOnboarding: () => void;
      setOnboardingComplete: (value: boolean) => void;
    })
  | undefined
>(undefined);

const initialState: LearningState = {
  profile: defaultProfile,
  tracks: trackSeed,
  flashcards: flashcardsSeed,
  reviewedToday: 0,
  onboardingComplete: false
};

function updateSrs(card: Flashcard, quality: "again" | "good" | "easy"): Flashcard {
  const qualityScore = quality === "again" ? 0 : quality === "good" ? 1 : 2;
  const baseEaseDelta = (qualityScore - 1) * 0.15;
  const nextEase = Math.max(1.3, card.ease + baseEaseDelta);
  const nextInterval =
    quality === "again"
      ? 1
      : Math.max(1, Math.round(card.intervalDays * (nextEase + (quality === "easy" ? 0.15 : 0))));
  const nextDue = Date.now() + nextInterval * 24 * 60 * 60 * 1000;

  return {
    ...card,
    ease: Number(nextEase.toFixed(2)),
    intervalDays: nextInterval,
    due: nextDue
  };
}

function reducer(state: LearningState, action: Action): LearningState {
  switch (action.type) {
    case "setProfile": {
      if (!action.payload) return { ...state, profile: defaultProfile };
      return { ...state, profile: action.payload };
    }
    case "updateProfile": {
      return { ...state, profile: { ...state.profile, ...action.payload } };
    }
    case "updateTrackStatus": {
      const { trackId, unitId, status } = action.payload;
      const updatedTracks = state.tracks.map((track) => {
        if (track.id !== trackId) return track;
        return {
          ...track,
          units: track.units.map((unit) =>
            unit.id === unitId ? { ...unit, status } : unit
          )
        };
      });
      return { ...state, tracks: updatedTracks };
    }
    case "gradeCard": {
      const updatedCards = state.flashcards.map((card) =>
        card.id === action.payload.cardId
          ? updateSrs(card, action.payload.quality)
          : card
      );
      const gainedXp = action.payload.quality === "easy" ? 12 : action.payload.quality === "good" ? 8 : 4;
      return {
        ...state,
        flashcards: updatedCards,
        reviewedToday: state.reviewedToday + 1,
        profile: { ...state.profile, xp: state.profile.xp + gainedXp }
      };
    }
    case "completeOnboarding": {
      return { ...state, onboardingComplete: true };
    }
    case "setOnboardingComplete": {
      return { ...state, onboardingComplete: action.payload };
    }
    default:
      return state;
  }
}

export function LearningProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(
    () => ({
      ...state,
      setProfile: (profile?: Profile) =>
        dispatch({ type: "setProfile", payload: profile }),
      updateProfile: (patch: Partial<Profile>) =>
        dispatch({ type: "updateProfile", payload: patch }),
      markUnit: (trackId: TrackKey, unitId: string, status: "in_progress" | "completed") =>
        dispatch({ type: "updateTrackStatus", payload: { trackId, unitId, status } }),
      gradeCard: (cardId: string, quality: "again" | "good" | "easy") =>
        dispatch({ type: "gradeCard", payload: { cardId, quality } }),
      completeOnboarding: () => dispatch({ type: "completeOnboarding" }),
      setOnboardingComplete: (value: boolean) => dispatch({ type: "setOnboardingComplete", payload: value })
    }),
    [state]
  );

  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>;
}

export function useLearning() {
  const ctx = useContext(LearningContext);
  if (!ctx) {
    throw new Error("useLearning must be used within LearningProvider");
  }
  return ctx;
}
