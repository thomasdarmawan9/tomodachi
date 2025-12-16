"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { apiFetch } from "./api-client";
import { Profile } from "./types";
import { useLearning } from "./learning-context";

type AuthUser = {
  id: string;
  email: string;
};

type AuthState = {
  user: AuthUser | null;
  profile: (Profile & { onboardingComplete?: boolean }) | null;
  token: string | null;
  loading: boolean;
  error?: string;
  login: (params: { email: string; password: string }) => Promise<void>;
  signup: (params: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

const TOKEN_KEY = "auth_token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<AuthState["profile"]>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const learning = useLearning();

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
    if (stored) {
      setToken(stored);
      void fetchMe(stored);
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMe = useCallback(async (tokenToUse: string) => {
    try {
      setLoading(true);
      const data = await apiFetch<{
        id: string;
        userId: string;
        user?: { id: string; email: string };
        name: string;
        track: Profile["track"];
        targetMinutes: number;
        focuses: Profile["focuses"];
        streakDays: number;
        xp: number;
        onboardingComplete?: boolean;
      }>("/auth/me", { token: tokenToUse });

      const normalizedProfile: Profile & { onboardingComplete?: boolean } = {
        name: data.name,
        track: data.track,
        targetMinutes: data.targetMinutes,
        focuses: data.focuses,
        streakDays: data.streakDays,
        xp: data.xp,
        onboardingComplete: data.onboardingComplete
      };
      const pickedUser = data.user
        ? { id: data.user.id, email: data.user.email }
        : { id: data.userId, email: "" };
      setUser(pickedUser);
      setProfile(normalizedProfile);
      learning.setProfile(normalizedProfile);
      learning.setOnboardingComplete(Boolean(data.onboardingComplete));
      setError(undefined);
    } catch (err) {
      console.error("fetchMe failed", err);
      setError(err instanceof Error ? err.message : "Gagal memuat profil");
    } finally {
      setLoading(false);
    }
  }, [learning]);

  const login = useCallback(async ({ email, password }: { email: string; password: string }) => {
    setError(undefined);
    try {
      const resp = await apiFetch<{ token: string; user: AuthUser }>("/auth/login", {
        method: "POST",
        body: { email, password }
      });
      localStorage.setItem(TOKEN_KEY, resp.token);
      setToken(resp.token);
      setUser(resp.user);
      await fetchMe(resp.token);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal masuk";
      setError(msg);
      throw err;
    }
  }, [fetchMe]);

  const signup = useCallback(async ({ name, email, password }: { name: string; email: string; password: string }) => {
    setError(undefined);
    try {
      const resp = await apiFetch<{ token: string; user: AuthUser }>("/auth/signup", {
        method: "POST",
        body: { name, email, password }
      });
      localStorage.setItem(TOKEN_KEY, resp.token);
      setToken(resp.token);
      setUser(resp.user);
      await fetchMe(resp.token);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal daftar";
      setError(msg);
      throw err;
    }
  }, [fetchMe]);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setProfile(null);
    localStorage.removeItem(TOKEN_KEY);
    learning.setProfile(undefined);
    learning.setOnboardingComplete(false);
  }, [learning]);

  const refreshProfile = useCallback(async () => {
    if (!token) return;
    await fetchMe(token);
  }, [token, fetchMe]);

  const value: AuthState = useMemo(
    () => ({
      user,
      profile,
      token,
      loading,
      error,
      login,
      signup,
      logout,
      refreshProfile
    }),
    [user, profile, token, loading, error, login, signup, logout, refreshProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
