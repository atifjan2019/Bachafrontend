import { apiClient } from "./client";

export interface Settings {
  business_name?: string;
  business_email?: string;
  business_phone?: string;
  business_address?: string;
  logo_url?: string;
  footer_logo_url?: string;
  favicon_url?: string;
  facebook_url?: string;
  instagram_url?: string;
  tiktok_url?: string;
  whatsapp_number?: string;
  shipping_fee?: string;
  free_shipping_threshold?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  og_image?: string;
  canonical_base_url?: string;
  home_highlight_title?: string;
  home_highlight_description?: string;
  home_highlight_image?: string;
  home_highlight_button?: string;
  home_highlight_link?: string;
  /** Entry intro banner/video shown over the hero. "1" = enabled. */
  intro_enabled?: string;
  /** Which media drives the hero background: "image" | "video". */
  intro_bg_type?: string;
  intro_title?: string;
  intro_subtitle?: string;
  intro_image?: string;
  /** Direct video file URL (.mp4/.webm) played inline when Play is clicked. */
  intro_video_url?: string;
  /** Facebook/Instagram/TikTok link opened when no inline video is set. */
  intro_social_url?: string;
  intro_button_text?: string;
  // Checkout payment method toggles ("0" = disabled; missing/other = enabled)
  cod_enabled?: string;
  bank_transfer_enabled?: string;
  easypaisa_enabled?: string;
  jazzcash_enabled?: string;
  // Checkout payment details (shown per method)
  bank_name?: string;
  bank_account_title?: string;
  bank_account_number?: string;
  bank_iban?: string;
  easypaisa_account_name?: string;
  easypaisa_number?: string;
  jazzcash_account_name?: string;
  jazzcash_number?: string;
  footer_about?: string;
}

export async function getSettings(): Promise<Settings> {
  const { data } = await apiClient.get<{ data: Settings }>("/settings");
  return data.data;
}

/** Subscribe an email to the newsletter (stored in the backend for the admin). */
export async function subscribeNewsletter(email: string): Promise<void> {
  await apiClient.post("/newsletter", { email });
}
