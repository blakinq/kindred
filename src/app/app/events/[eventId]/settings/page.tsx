import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SettingsForm } from "@/components/settings-form";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const supabase = await createClient();
  const { data: event } = await supabase
    .from("events")
    .select(
      "id, visibility, plus_one_allowed, max_plus_ones_per_guest, food_claiming_enabled, guest_list_visible, task_guest_interaction_enabled",
    )
    .eq("id", eventId)
    .maybeSingle();
  if (!event) notFound();

  return (
    <div className="space-y-6">
      <Card tape="ocean">
        <CardHeader>
          <CardTitle>Privacy & RSVPs</CardTitle>
          <p className="text-sm text-ink-soft">
            Who can see it, and what they can do.
          </p>
        </CardHeader>
        <CardContent>
          <SettingsForm
            eventId={eventId}
            initial={{
              visibility: event.visibility,
              plus_one_allowed: event.plus_one_allowed,
              max_plus_ones_per_guest: event.max_plus_ones_per_guest,
              food_claiming_enabled: event.food_claiming_enabled,
              guest_list_visible: event.guest_list_visible,
              task_guest_interaction_enabled: event.task_guest_interaction_enabled,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
