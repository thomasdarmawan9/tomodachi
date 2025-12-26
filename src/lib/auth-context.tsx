"use client";

import { useEffect, useMemo } from "react";
import { clearDashboard } from "./store/dashboard-slice";
import {
  bootstrapAuth,
  loginThunk,
  logoutThunk,
  refreshProfileThunk,
  signupThunk
} from "./store/auth-slice";
import { useAppDispatch, useAppSelector } from "./store/hooks";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(bootstrapAuth());
  }, [dispatch]);

  return <>{children}</>;
}

export function useAuth() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const actions = useMemo(
    () => ({
      login: (params: { email: string; password: string }) => dispatch(loginThunk(params)).unwrap(),
      signup: (params: { name: string; email: string; password: string; age: number; country: string; gender: "male" | "female" }) =>
        dispatch(signupThunk(params)).unwrap(),
      logout: () => {
        void dispatch(logoutThunk());
        dispatch(clearDashboard());
      },
      refreshProfile: () => {
        if (!auth.token) return Promise.resolve();
        return dispatch(refreshProfileThunk({ token: auth.token })).unwrap();
      }
    }),
    [auth.token, dispatch]
  );

  return { ...auth, ...actions };
}
