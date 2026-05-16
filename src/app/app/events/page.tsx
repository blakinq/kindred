import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Squiggle, Sparkle } from "@/components/decorations";
import { formatEventDate } from "@/lib/utils";

export default async function EventsPage() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from("events")
    .select("id, name, event_date, start_time, status, invite_slug")
    .neq("status", "deleted")
    .order("event_date", { ascending: true });

  const today = new Date().toISOString().slice(0, 10);
  const upcoming = (events ?? []).filter((e) => e.event_date >= today);
  const past = (events ?? []).filter((e) => e.event_date < today);

  return (
    <div className="container max-w-5xl py-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-hand text-2xl text-terracotta">your events</p>
          <h1 className="mt-1 font-display text-4xl font-bold tracking-tight md:text-5xl">
            What's on the calendar?
          </h1>
        </div>
        <Button asChild>
          <Link href="/app/events/new">+ New event</Link>
        </Button>
      </div>

      <section className="mt-12">
        <div className="mb-4 flex items-center gap-3">
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-ink-soft">
            Coming up
          </h2>
          <Squiggle className="h-2 w-16 text-terracotta" />
        </div>

        {upcoming.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center gap-4 p-12 text-center">
              <Sparkle className="h-8 w-8 text-mustard" />
              <p className="font-display text-xl font-semibold">Nothing yet</p>
              <p className="max-w-sm text-ink-soft">
                Create your first event. It takes about a minute. Add guests
                after.
              </p>
              <Button asChild className="mt-2">
                <Link href="/app/events/new">Start one →</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <ul className="grid gap-5 md:grid-cols-2">
            {upcoming.map((e, i) => (
              <li
                key={e.id}
                className={i % 2 === 0 ? "skew-card-l" : "skew-card-r"}
              >
                <Link href={`/app/events/${e.id}`} className="block">
                  <Card className="transition-all hover:rotate-0 hover:-translate-y-1 hover:shadow-stamp">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="font-display text-2xl font-bold tracking-tight">
                            {e.name}
                          </div>
                          <div className="mt-2 inline-flex items-center gap-2 text-sm text-ink-soft">
                            <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                            {formatEventDate(e.event_date, e.start_time)}
                          </div>
                        </div>
                        {e.status === "archived" && (
                          <Badge variant="muted">Archived</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {past.length > 0 && (
        <section className="mt-16">
          <div className="mb-4 flex items-center gap-3">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-ink-soft">
              In the books
            </h2>
            <Squiggle className="h-2 w-16 text-ink-soft/60" />
          </div>
          <ul className="grid gap-4 md:grid-cols-2">
            {past.map((e) => (
              <li key={e.id}>
                <Link href={`/app/events/${e.id}`} className="block">
                  <Card className="opacity-75 transition-opacity hover:opacity-100">
                    <CardContent className="flex items-center justify-between gap-3 p-5">
                      <div>
                        <div className="font-display text-lg font-semibold">
                          {e.name}
                        </div>
                        <div className="mt-1 text-xs text-ink-soft">
                          {formatEventDate(e.event_date, e.start_time)}
                        </div>
                      </div>
                      <Badge variant="muted">Past</Badge>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
