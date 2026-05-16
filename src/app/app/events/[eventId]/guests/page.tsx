import { createClient } from "@/lib/supabase/server";
import { GuestList } from "@/components/guest-list";
import { CopyInviteLink } from "@/components/copy-invite-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Guest } from "@/lib/types";

export default async function GuestsPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const supabase = await createClient();

  const { data: event } = await supabase
    .from("events")
    .select("invite_slug")
    .eq("id", eventId)
    .maybeSingle();
  const { data: guests } = await supabase
    .from("guests")
    .select("*")
    .eq("event_id", eventId)
    .order("created_at", { ascending: true });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const inviteUrl = event ? `${appUrl}/e/${event.invite_slug}` : "";

  return (
    <div className="space-y-6">
      <Card tape="mustard">
        <CardHeader>
          <CardTitle>The invite link</CardTitle>
          <p className="text-sm text-ink-soft">
            Send this through whatever channel. Guests RSVP without an account.
          </p>
        </CardHeader>
        <CardContent>
          <CopyInviteLink url={inviteUrl} />
        </CardContent>
      </Card>
      <GuestList eventId={eventId} guests={(guests ?? []) as Guest[]} />
    </div>
  );
}
