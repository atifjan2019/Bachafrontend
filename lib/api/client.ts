import axios from "axios";
import Cookies from "js-cookie";

const isVercelLocalFallback = !!process.env.VERCEL && (process.env.NEXT_PUBLIC_API_URL?.includes("127.0.0.1") || process.env.NEXT_PUBLIC_API_URL?.includes("localhost"));

export const USE_MOCKS =
  isVercelLocalFallback || (process.env.NEXT_PUBLIC_USE_MOCKS ?? "false").toString() === "true";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "https://admin.bachastylo.com/api/v1",
  timeout: 15000,
  headers: { Accept: "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? Cookies.get("bsf_token") : undefined;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (r) => r,
  (error) => {
    if (error?.response?.status === 401 && typeof window !== "undefined") {
      Cookies.remove("bsf_token");
    }
    return Promise.reject(error);
  }
);

export function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
