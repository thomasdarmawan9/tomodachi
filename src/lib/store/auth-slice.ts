"use client";

import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { apiFetch } from "../api-client";
import type { Profile } from "../types";
import { setOnboardingComplete, setProfile as setLearningProfile } from "./learning-slice";

type AuthUser = {
  id: string;
  email: string;
};

type AuthProfile = (Profile & { onboardingComplete?: boolean }) | null;

type AuthState = {
  user: AuthUser | null;
  profile: AuthProfile;
  token: string | null;
  loading: boolean;
  initialized: boolean;
  error?: string;
};

const TOKEN_KEY = "auth_token";

type MeResponse = {
  id: string;
  userId: string;
  user?: { id: string; email: string };
  name: string;
  age: number;
  country: string;
  gender: "male" | "female";
  track: Profile["track"];
  targetMinutes: number;
  focuses: Profile["focuses"];
  streakDays: number;
  xp: number;
  onboardingComplete?: boolean;
};

const initialState: AuthState = {
  user: null,
  profile: null,
  token: null,
  loading: true,
  initialized: false,
  error: undefined
};

function normalizeProfile(data: MeResponse): Profile & { onboardingComplete?: boolean } {
  return {
    name: data.name,
    age: data.age,
    country: data.country,
    gender: data.gender,
    track: data.track,
    targetMinutes: data.targetMinutes,
    focuses: data.focuses,
    streakDays: data.streakDays,
    xp: data.xp,
    onboardingComplete: data.onboardingComplete
  };
}

async function fetchMe(token: string): Promise<{ user: AuthUser; profile: Profile & { onboardingComplete?: boolean } }> {
  const data = await apiFetch<MeResponse>("/auth/me", { token });
  const profile = normalizeProfile(data);
  const pickedUser = data.user ? { id: data.user.id, email: data.user.email } : { id: data.userId, email: "" };
  return { user: pickedUser, profile };
}

export const bootstrapAuth = createAsyncThunk<
  { token: string | null; user: AuthUser | null; profile: AuthProfile },
  void,
  { rejectValue: string }
>("auth/bootstrap", async (_, { dispatch, rejectWithValue }) => {
  const stored = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
  if (!stored) {
    dispatch(setLearningProfile(undefined));
    dispatch(setOnboardingComplete(false));
    return { token: null, user: null, profile: null };
  }
  try {
    const { user, profile } = await fetchMe(stored);
    dispatch(setLearningProfile(profile));
    dispatch(setOnboardingComplete(Boolean(profile.onboardingComplete)));
    return { token: stored, user, profile };
  } catch (err) {
    if (typeof window !== "undefined") localStorage.removeItem(TOKEN_KEY);
    return rejectWithValue(err instanceof Error ? err.message : "Gagal memuat profil");
  }
});

export const loginThunk = createAsyncThunk<
  { token: string; user: AuthUser; profile: AuthProfile },
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, { dispatch, rejectWithValue }) => {
  try {
    const resp = await apiFetch<{ token: string; user: AuthUser }>("/auth/login", {
      method: "POST",
      body: { email, password }
    });
    const { profile } = await fetchMe(resp.token);
    if (typeof window !== "undefined") localStorage.setItem(TOKEN_KEY, resp.token);
    if (profile) {
      dispatch(setLearningProfile(profile));
      dispatch(setOnboardingComplete(Boolean(profile.onboardingComplete)));
    }
    return { token: resp.token, user: resp.user, profile };
  } catch (err) {
    return rejectWithValue(err instanceof Error ? err.message : "Gagal masuk");
  }
});

export const signupThunk = createAsyncThunk<
  { token: string; user: AuthUser; profile: AuthProfile },
  { name: string; email: string; password: string; age: number; country: string; gender: "male" | "female" },
  { rejectValue: string }
>("auth/signup", async ({ name, email, password, age, country, gender }, { dispatch, rejectWithValue }) => {
  try {
    const resp = await apiFetch<{ token: string; user: AuthUser }>("/auth/signup", {
      method: "POST",
      body: { name, email, password, age, country, gender }
    });
    const { profile } = await fetchMe(resp.token);
    if (typeof window !== "undefined") localStorage.setItem(TOKEN_KEY, resp.token);
    if (profile) {
      dispatch(setLearningProfile(profile));
      dispatch(setOnboardingComplete(Boolean(profile.onboardingComplete)));
    }
    return { token: resp.token, user: resp.user, profile };
  } catch (err) {
    return rejectWithValue(err instanceof Error ? err.message : "Gagal daftar");
  }
});

export const refreshProfileThunk = createAsyncThunk<
  AuthProfile,
  { token: string },
  { rejectValue: string }
>("auth/refreshProfile", async ({ token }, { dispatch, rejectWithValue }) => {
  try {
    const { profile } = await fetchMe(token);
    dispatch(setLearningProfile(profile));
    dispatch(setOnboardingComplete(Boolean(profile?.onboardingComplete)));
    return profile;
  } catch (err) {
    return rejectWithValue(err instanceof Error ? err.message : "Gagal memuat profil");
  }
});

export const logoutThunk = createAsyncThunk("auth/logout", async (_, { dispatch }) => {
  if (typeof window !== "undefined") localStorage.removeItem(TOKEN_KEY);
  dispatch(setLearningProfile(undefined));
  dispatch(setOnboardingComplete(false));
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = undefined;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(bootstrapAuth.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(bootstrapAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.profile = action.payload.profile;
      })
      .addCase(bootstrapAuth.rejected, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.token = null;
        state.user = null;
        state.profile = null;
        state.error = action.payload ?? "Gagal memuat profil";
      })
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.profile = action.payload.profile;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Gagal masuk";
      })
      .addCase(signupThunk.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.profile = action.payload.profile;
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Gagal daftar";
      })
      .addCase(refreshProfileThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(refreshProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Gagal memuat profil";
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.profile = null;
        state.error = undefined;
        state.loading = false;
        state.initialized = true;
      });
  }
});

export const { clearAuthError, setToken } = authSlice.actions;
export default authSlice.reducer;
