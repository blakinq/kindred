import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { BackLink } from "@/components/ui/back-link";
import { Sparkle } from "@/components/decorations";
import { EventForm } from "@/components/event-form";
import { updateEventDetailsAction } from "../../actions";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const supabase = await createClient();
  const { data: event } = await supabase
    .from("events")
    .select(
      "id, name, event_type, description, event_date, start_time, end_time, rsvp_deadline, location_type, location_name, address, virtual_link, plus_one_allowed, max_plus_ones_per_guest, visibility",
    )
    .eq("id", eventId)
    .maybeSingle();
  if (!event) notFound();

  const action = updateEventDetailsAction.bind(null, eventId);

  return (
    <div className="container max-w-2xl py-8">
      <BackLink href={`/app/events/${eventId}`}>Back to event</BackLink>

      <div className="mt-6 mb-8">
        <p className="font-hand text-2xl text-terracotta">tidy the details</p>
        <h1 className="mt-1 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Edit event
        </h1>
      </div>

      <Card tape="ocean" className="relative">
        <Sparkle className="absolute -right-2 top-16 h-6 w-6 rotate-12 text-mustard" />

        <CardContent className="space-y-10 p-8">
          <EventForm
            action={action}
            initial={{
              name: event.name,
              event_type: event.event_type,
              description: event.description,
              event_date: event.event_date,
              start_time: event.start_time,
              end_time: event.end_time,
              rsvp_deadline: event.rsvp_deadline,
              location_type: event.location_type,
              location_name: event.location_name,
              address: event.address,
              virtual_link: event.virtual_link,
              plus_one_allowed: event.plus_one_allowed,
              max_plus_ones_per_guest: event.max_plus_ones_per_guest,
              visibility: event.visibility,
            }}
            submitLabel="Save changes →"
            pendingLabel="Saving…"
            cancelHref={`/app/events/${eventId}`}
          />
        </CardContent>
      </Card>
    </div>
  );
}
