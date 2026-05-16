"use client";

import { useMemo, useState, useTransition } from "react";
import { ChefHat, Clock, ExternalLink, Pencil, Trash2, Users } from "lucide-react";
import {
  addMenuItemAction,
  deleteMenuItemAction,
  updateMenuItemAction,
  updateMenuItemStatusAction,
} from "@/app/app/events/[eventId]/food/actions";
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
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import {
  DIETARY_TAG_LABELS,
  MENU_COURSE_LABELS,
  MENU_COURSE_ORDER,
  MENU_STATUS_LABELS,
  type DietaryTag,
  type MenuCourse,
  type MenuItem,
  type MenuStatus,
} from "@/lib/types";

const COURSE_OPTIONS = MENU_COURSE_ORDER.map((value) => ({
  value,
  label: MENU_COURSE_LABELS[value],
}));

const STATUS_OPTIONS = (
  Object.entries(MENU_STATUS_LABELS) as [MenuStatus, string][]
).map(([value, label]) => ({ value, label }));

const ALL_TAGS = Object.keys(DIETARY_TAG_LABELS) as DietaryTag[];

const TAG_VARIANT: Record<
  DietaryTag,
  "success" | "warning" | "ocean" | "destructive"
> = {
  vegetarian: "success",
  vegan: "success",
  gluten_free: "warning",
  dairy_free: "warning",
  nut_free: "warning",
  shellfish_free: "warning",
  halal: "ocean",
  kosher: "ocean",
  spicy: "destructive",
};

function StatusBadge({ status }: { status: MenuStatus }) {
  const map: Record<
    MenuStatus,
    "muted" | "secondary" | "warning" | "ocean" | "success"
  > = {
    planning: "muted",
    shopping: "secondary",
    prepping: "warning",
    cooking: "ocean",
    ready: "success",
  };
  return <Badge variant={map[status]}>{MENU_STATUS_LABELS[status]}</Badge>;
}

function DietaryChips({
  value,
  onChange,
}: {
  value: DietaryTag[];
  onChange: (next: DietaryTag[]) => void;
}) {
  const set = useMemo(() => new Set(value), [value]);
  return (
    <div className="flex flex-wrap gap-1.5">
      {ALL_TAGS.map((tag) => {
        const selected = set.has(tag);
        return (
          <button
            key={tag}
            type="button"
            onClick={() => {
              const next = new Set(set);
              if (selected) next.delete(tag);
              else next.add(tag);
              onChange(Array.from(next));
            }}
            aria-pressed={selected}
            className={cn(
              "rounded-full border-2 px-3 py-1 text-xs font-display font-bold transition-all",
              selected
                ? "border-ink bg-olive/25 text-ink shadow-stamp-sm"
                : "border-ink/40 bg-paper-light text-ink-soft hover:border-ink hover:text-ink",
            )}
          >
            {DIETARY_TAG_LABELS[tag]}
          </button>
        );
      })}
    </div>
  );
}

function fmtMinutes(min: number): string {
  if (min < 60) return `${min}m`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export function MenuList({
  eventId,
  attendees,
  items,
}: {
  eventId: string;
  attendees: number;
  items: MenuItem[];
}) {
  const [pending, startTransition] = useTransition();
  const [pendingDelete, deleteTransition] = useTransition();
  const [viewing, setViewing] = useState<MenuItem | null>(null);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [toDelete, setToDelete] = useState<MenuItem | null>(null);
  const [tagsToAdd, setTagsToAdd] = useState<DietaryTag[]>([]);
  const [showAdd, setShowAdd] = useState(false);

  const totals = useMemo(() => {
    const dishes = items.length;
    const totalServes = items.reduce((sum, i) => sum + (i.serves ?? 0), 0);
    const ready = items.filter((i) => i.status === "ready").length;
    const tagCounts = new Map<DietaryTag, number>();
    for (const i of items) {
      for (const t of i.dietary_tags) {
        tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1);
      }
    }
    return { dishes, totalServes, ready, tagCounts };
  }, [items]);

  const grouped = useMemo(() => {
    const map = new Map<MenuCourse, MenuItem[]>();
    for (const it of items) {
      const arr = map.get(it.course) ?? [];
      arr.push(it);
      map.set(it.course, arr);
    }
    return MENU_COURSE_ORDER.filter((c) => map.has(c)).map(
      (c) => [c, map.get(c)!] as const,
    );
  }, [items]);

  function onAdd(formData: FormData) {
    for (const t of tagsToAdd) formData.append("dietary_tags", t);
    const name = String(formData.get("name") ?? "").trim();
    startTransition(async () => {
      const res = await addMenuItemAction(eventId, formData);
      if (res?.error) toast.error("Couldn't add dish", res.error);
      else {
        (document.getElementById("add-menu-form") as HTMLFormElement | null)?.reset();
        setTagsToAdd([]);
        toast.success(`Added "${name || "dish"}"`, "On the menu.");
        setShowAdd(false);
      }
    });
  }

  function onStatusChange(item: MenuItem, status: MenuStatus) {
    if (item.status === status) return;
    startTransition(async () => {
      const res = await updateMenuItemStatusAction(eventId, item.id, status);
      if (res?.error) toast.error("Couldn't update", res.error);
      else toast.success(`${item.name} → ${MENU_STATUS_LABELS[status]}`);
    });
  }

  function confirmDelete() {
    if (!toDelete) return;
    const it = toDelete;
    deleteTransition(async () => {
      const res = await deleteMenuItemAction(eventId, it.id);
      if (res?.error) toast.error("Couldn't delete", res.error);
      else toast.success(`Removed "${it.name}"`);
      setToDelete(null);
    });
  }

  const coverageHint =
    attendees > 0 && totals.totalServes > 0
      ? totals.totalServes >= attendees
        ? `covers ${attendees} confirmed`
        : `${attendees - totals.totalServes} short of confirmed RSVPs`
      : attendees > 0
        ? "set serving counts to track coverage"
        : "no confirmed attendees yet";

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card tape="mustard">
          <CardContent className="p-5">
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
              Dishes
            </p>
            <p className="mt-1 font-display text-3xl font-bold tracking-tight">
              {totals.dishes}
            </p>
            <p className="mt-1 text-xs text-ink-soft">
              {totals.dishes === 0
                ? "nothing planned yet"
                : `${totals.ready} ready · ${totals.dishes - totals.ready} in motion`}
            </p>
          </CardContent>
        </Card>

        <Card tape="coral">
          <CardContent className="p-5">
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
              Servings
            </p>
            <p
              className={cn(
                "mt-1 font-display text-3xl font-bold tracking-tight",
                attendees > 0 &&
                  totals.totalServes > 0 &&
                  totals.totalServes < attendees &&
                  "text-terracotta-deep",
              )}
            >
              {totals.totalServes || "—"}
            </p>
            <p className="mt-1 text-xs text-ink-soft">{coverageHint}</p>
          </CardContent>
        </Card>

        <Card tape="olive">
          <CardContent className="p-5">
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
              Dietary mix
            </p>
            {totals.tagCounts.size === 0 ? (
              <p className="mt-2 text-sm text-ink-soft">
                Tag dishes so you can spot gaps at a glance.
              </p>
            ) : (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {Array.from(totals.tagCounts.entries())
                  .sort((a, b) => b[1] - a[1])
                  .map(([tag, count]) => (
                    <Badge key={tag} variant={TAG_VARIANT[tag]}>
                      {DIETARY_TAG_LABELS[tag]} · {count}
                    </Badge>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add CTA */}
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setTagsToAdd([]);
            setShowAdd(true);
          }}
        >
          <ChefHat className="h-4 w-4" /> Add a dish
        </Button>
      </div>

      <Dialog
        open={showAdd}
        onClose={pending ? () => {} : () => setShowAdd(false)}
        tape="ocean"
        className="max-w-2xl"
      >
        <DialogHeader>
          <DialogTitle>Add a dish</DialogTitle>
          <p className="mt-1 font-hand text-xl text-terracotta">
            what you're cooking
          </p>
        </DialogHeader>
        <form
          id="add-menu-form"
          action={onAdd}
          className="mt-5 grid gap-3 sm:grid-cols-2"
        >
          <div className="space-y-1 sm:col-span-2">
            <Label htmlFor="m-name">Dish name</Label>
            <Input
              id="m-name"
              name="name"
              placeholder="Mushroom risotto"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="m-course">Course</Label>
            <Dropdown
              id="m-course"
              name="course"
              defaultValue="main"
              options={COURSE_OPTIONS}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="m-status">Status</Label>
            <Dropdown
              id="m-status"
              name="status"
              defaultValue="planning"
              options={STATUS_OPTIONS}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="m-serves">Serves (people)</Label>
            <Input
              id="m-serves"
              name="serves"
              type="number"
              min={1}
              max={999}
              placeholder="8"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="m-prep">Prep (min)</Label>
            <Input
              id="m-prep"
              name="prep_time_minutes"
              type="number"
              min={0}
              placeholder="20"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="m-cook">Cook (min)</Label>
            <Input
              id="m-cook"
              name="cook_time_minutes"
              type="number"
              min={0}
              placeholder="40"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="m-url">Recipe link (optional)</Label>
            <Input
              id="m-url"
              name="recipe_url"
              type="url"
              placeholder="https://…"
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Dietary tags</Label>
            <DietaryChips value={tagsToAdd} onChange={setTagsToAdd} />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <Label htmlFor="m-notes">Notes (ingredients, prep steps…)</Label>
            <Textarea id="m-notes" name="notes" rows={3} />
          </div>
          <DialogFooter className="sm:col-span-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowAdd(false)}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving…" : "Add to menu"}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>

      {/* List */}
      {items.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center gap-3 p-12 text-center">
            <ChefHat className="h-7 w-7 text-mustard" />
            <p className="text-sm text-ink-soft">
              No dishes planned yet. Add the first one above. Start with the
              main and work outward.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-5">
          {grouped.map(([course, list]) => (
            <Card key={course} className="overflow-visible">
              <CardContent className="p-0">
                <div className="flex items-center gap-2 border-b-2 border-dashed border-rule px-5 py-3">
                  <h4 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-ink">
                    {MENU_COURSE_LABELS[course]}
                  </h4>
                  <Badge variant="muted">{list.length}</Badge>
                </div>
                <ul className="divide-y-2 divide-dashed divide-rule">
                  {list.map((it) => {
                    const totalTime =
                      (it.prep_time_minutes ?? 0) + (it.cook_time_minutes ?? 0);
                    return (
                      <li
                        key={it.id}
                        role="button"
                        tabIndex={0}
                        aria-label={`View details for ${it.name}`}
                        onClick={() => setViewing(it)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setViewing(it);
                          }
                        }}
                        className="grid cursor-pointer items-start gap-3 px-5 py-4 transition-colors hover:bg-paper-deep/40 focus-visible:bg-paper-deep/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-terracotta sm:grid-cols-[1.6fr_auto_auto]"
                      >
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-baseline gap-2">
                            <span className="font-display text-base font-semibold">
                              {it.name}
                            </span>
                            {it.recipe_url && (
                              <a
                                href={it.recipe_url}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 text-xs font-semibold text-terracotta-deep underline decoration-2 underline-offset-2"
                              >
                                recipe
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-soft">
                            {it.serves != null && (
                              <span className="inline-flex items-center gap-1">
                                <Users className="h-3 w-3" /> serves {it.serves}
                              </span>
                            )}
                            {totalTime > 0 && (
                              <span className="inline-flex items-center gap-1">
                                <Clock className="h-3 w-3" /> {fmtMinutes(totalTime)}
                                {it.prep_time_minutes != null &&
                                  it.cook_time_minutes != null && (
                                    <span className="text-ink-soft/70">
                                      ({fmtMinutes(it.prep_time_minutes)} prep
                                      · {fmtMinutes(it.cook_time_minutes)} cook)
                                    </span>
                                  )}
                              </span>
                            )}
                          </div>
                          {it.dietary_tags.length > 0 && (
                            <div className="mt-1.5 flex flex-wrap gap-1">
                              {it.dietary_tags.map((tag) => (
                                <Badge key={tag} variant={TAG_VARIANT[tag]}>
                                  {DIETARY_TAG_LABELS[tag]}
                                </Badge>
                              ))}
                            </div>
                          )}
                          {it.notes && (
                            <p className="mt-1.5 line-clamp-4 whitespace-pre-wrap text-sm text-ink-soft">
                              {it.notes}
                            </p>
                          )}
                        </div>
                        <div
                          className="flex items-start gap-2"
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => e.stopPropagation()}
                        >
                          <StatusBadge status={it.status} />
                          <Dropdown
                            value={it.status}
                            onChange={(v) =>
                              onStatusChange(it, v as MenuStatus)
                            }
                            options={STATUS_OPTIONS}
                            size="sm"
                            className="w-28"
                            aria-label={`Status for ${it.name}`}
                          />
                        </div>
                        <div
                          className="flex items-start gap-1"
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditing(it);
                            }}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-soft transition-colors hover:bg-paper-deep hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                            aria-label={`Edit ${it.name}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setToDelete(it);
                            }}
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

      {viewing && (
        <ViewMenuDialog
          item={viewing}
          onClose={() => setViewing(null)}
          onEdit={() => {
            const it = viewing;
            setViewing(null);
            setEditing(it);
          }}
        />
      )}

      {editing && (
        <EditMenuDialog
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
        title="Remove this dish?"
        description={
          toDelete ? (
            <>
              <span className="font-display font-bold text-ink">
                {toDelete.name}
              </span>{" "}
              will be removed from the menu. This can't be undone.
            </>
          ) : null
        }
        confirmLabel="Yes, remove"
        cancelLabel="Keep it"
      />
    </div>
  );
}

function ViewMenuDialog({
  item,
  onClose,
  onEdit,
}: {
  item: MenuItem;
  onClose: () => void;
  onEdit: () => void;
}) {
  const totalTime =
    (item.prep_time_minutes ?? 0) + (item.cook_time_minutes ?? 0);

  return (
    <Dialog
      open={true}
      onClose={onClose}
      tape="mustard"
      className="max-w-xl"
    >
      <DialogHeader>
        <DialogTitle>{item.name}</DialogTitle>
        <p className="mt-1 font-hand text-xl text-terracotta">
          {MENU_COURSE_LABELS[item.course]}
        </p>
      </DialogHeader>

      <DialogBody className="space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={item.status} />
          {item.recipe_url && (
            <a
              href={item.recipe_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-terracotta-deep underline decoration-2 underline-offset-2"
            >
              open recipe
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>

        {(item.serves != null || totalTime > 0) && (
          <div className="grid gap-3 sm:grid-cols-2">
            {item.serves != null && (
              <div className="rounded-xl border-2 border-dashed border-rule bg-paper-deep/40 px-4 py-3">
                <p className="font-display text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft">
                  Serves
                </p>
                <p className="mt-1 inline-flex items-center gap-2 font-display text-xl font-bold">
                  <Users className="h-4 w-4 text-olive" />
                  {item.serves}{" "}
                  <span className="text-sm font-medium text-ink-soft">
                    {item.serves === 1 ? "person" : "people"}
                  </span>
                </p>
              </div>
            )}
            {totalTime > 0 && (
              <div className="rounded-xl border-2 border-dashed border-rule bg-paper-deep/40 px-4 py-3">
                <p className="font-display text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft">
                  Total time
                </p>
                <p className="mt-1 inline-flex items-center gap-2 font-display text-xl font-bold">
                  <Clock className="h-4 w-4 text-mustard" />
                  {fmtMinutes(totalTime)}
                </p>
                {item.prep_time_minutes != null &&
                  item.cook_time_minutes != null && (
                    <p className="mt-1 text-xs text-ink-soft">
                      {fmtMinutes(item.prep_time_minutes)} prep ·{" "}
                      {fmtMinutes(item.cook_time_minutes)} cook
                    </p>
                  )}
              </div>
            )}
          </div>
        )}

        {item.dietary_tags.length > 0 && (
          <div>
            <p className="mb-2 font-display text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft">
              Dietary
            </p>
            <div className="flex flex-wrap gap-1.5">
              {item.dietary_tags.map((tag) => (
                <Badge key={tag} variant={TAG_VARIANT[tag]}>
                  {DIETARY_TAG_LABELS[tag]}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {item.notes && (
          <div>
            <p className="mb-2 font-display text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft">
              Notes
            </p>
            <p className="whitespace-pre-wrap rounded-xl border-2 border-dashed border-rule bg-paper-light px-4 py-3 text-[15px] leading-relaxed text-ink">
              {item.notes}
            </p>
          </div>
        )}
      </DialogBody>

      <DialogFooter>
        <Button type="button" variant="ghost" onClick={onClose}>
          Close
        </Button>
        <Button type="button" onClick={onEdit}>
          <Pencil className="h-4 w-4" /> Edit
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

function EditMenuDialog({
  eventId,
  item,
  onClose,
}: {
  eventId: string;
  item: MenuItem;
  onClose: () => void;
}) {
  const [pending, startTransition] = useTransition();
  const [tags, setTags] = useState<DietaryTag[]>(item.dietary_tags);

  function onSubmit(formData: FormData) {
    for (const t of tags) formData.append("dietary_tags", t);
    startTransition(async () => {
      const res = await updateMenuItemAction(eventId, item.id, formData);
      if (res?.error) toast.error("Couldn't save", res.error);
      else {
        toast.success("Dish updated");
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
        <DialogTitle>Edit dish</DialogTitle>
      </DialogHeader>
      <form action={onSubmit} className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="space-y-1 sm:col-span-2">
          <Label htmlFor="em-name">Dish name</Label>
          <Input
            id="em-name"
            name="name"
            defaultValue={item.name}
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="em-course">Course</Label>
          <Dropdown
            id="em-course"
            name="course"
            defaultValue={item.course}
            options={COURSE_OPTIONS}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="em-status">Status</Label>
          <Dropdown
            id="em-status"
            name="status"
            defaultValue={item.status}
            options={STATUS_OPTIONS}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="em-serves">Serves</Label>
          <Input
            id="em-serves"
            name="serves"
            type="number"
            min={1}
            defaultValue={item.serves ?? ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="em-prep">Prep (min)</Label>
          <Input
            id="em-prep"
            name="prep_time_minutes"
            type="number"
            min={0}
            defaultValue={item.prep_time_minutes ?? ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="em-cook">Cook (min)</Label>
          <Input
            id="em-cook"
            name="cook_time_minutes"
            type="number"
            min={0}
            defaultValue={item.cook_time_minutes ?? ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="em-url">Recipe link</Label>
          <Input
            id="em-url"
            name="recipe_url"
            type="url"
            defaultValue={item.recipe_url ?? ""}
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label>Dietary tags</Label>
          <DietaryChips value={tags} onChange={setTags} />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <Label htmlFor="em-notes">Notes</Label>
          <Textarea
            id="em-notes"
            name="notes"
            rows={3}
            defaultValue={item.notes ?? ""}
          />
        </div>
        <DialogFooter className="sm:col-span-2">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={pending}
          >
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
