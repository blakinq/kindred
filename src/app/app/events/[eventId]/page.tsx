import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyInviteLink } from "@/components/copy-invite-link";
import { Squiggle, Sparkle } from "@/components/decorations";
import { formatCurrency } from "@/lib/utils";
import type { RsvpStatus } from "@/lib/types";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const supabase = await createClient();

  const { data: event } = await supabase
    .from("events")
    .select(
      "id, invite_slug, currency, budget_target_cents, location_name, address, description",
    )
    .eq("id", eventId)
    .maybeSingle();
  if (!event) notFound();

  const [{ data: guests }, { data: expenses }, { data: food }, { data: tasks }] =
    await Promise.all([
      supabase.from("guests").select("rsvp_status, party_size").eq("event_id", eventId),
      supabase
        .from("expenses")
        .select("estimated_amount_cents, actual_amount_cents")
        .eq("event_id", eventId),
      supabase
        .from("food_supply_items")
        .select("status, needed_count, claimed_count")
        .eq("event_id", eventId),
      supabase.from("tasks").select("status, due_date").eq("event_id", eventId),
    ]);

  const rsvpCounts = (guests ?? []).reduce(
    (acc, g) => {
      acc[g.rsvp_status as RsvpStatus] = (acc[g.rsvp_status as RsvpStatus] ?? 0) + 1;
      return acc;
    },
    {} as Record<RsvpStatus, number>,
  );

  const attendees = (guests ?? [])
    .filter((g) => g.rsvp_status === "going")
    .reduce((sum, g) => sum + (g.party_size ?? 1), 0);

  const projected =
    (expenses ?? []).reduce(
      (sum, e) => sum + (e.actual_amount_cents ?? e.estimated_amount_cents ?? 0),
      0,
    ) || 0;
  const perPerson = attendees > 0 ? Math.round(projected / attendees) : null;

  const unclaimed = (food ?? []).filter((f) => f.claimed_count < f.needed_count).length;
  const today = new Date().toISOString().slice(0, 10);
  const overdueTasks = (tasks ?? []).filter(
    (t) => t.status !== "done" && t.due_date && t.due_date < today,
  ).length;
  const openTasks = (tasks ?? []).filter((t) => t.status !== "done").length;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const inviteUrl = `${appUrl}/e/${event.invite_slug}`;

  return (
    <div className="space-y-6">
      {/* Invite link card */}
      <Card tape="mustard">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Share the invite</CardTitle>
            <Sparkle className="h-4 w-4 text-mustard" />
          </div>
          <p className="text-sm text-ink-soft">
            One link, anywhere. Guests RSVP without an account.
          </p>
        </CardHeader>
        <CardContent>
          <CopyInviteLink url={inviteUrl} />
        </CardContent>
      </Card>

      {/* Summary tiles */}
      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard
          label="RSVPs"
          accent="terracotta"
          href={`/app/events/${eventId}/guests`}
          tape="coral"
        >
          <div className="grid grid-cols-4 gap-2 text-center">
            <Stat label="Going" value={rsvpCounts.going ?? 0} accent="text-olive" />
            <Stat label="Maybe" value={rsvpCounts.maybe ?? 0} accent="text-mustard" />
            <Stat
              label="No"
              value={rsvpCounts.not_going ?? 0}
              accent="text-terracotta-deep"
            />
            <Stat
              label="Quiet"
              value={(rsvpCounts.invited ?? 0) + (rsvpCounts.no_response ?? 0)}
              accent="text-ink-soft"
            />
          </div>
          <p className="mt-3 text-xs text-ink-soft">
            {attendees} attending (incl. plus-ones)
          </p>
        </StatCard>

        <StatCard
          label="Budget"
          accent="ocean"
          href={`/app/events/${eventId}/budget`}
          tape="ocean"
        >
          <div className="font-display text-3xl font-bold tracking-tight">
            {formatCurrency(projected, event.currency)}
            {event.budget_target_cents != null && (
              <span className="text-lg font-medium text-ink-soft">
                {" "}
                / {formatCurrency(event.budget_target_cents, event.currency)}
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-ink-soft">
            Projected ·{" "}
            {perPerson != null
              ? `${formatCurrency(perPerson, event.currency)} per person`
              : "no confirmed attendees yet"}
          </p>
        </StatCard>

        <StatCard
          label="To Bring"
          accent="olive"
          href={`/app/events/${eventId}/food-supplies`}
          tape="olive"
        >
          <div className="font-display text-3xl font-bold tracking-tight">
            {unclaimed}
          </div>
          <p className="mt-1 text-xs text-ink-soft">
            {(food ?? []).length === 0
              ? "no items planned yet"
              : unclaimed === 0
                ? "everything's covered"
                : `unclaimed items`}
          </p>
        </StatCard>

        <StatCard
          label="Tasks"
          accent="mustard"
          href={`/app/events/${eventId}/tasks`}
          tape="mustard"
        >
          <div className="font-display text-3xl font-bold tracking-tight">
            {openTasks}
          </div>
          <p className="mt-1 text-xs text-ink-soft">
            {overdueTasks > 0 ? (
              <span className="text-terracotta-deep">
                {overdueTasks} overdue ·{" "}
              </span>
            ) : null}
            {(tasks ?? []).length === 0
              ? "nothing on the list"
              : openTasks === 0
                ? "all done"
                : "open"}
          </p>
        </StatCard>
      </div>

      {/* Next actions */}
      {(() => {
        const needsGuests =
          (rsvpCounts.invited ?? 0) + (rsvpCounts.no_response ?? 0) === 0 &&
          attendees === 0;
        const needsBudget = projected === 0;
        const needsFood = unclaimed === 0 && (food ?? []).length === 0;
        const needsTasks = (tasks ?? []).length === 0;
        const hasTodos = needsGuests || needsBudget || needsFood || needsTasks;
        if (!hasTodos) return null;
        return (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle>To-do list</CardTitle>
                <Squiggle className="h-2 w-16 text-terracotta" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {needsGuests && (
                <Action href={`/app/events/${eventId}/guests`}>
                  Add your first guests so people can RSVP
                </Action>
              )}
              {needsBudget && (
                <Action href={`/app/events/${eventId}/budget`}>
                  Add a budget so you know what you're working with
                </Action>
              )}
              {needsFood && (
                <Action href={`/app/events/${eventId}/food-supplies`}>
                  Plan food and supplies — let guests pick what to bring
                </Action>
              )}
              {needsTasks && (
                <Action href={`/app/events/${eventId}/tasks`}>
                  Break prep into tasks and assign them
                </Action>
              )}
            </CardContent>
          </Card>
        );
      })()}
    </div>
  );
}

const accentClasses = {
  terracotta: "bg-terracotta",
  ocean: "bg-ocean",
  olive: "bg-olive",
  mustard: "bg-mustard",
};

function StatCard({
  label,
  href,
  accent,
  tape,
  children,
}: {
  label: string;
  href: string;
  accent: keyof typeof accentClasses;
  tape: "mustard" | "coral" | "olive" | "ocean";
  children: React.ReactNode;
}) {
  return (
    <Card tape={tape} className="overflow-hidden">
      <div className={`h-1.5 ${accentClasses[accent]}`} />
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{label}</CardTitle>
          <Link
            href={href}
            className="text-xs font-semibold uppercase tracking-wider text-terracotta-deep hover:underline"
          >
            Manage →
          </Link>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: string;
}) {
  return (
    <div>
      <div className={`font-display text-3xl font-bold ${accent ?? ""}`}>
        {value}
      </div>
      <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-soft">
        {label}
      </div>
    </div>
  );
}

function Action({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border-2 border-dashed border-rule bg-paper px-4 py-3">
      <div className="flex items-start gap-3">
        <span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-md border-2 border-ink" />
        <span className="text-sm text-ink">{children}</span>
      </div>
      <Button asChild variant="ghost" size="sm">
        <Link href={href}>Go</Link>
      </Button>
    </div>
  );
}
