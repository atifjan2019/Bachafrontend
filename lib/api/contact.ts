import { apiClient } from "./client";

export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/** Submits a contact-form message to the backend (stored + emailed to admin). */
export async function submitContact(input: ContactInput): Promise<void> {
  await apiClient.post("/contact", input);
}
