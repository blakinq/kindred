import Link from "next/link";
import { notFound } from "next/navigation";
import { Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { EventSidebar } from "@/components/event-sidebar";
import { formatEventDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Squiggle } from "@/components/decorations";

export default async function EventLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const supabase = await createClient();
  const { data: event } = await supabase
    .from("events")
    .select("id, name, event_date, start_time, status")
    .eq("id", eventId)
    .maybeSingle();

  if (!event) notFound();

  const isPast =
    new Date(`${event.event_date}T${event.start_time}`).getTime() < Date.now();

  return (
    <div className="container max-w-6xl py-8">
      <div className="mb-3">
        <Link
          href="/app/events"
          className="text-sm font-medium text-ink-soft hover:text-terracotta-deep"
        >
          ← All events
        </Link>
      </div>

      <header className="flex flex-col gap-3 border-b-2 border-dashed border-rule pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-hand text-xl text-terracotta">you're hosting</p>
          <h1 className="mt-1 font-display text-4xl font-bold tracking-tight md:text-5xl">
            {event.name}
          </h1>
          <div className="mt-3 inline-flex items-center gap-2 text-sm text-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
            {formatEventDate(event.event_date, event.start_time)}
            <Squiggle className="h-2 w-12 text-rule" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {event.status === "archived" && <Badge variant="muted">Archived</Badge>}
          {isPast && <Badge variant="muted">Past</Badge>}
          <Link
            href={`/app/events/${event.id}/edit`}
            className="inline-flex items-center gap-1.5 rounded-xl border-2 border-ink/85 bg-paper-light px-3 py-1.5 font-display text-xs font-bold uppercase tracking-wider text-ink transition-all hover:-translate-y-0.5 hover:bg-mustard hover:shadow-stamp-sm focus-visible:outline-none focus-visible:bg-mustard focus-visible:shadow-stamp-sm"
          >
            <Pencil className="h-3.5 w-3.5" aria-hidden />
            Edit details
          </Link>
        </div>
      </header>

      <div className="mt-8 grid gap-8 md:grid-cols-[200px_1fr]">
        <EventSidebar eventId={event.id} />
        <div>{children}</div>
      </div>
    </div>
  );
}
