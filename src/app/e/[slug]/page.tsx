import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { RsvpForm } from "@/components/rsvp-form";
import type { PublicFoodItem } from "@/components/public-food-claim";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Squiggle, Sparkle, Stamp } from "@/components/decorations";
import { formatEventDate } from "@/lib/utils";
import type { EventVisibility, LocationType } from "@/lib/types";

type PublicEvent = {
  id: string;
  name: string;
  event_type: string | null;
  description: string | null;
  event_date: string;
  start_time: string;
  end_time: string | null;
  timezone: string;
  location_type: LocationType;
  location_name: string | null;
  address: string | null;
  virtual_link: string | null;
  rsvp_deadline: string | null;
  rsvps_closed: boolean;
  plus_one_allowed: boolean;
  max_plus_ones_per_guest: number;
  visibility: EventVisibility;
  food_claiming_enabled: boolean;
  host_name: string | null;
};

export default async function PublicEventPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { slug } = await params;
  const { token } = await searchParams;

  const supabase = await createClient();
  const { data, error } = await supabase
    .rpc("get_public_event", { p_slug: slug })
    .maybeSingle<PublicEvent>();

  if (error || !data) notFound();

  const event = data;
  const deadlinePassed =
    event.rsvp_deadline && new Date(event.rsvp_deadline) < new Date();
  const inviteOnly = event.visibility === "link_invited_only";

  let foodItems: PublicFoodItem[] = [];
  if (event.food_claiming_enabled) {
    const { data: items } = await supabase.rpc("get_public_food_items", {
      p_slug: slug,
    });
    foodItems = (items ?? []) as PublicFoodItem[];
  }

  return (
    <div className="min-h-screen">
      <header className="container py-6">
        <Link
          href="/"
          className="inline-flex items-baseline gap-1 font-display text-lg font-bold tracking-tight"
        >
          kindred
          <span className="h-1.5 w-1.5 rounded-full bg-terracotta" aria-hidden />
        </Link>
      </header>

      <main className="container max-w-2xl pb-20">
        {/* Invitation card */}
        <Card tape="coral" className="relative animate-fade-up overflow-visible">
          <Sparkle className="absolute -right-3 -top-3 h-7 w-7 rotate-12 text-mustard" />
          <Sparkle className="absolute -left-2 bottom-12 h-5 w-5 -rotate-12 text-terracotta" />

          <CardContent className="space-y-6 p-8 md:p-10">
            <div className="flex items-center gap-3">
              <Stamp className="text-terracotta-deep">You're invited</Stamp>
              <Squiggle className="h-2 w-16 text-terracotta" />
            </div>

            <div>
              <h1 className="font-display text-3xl font-bold leading-[1.05] tracking-tight md:text-5xl text-balance">
                {event.name}
              </h1>
              {event.event_type && (
                <p className="mt-2 font-hand text-xl text-terracotta md:text-2xl">
                  {event.event_type}
                </p>
              )}
            </div>

            <div className="space-y-2 border-y-2 border-dashed border-rule py-5 text-sm">
              <Detail label="When">
                <div className="font-display text-base font-semibold">
                  {formatEventDate(event.event_date, event.start_time)}
                </div>
                {event.end_time && (
                  <div className="text-ink-soft">
                    until {event.end_time.slice(0, 5)}
                  </div>
                )}
              </Detail>

              {(event.location_name || event.address) && (
                <Detail label="Where">
                  {event.location_name && (
                    <div className="font-display text-base font-semibold">
                      {event.location_name}
                    </div>
                  )}
                  {event.address && <div className="text-ink-soft">{event.address}</div>}
                </Detail>
              )}

              {event.virtual_link && (
                <Detail label="Link">
                  <a
                    href={event.virtual_link}
                    target="_blank"
                    rel="noreferrer"
                    className="font-display font-semibold text-terracotta-deep underline decoration-2 underline-offset-2"
                  >
                    Join virtually →
                  </a>
                </Detail>
              )}

              {event.host_name && (
                <Detail label="From">
                  <span className="font-display text-base font-semibold">
                    {event.host_name}
                  </span>
                </Detail>
              )}
            </div>

            {event.description && (
              <div className="rounded-xl bg-paper-deep/50 p-5">
                <p className="whitespace-pre-wrap text-[15px] leading-7">
                  {event.description}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {inviteOnly && <Badge variant="ocean">Invite-only RSVP</Badge>}
              {deadlinePassed && <Badge variant="warning">RSVP deadline passed</Badge>}
              {event.rsvps_closed && <Badge variant="muted">RSVPs closed</Badge>}
            </div>
          </CardContent>
        </Card>

        {/* RSVP + food claim + submit */}
        <div className="mt-8">
          {event.rsvps_closed ? (
            <Card tape="mustard">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">Will you make it?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="rounded-lg border-2 border-dashed border-rule bg-paper p-5 text-center text-ink-soft">
                  The host has closed RSVPs for this one.
                </p>
              </CardContent>
            </Card>
          ) : (
            <RsvpForm
              slug={slug}
              token={token ?? null}
              plusOneAllowed={event.plus_one_allowed}
              maxPlusOnes={event.max_plus_ones_per_guest}
              emailRequired={inviteOnly}
              foodItems={event.food_claiming_enabled ? foodItems : []}
            />
          )}
        </div>

        <p className="mt-8 text-center text-xs text-ink-soft">
          Sent with{" "}
          <Link href="/" className="font-display font-semibold underline">
            kindred
          </Link>
        </p>
      </main>
    </div>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="w-16 shrink-0 pt-0.5 font-display text-[11px] font-bold uppercase tracking-wider text-ink-soft">
        {label}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
