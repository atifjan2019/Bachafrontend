import { apiClient } from "./client";

/**
 * Uploads a payment receipt/screenshot (image or PDF) to the backend and
 * returns its public URL, to be attached to a non-COD order.
 */
export async function uploadReceipt(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("folder", "receipts");
  const { data } = await apiClient.post<{ url: string }>("/upload", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.url;
}
