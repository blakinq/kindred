"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { TaskSchema } from "@/lib/validation";
import type { TaskPriority, TaskStatus } from "@/lib/types";

type ActionResult = { error?: string } | undefined;

function pickTask(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    priority: (formData.get("priority") || "medium") as TaskPriority,
    status: (formData.get("status") || "not_started") as TaskStatus,
    due_date: String(formData.get("due_date") ?? "").trim() || null,
    assignee_name: String(formData.get("assignee_name") ?? "").trim() || null,
  };
}

export async function addTaskAction(
  eventId: string,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = TaskSchema.safeParse(pickTask(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { error } = await supabase.from("tasks").insert({
    event_id: eventId,
    title: parsed.data.title,
    description: parsed.data.description ?? null,
    priority: parsed.data.priority,
    status: parsed.data.status,
    due_date: parsed.data.due_date ?? null,
    assignee_name: parsed.data.assignee_name ?? null,
    assignee_type: parsed.data.assignee_name ? "host" : "unassigned",
    created_by_user_id: user?.id ?? null,
  });
  if (error) return { error: error.message };
  revalidatePath(`/app/events/${eventId}/tasks`);
  revalidatePath(`/app/events/${eventId}`);
}

export async function updateTaskAction(
  eventId: string,
  taskId: string,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = TaskSchema.safeParse(pickTask(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const supabase = await createClient();
  const { error } = await supabase
    .from("tasks")
    .update({
      title: parsed.data.title,
      description: parsed.data.description ?? null,
      priority: parsed.data.priority,
      status: parsed.data.status,
      due_date: parsed.data.due_date ?? null,
      assignee_name: parsed.data.assignee_name ?? null,
      assignee_type: parsed.data.assignee_name ? "host" : "unassigned",
    })
    .eq("id", taskId)
    .eq("event_id", eventId);
  if (error) return { error: error.message };
  revalidatePath(`/app/events/${eventId}/tasks`);
  revalidatePath(`/app/events/${eventId}`);
}

export async function deleteTaskAction(
  eventId: string,
  taskId: string,
): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId)
    .eq("event_id", eventId);
  if (error) return { error: error.message };
  revalidatePath(`/app/events/${eventId}/tasks`);
  revalidatePath(`/app/events/${eventId}`);
}

export async function updateTaskStatusAction(
  eventId: string,
  taskId: string,
  status: TaskStatus,
): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("tasks")
    .update({ status })
    .eq("id", taskId)
    .eq("event_id", eventId);
  if (error) return { error: error.message };
  revalidatePath(`/app/events/${eventId}/tasks`);
  revalidatePath(`/app/events/${eventId}`);
}

export async function updateTaskPriorityAction(
  eventId: string,
  taskId: string,
  priority: TaskPriority,
): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("tasks")
    .update({ priority })
    .eq("id", taskId)
    .eq("event_id", eventId);
  if (error) return { error: error.message };
  revalidatePath(`/app/events/${eventId}/tasks`);
}
