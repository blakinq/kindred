"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { CreateEventSchema } from "@/lib/validation";
import { generateInviteSlug } from "@/lib/utils";

export type EventFormState =
  | {
      error?: string;
      fieldErrors?: Record<string, string>;
      success?: boolean;
    }
  | undefined;

export async function createEventAction(
  _prev: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  const parsed = CreateEventSchema.safeParse({
    name: formData.get("name"),
    event_type: formData.get("event_type") || undefined,
    description: formData.get("description") || undefined,
    event_date: formData.get("event_date"),
    start_time: formData.get("start_time"),
    end_time: formData.get("end_time") || undefined,
    timezone: formData.get("timezone") || "UTC",
    location_type: formData.get("location_type") || "tbd",
    location_name: formData.get("location_name") || undefined,
    address: formData.get("address") || undefined,
    virtual_link: formData.get("virtual_link") || "",
    rsvp_deadline: formData.get("rsvp_deadline") || undefined,
    plus_one_allowed: formData.get("plus_one_allowed") === "on",
    max_plus_ones_per_guest: formData.get("max_plus_ones_per_guest") ?? 0,
    visibility: formData.get("visibility") || "public_link",
  });
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as string;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { error: "Please fix the highlighted fields.", fieldErrors };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  // Generate a unique slug; collisions are extremely unlikely but retry once.
  let slug = generateInviteSlug();
  let { data: inserted, error } = await supabase
    .from("events")
    .insert({
      host_user_id: user.id,
      name: parsed.data.name,
      event_type: parsed.data.event_type ?? null,
      description: parsed.data.description ?? null,
      event_date: parsed.data.event_date,
      start_time: parsed.data.start_time,
      end_time: parsed.data.end_time || null,
      timezone: parsed.data.timezone,
      location_type: parsed.data.location_type,
      location_name: parsed.data.location_name ?? null,
      address: parsed.data.address ?? null,
      virtual_link: parsed.data.virtual_link || null,
      rsvp_deadline: parsed.data.rsvp_deadline || null,
      plus_one_allowed: parsed.data.plus_one_allowed,
      max_plus_ones_per_guest: parsed.data.max_plus_ones_per_guest,
      visibility: parsed.data.visibility,
      invite_slug: slug,
    })
    .select("id")
    .single();

  if (error && error.code === "23505") {
    slug = generateInviteSlug(12);
    ({ data: inserted, error } = await supabase
      .from("events")
      .insert({
        host_user_id: user.id,
        name: parsed.data.name,
        event_date: parsed.data.event_date,
        start_time: parsed.data.start_time,
        invite_slug: slug,
      })
      .select("id")
      .single());
  }

  if (error || !inserted) {
    return { error: error?.message ?? "Could not create event" };
  }

  revalidatePath("/app/events");
  redirect(`/app/events/${inserted.id}`);
}

export async function updateEventDetailsAction(
  eventId: string,
  _prev: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  const parsed = CreateEventSchema.safeParse({
    name: formData.get("name"),
    event_type: formData.get("event_type") || undefined,
    description: formData.get("description") || undefined,
    event_date: formData.get("event_date"),
    start_time: formData.get("start_time"),
    end_time: formData.get("end_time") || undefined,
    timezone: formData.get("timezone") || "UTC",
    location_type: formData.get("location_type") || "tbd",
    location_name: formData.get("location_name") || undefined,
    address: formData.get("address") || undefined,
    virtual_link: formData.get("virtual_link") || "",
    rsvp_deadline: formData.get("rsvp_deadline") || undefined,
    plus_one_allowed: formData.get("plus_one_allowed") === "on",
    max_plus_ones_per_guest: formData.get("max_plus_ones_per_guest") ?? 0,
    visibility: formData.get("visibility") || "public_link",
  });
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as string;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { error: "Please fix the highlighted fields.", fieldErrors };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("events")
    .update({
      name: parsed.data.name,
      event_type: parsed.data.event_type ?? null,
      description: parsed.data.description ?? null,
      event_date: parsed.data.event_date,
      start_time: parsed.data.start_time,
      end_time: parsed.data.end_time || null,
      timezone: parsed.data.timezone,
      location_type: parsed.data.location_type,
      location_name: parsed.data.location_name ?? null,
      address: parsed.data.address ?? null,
      virtual_link: parsed.data.virtual_link || null,
      rsvp_deadline: parsed.data.rsvp_deadline || null,
      plus_one_allowed: parsed.data.plus_one_allowed,
      max_plus_ones_per_guest: parsed.data.max_plus_ones_per_guest,
      visibility: parsed.data.visibility,
    })
    .eq("id", eventId);

  if (error) return { error: error.message };

  revalidatePath(`/app/events/${eventId}`, "layout");
  return { success: true };
}

export async function updateEventSettingsAction(eventId: string, formData: FormData) {
  const supabase = await createClient();
  const update = {
    plus_one_allowed: formData.get("plus_one_allowed") === "on",
    max_plus_ones_per_guest: Number(formData.get("max_plus_ones_per_guest") ?? 0),
    visibility: formData.get("visibility") as string,
    food_claiming_enabled: formData.get("food_claiming_enabled") === "on",
    guest_list_visible: formData.get("guest_list_visible") === "on",
    task_guest_interaction_enabled: formData.get("task_guest_interaction_enabled") === "on",
  };
  const { error } = await supabase.from("events").update(update).eq("id", eventId);
  if (error) return { error: error.message };
  revalidatePath(`/app/events/${eventId}`);
}
