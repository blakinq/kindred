import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { FoodList } from "@/components/food-list";
import type { FoodSupplyItem } from "@/lib/types";

export default async function FoodSuppliesPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const supabase = await createClient();

  const { data: event } = await supabase
    .from("events")
    .select("id, currency, food_claiming_enabled")
    .eq("id", eventId)
    .maybeSingle();
  if (!event) notFound();

  const { data: items } = await supabase
    .from("food_supply_items")
    .select("*")
    .eq("event_id", eventId)
    .order("category", { ascending: true })
    .order("created_at", { ascending: true });

  return (
    <FoodList
      eventId={eventId}
      currency={event.currency}
      guestClaimingEnabled={event.food_claiming_enabled}
      items={(items ?? []) as FoodSupplyItem[]}
    />
  );
}
