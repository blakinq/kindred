"use client";

import { useMemo, useState, useTransition } from "react";
import { Calendar, Check, ListChecks, Pencil, Trash2 } from "lucide-react";
import {
  addTaskAction,
  deleteTaskAction,
  updateTaskAction,
  updateTaskPriorityAction,
  updateTaskStatusAction,
} from "@/app/app/events/[eventId]/tasks/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dropdown } from "@/components/ui/dropdown";
import { DateInput } from "@/components/ui/date-input";
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
import { cn } from "@/lib/utils";
import {
  TASK_PRIORITY_LABELS,
  TASK_STATUS_LABELS,
  type Task,
  type TaskPriority,
  type TaskStatus,
} from "@/lib/types";

const STATUS_OPTIONS = (
  Object.entries(TASK_STATUS_LABELS) as [TaskStatus, string][]
).map(([value, label]) => ({ value, label }));

const PRIORITY_OPTIONS = (
  Object.entries(TASK_PRIORITY_LABELS) as [TaskPriority, string][]
).map(([value, label]) => ({ value, label }));

const FILTERS: { value: "all" | "open" | "done" | "overdue"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "open", label: "Open" },
  { value: "overdue", label: "Overdue" },
  { value: "done", label: "Done" },
];

function StatusBadge({ status }: { status: TaskStatus }) {
  const map: Record<TaskStatus, "muted" | "warning" | "destructive" | "success"> = {
    not_started: "muted",
    in_progress: "warning",
    blocked: "destructive",
    done: "success",
  };
  return <Badge variant={map[status]}>{TASK_STATUS_LABELS[status]}</Badge>;
}

function PriorityBadge({ priority }: { priority: TaskPriority }) {
  const map: Record<TaskPriority, "muted" | "secondary" | "destructive"> = {
    low: "muted",
    medium: "secondary",
    high: "destructive",
  };
  return <Badge variant={map[priority]}>{TASK_PRIORITY_LABELS[priority]}</Badge>;
}

function isOverdue(t: Task): boolean {
  if (t.status === "done" || !t.due_date) return false;
  const today = new Date().toISOString().slice(0, 10);
  return t.due_date < today;
}

function formatDue(d: string): string {
  const date = new Date(`${d}T00:00`);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function TaskList({
  eventId,
  tasks,
}: {
  eventId: string;
  tasks: Task[];
}) {
  const [pending, startTransition] = useTransition();
  const [pendingDelete, deleteTransition] = useTransition();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["value"]>("all");
  const [editing, setEditing] = useState<Task | null>(null);
  const [toDelete, setToDelete] = useState<Task | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      if (filter === "open") return t.status !== "done";
      if (filter === "done") return t.status === "done";
      if (filter === "overdue") return isOverdue(t);
      return true;
    });
  }, [tasks, filter]);

  const totals = useMemo(() => {
    const open = tasks.filter((t) => t.status !== "done").length;
    const done = tasks.filter((t) => t.status === "done").length;
    const overdue = tasks.filter(isOverdue).length;
    return { open, done, overdue, total: tasks.length };
  }, [tasks]);

  function onAdd(formData: FormData) {
    const title = String(formData.get("title") ?? "").trim();
    startTransition(async () => {
      const res = await addTaskAction(eventId, formData);
      if (res?.error) toast.error("Couldn't add task", res.error);
      else {
        (document.getElementById("add-task-form") as HTMLFormElement | null)?.reset();
        toast.success(`Added "${title || "task"}"`, "On the list.");
        setShowAdd(false);
      }
    });
  }

  function onToggleDone(task: Task) {
    const next: TaskStatus = task.status === "done" ? "not_started" : "done";
    startTransition(async () => {
      const res = await updateTaskStatusAction(eventId, task.id, next);
      if (res?.error) toast.error("Couldn't update", res.error);
      else
        toast.success(
          next === "done" ? "Marked done" : "Reopened",
          task.title,
        );
    });
  }

  function onStatusChange(task: Task, status: TaskStatus) {
    if (task.status === status) return;
    startTransition(async () => {
      const res = await updateTaskStatusAction(eventId, task.id, status);
      if (res?.error) toast.error("Couldn't update", res.error);
      else toast.success(`${task.title} → ${TASK_STATUS_LABELS[status]}`);
    });
  }

  function onPriorityChange(task: Task, priority: TaskPriority) {
    if (task.priority === priority) return;
    startTransition(async () => {
      const res = await updateTaskPriorityAction(eventId, task.id, priority);
      if (res?.error) toast.error("Couldn't update", res.error);
      else toast.success(`Priority: ${TASK_PRIORITY_LABELS[priority]}`);
    });
  }

  function confirmDelete() {
    if (!toDelete) return;
    const t = toDelete;
    deleteTransition(async () => {
      const res = await deleteTaskAction(eventId, t.id);
      if (res?.error) toast.error("Couldn't delete", res.error);
      else toast.success(`Removed "${t.title}"`);
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
              Open
            </p>
            <p className="mt-1 font-display text-3xl font-bold tracking-tight">
              {totals.open}
            </p>
            <p className="mt-1 text-xs text-ink-soft">still to do</p>
          </CardContent>
        </Card>
        <Card tape="coral">
          <CardContent className="p-5">
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
              Overdue
            </p>
            <p
              className={cn(
                "mt-1 font-display text-3xl font-bold tracking-tight",
                totals.overdue > 0 && "text-terracotta-deep",
              )}
            >
              {totals.overdue}
            </p>
            <p className="mt-1 text-xs text-ink-soft">past due date</p>
          </CardContent>
        </Card>
        <Card tape="olive">
          <CardContent className="p-5">
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
              Done
            </p>
            <p className="mt-1 font-display text-3xl font-bold tracking-tight">
              {totals.done}
            </p>
            <p className="mt-1 text-xs text-ink-soft">
              {totals.total > 0
                ? `of ${totals.total} total`
                : "no tasks yet"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Add CTA */}
      <div className="flex justify-end">
        <Button onClick={() => setShowAdd(true)}>+ Add a task</Button>
      </div>

      <Dialog
        open={showAdd}
        onClose={pending ? () => {} : () => setShowAdd(false)}
        tape="ocean"
        className="max-w-2xl"
      >
        <DialogHeader>
          <DialogTitle>Add a task</DialogTitle>
          <p className="mt-1 font-hand text-xl text-terracotta">prep step</p>
        </DialogHeader>
        <form
          id="add-task-form"
          action={onAdd}
          className="mt-5 grid gap-3 sm:grid-cols-2"
        >
          <div className="space-y-1 sm:col-span-2">
            <Label htmlFor="t-title">Title</Label>
            <Input id="t-title" name="title" placeholder="Pick up the cake" required />
          </div>
          <div className="space-y-1">
            <Label htmlFor="t-priority">Priority</Label>
            <Dropdown
              id="t-priority"
              name="priority"
              defaultValue="medium"
              options={PRIORITY_OPTIONS}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="t-status">Status</Label>
            <Dropdown
              id="t-status"
              name="status"
              defaultValue="not_started"
              options={STATUS_OPTIONS}
            />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <Label htmlFor="t-due">Due date</Label>
            <DateInput id="t-due" name="due_date" icon={Calendar} />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <Label htmlFor="t-desc">Notes (optional)</Label>
            <Textarea id="t-desc" name="description" rows={2} />
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
              {pending ? "Saving…" : "Add task"}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>

      {/* Filter */}
      <div className="flex flex-wrap gap-1.5">
        {FILTERS.map((f) => {
          const count =
            f.value === "all"
              ? totals.total
              : f.value === "open"
                ? totals.open
                : f.value === "overdue"
                  ? totals.overdue
                  : totals.done;
          return (
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
              {f.label} <span className="ml-1 opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center gap-3 p-12 text-center">
            <ListChecks className="h-7 w-7 text-mustard" />
            <p className="text-sm text-ink-soft">
              {tasks.length === 0
                ? "No tasks yet. Add the first one above."
                : "Nothing matches that filter."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-visible">
          <ul className="divide-y-2 divide-dashed divide-rule">
            {filtered.map((t) => {
              const overdue = isOverdue(t);
              return (
                <li
                  key={t.id}
                  className="grid gap-3 px-5 py-4 transition-colors hover:bg-paper-deep/40 sm:grid-cols-[auto_1fr_auto_auto_auto]"
                >
                  <button
                    type="button"
                    onClick={() => onToggleDone(t)}
                    aria-label={
                      t.status === "done"
                        ? `Reopen ${t.title}`
                        : `Mark ${t.title} done`
                    }
                    className={cn(
                      "mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-all",
                      t.status === "done"
                        ? "border-olive bg-olive text-paper-light"
                        : "border-ink/60 bg-paper-light hover:border-ink",
                    )}
                  >
                    {t.status === "done" && <Check className="h-3.5 w-3.5" />}
                  </button>
                  <div className="min-w-0">
                    <div
                      className={cn(
                        "font-display text-base font-semibold",
                        t.status === "done" &&
                          "text-ink-soft line-through decoration-2",
                      )}
                    >
                      {t.title}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-ink-soft">
                      {t.due_date && (
                        <span
                          className={cn(
                            overdue && "font-semibold text-terracotta-deep",
                          )}
                        >
                          {overdue ? "Overdue · " : "Due "}
                          {formatDue(t.due_date)}
                        </span>
                      )}
                    </div>
                    {t.description && (
                      <p className="mt-1 font-hand text-base text-terracotta-deep">
                        "{t.description}"
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <PriorityBadge priority={t.priority} />
                    <Dropdown
                      value={t.priority}
                      onChange={(v) =>
                        onPriorityChange(t, v as TaskPriority)
                      }
                      options={PRIORITY_OPTIONS}
                      size="sm"
                      className="w-24"
                      aria-label={`Priority for ${t.title}`}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={t.status} />
                    <Dropdown
                      value={t.status}
                      onChange={(v) => onStatusChange(t, v as TaskStatus)}
                      options={STATUS_OPTIONS}
                      size="sm"
                      className="w-32"
                      aria-label={`Status for ${t.title}`}
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setEditing(t)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-soft transition-colors hover:bg-paper-deep hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                      aria-label={`Edit ${t.title}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setToDelete(t)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-soft transition-colors hover:bg-terracotta/15 hover:text-terracotta-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                      aria-label={`Delete ${t.title}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      )}

      {editing && (
        <EditTaskDialog
          eventId={eventId}
          task={editing}
          onClose={() => setEditing(null)}
        />
      )}

      <ConfirmDialog
        open={toDelete !== null}
        onClose={() => setToDelete(null)}
        onConfirm={confirmDelete}
        pending={pendingDelete}
        title="Delete this task?"
        description={
          toDelete ? (
            <>
              <span className="font-display font-bold text-ink">
                {toDelete.title}
              </span>{" "}
              will be removed. This can't be undone.
            </>
          ) : null
        }
        confirmLabel="Yes, delete"
        cancelLabel="Keep it"
      />
    </div>
  );
}

function EditTaskDialog({
  eventId,
  task,
  onClose,
}: {
  eventId: string;
  task: Task;
  onClose: () => void;
}) {
  const [pending, startTransition] = useTransition();

  function onSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await updateTaskAction(eventId, task.id, formData);
      if (res?.error) toast.error("Couldn't save", res.error);
      else {
        toast.success("Task updated");
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
        <DialogTitle>Edit task</DialogTitle>
      </DialogHeader>
      <form action={onSubmit} className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="space-y-1 sm:col-span-2">
          <Label htmlFor="et-title">Title</Label>
          <Input id="et-title" name="title" defaultValue={task.title} required />
        </div>
        <div className="space-y-1">
          <Label htmlFor="et-priority">Priority</Label>
          <Dropdown
            id="et-priority"
            name="priority"
            defaultValue={task.priority}
            options={PRIORITY_OPTIONS}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="et-status">Status</Label>
          <Dropdown
            id="et-status"
            name="status"
            defaultValue={task.status}
            options={STATUS_OPTIONS}
          />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <Label htmlFor="et-due">Due date</Label>
          <DateInput
            id="et-due"
            name="due_date"
            icon={Calendar}
            defaultValue={task.due_date ?? ""}
          />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <Label htmlFor="et-desc">Notes</Label>
          <Textarea
            id="et-desc"
            name="description"
            rows={2}
            defaultValue={task.description ?? ""}
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
