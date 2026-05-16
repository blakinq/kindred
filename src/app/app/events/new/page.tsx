import { createEventAction } from "../actions";
import { Card, CardContent } from "@/components/ui/card";
import { BackLink } from "@/components/ui/back-link";
import { Sparkle } from "@/components/decorations";
import { EventForm } from "@/components/event-form";

export default function NewEventPage() {
  return (
    <div className="container max-w-2xl py-8">
      <BackLink href="/app/events">Back to events</BackLink>

      <div className="mt-6 mb-8">
        <p className="font-hand text-2xl text-terracotta">a new gathering</p>
        <h1 className="mt-1 font-display text-4xl font-bold tracking-tight md:text-5xl">
          What's the event?
        </h1>
      </div>

      <Card tape="ocean" className="relative">
        <Sparkle className="absolute -right-2 top-16 h-6 w-6 rotate-12 text-mustard" />

        <CardContent className="space-y-10 p-8">
          <EventForm
            action={createEventAction}
            submitLabel="Create event →"
            pendingLabel="Making it…"
            cancelHref="/app/events"
          />
        </CardContent>
      </Card>
    </div>
  );
}
