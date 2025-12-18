"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import dashboardReducer from "./dashboard-slice";
import learningReducer from "./learning-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    learning: learningReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
