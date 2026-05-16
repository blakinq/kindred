"use client";

import { useMemo, useState, useTransition } from "react";
import {
  addGuestAction,
  bulkAddGuestsAction,
  deleteGuestAction,
  updateGuestRsvpAction,
} from "@/app/app/events/[eventId]/guests/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dropdown } from "@/components/ui/dropdown";
import { Textarea } from "@/components/ui/textarea";
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
import { RSVP_LABELS, type Guest, type RsvpStatus } from "@/lib/types";
import { Trash2 } from "lucide-react";

const FILTERS: { value: "all" | RsvpStatus; label: string }[] = [
  { value: "all", label: "Everyone" },
  { value: "going", label: "Going" },
  { value: "maybe", label: "Maybe" },
  { value: "not_going", label: "Can't" },
  { value: "invited", label: "Invited" },
  { value: "no_response", label: "Quiet" },
];

const STATUS_OPTIONS = [
  { value: "invited", label: "Invited" },
  { value: "going", label: "Going" },
  { value: "maybe", label: "Maybe" },
  { value: "not_going", label: "Not going" },
  { value: "no_response", label: "Quiet" },
];

function StatusBadge({ status }: { status: RsvpStatus }) {
  const map: Record<RsvpStatus, "success" | "warning" | "destructive" | "muted" | "secondary"> = {
    going: "success",
    maybe: "warning",
    not_going: "destructive",
    invited: "secondary",
    no_response: "muted",
  };
  return <Badge variant={map[status]}>{RSVP_LABELS[status]}</Badge>;
}

export function GuestList({
  eventId,
  guests,
}: {
  eventId: string;
  guests: Guest[];
}) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["value"]>("all");
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showBulk, setShowBulk] = useState(false);
  const [bulk, setBulk] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [pending, startTransition] = useTransition();
  const [pendingDelete, deleteTransition] = useTransition();
  const [toDelete, setToDelete] = useState<Guest | null>(null);

  const filtered = useMemo(() => {
    return guests.filter((g) => {
      if (filter !== "all" && g.rsvp_status !== filter) return false;
      if (
        search &&
        !`${g.name} ${g.email ?? ""}`.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [guests, filter, search]);

  function onAdd(formData: FormData) {
    setError(undefined);
    const name = String(formData.get("name") ?? "").trim();
    startTransition(async () => {
      const res = await addGuestAction(eventId, formData);
      if (res?.error) {
        setError(res.error);
        toast.error("Couldn't add guest", res.error);
      } else {
        (document.getElementById("add-guest-form") as HTMLFormElement | null)?.reset();
        toast.success(`Added ${name || "guest"}`, "They're on the list.");
        setShowAdd(false);
      }
    });
  }

  function onBulk() {
    setError(undefined);
    const count = bulk
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean).length;
    startTransition(async () => {
      const res = await bulkAddGuestsAction(eventId, bulk);
      if (res?.error) {
        setError(res.error);
        toast.error("Couldn't add guests", res.error);
      } else {
        setBulk("");
        setShowBulk(false);
        toast.success(
          `Added ${count} ${count === 1 ? "guest" : "guests"}`,
          "All set.",
        );
        setShowAdd(false);
      }
    });
  }

  function onStatusChange(guest: Guest, status: RsvpStatus) {
    if (guest.rsvp_status === status) return;
    startTransition(async () => {
      const res = await updateGuestRsvpAction(eventId, guest.id, status);
      if (res?.error) {
        setError(res.error);
        toast.error("Couldn't update RSVP", res.error);
      } else {
        toast.success(
          `${guest.name} → ${RSVP_LABELS[status]}`,
          "RSVP updated.",
        );
      }
    });
  }

  function confirmDelete() {
    if (!toDelete) return;
    const g = toDelete;
    deleteTransition(async () => {
      const res = await deleteGuestAction(eventId, g.id);
      if (res?.error) {
        setError(res.error);
        toast.error("Couldn't remove guest", res.error);
        setToDelete(null);
      } else {
        toast.success(`Removed ${g.name}`, "They're off the list.");
        setToDelete(null);
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* Add CTA */}
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setShowAdd(true);
            setError(undefined);
          }}
        >
          + Add someone
        </Button>
      </div>

      <Dialog
        open={showAdd}
        onClose={
          pending
            ? () => {}
            : () => {
                setShowAdd(false);
                setShowBulk(false);
                setError(undefined);
              }
        }
        tape="coral"
        className="max-w-2xl"
      >
        <DialogHeader>
          <DialogTitle>Add someone</DialogTitle>
          <p className="mt-1 font-hand text-xl text-terracotta">to the list</p>
        </DialogHeader>
        <form id="add-guest-form" action={onAdd} className="mt-5 space-y-3">
          <div className="space-y-1">
            <Label htmlFor="g-name">Name</Label>
            <Input id="g-name" name="name" placeholder="Jamie Lee" required />
          </div>
          <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
            <div className="space-y-1">
              <Label htmlFor="g-email">Email</Label>
              <Input
                id="g-email"
                name="email"
                type="email"
                placeholder="jamie@…"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="g-status">Status</Label>
              <Dropdown
                id="g-status"
                name="rsvp_status"
                defaultValue="invited"
                options={STATUS_OPTIONS}
              />
            </div>
          </div>
          <div className="flex justify-end pt-1">
            <Button type="submit" disabled={pending}>
              Add
            </Button>
          </div>
        </form>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t-2 border-dashed border-rule pt-4">
          <button
            type="button"
            onClick={() => setShowBulk((v) => !v)}
            className="font-display text-sm font-semibold text-terracotta-deep hover:underline"
          >
            {showBulk ? "↑ Hide bulk add" : "+ Paste a whole list"}
          </button>
          {error && (
            <p className="text-sm font-medium text-terracotta-deep">{error}</p>
          )}
        </div>
        {showBulk && (
          <div className="mt-3 space-y-2">
            <Textarea
              rows={5}
              placeholder={`One per line:\nJamie Lee\nJamie Lee, jamie@example.com\nJamie Lee <jamie@example.com>\njamie@example.com`}
              value={bulk}
              onChange={(e) => setBulk(e.target.value)}
            />
            <div className="flex justify-end">
              <Button onClick={onBulk} disabled={pending || !bulk.trim()}>
                Add all →
              </Button>
            </div>
          </div>
        )}
      </Dialog>

      {/* Filters + search */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={
                "rounded-full border-2 px-3.5 py-1 text-xs font-display font-bold uppercase tracking-wider transition-all " +
                (filter === f.value
                  ? "border-ink bg-ink text-paper-light"
                  : "border-ink/40 bg-paper-light text-ink-soft hover:border-ink hover:text-ink")
              }
            >
              {f.label}
            </button>
          ))}
        </div>
        <Input
          type="search"
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 sm:w-56"
        />
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-12 text-center text-sm text-ink-soft">
            {guests.length === 0
              ? "No one on the list yet. Add someone above to start."
              : "Nobody matches that filter."}
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-visible">
          <ul className="divide-y-2 divide-dashed divide-rule">
            {filtered.map((g) => (
              <li
                key={g.id}
                className="grid grid-cols-[1fr_auto] items-center gap-3 px-5 py-4 transition-colors hover:bg-paper-deep/50 sm:grid-cols-[1.5fr_1fr_auto_40px]"
              >
                <div>
                  <div className="font-display text-base font-semibold">{g.name}</div>
                  {g.email && (
                    <div className="text-xs text-ink-soft">{g.email}</div>
                  )}
                  {g.note && (
                    <div className="mt-1 font-hand text-base text-terracotta-deep">
                      "{g.note}"
                    </div>
                  )}
                </div>
                <div className="hidden text-xs text-ink-soft sm:block">
                  {g.party_size > 1 && `party of ${g.party_size}`}
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={g.rsvp_status} />
                  <Dropdown
                    value={g.rsvp_status}
                    onChange={(v) => onStatusChange(g, v as RsvpStatus)}
                    options={STATUS_OPTIONS}
                    size="sm"
                    className="w-32"
                    aria-label={`Change RSVP for ${g.name}`}
                  />
                </div>
                <button
                  onClick={() => setToDelete(g)}
                  className="text-ink-soft transition-colors hover:text-terracotta-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta rounded"
                  aria-label={`Remove ${g.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <ConfirmDialog
        open={toDelete !== null}
        onClose={() => setToDelete(null)}
        onConfirm={confirmDelete}
        pending={pendingDelete}
        title="Remove this guest?"
        description={
          toDelete ? (
            <>
              <span className="font-display font-bold text-ink">{toDelete.name}</span>
              {toDelete.email ? ` (${toDelete.email})` : ""} will be removed from
              the list. Their RSVP and any plus-ones will be cleared. This can't
              be undone.
            </>
          ) : null
        }
        confirmLabel="Yes, remove"
        cancelLabel="Keep them"
      />
    </div>
  );
}
