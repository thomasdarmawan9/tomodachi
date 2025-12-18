"use client";

import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { defaultProfile, flashcardsSeed, tracks as trackSeed } from "../data";
import { fetchTracks, fetchUnits, updateUnitStatus } from "../tracks-api";
import type { Flashcard, LearningTrack, Profile, TrackKey } from "../types";

type TrackStatus = "idle" | "loading" | "succeeded" | "failed";

interface LearningState {
  profile: Profile;
  tracks: LearningTrack[];
  flashcards: Flashcard[];
  reviewedToday: number;
  onboardingComplete: boolean;
  tracksStatus: TrackStatus;
  tracksError?: string;
}

const initialState: LearningState = {
  profile: defaultProfile,
  tracks: trackSeed,
  flashcards: flashcardsSeed,
  reviewedToday: 0,
  onboardingComplete: false,
  tracksStatus: "idle",
  tracksError: undefined
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

export const fetchTracksThunk = createAsyncThunk<LearningTrack[], string, { rejectValue: string }>(
  "learning/fetchTracks",
  async (token, { rejectWithValue }) => {
    try {
      const trackList = await fetchTracks(token);
      const withUnits = await Promise.all(
        trackList.map(async (track) => {
          const units = await fetchUnits(track.id, token);
          return { ...track, units: units.map((u) => ({ ...u, lessons: u.lessons || [] })) };
        })
      );
      return withUnits;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : "Gagal memuat track");
    }
  }
);

export const persistUnitStatusThunk = createAsyncThunk<
  { trackId: TrackKey; unitId: string; status: "in_progress" | "completed" },
  { trackId: TrackKey; unitId: string; status: "in_progress" | "completed"; token: string },
  { rejectValue: string }
>("learning/persistUnitStatus", async ({ trackId, unitId, status, token }, { rejectWithValue }) => {
  try {
    await updateUnitStatus(unitId, status, token);
    return { trackId, unitId, status };
  } catch (err) {
    return rejectWithValue(err instanceof Error ? err.message : "Gagal update status unit");
  }
});

const learningSlice = createSlice({
  name: "learning",
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<Profile | undefined>) {
      state.profile = action.payload ?? defaultProfile;
    },
    updateProfile(state, action: PayloadAction<Partial<Profile>>) {
      state.profile = { ...state.profile, ...action.payload };
    },
    markUnit(
      state,
      action: PayloadAction<{ trackId: TrackKey; unitId: string; status: "in_progress" | "completed" }>
    ) {
      const { trackId, unitId, status } = action.payload;
      state.tracks = state.tracks.map((track) =>
        track.id === trackId
          ? {
              ...track,
              units: track.units.map((unit) =>
                unit.id === unitId ? { ...unit, status } : unit
              )
            }
          : track
      );
    },
    gradeCard(state, action: PayloadAction<{ cardId: string; quality: "again" | "good" | "easy" }>) {
      state.flashcards = state.flashcards.map((card) =>
        card.id === action.payload.cardId ? updateSrs(card, action.payload.quality) : card
      );
      const gainedXp = action.payload.quality === "easy" ? 12 : action.payload.quality === "good" ? 8 : 4;
      state.reviewedToday += 1;
      state.profile = { ...state.profile, xp: state.profile.xp + gainedXp };
    },
    completeOnboarding(state) {
      state.onboardingComplete = true;
    },
    setOnboardingComplete(state, action: PayloadAction<boolean>) {
      state.onboardingComplete = action.payload;
    },
    setTracks(state, action: PayloadAction<LearningTrack[]>) {
      state.tracks = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracksThunk.pending, (state) => {
        state.tracksStatus = "loading";
        state.tracksError = undefined;
      })
      .addCase(fetchTracksThunk.fulfilled, (state, action) => {
        state.tracksStatus = "succeeded";
        state.tracks = action.payload;
      })
      .addCase(fetchTracksThunk.rejected, (state, action) => {
        state.tracksStatus = "failed";
        state.tracksError = action.payload ?? "Gagal memuat track";
      })
      .addCase(persistUnitStatusThunk.fulfilled, (state, action) => {
        const { trackId, unitId, status } = action.payload;
        state.tracks = state.tracks.map((track) =>
          track.id === trackId
            ? {
                ...track,
                units: track.units.map((unit) =>
                  unit.id === unitId ? { ...unit, status } : unit
                )
              }
            : track
        );
      });
  }
});

export const {
  setProfile,
  updateProfile,
  markUnit,
  gradeCard,
  completeOnboarding,
  setOnboardingComplete,
  setTracks
} = learningSlice.actions;

export default learningSlice.reducer;
