import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BudgetTab } from "@/components/budget-tab";
import type { Expense } from "@/lib/types";

export default async function BudgetPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const supabase = await createClient();

  const { data: event } = await supabase
    .from("events")
    .select("id, currency, budget_target_cents")
    .eq("id", eventId)
    .maybeSingle();
  if (!event) notFound();

  const { data: expenses } = await supabase
    .from("expenses")
    .select("*")
    .eq("event_id", eventId)
    .order("created_at", { ascending: true });

  return (
    <BudgetTab
      eventId={eventId}
      currency={event.currency}
      budgetTargetCents={event.budget_target_cents}
      expenses={(expenses ?? []) as Expense[]}
    />
  );
}
