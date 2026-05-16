"use client";

import { useState, useTransition } from "react";
import { updateEventSettingsAction } from "@/app/app/events/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dropdown } from "@/components/ui/dropdown";
import { toast } from "@/lib/toast";

type EventSettings = {
  visibility: string;
  plus_one_allowed: boolean;
  max_plus_ones_per_guest: number;
  food_claiming_enabled: boolean;
  guest_list_visible: boolean;
  task_guest_interaction_enabled: boolean;
};

const VISIBILITY_OPTIONS = [
  { value: "public_link", label: "Anyone with the link" },
  {
    value: "link_invited_only",
    label: "Anyone can view. Only invited guests can RSVP",
  },
];

function Toggle({
  name,
  checked,
  onChange,
  title,
  description,
}: {
  name: string;
  checked: boolean;
  onChange?: (next: boolean) => void;
  title: string;
  description?: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border-2 border-ink/85 bg-paper-light px-4 py-3 transition-colors hover:bg-paper-deep/40">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-terracotta"
      />
      <div>
        <div className="font-display text-sm font-bold">{title}</div>
        {description && (
          <div className="mt-0.5 text-xs text-ink-soft">{description}</div>
        )}
      </div>
    </label>
  );
}

export function SettingsForm({
  eventId,
  initial,
}: {
  eventId: string;
  initial: EventSettings;
}) {
  const [pending, startTransition] = useTransition();
  const [plusOneAllowed, setPlusOneAllowed] = useState(initial.plus_one_allowed);
  const [foodClaimingEnabled, setFoodClaimingEnabled] = useState(
    initial.food_claiming_enabled,
  );
  const [guestListVisible, setGuestListVisible] = useState(initial.guest_list_visible);
  const [taskInteraction, setTaskInteraction] = useState(
    initial.task_guest_interaction_enabled,
  );

  function onSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await updateEventSettingsAction(eventId, formData);
      if (res?.error) {
        toast.error("Couldn't save", res.error);
      } else {
        toast.success("Settings saved", "Your changes are live.");
      }
    });
  }

  return (
    <form action={onSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="visibility">Who can view & RSVP</Label>
        <Dropdown
          id="visibility"
          name="visibility"
          defaultValue={initial.visibility}
          options={VISIBILITY_OPTIONS}
        />
      </div>

      <Toggle
        name="plus_one_allowed"
        checked={plusOneAllowed}
        onChange={setPlusOneAllowed}
        title="Allow plus-ones"
        description="Guests can bring extras."
      />

      {plusOneAllowed && (
        <div className="space-y-1.5">
          <Label htmlFor="max_plus_ones_per_guest">Max plus-ones per guest</Label>
          <Input
            id="max_plus_ones_per_guest"
            name="max_plus_ones_per_guest"
            type="number"
            min={0}
            max={10}
            defaultValue={initial.max_plus_ones_per_guest}
          />
        </div>
      )}

      <Toggle
        name="food_claiming_enabled"
        checked={foodClaimingEnabled}
        onChange={setFoodClaimingEnabled}
        title="Let guests claim food & supplies"
        description="On the invite page, they can pick what they're bringing."
      />

      <Toggle
        name="guest_list_visible"
        checked={guestListVisible}
        onChange={setGuestListVisible}
        title="Show the guest list to guests"
        description="Off by default for privacy."
      />

      <Toggle
        name="task_guest_interaction_enabled"
        checked={taskInteraction}
        onChange={setTaskInteraction}
        title="Let guests complete assigned tasks"
        description="They can mark off the ones you've given them."
      />

      <div className="flex justify-end border-t-2 border-dashed border-rule pt-5">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save settings →"}
        </Button>
      </div>
    </form>
  );
}
