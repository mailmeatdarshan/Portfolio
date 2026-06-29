"use server";

import { addEntry, deleteEntry } from "@/lib/guestbook";

export async function addGuestbookEntryAction(name: string, handle: string, message: string) {
  // Validate fields server-side
  if (!name.trim() || !message.trim()) {
    return { success: false, error: "Name and message are required." };
  }
  if (name.length > 50) {
    return { success: false, error: "Name must be under 50 characters." };
  }
  if (message.length > 280) {
    return { success: false, error: "Message must be under 280 characters." };
  }

  try {
    const id = await addEntry(name, handle, message);
    return { success: true, id };
  } catch (error: any) {
    console.error("Server Action addGuestbookEntry error:", error);
    return { success: false, error: error.message || "Failed to submit message." };
  }
}

export async function deleteGuestbookEntryAction(id: string, key: string) {
  const adminSecret = process.env.ADMIN_SECRET_KEY;
  if (!adminSecret || key !== adminSecret) {
    return { success: false, error: "Unauthorized: Invalid admin secret key." };
  }

  try {
    await deleteEntry(id);
    return { success: true };
  } catch (error: any) {
    console.error("Server Action deleteGuestbookEntry error:", error);
    return { success: false, error: error.message || "Failed to delete message." };
  }
}

export async function verifyAdminKeyAction(key: string) {
  const adminSecret = process.env.ADMIN_SECRET_KEY;
  return adminSecret && key === adminSecret;
}
