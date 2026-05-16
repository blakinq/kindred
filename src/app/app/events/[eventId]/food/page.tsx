import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MenuList } from "@/components/menu-list";
import type { MenuItem } from "@/lib/types";

export default async function FoodPage({
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

  const [{ data: items }, { data: guests }] = await Promise.all([
    supabase
      .from("menu_items")
      .select("*")
      .eq("event_id", eventId)
      .order("course", { ascending: true })
      .order("created_at", { ascending: true }),
    supabase
      .from("guests")
      .select("rsvp_status, party_size")
      .eq("event_id", eventId),
  ]);

  const attendees = (guests ?? [])
    .filter((g) => g.rsvp_status === "going")
    .reduce((sum, g) => sum + (g.party_size ?? 1), 0);

  return (
    <MenuList
      eventId={eventId}
      attendees={attendees}
      items={(items ?? []) as MenuItem[]}
    />
  );
}
