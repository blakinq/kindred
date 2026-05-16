"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Link as LinkIcon,
  Home,
  Video,
  Globe2,
  HelpCircle,
} from "lucide-react";
import type { EventFormState } from "@/app/app/events/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { IconField } from "@/components/ui/icon-field";
import { DateInput } from "@/components/ui/date-input";
import { TimeInput } from "@/components/ui/time-input";
import { DateTimeInput } from "@/components/ui/datetime-input";
import { Squiggle } from "@/components/decorations";
import { toast } from "@/lib/toast";
import { useEffect, useRef } from "react";
import type { LocationType, EventVisibility } from "@/lib/types";

const LOCATION_TYPES = [
  { value: "physical", label: "In person", icon: Home },
  { value: "virtual", label: "Virtual", icon: Video },
  { value: "both", label: "Both", icon: Globe2 },
  { value: "tbd", label: "TBD", icon: HelpCircle },
] as const;

function SectionLabel({ step, title, hint }: { step: string; title: string; hint?: string }) {
  return (
    <div className="flex items-center gap-3 pt-1">
      <span className="inline-flex items-center gap-2 rounded-md border border-ink/30 bg-mustard/40 px-2.5 py-0.5 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-ink">
        <span className="text-terracotta-deep">{step}</span>
        {title}
      </span>
      {hint && <span className="font-hand text-lg text-ink-soft">{hint}</span>}
      <div className="ml-auto h-px flex-1 border-t-2 border-dashed border-rule" />
    </div>
  );
}

export type EventFormInitial = {
  name?: string;
  event_type?: string | null;
  description?: string | null;
  event_date?: string;
  start_time?: string;
  end_time?: string | null;
  rsvp_deadline?: string | null;
  location_type?: LocationType;
  location_name?: string | null;
  address?: string | null;
  virtual_link?: string | null;
  plus_one_allowed?: boolean;
  max_plus_ones_per_guest?: number;
  visibility?: EventVisibility;
};

type EventFormProps = {
  action: (state: EventFormState, formData: FormData) => Promise<EventFormState>;
  initial?: EventFormInitial;
  submitLabel: string;
  pendingLabel: string;
  cancelHref: string;
  successToast?: { title: string; description?: string };
};

export function EventForm({
  action,
  initial,
  submitLabel,
  pendingLabel,
  cancelHref,
  successToast,
}: EventFormProps) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const [plusOnes, setPlusOnes] = useState<boolean>(
    initial?.plus_one_allowed ?? false,
  );
  const [locationKind, setLocationKind] = useState<LocationType>(
    initial?.location_type ?? "physical",
  );
  const showPhysical = locationKind === "physical" || locationKind === "both";
  const showVirtual = locationKind === "virtual" || locationKind === "both";
  const err = state?.fieldErrors ?? {};

  // Toast on successful update (only if action returns success: true)
  const lastSuccessRef = useRef<boolean | undefined>(undefined);
  useEffect(() => {
    if (state?.success && state.success !== lastSuccessRef.current && successToast) {
      toast.success(successToast.title, successToast.description);
    }
    lastSuccessRef.current = state?.success;
  }, [state?.success, successToast]);

  const rsvpDeadlineDefault =
    initial?.rsvp_deadline && initial.rsvp_deadline.length > 16
      ? initial.rsvp_deadline.slice(0, 16)
      : initial?.rsvp_deadline ?? undefined;

  return (
    <form action={formAction} className="space-y-10">
      {/* === BASICS === */}
      <section className="space-y-5">
        <SectionLabel step="01" title="Basics" hint="the must-haves" />

        <div className="space-y-1.5">
          <Label htmlFor="name">Event name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Friday dinner"
            defaultValue={initial?.name ?? ""}
            required
            className="h-12 text-base font-display font-semibold"
          />
          {err.name && (
            <p className="text-xs text-terracotta-deep">{err.name}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="event_type">Type</Label>
          <Input
            id="event_type"
            name="event_type"
            placeholder="Dinner · Birthday · Picnic · Game night…"
            defaultValue={initial?.event_type ?? ""}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="description">A note for guests</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Dress code, parking, anything fun."
            rows={4}
            defaultValue={initial?.description ?? ""}
          />
        </div>
      </section>

      {/* === WHEN === */}
      <section className="space-y-5">
        <SectionLabel step="02" title="When" hint="day & time" />

        <div className="space-y-1.5">
          <Label htmlFor="event_date">Date</Label>
          <DateInput
            id="event_date"
            name="event_date"
            icon={Calendar}
            defaultValue={initial?.event_date}
            required
          />
          {err.event_date && (
            <p className="text-xs text-terracotta-deep">{err.event_date}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="start_time">Start time</Label>
            <TimeInput
              id="start_time"
              name="start_time"
              icon={Clock}
              defaultValue={initial?.start_time?.slice(0, 5)}
              required
            />
            {err.start_time && (
              <p className="text-xs text-terracotta-deep">{err.start_time}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="end_time">
              End{" "}
              <span className="ml-1 normal-case tracking-normal text-ink-soft/70">
                (optional)
              </span>
            </Label>
            <TimeInput
              id="end_time"
              name="end_time"
              icon={Clock}
              defaultValue={initial?.end_time?.slice(0, 5) ?? undefined}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="rsvp_deadline">
            RSVP by{" "}
            <span className="ml-1 normal-case tracking-normal text-ink-soft/70">
              (optional)
            </span>
          </Label>
          <DateTimeInput
            id="rsvp_deadline"
            name="rsvp_deadline"
            dateIcon={Calendar}
            timeIcon={Clock}
            defaultValue={rsvpDeadlineDefault}
          />
        </div>
      </section>

      {/* === WHERE === */}
      <section className="space-y-5">
        <SectionLabel step="03" title="Where" />

        <div className="space-y-2">
          <Label>Location type</Label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {LOCATION_TYPES.map(({ value, label, icon: Icon }) => (
              <label
                key={value}
                className="group flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border-2 border-ink/85 bg-paper-light px-3 py-3 transition-all hover:bg-paper-deep/40 has-[:checked]:bg-mustard has-[:checked]:shadow-stamp-sm"
              >
                <input
                  type="radio"
                  name="location_type"
                  value={value}
                  checked={locationKind === value}
                  onChange={() => setLocationKind(value)}
                  className="sr-only"
                />
                <Icon className="h-4 w-4 text-ink-soft transition-colors group-has-[:checked]:text-ink" />
                <span className="font-display text-xs font-bold tracking-tight">
                  {label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {showPhysical && (
          <div className="space-y-4 animate-fade-up">
            <div className="space-y-1.5">
              <Label htmlFor="location_name">Place</Label>
              <Input
                id="location_name"
                name="location_name"
                placeholder="Our backyard"
                defaultValue={initial?.location_name ?? ""}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="address">Address</Label>
              <IconField icon={MapPin}>
                <Input
                  id="address"
                  name="address"
                  placeholder="Street, city"
                  defaultValue={initial?.address ?? ""}
                />
              </IconField>
            </div>
          </div>
        )}

        {showVirtual && (
          <div className="space-y-1.5 animate-fade-up">
            <Label htmlFor="virtual_link">Virtual link</Label>
            <IconField icon={LinkIcon}>
              <Input
                id="virtual_link"
                name="virtual_link"
                type="url"
                placeholder="https://…"
                defaultValue={initial?.virtual_link ?? ""}
              />
            </IconField>
          </div>
        )}

        {locationKind === "tbd" && (
          <div className="animate-fade-up rounded-xl border-2 border-dashed border-rule bg-paper-deep/30 p-5 text-center">
            <p className="font-hand text-2xl text-terracotta">
              we'll figure it out
            </p>
            <p className="mt-1 text-xs text-ink-soft">
              You can fill in the location any time before the event.
            </p>
          </div>
        )}
      </section>

      {/* === RSVPs === */}
      <section className="space-y-5">
        <SectionLabel step="04" title="RSVPs" hint="who & how" />

        <div className="space-y-2">
          <Label>Who can see it</Label>
          <div className="grid gap-2">
            {[
              {
                value: "public_link",
                title: "Anyone with the link",
                body: "Easy sharing. Best for casual events.",
              },
              {
                value: "link_invited_only",
                title: "Invite-only RSVP",
                body: "Anyone can view. Only people you invited by email can reply.",
              },
            ].map((opt) => {
              const currentVisibility = initial?.visibility ?? "public_link";
              return (
                <label
                  key={opt.value}
                  className="group flex cursor-pointer items-start gap-3 rounded-xl border-2 border-ink/85 bg-paper-light p-4 transition-all hover:bg-paper-deep/40 has-[:checked]:bg-mustard/25 has-[:checked]:shadow-stamp-sm"
                >
                  <input
                    type="radio"
                    name="visibility"
                    value={opt.value}
                    defaultChecked={currentVisibility === opt.value}
                    className="sr-only"
                  />
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-paper-light transition-colors group-has-[:checked]:bg-terracotta">
                    <span className="h-1.5 w-1.5 rounded-full bg-paper-light opacity-0 transition-opacity group-has-[:checked]:opacity-100" />
                  </span>
                  <span>
                    <span className="block font-display text-sm font-bold">
                      {opt.title}
                    </span>
                    <span className="block text-xs text-ink-soft">
                      {opt.body}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Plus-ones</Label>
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border-2 border-ink/85 bg-paper-light p-4 transition-colors hover:bg-paper-deep/40">
            <input
              type="checkbox"
              name="plus_one_allowed"
              checked={plusOnes}
              onChange={(e) => setPlusOnes(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 accent-terracotta"
            />
            <span>
              <span className="block font-display text-sm font-bold">
                Let guests bring extras
              </span>
              <span className="block text-xs text-ink-soft">
                Each guest can add up to a max number you set.
              </span>
            </span>
          </label>

          {plusOnes && (
            <div className="ml-7 mt-2 flex items-center gap-3 animate-fade-up">
              <Label htmlFor="max_plus_ones_per_guest" className="m-0">
                Max per guest
              </Label>
              <Input
                id="max_plus_ones_per_guest"
                name="max_plus_ones_per_guest"
                type="number"
                min={0}
                max={10}
                defaultValue={initial?.max_plus_ones_per_guest ?? 1}
                className="h-9 w-20 text-center"
              />
            </div>
          )}
          {!plusOnes && (
            <input type="hidden" name="max_plus_ones_per_guest" value="0" />
          )}
        </div>
      </section>

      {state?.error && (
        <p
          className="rounded-lg border-2 border-terracotta-deep bg-terracotta/15 px-3 py-2 text-sm text-terracotta-deep"
          role="alert"
        >
          {state.error}
        </p>
      )}

      <div className="flex items-center justify-between gap-3 border-t-2 border-dashed border-rule pt-6">
        <Squiggle className="h-2 w-20 text-terracotta opacity-60" />
        <div className="flex gap-3">
          <Button asChild variant="ghost">
            <Link href={cancelHref}>Cancel</Link>
          </Button>
          <Button type="submit" disabled={pending}>
            {pending ? pendingLabel : submitLabel}
          </Button>
        </div>
      </div>
    </form>
  );
}
