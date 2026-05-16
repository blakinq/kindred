"use client";

import { useActionState } from "react";
import { submitRsvpAction, type RsvpState } from "@/app/e/[slug]/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PublicFoodClaim,
  type PublicFoodItem,
} from "@/components/public-food-claim";

const OPTIONS = [
  { v: "going", label: "I'm in", emoji: "🎉", color: "olive" },
  { v: "maybe", label: "Maybe", emoji: "🤔", color: "mustard" },
  { v: "not_going", label: "Can't make it", emoji: "💔", color: "terracotta" },
] as const;

export function RsvpForm({
  slug,
  token,
  plusOneAllowed,
  maxPlusOnes,
  emailRequired,
  foodItems = [],
}: {
  slug: string;
  token: string | null;
  plusOneAllowed: boolean;
  maxPlusOnes: number;
  emailRequired: boolean;
  foodItems?: PublicFoodItem[];
}) {
  const action = submitRsvpAction.bind(null, slug, token);
  const [state, formAction, pending] = useActionState<RsvpState, FormData>(
    action,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-8">
      <Card tape="mustard">
        <CardHeader>
          <CardTitle className="text-2xl">Will you make it?</CardTitle>
          <p className="text-sm text-ink-soft">
            No account needed. Open this link again later to change your reply.
          </p>
        </CardHeader>
        <CardContent className="space-y-5">
          <fieldset className="space-y-2">
            <legend className="font-display text-[13px] font-semibold uppercase tracking-[0.06em] text-ink-soft">
              Are you coming?
            </legend>
            <div className="grid grid-cols-3 gap-2">
              {OPTIONS.map((opt) => (
                <label
                  key={opt.v}
                  className={`group cursor-pointer rounded-xl border-2 border-ink bg-paper-light px-2 py-3.5 text-center transition-all hover:-translate-y-0.5 has-[:checked]:shadow-stamp ${
                    opt.color === "olive"
                      ? "has-[:checked]:bg-olive has-[:checked]:text-paper-light"
                      : opt.color === "mustard"
                        ? "has-[:checked]:bg-mustard has-[:checked]:text-ink"
                        : "has-[:checked]:bg-terracotta has-[:checked]:text-paper-light"
                  }`}
                >
                  <input
                    type="radio"
                    name="rsvp_status"
                    value={opt.v}
                    required
                    className="sr-only"
                  />
                  <div className="text-2xl" aria-hidden>
                    {opt.emoji}
                  </div>
                  <div className="mt-1 font-display text-sm font-bold">
                    {opt.label}
                  </div>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="space-y-1.5">
            <Label htmlFor="name">Your name</Label>
            <Input id="name" name="name" required autoComplete="name" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">
              Email
              {!emailRequired && (
                <span className="ml-1 normal-case tracking-normal text-ink-soft/70">
                  (optional)
                </span>
              )}
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required={emailRequired}
            />
            <p className="text-xs text-ink-soft normal-case tracking-normal">
              Helps the host follow up — not shared with other guests.
            </p>
          </div>

          {plusOneAllowed && (
            <div className="space-y-1.5">
              <Label htmlFor="party_size">Party size (including you)</Label>
              <Input
                id="party_size"
                name="party_size"
                type="number"
                min={1}
                max={1 + maxPlusOnes}
                defaultValue={1}
              />
              <p className="text-xs text-ink-soft normal-case tracking-normal">
                Up to {1 + maxPlusOnes} total.
              </p>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="dietary_restrictions">Dietary stuff (optional)</Label>
            <Input
              id="dietary_restrictions"
              name="dietary_restrictions"
              placeholder="Vegetarian, no peanuts, etc."
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="note">Note to the host (optional)</Label>
            <Textarea id="note" name="note" rows={3} placeholder="Anything else?" />
          </div>
        </CardContent>
      </Card>

      {foodItems.length > 0 && (
        <Card tape="olive">
          <CardContent className="p-7 md:p-8">
            <PublicFoodClaim slug={slug} token={token} items={foodItems} />
          </CardContent>
        </Card>
      )}

      {state?.error && (
        <p
          className="rounded-lg border-2 border-terracotta-deep bg-terracotta/15 px-3 py-2 text-sm text-terracotta-deep"
          role="alert"
        >
          {state.error}
        </p>
      )}

      <Button type="submit" className="w-full" size="lg" disabled={pending}>
        {pending ? "Sending…" : "Send my reply →"}
      </Button>
    </form>
  );
}
