import { apiClient } from "./client";
import type { User } from "@/types";
import Cookies from "js-cookie";

export type AuthApiResponse = { data: { user: User; token: string } };

export async function login(email: string, password: string) {
  const res = await apiClient.post<AuthApiResponse>("/auth/login", { email, password });
  const { user, token } = res.data.data;
  _persist(user, token);
  return { user, token };
}

export async function register(name: string, email: string, password: string) {
  const res = await apiClient.post<AuthApiResponse>("/auth/register", { name, email, password });
  const { user, token } = res.data.data;
  _persist(user, token);
  return { user, token };
}

/**
 * Request a password reset link. The backend always responds success (it
 * never reveals whether an email is registered), so the UI shows the same
 * "check your email" message regardless.
 */
export async function requestPasswordReset(email: string): Promise<void> {
  await apiClient.post("/auth/forgot-password", { email });
}

/** Complete a password reset using the token + email from the email link. */
export async function resetPassword(
  email: string,
  token: string,
  password: string,
  passwordConfirmation: string
): Promise<void> {
  await apiClient.post("/auth/reset-password", {
    email,
    token,
    password,
    password_confirmation: passwordConfirmation,
  });
}

export function logout() {
  Cookies.remove("bsf_token");
  if (typeof window !== "undefined") {
    localStorage.removeItem("bsf_user");
    delete apiClient.defaults.headers.common["Authorization"];
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
  const res = await apiClient.patch<{ data: User }>("/account/profile", patch);
  const user = res.data.data;
  if (typeof window !== "undefined") {
    localStorage.setItem("bsf_user", JSON.stringify(user));
  }
  return user;
}

function _persist(user: User, token: string) {
  Cookies.set("bsf_token", token, { expires: 7, sameSite: "lax" });
  if (typeof window !== "undefined") {
    localStorage.setItem("bsf_user", JSON.stringify(user));
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}

