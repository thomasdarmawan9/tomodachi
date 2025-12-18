"use client";

import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchHistory, type PracticeAttempt } from "../practice-api";
import { fetchNextUnit } from "../tracks-api";
import type { TrackKey, TrackUnit } from "../types";

interface DashboardState {
  history: PracticeAttempt[];
  nextUnit: TrackUnit | null;
  loading: boolean;
  error?: string;
}

const initialState: DashboardState = {
  history: [],
  nextUnit: null,
  loading: false,
  error: undefined
};

export const loadDashboardData = createAsyncThunk<
  { history: PracticeAttempt[]; nextUnit: TrackUnit | null },
  { token: string; track: TrackKey },
  { rejectValue: string }
>("dashboard/load", async ({ token, track }, { rejectWithValue }) => {
  try {
    const [history, next] = await Promise.all([fetchHistory(token), fetchNextUnit(track, token)]);
    return { history: history.slice(0, 5), nextUnit: next.unit || null };
  } catch (err) {
    return rejectWithValue(err instanceof Error ? err.message : "Gagal memuat data beranda");
  }
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearDashboard(state) {
      state.history = [];
      state.nextUnit = null;
      state.error = undefined;
      state.loading = false;
    },
    setNextUnit(state, action: PayloadAction<TrackUnit | null>) {
      state.nextUnit = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadDashboardData.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(loadDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload.history;
        state.nextUnit = action.payload.nextUnit;
      })
      .addCase(loadDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Gagal memuat data beranda";
      });
  }
});

export const { clearDashboard, setNextUnit } = dashboardSlice.actions;
export default dashboardSlice.reducer;
