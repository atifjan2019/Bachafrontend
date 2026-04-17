"use client";
import { create } from "zustand";
import type { User } from "@/types";
import { getStoredUser, logout as apiLogout } from "@/lib/api/auth";

type AuthState = {
  user: User | null;
  hydrated: boolean;
  setUser: (u: User | null) => void;
  hydrate: () => void;
  signOut: () => void;
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  hydrated: false,
  setUser: (u) => set({ user: u }),
  hydrate: () => {
    if (typeof window === "undefined") return;
    const user = getStoredUser();
    set({ user, hydrated: true });
  },
  signOut: () => {
    apiLogout();
    set({ user: null });
  },
}));
