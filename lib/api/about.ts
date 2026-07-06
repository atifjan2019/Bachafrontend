import { apiClient } from "./client";

export interface TeamMember {
  title: string;
  subtitle?: string | null;
  bio?: string | null;
  /** Icon key mapped to a lucide-react component on the About page. */
  icon?: string | null;
  image?: string | null;
}

export interface Founder {
  name: string;
  role?: string | null;
  bio?: string | null;
  image?: string | null;
  initials?: string | null;
}

export interface Story {
  heading?: string | null;
  accent?: string | null;
  body?: string | null;
  location?: string | null;
  image?: string | null;
}

export interface AboutContent {
  team: TeamMember[];
  founder: Founder;
  story: Story;
}

/**
 * Dynamic About-page content (team structure + founder) managed from the admin.
 * Returns null on failure so the page can fall back to static defaults.
 */
export async function getAbout(): Promise<AboutContent | null> {
  try {
    const res = await apiClient.get<{ data: AboutContent }>("/about");
    return res.data.data;
  } catch {
    return null;
  }
}
