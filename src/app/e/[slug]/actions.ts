"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { RsvpSchema } from "@/lib/validation";

export type RsvpState = { error?: string } | undefined;

export async function claimPublicFoodItemAction(
  slug: string,
  itemId: string,
  guestName: string,
  token: string | null,
): Promise<{ error?: string } | undefined> {
  const name = guestName.trim();
  if (!name) return { error: "Type your name first." };

  const supabase = await createClient();
  const { error } = await supabase.rpc("claim_public_food_item", {
    p_slug: slug,
    p_item_id: itemId,
    p_guest_name: name,
    p_invite_token: token ?? "",
  });

  if (error) return { error: error.message };
  revalidatePath(`/e/${slug}`);
}

export async function submitRsvpAction(
  slug: string,
  token: string | null,
  _prev: RsvpState,
  formData: FormData,
): Promise<RsvpState> {
  const parsed = RsvpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email") || "",
    rsvp_status: formData.get("rsvp_status"),
    party_size: formData.get("party_size") ?? 1,
    dietary_restrictions: formData.get("dietary_restrictions") || undefined,
    note: formData.get("note") || undefined,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check your responses." };
  }

  const supabase = await createClient();
  const { error } = await supabase.rpc("submit_public_rsvp", {
    p_slug: slug,
    p_name: parsed.data.name,
    p_email: parsed.data.email || "",
    p_rsvp_status: parsed.data.rsvp_status,
    p_party_size: parsed.data.party_size,
    p_dietary_restrictions: parsed.data.dietary_restrictions ?? "",
    p_note: parsed.data.note ?? "",
    p_invite_token: token ?? "",
  });

  if (error) return { error: error.message };

  revalidatePath(`/e/${slug}`);
  redirect(`/e/${slug}/confirmation`);
}
