"use client";

import { useMemo, useState, useTransition } from "react";
import { Pencil, Trash2, UtensilsCrossed, Users } from "lucide-react";
import {
  addFoodItemAction,
  deleteFoodItemAction,
  hostClaimFoodItemAction,
  updateFoodItemAction,
  updateFoodStatusAction,
} from "@/app/app/events/[eventId]/food-supplies/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dropdown } from "@/components/ui/dropdown";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/lib/toast";
import { centsToInput } from "@/lib/money";
import { formatCurrency } from "@/lib/utils";
import {
  FOOD_CATEGORY_LABELS,
  FOOD_STATUS_LABELS,
  type FoodCategory,
  type FoodStatus,
  type FoodSupplyItem,
} from "@/lib/types";

const CATEGORY_OPTIONS = (
  Object.entries(FOOD_CATEGORY_LABELS) as [FoodCategory, string][]
).map(([value, label]) => ({ value, label }));

const STATUS_OPTIONS = (
  Object.entries(FOOD_STATUS_LABELS) as [FoodStatus, string][]
).map(([value, label]) => ({ value, label }));

function StatusBadge({ status }: { status: FoodStatus }) {
  const map: Record<FoodStatus, "muted" | "secondary" | "warning" | "success" | "ocean"> = {
    needed: "muted",
    claimed: "secondary",
    purchased: "warning",
    prepared: "ocean",
    completed: "success",
  };
  return <Badge variant={map[status]}>{FOOD_STATUS_LABELS[status]}</Badge>;
}

export function FoodList({
  eventId,
  currency,
  guestClaimingEnabled,
  items,
}: {
  eventId: string;
  currency: string;
  guestClaimingEnabled: boolean;
  items: FoodSupplyItem[];
}) {
  const [pending, startTransition] = useTransition();
  const [pendingDelete, deleteTransition] = useTransition();
  const [editing, setEditing] = useState<FoodSupplyItem | null>(null);
  const [toDelete, setToDelete] = useState<FoodSupplyItem | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const totals = useMemo(() => {
    const total = items.length;
    const claimed = items.filter((i) => i.claimed_count >= i.needed_count).length;
    const unclaimed = items.filter((i) => i.claimed_count < i.needed_count).length;
    const estimatedSpend = items.reduce(
      (sum, i) => sum + (i.estimated_cost_cents ?? 0),
      0,
    );
    return { total, claimed, unclaimed, estimatedSpend };
  }, [items]);

  const grouped = useMemo(() => {
    const map = new Map<FoodCategory, FoodSupplyItem[]>();
    for (const it of items) {
      const arr = map.get(it.category) ?? [];
      arr.push(it);
      map.set(it.category, arr);
    }
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [items]);

  function onAdd(formData: FormData) {
    const name = String(formData.get("name") ?? "").trim();
    startTransition(async () => {
      const res = await addFoodItemAction(eventId, formData);
      if (res?.error) {
        toast.error("Couldn't add item", res.error);
      } else {
        (document.getElementById("add-food-form") as HTMLFormElement | null)?.reset();
        toast.success(`Added ${name || "item"}`, "On the list.");
        setShowAdd(false);
      }
    });
  }

  function onStatusChange(item: FoodSupplyItem, status: FoodStatus) {
    if (item.status === status) return;
    startTransition(async () => {
      const res = await updateFoodStatusAction(eventId, item.id, status);
      if (res?.error) toast.error("Couldn't update", res.error);
      else toast.success(`${item.name} → ${FOOD_STATUS_LABELS[status]}`);
    });
  }

  function onHostClaim(item: FoodSupplyItem) {
    const claimedNow = item.claimed_count >= item.needed_count;
    const next = claimedNow ? null : "Host";
    startTransition(async () => {
      const res = await hostClaimFoodItemAction(eventId, item.id, next);
      if (res?.error) toast.error("Couldn't update", res.error);
      else
        toast.success(
          claimedNow ? "Unclaimed" : "Claimed for the host",
          claimedNow
            ? `${item.name} is back on the needed list.`
            : `${item.name} is covered.`,
        );
    });
  }

  function confirmDelete() {
    if (!toDelete) return;
    const i = toDelete;
    deleteTransition(async () => {
      const res = await deleteFoodItemAction(eventId, i.id);
      if (res?.error) toast.error("Couldn't delete", res.error);
      else toast.success(`Removed ${i.name}`);
      setToDelete(null);
    });
  }

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card tape="mustard">
          <CardContent className="p-5">
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
              Items
            </p>
            <p className="mt-1 font-display text-3xl font-bold tracking-tight">
              {totals.total}
            </p>
          </CardContent>
        </Card>
        <Card tape="coral">
          <CardContent className="p-5">
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
              Unclaimed
            </p>
            <p
              className={
                "mt-1 font-display text-3xl font-bold tracking-tight " +
                (totals.unclaimed > 0 ? "text-terracotta-deep" : "")
              }
            >
              {totals.unclaimed}
            </p>
          </CardContent>
        </Card>
        <Card tape="olive">
          <CardContent className="p-5">
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
              Est. spend
            </p>
            <p className="mt-1 font-display text-3xl font-bold tracking-tight">
              {formatCurrency(totals.estimatedSpend, currency)}
            </p>
          </CardContent>
        </Card>
      </div>

      {!guestClaimingEnabled && (
        <Card className="border-dashed">
          <CardContent className="flex items-center gap-3 p-4 text-sm text-ink-soft">
            <Users className="h-4 w-4 shrink-0" />
            Guest claiming is off. Turn it on in Settings to let guests pick
            items from their invite page.
          </CardContent>
        </Card>
      )}

      {/* Add CTA */}
      <div className="flex justify-end">
        <Button onClick={() => setShowAdd(true)}>+ Add an item</Button>
      </div>

      <Dialog
        open={showAdd}
        onClose={pending ? () => {} : () => setShowAdd(false)}
        tape="ocean"
        className="max-w-2xl"
        scrollBody
      >
        <DialogHeader>
          <DialogTitle>Add an item</DialogTitle>
          <p className="mt-1 font-hand text-xl text-terracotta">what to bring</p>
        </DialogHeader>
        <form
          id="add-food-form"
          action={onAdd}
          className="mt-5 flex min-h-0 flex-1 flex-col"
        >
          <div className="-mr-2 grid min-h-0 flex-1 gap-3 overflow-y-auto pr-2 sm:grid-cols-2">
            <div className="space-y-1 sm:col-span-2">
              <Label htmlFor="f-name">Name</Label>
              <Input id="f-name" name="name" placeholder="Garlic bread" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="f-category">Category</Label>
              <Dropdown
                id="f-category"
                name="category"
                defaultValue="other_supplies"
                options={CATEGORY_OPTIONS}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="f-status">Status</Label>
              <Dropdown
                id="f-status"
                name="status"
                defaultValue="needed"
                options={STATUS_OPTIONS}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="f-qty">Quantity (optional)</Label>
              <Input
                id="f-qty"
                name="quantity"
                type="text"
                inputMode="decimal"
                placeholder="2"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="f-unit">Unit (optional)</Label>
              <Input id="f-unit" name="unit" placeholder="loaves, bottles…" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="f-needed">How many needed</Label>
              <Input
                id="f-needed"
                name="needed_count"
                type="number"
                min={1}
                defaultValue={1}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="f-est">Est. cost (optional)</Label>
              <Input
                id="f-est"
                name="estimated_cost"
                type="text"
                inputMode="decimal"
                placeholder="0.00"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-ink/85 bg-paper-light px-4 py-3 transition-colors hover:bg-paper-deep/40">
                <input
                  type="checkbox"
                  name="is_guest_claimable"
                  defaultChecked
                  className="h-4 w-4 accent-terracotta"
                />
                <span>
                  <span className="block font-display text-sm font-bold">
                    Guests can claim this
                  </span>
                  <span className="block text-xs text-ink-soft">
                    Shows up on their invite page when claiming is enabled.
                  </span>
                </span>
              </label>
            </div>
            <div className="space-y-1 sm:col-span-2">
              <Label htmlFor="f-notes">Notes (optional)</Label>
              <Textarea id="f-notes" name="notes" rows={2} />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowAdd(false)}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving…" : "Add item"}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>

      {/* List */}
      {items.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center gap-3 p-12 text-center">
            <UtensilsCrossed className="h-7 w-7 text-mustard" />
            <p className="text-sm text-ink-soft">
              Nothing on the list yet. Add something above.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-5">
          {grouped.map(([category, list]) => (
            <Card key={category} className="overflow-visible">
              <CardContent className="p-0">
                <div className="flex items-center gap-2 border-b-2 border-dashed border-rule px-5 py-3">
                  <h4 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-ink">
                    {FOOD_CATEGORY_LABELS[category]}
                  </h4>
                  <Badge variant="muted">{list.length}</Badge>
                </div>
                <ul className="divide-y-2 divide-dashed divide-rule">
                  {list.map((it) => {
                    const claimedFull = it.claimed_count >= it.needed_count;
                    return (
                      <li
                        key={it.id}
                        className="grid gap-3 px-5 py-4 transition-colors hover:bg-paper-deep/40 sm:grid-cols-[1.6fr_1fr_auto_auto]"
                      >
                        <div className="min-w-0">
                          <div className="flex items-baseline gap-2">
                            <span className="font-display text-base font-semibold">
                              {it.name}
                            </span>
                            {(it.quantity || it.unit) && (
                              <span className="text-xs text-ink-soft">
                                {it.quantity ?? ""} {it.unit ?? ""}
                              </span>
                            )}
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-ink-soft">
                            <span>
                              {it.claimed_count} / {it.needed_count} claimed
                            </span>
                            {it.claimed_by_name && (
                              <span className="font-hand text-base text-terracotta-deep">
                                · by {it.claimed_by_name}
                              </span>
                            )}
                            {it.estimated_cost_cents != null && (
                              <span>
                                · est. {formatCurrency(it.estimated_cost_cents, currency)}
                              </span>
                            )}
                            {!it.is_guest_claimable && (
                              <Badge variant="muted">host-only</Badge>
                            )}
                          </div>
                          {it.notes && (
                            <p className="mt-1 font-hand text-base text-terracotta-deep">
                              "{it.notes}"
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusBadge status={it.status} />
                          <Dropdown
                            value={it.status}
                            onChange={(v) =>
                              onStatusChange(it, v as FoodStatus)
                            }
                            options={STATUS_OPTIONS}
                            size="sm"
                            className="w-28"
                            aria-label={`Change status for ${it.name}`}
                          />
                        </div>
                        <Button
                          type="button"
                          variant={claimedFull ? "ghost" : "outline"}
                          size="sm"
                          onClick={() => onHostClaim(it)}
                          disabled={pending}
                        >
                          {claimedFull ? "Unclaim" : "I'll cover"}
                        </Button>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setEditing(it)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-soft transition-colors hover:bg-paper-deep hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                            aria-label={`Edit ${it.name}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setToDelete(it)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-soft transition-colors hover:bg-terracotta/15 hover:text-terracotta-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                            aria-label={`Delete ${it.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {editing && (
        <EditFoodDialog
          eventId={eventId}
          item={editing}
          onClose={() => setEditing(null)}
        />
      )}

      <ConfirmDialog
        open={toDelete !== null}
        onClose={() => setToDelete(null)}
        onConfirm={confirmDelete}
        pending={pendingDelete}
        title="Delete this item?"
        description={
          toDelete ? (
            <>
              <span className="font-display font-bold text-ink">{toDelete.name}</span>
              {" "}will be removed from the list. If a guest claimed it, their
              claim will be cleared too.
            </>
          ) : null
        }
        confirmLabel="Yes, delete"
        cancelLabel="Keep it"
      />
    </div>
  );
}

function EditFoodDialog({
  eventId,
  item,
  onClose,
}: {
  eventId: string;
  item: FoodSupplyItem;
  onClose: () => void;
}) {
  const [pending, startTransition] = useTransition();

  function onSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await updateFoodItemAction(eventId, item.id, formData);
      if (res?.error) toast.error("Couldn't save", res.error);
      else {
        toast.success("Item updated");
        onClose();
      }
    });
  }

  return (
    <Dialog
      open={true}
      onClose={pending ? () => {} : onClose}
      tape="ocean"
      className="max-w-2xl"
    >
      <DialogHeader>
        <DialogTitle>Edit item</DialogTitle>
      </DialogHeader>
      <form action={onSubmit} className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="space-y-1 sm:col-span-2">
          <Label htmlFor="ef-name">Name</Label>
          <Input id="ef-name" name="name" defaultValue={item.name} required />
        </div>
        <div className="space-y-1">
          <Label htmlFor="ef-category">Category</Label>
          <Dropdown
            id="ef-category"
            name="category"
            defaultValue={item.category}
            options={CATEGORY_OPTIONS}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="ef-status">Status</Label>
          <Dropdown
            id="ef-status"
            name="status"
            defaultValue={item.status}
            options={STATUS_OPTIONS}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="ef-qty">Quantity</Label>
          <Input
            id="ef-qty"
            name="quantity"
            type="text"
            inputMode="decimal"
            defaultValue={item.quantity ?? ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="ef-unit">Unit</Label>
          <Input id="ef-unit" name="unit" defaultValue={item.unit ?? ""} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="ef-needed">How many needed</Label>
          <Input
            id="ef-needed"
            name="needed_count"
            type="number"
            min={1}
            defaultValue={item.needed_count}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="ef-est">Est. cost</Label>
          <Input
            id="ef-est"
            name="estimated_cost"
            type="text"
            inputMode="decimal"
            defaultValue={centsToInput(item.estimated_cost_cents)}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-ink/85 bg-paper-light px-4 py-3 transition-colors hover:bg-paper-deep/40">
            <input
              type="checkbox"
              name="is_guest_claimable"
              defaultChecked={item.is_guest_claimable}
              className="h-4 w-4 accent-terracotta"
            />
            <span className="font-display text-sm font-bold">
              Guests can claim this
            </span>
          </label>
        </div>
        <div className="space-y-1 sm:col-span-2">
          <Label htmlFor="ef-notes">Notes</Label>
          <Textarea
            id="ef-notes"
            name="notes"
            rows={2}
            defaultValue={item.notes ?? ""}
          />
        </div>
        <DialogFooter className="sm:col-span-2">
          <Button type="button" variant="ghost" onClick={onClose} disabled={pending}>
            Cancel
          </Button>
          <Button type="submit" disabled={pending}>
            {pending ? "Saving…" : "Save changes"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
