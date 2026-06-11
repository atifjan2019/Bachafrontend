import { apiClient } from "./client";

export interface Settings {
  business_name?: string;
  business_email?: string;
  business_phone?: string;
  business_address?: string;
  logo_url?: string;
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
