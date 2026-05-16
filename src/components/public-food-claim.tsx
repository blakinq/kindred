"use client";

import { useMemo, useState, useTransition } from "react";
import { ShoppingBasket, Check } from "lucide-react";
import { claimPublicFoodItemAction } from "@/app/e/[slug]/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import {
  FOOD_CATEGORY_LABELS,
  type FoodCategory,
  type FoodStatus,
} from "@/lib/types";

export type PublicFoodItem = {
  id: string;
  name: string;
  category: FoodCategory;
  quantity: number | null;
  unit: string | null;
  needed_count: number;
  claimed_count: number;
  claimed_by_name: string | null;
  status: FoodStatus;
  notes: string | null;
};

export function PublicFoodClaim({
  slug,
  token,
  items,
}: {
  slug: string;
  token: string | null;
  items: PublicFoodItem[];
}) {
  const [name, setName] = useState("");
  const [pending, startTransition] = useTransition();
  const [claimingId, setClaimingId] = useState<string | null>(null);

  const grouped = useMemo(() => {
    const map = new Map<FoodCategory, PublicFoodItem[]>();
    for (const it of items) {
      const arr = map.get(it.category) ?? [];
      arr.push(it);
      map.set(it.category, arr);
    }
    return Array.from(map.entries()).sort((a, b) =>
      a[0].localeCompare(b[0]),
    );
  }, [items]);

  function onClaim(item: PublicFoodItem) {
    if (!name.trim()) {
      toast.warning("Add your name", "We'll show it next to what you bring.");
      const el = document.getElementById("food-claim-name") as HTMLInputElement | null;
      el?.focus();
      return;
    }
    setClaimingId(item.id);
    startTransition(async () => {
      const res = await claimPublicFoodItemAction(slug, item.id, name, token);
      setClaimingId(null);
      if (res?.error) {
        toast.error("Couldn't claim", res.error);
      } else {
        toast.success(`Thanks for bringing ${item.name}!`, "The host will see your name.");
      }
    });
  }

  if (items.length === 0) return null;

  const unclaimedCount = items.filter(
    (i) => i.claimed_count < i.needed_count,
  ).length;

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-2">
          <ShoppingBasket className="h-4 w-4 text-terracotta" />
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-ink-soft">
            What to bring
          </h3>
        </div>
        <p className="mt-2 font-hand text-2xl text-terracotta">
          {unclaimedCount === 0
            ? "all set — but feel free to surprise us"
            : `${unclaimedCount} thing${unclaimedCount === 1 ? "" : "s"} still need a buddy`}
        </p>
        <p className="mt-1 text-sm text-ink-soft">
          Pick anything that says "needs someone." Put your name in below and tap claim.
        </p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="food-claim-name">Your name</Label>
        <Input
          id="food-claim-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
          placeholder="Jamie Lee"
          autoComplete="off"
        />
      </div>

      <div className="space-y-4">
        {grouped.map(([category, list]) => (
          <div key={category}>
            <div className="mb-2 flex items-center gap-2">
              <h4 className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
                {FOOD_CATEGORY_LABELS[category]}
              </h4>
              <span className="h-px flex-1 border-t-2 border-dashed border-rule" />
            </div>
            <ul className="space-y-2">
              {list.map((it) => {
                const claimedFull = it.claimed_count >= it.needed_count;
                const isClaiming = claimingId === it.id && pending;
                return (
                  <li
                    key={it.id}
                    className={cn(
                      "grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl border-2 border-ink/85 bg-paper-light p-3.5 transition-all",
                      claimedFull && "opacity-70",
                    )}
                  >
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span
                          className={cn(
                            "font-display text-base font-semibold",
                            claimedFull && "line-through decoration-2",
                          )}
                        >
                          {it.name}
                        </span>
                        {(it.quantity != null || it.unit) && (
                          <span className="text-xs text-ink-soft">
                            {it.quantity ?? ""} {it.unit ?? ""}
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-ink-soft">
                        {it.needed_count > 1 ? (
                          <span>
                            {it.claimed_count} of {it.needed_count} claimed
                          </span>
                        ) : claimedFull ? (
                          <span>claimed</span>
                        ) : (
                          <span>needs someone</span>
                        )}
                        {it.claimed_by_name && (
                          <span className="font-hand text-base text-terracotta-deep">
                            — {it.claimed_by_name}
                          </span>
                        )}
                      </div>
                      {it.notes && (
                        <p className="mt-1 text-xs text-ink-soft">{it.notes}</p>
                      )}
                    </div>
                    {claimedFull ? (
                      <Badge variant="success">
                        <Check className="h-3 w-3" /> covered
                      </Badge>
                    ) : (
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => onClaim(it)}
                        disabled={isClaiming || pending}
                      >
                        {isClaiming ? "Claiming…" : "I'll bring it"}
                      </Button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
