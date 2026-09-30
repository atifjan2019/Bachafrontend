import axios from "axios";
import Cookies from "js-cookie";

const isVercelLocalFallback = !!process.env.VERCEL && (process.env.NEXT_PUBLIC_API_URL?.includes("127.0.0.1") || process.env.NEXT_PUBLIC_API_URL?.includes("localhost"));

export const USE_MOCKS =
  isVercelLocalFallback || (process.env.NEXT_PUBLIC_USE_MOCKS ?? "false").toString() === "true";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "https://admin.bachastylo.com/api/v1",
  timeout: 15000,
  headers: { 
    Accept: "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
    "Expires": "0"
  },
});

// Automatically retry requests if they hit Laravel's rate limit (capped)
const MAX_429_RETRIES = 2;
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    if (error.response?.status === 429 && config) {
      config.__retryCount = (config.__retryCount ?? 0) + 1;
      if (config.__retryCount <= MAX_429_RETRIES) {
        const retryAfter = parseInt(error.response.headers["retry-after"] ?? "2", 10);
        await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
        return apiClient.request(config);
      }
    }
    return Promise.reject(error);
  }
);

// The backend sits behind an edge cache that honours neither the s-maxage it
// sends nor the no-cache request headers above: a bare URL such as /categories
// can stay pinned to a HIT for hours, so subcategories added in the admin panel
// never reach the shop. Bucketing the timestamp gives every GET a URL that
// changes once a minute, which forces a fresh origin hit at the start of each
// bucket while the edge still absorbs everything after it.
const GET_FRESHNESS_MS = 60_000;

apiClient.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? Cookies.get("bsf_token") : undefined;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if ((config.method ?? "get").toLowerCase() === "get") {
    config.params = {
      ...(config.params ?? {}),
      _ts: Math.floor(Date.now() / GET_FRESHNESS_MS),
    };
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
