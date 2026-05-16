"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { FoodItemSchema } from "@/lib/validation";
import { parseMoneyToCents } from "@/lib/money";
import type { FoodCategory, FoodStatus } from "@/lib/types";

type ActionResult = { error?: string } | undefined;

function pickItem(formData: FormData) {
  const qtyRaw = String(formData.get("quantity") ?? "").trim();
  const quantity =
    qtyRaw === "" ? null : Number.isFinite(Number(qtyRaw)) ? Number(qtyRaw) : null;
  return {
    name: String(formData.get("name") ?? "").trim(),
    category: (formData.get("category") || "other_supplies") as FoodCategory,
    quantity,
    unit: String(formData.get("unit") ?? "").trim() || null,
    needed_count: Number(formData.get("needed_count") ?? 1),
    estimated_cost_cents: parseMoneyToCents(formData.get("estimated_cost")),
    is_guest_claimable: formData.get("is_guest_claimable") === "on",
    status: (formData.get("status") || "needed") as FoodStatus,
    notes: String(formData.get("notes") ?? "").trim() || null,
  };
}

export async function addFoodItemAction(
  eventId: string,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = FoodItemSchema.safeParse(pickItem(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const supabase = await createClient();
  const { error } = await supabase.from("food_supply_items").insert({
    event_id: eventId,
    name: parsed.data.name,
    category: parsed.data.category,
    quantity: parsed.data.quantity ?? null,
    unit: parsed.data.unit ?? null,
    needed_count: parsed.data.needed_count,
    estimated_cost_cents: parsed.data.estimated_cost_cents ?? null,
    is_guest_claimable: parsed.data.is_guest_claimable,
    status: parsed.data.status,
    notes: parsed.data.notes ?? null,
  });
  if (error) return { error: error.message };
  revalidatePath(`/app/events/${eventId}/food-supplies`);
  revalidatePath(`/app/events/${eventId}`);
}

export async function updateFoodItemAction(
  eventId: string,
  itemId: string,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = FoodItemSchema.safeParse(pickItem(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const supabase = await createClient();
  const { error } = await supabase
    .from("food_supply_items")
    .update({
      name: parsed.data.name,
      category: parsed.data.category,
      quantity: parsed.data.quantity ?? null,
      unit: parsed.data.unit ?? null,
      needed_count: parsed.data.needed_count,
      estimated_cost_cents: parsed.data.estimated_cost_cents ?? null,
      is_guest_claimable: parsed.data.is_guest_claimable,
      status: parsed.data.status,
      notes: parsed.data.notes ?? null,
    })
    .eq("id", itemId)
    .eq("event_id", eventId);
  if (error) return { error: error.message };
  revalidatePath(`/app/events/${eventId}/food-supplies`);
  revalidatePath(`/app/events/${eventId}`);
}

export async function deleteFoodItemAction(
  eventId: string,
  itemId: string,
): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("food_supply_items")
    .delete()
    .eq("id", itemId)
    .eq("event_id", eventId);
  if (error) return { error: error.message };
  revalidatePath(`/app/events/${eventId}/food-supplies`);
  revalidatePath(`/app/events/${eventId}`);
}

export async function updateFoodStatusAction(
  eventId: string,
  itemId: string,
  status: FoodStatus,
): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("food_supply_items")
    .update({ status })
    .eq("id", itemId)
    .eq("event_id", eventId);
  if (error) return { error: error.message };
  revalidatePath(`/app/events/${eventId}/food-supplies`);
  revalidatePath(`/app/events/${eventId}`);
}

export async function hostClaimFoodItemAction(
  eventId: string,
  itemId: string,
  claimedByName: string | null,
): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: row, error: fetchErr } = await supabase
    .from("food_supply_items")
    .select("needed_count, claimed_count")
    .eq("id", itemId)
    .eq("event_id", eventId)
    .maybeSingle();
  if (fetchErr || !row) return { error: fetchErr?.message ?? "Item not found" };

  const update: {
    claimed_count: number;
    claimed_by_name: string | null;
    status?: FoodStatus;
  } = {
    claimed_count: claimedByName == null ? 0 : Math.min(row.needed_count, 1),
    claimed_by_name: claimedByName,
  };
  if (claimedByName == null) update.status = "needed";
  else update.status = "claimed";

  const { error } = await supabase
    .from("food_supply_items")
    .update(update)
    .eq("id", itemId)
    .eq("event_id", eventId);
  if (error) return { error: error.message };
  revalidatePath(`/app/events/${eventId}/food-supplies`);
  revalidatePath(`/app/events/${eventId}`);
}
