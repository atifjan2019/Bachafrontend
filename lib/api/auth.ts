import { apiClient, USE_MOCKS, delay } from "./client";
import type { AuthResponse, User } from "@/types";
import Cookies from "js-cookie";

const MOCK_USER: User = {
  id: 1,
  name: "Ayesha Khan",
  email: "ayesha@example.com",
  phone: "03331234567",
  address: "House 14, Street 8, DHA Phase 5, Karachi",
};

export async function login(email: string, _password: string): Promise<AuthResponse> {
  if (USE_MOCKS) {
    await delay(300);
    const token = "mock_token_" + Math.random().toString(36).slice(2);
    const user = { ...MOCK_USER, email };
    Cookies.set("bsf_token", token, { expires: 7, sameSite: "lax" });
    if (typeof window !== "undefined") {
      localStorage.setItem("bsf_user", JSON.stringify(user));
    }
    return { user, token };
  }
  const res = await apiClient.post<AuthResponse>("/auth/login", { email, password: _password });
  Cookies.set("bsf_token", res.data.token, { expires: 7, sameSite: "lax" });
  if (typeof window !== "undefined") {
    localStorage.setItem("bsf_user", JSON.stringify(res.data.user));
  }
  return res.data;
}

export async function register(name: string, email: string, password: string): Promise<AuthResponse> {
  if (USE_MOCKS) {
    await delay(350);
    const token = "mock_token_" + Math.random().toString(36).slice(2);
    const user = { ...MOCK_USER, name, email };
    Cookies.set("bsf_token", token, { expires: 7, sameSite: "lax" });
    if (typeof window !== "undefined") {
      localStorage.setItem("bsf_user", JSON.stringify(user));
    }
    return { user, token };
  }
  const res = await apiClient.post<AuthResponse>("/auth/register", { name, email, password });
  Cookies.set("bsf_token", res.data.token, { expires: 7, sameSite: "lax" });
  if (typeof window !== "undefined") {
    localStorage.setItem("bsf_user", JSON.stringify(res.data.user));
  }
  return res.data;
}

export function logout() {
  Cookies.remove("bsf_token");
  if (typeof window !== "undefined") {
    localStorage.removeItem("bsf_user");
  }
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("bsf_user");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export async function updateProfile(patch: Partial<User>): Promise<User> {
  if (USE_MOCKS) {
    await delay(200);
    const current = getStoredUser() ?? MOCK_USER;
    const updated = { ...current, ...patch };
    if (typeof window !== "undefined") {
      localStorage.setItem("bsf_user", JSON.stringify(updated));
    }
    return updated;
  }
  const res = await apiClient.patch<{ data: User }>("/account/profile", patch);
  return res.data.data;
}
