"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { MenuItemSchema } from "@/lib/validation";
import type { DietaryTag, MenuCourse, MenuStatus } from "@/lib/types";

type ActionResult = { error?: string } | undefined;

function parseIntOrNull(v: FormDataEntryValue | null): number | null {
  if (v == null) return null;
  const s = String(v).trim();
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : null;
}

function pickMenuItem(formData: FormData) {
  const tags = formData
    .getAll("dietary_tags")
    .map((v) => String(v)) as DietaryTag[];
  const url = String(formData.get("recipe_url") ?? "").trim();
  return {
    name: String(formData.get("name") ?? "").trim(),
    course: (formData.get("course") || "main") as MenuCourse,
    serves: parseIntOrNull(formData.get("serves")),
    dietary_tags: tags,
    prep_time_minutes: parseIntOrNull(formData.get("prep_time_minutes")),
    cook_time_minutes: parseIntOrNull(formData.get("cook_time_minutes")),
    recipe_url: url || null,
    notes: String(formData.get("notes") ?? "").trim() || null,
    status: (formData.get("status") || "planning") as MenuStatus,
  };
}

export async function addMenuItemAction(
  eventId: string,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = MenuItemSchema.safeParse(pickMenuItem(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const supabase = await createClient();
  const { error } = await supabase.from("menu_items").insert({
    event_id: eventId,
    name: parsed.data.name,
    course: parsed.data.course,
    serves: parsed.data.serves ?? null,
    dietary_tags: parsed.data.dietary_tags,
    prep_time_minutes: parsed.data.prep_time_minutes ?? null,
    cook_time_minutes: parsed.data.cook_time_minutes ?? null,
    recipe_url: parsed.data.recipe_url || null,
    notes: parsed.data.notes ?? null,
    status: parsed.data.status,
  });
  if (error) return { error: error.message };
  revalidatePath(`/app/events/${eventId}/food`);
  revalidatePath(`/app/events/${eventId}`);
}

export async function updateMenuItemAction(
  eventId: string,
  itemId: string,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = MenuItemSchema.safeParse(pickMenuItem(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const supabase = await createClient();
  const { error } = await supabase
    .from("menu_items")
    .update({
      name: parsed.data.name,
      course: parsed.data.course,
      serves: parsed.data.serves ?? null,
      dietary_tags: parsed.data.dietary_tags,
      prep_time_minutes: parsed.data.prep_time_minutes ?? null,
      cook_time_minutes: parsed.data.cook_time_minutes ?? null,
      recipe_url: parsed.data.recipe_url || null,
      notes: parsed.data.notes ?? null,
      status: parsed.data.status,
    })
    .eq("id", itemId)
    .eq("event_id", eventId);
  if (error) return { error: error.message };
  revalidatePath(`/app/events/${eventId}/food`);
  revalidatePath(`/app/events/${eventId}`);
}

export async function deleteMenuItemAction(
  eventId: string,
  itemId: string,
): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("menu_items")
    .delete()
    .eq("id", itemId)
    .eq("event_id", eventId);
  if (error) return { error: error.message };
  revalidatePath(`/app/events/${eventId}/food`);
  revalidatePath(`/app/events/${eventId}`);
}

export async function updateMenuItemStatusAction(
  eventId: string,
  itemId: string,
  status: MenuStatus,
): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("menu_items")
    .update({ status })
    .eq("id", itemId)
    .eq("event_id", eventId);
  if (error) return { error: error.message };
  revalidatePath(`/app/events/${eventId}/food`);
}
