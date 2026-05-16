import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TaskList } from "@/components/task-list";
import type { Task } from "@/lib/types";

export default async function TasksPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const supabase = await createClient();

  const { data: event } = await supabase
    .from("events")
    .select("id")
    .eq("id", eventId)
    .maybeSingle();
  if (!event) notFound();

  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("event_id", eventId)
    .order("created_at", { ascending: true });

  return <TaskList eventId={eventId} tasks={(tasks ?? []) as Task[]} />;
}
