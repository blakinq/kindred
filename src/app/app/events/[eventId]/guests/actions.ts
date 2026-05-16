"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { CreateGuestSchema } from "@/lib/validation";
import type { RsvpStatus } from "@/lib/types";

export async function addGuestAction(eventId: string, formData: FormData) {
  const parsed = CreateGuestSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email") || "",
    phone: formData.get("phone") || undefined,
    rsvp_status: formData.get("rsvp_status") || "invited",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const supabase = await createClient();
  const { error } = await supabase.from("guests").insert({
    event_id: eventId,
    name: parsed.data.name,
    email: parsed.data.email || null,
    phone: parsed.data.phone || null,
    rsvp_status: parsed.data.rsvp_status,
  });
  if (error) return { error: error.message };
  revalidatePath(`/app/events/${eventId}/guests`);
  revalidatePath(`/app/events/${eventId}`);
}

export async function bulkAddGuestsAction(eventId: string, raw: string) {
  if (!raw.trim()) return { error: "Paste at least one name or email" };
  const rows = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const toInsert = rows.map((row) => {
    // Try "Name <email>" or "Name, email" or just "email" or just "name"
    const angle = row.match(/^(.+?)\s*<\s*([^>]+)\s*>$/);
    if (angle) return { name: angle[1].trim(), email: angle[2].trim() };
    const comma = row.split(",").map((s) => s.trim());
    if (comma.length === 2 && comma[1].includes("@")) {
      return { name: comma[0], email: comma[1] };
    }
    if (row.includes("@")) return { name: row.split("@")[0], email: row };
    return { name: row, email: null as string | null };
  });

  const supabase = await createClient();
  const { error } = await supabase.from("guests").insert(
    toInsert.map((g) => ({
      event_id: eventId,
      name: g.name,
      email: g.email,
      rsvp_status: "invited" as RsvpStatus,
    })),
  );
  if (error) return { error: error.message };
  revalidatePath(`/app/events/${eventId}/guests`);
  revalidatePath(`/app/events/${eventId}`);
}

export async function updateGuestRsvpAction(
  eventId: string,
  guestId: string,
  status: RsvpStatus,
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("guests")
    .update({ rsvp_status: status, rsvp_updated_at: new Date().toISOString() })
    .eq("id", guestId)
    .eq("event_id", eventId);
  if (error) return { error: error.message };
  revalidatePath(`/app/events/${eventId}/guests`);
  revalidatePath(`/app/events/${eventId}`);
}

export async function deleteGuestAction(eventId: string, guestId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("guests")
    .delete()
    .eq("id", guestId)
    .eq("event_id", eventId);
  if (error) return { error: error.message };
  revalidatePath(`/app/events/${eventId}/guests`);
  revalidatePath(`/app/events/${eventId}`);
}
