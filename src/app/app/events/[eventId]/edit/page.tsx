import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="space-y-6">
      <Card tape="ocean">
        <CardHeader>
          <CardTitle>Event details</CardTitle>
          <p className="text-sm text-ink-soft">
            What, when, and where. Plus-ones and visibility too.
          </p>
        </CardHeader>
        <CardContent>
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
            successToast={{
              title: "Event updated",
              description: "Your changes are live.",
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
