"use client";

import { useMemo, useState, useTransition } from "react";
import { Pencil, Trash2, Wallet } from "lucide-react";
import {
  addExpenseAction,
  deleteExpenseAction,
  updateBudgetTargetAction,
  updateExpenseAction,
  updateExpensePaymentStatusAction,
} from "@/app/app/events/[eventId]/budget/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dropdown } from "@/components/ui/dropdown";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  EXPENSE_CATEGORY_LABELS,
  PAYMENT_STATUS_LABELS,
  type Expense,
  type ExpenseCategory,
  type PaymentStatus,
} from "@/lib/types";

const CATEGORY_OPTIONS = (
  Object.entries(EXPENSE_CATEGORY_LABELS) as [ExpenseCategory, string][]
).map(([value, label]) => ({ value, label }));

const PAYMENT_OPTIONS = (
  Object.entries(PAYMENT_STATUS_LABELS) as [PaymentStatus, string][]
).map(([value, label]) => ({ value, label }));

function PaymentBadge({ status }: { status: PaymentStatus }) {
  const variant: Record<PaymentStatus, "muted" | "success" | "ocean"> = {
    unpaid: "muted",
    paid: "success",
    reimbursed: "ocean",
  };
  return <Badge variant={variant[status]}>{PAYMENT_STATUS_LABELS[status]}</Badge>;
}

function projectedCents(e: Expense) {
  return e.actual_amount_cents ?? e.estimated_amount_cents ?? 0;
}

function lineDisplayCents(e: Expense) {
  return e.estimated_amount_cents ?? e.actual_amount_cents ?? 0;
}

export function BudgetTab({
  eventId,
  currency,
  budgetTargetCents,
  expenses,
}: {
  eventId: string;
  currency: string;
  budgetTargetCents: number | null;
  expenses: Expense[];
}) {
  const [pending, startTransition] = useTransition();
  const [pendingDelete, deleteTransition] = useTransition();
  const [editing, setEditing] = useState<Expense | null>(null);
  const [toDelete, setToDelete] = useState<Expense | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [targetInput, setTargetInput] = useState(
    centsToInput(budgetTargetCents),
  );

  const totals = useMemo(() => {
    const estimated = expenses.reduce(
      (sum, e) => sum + (e.estimated_amount_cents ?? 0),
      0,
    );
    const actual = expenses.reduce(
      (sum, e) => sum + (e.actual_amount_cents ?? 0),
      0,
    );
    return { estimated, actual };
  }, [expenses]);

  const overBudget =
    budgetTargetCents != null && totals.actual > budgetTargetCents;
  const overByEstimate =
    budgetTargetCents != null && totals.estimated > budgetTargetCents;
  const remaining =
    budgetTargetCents == null ? null : budgetTargetCents - totals.actual;

  function onAddExpense(formData: FormData) {
    const name = String(formData.get("name") ?? "").trim();
    startTransition(async () => {
      const res = await addExpenseAction(eventId, formData);
      if (res?.error) {
        toast.error("Couldn't add expense", res.error);
      } else {
        (document.getElementById("add-expense-form") as HTMLFormElement | null)?.reset();
        toast.success(`Added ${name || "expense"}`, "Logged to the budget.");
        setShowAdd(false);
      }
    });
  }

  function onUpdateTarget() {
    startTransition(async () => {
      const res = await updateBudgetTargetAction(eventId, targetInput);
      if (res?.error) {
        toast.error("Couldn't save target", res.error);
      } else {
        toast.success("Budget target saved", "Numbers updated.");
      }
    });
  }

  function onClearTarget() {
    setTargetInput("");
    startTransition(async () => {
      const res = await updateBudgetTargetAction(eventId, "");
      if (res?.error) toast.error("Couldn't clear target", res.error);
      else toast.success("Target cleared");
    });
  }

  function onQuickStatusChange(expense: Expense, status: PaymentStatus) {
    if (expense.payment_status === status) return;
    startTransition(async () => {
      const res = await updateExpensePaymentStatusAction(eventId, expense.id, status);
      if (res?.error) toast.error("Couldn't update", res.error);
      else toast.success(`Marked ${PAYMENT_STATUS_LABELS[status].toLowerCase()}`);
    });
  }

  function confirmDelete() {
    if (!toDelete) return;
    const e = toDelete;
    deleteTransition(async () => {
      const res = await deleteExpenseAction(eventId, e.id);
      if (res?.error) {
        toast.error("Couldn't delete", res.error);
      } else {
        toast.success(`Removed ${e.name}`);
      }
      setToDelete(null);
    });
  }

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card tape="ocean">
          <CardContent className="p-5">
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
              Estimated
            </p>
            <p
              className={
                "mt-1 font-display text-3xl font-bold tracking-tight " +
                (overByEstimate ? "text-terracotta-deep" : "text-ink")
              }
            >
              {formatCurrency(totals.estimated, currency)}
            </p>
            <p className="mt-1 text-xs text-ink-soft">
              Summed estimated cost from each expense.
            </p>
          </CardContent>
        </Card>

        <Card tape="mustard">
          <CardContent className="p-5">
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
              Actual cost
            </p>
            <p className="mt-1 font-display text-3xl font-bold tracking-tight">
              {formatCurrency(totals.actual, currency)}
            </p>
            <p className="mt-1 text-xs text-ink-soft">
              Confirmed spend so far.
            </p>
          </CardContent>
        </Card>

        <Card tape={overBudget ? "coral" : "olive"}>
          <CardContent className="p-5">
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
              {overBudget ? "Over budget" : "Remaining"}
            </p>
            <p
              className={
                "mt-1 font-display text-3xl font-bold tracking-tight " +
                (overBudget ? "text-terracotta-deep" : "text-ink")
              }
            >
              {remaining == null
                ? "—"
                : formatCurrency(Math.abs(remaining), currency)}
            </p>
            <p className="mt-1 text-xs text-ink-soft">
              {budgetTargetCents == null
                ? "Set a target below"
                : `of ${formatCurrency(budgetTargetCents, currency)} target`}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Target */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-terracotta" /> Budget target
          </CardTitle>
          <p className="text-sm text-ink-soft">
            Optional. Leaving it blank just tracks spend without a goal.
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex-1 min-w-[200px] space-y-1.5">
              <Label htmlFor="budget-target">Total target</Label>
              <Input
                id="budget-target"
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
              />
            </div>
            <Button onClick={onUpdateTarget} disabled={pending}>
              Save target
            </Button>
            {budgetTargetCents != null && (
              <Button
                variant="ghost"
                onClick={onClearTarget}
                disabled={pending}
              >
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add expense CTA */}
      <div className="flex justify-end">
        <Button onClick={() => setShowAdd(true)}>+ Log an expense</Button>
      </div>

      <Dialog
        open={showAdd}
        onClose={pending ? () => {} : () => setShowAdd(false)}
        tape="coral"
        className="max-w-2xl"
        scrollBody
      >
        <DialogHeader>
          <DialogTitle>Log an expense</DialogTitle>
          <p className="mt-1 font-hand text-xl text-terracotta">what's it cost</p>
        </DialogHeader>
        <form
          id="add-expense-form"
          action={onAddExpense}
          className="mt-5 flex min-h-0 flex-1 flex-col"
        >
          <div className="-mr-2 grid min-h-0 flex-1 gap-3 overflow-y-auto pr-2 sm:grid-cols-2">
            <div className="space-y-1 sm:col-span-2">
              <Label htmlFor="e-name">Name</Label>
              <Input id="e-name" name="name" placeholder="Catering deposit" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="e-category">Category</Label>
              <Dropdown
                id="e-category"
                name="category"
                defaultValue="other"
                options={CATEGORY_OPTIONS}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="e-status">Status</Label>
              <Dropdown
                id="e-status"
                name="payment_status"
                defaultValue="unpaid"
                options={PAYMENT_OPTIONS}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="e-est">Estimated</Label>
              <Input
                id="e-est"
                name="estimated_amount"
                type="text"
                inputMode="decimal"
                placeholder="0.00"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="e-actual">Actual</Label>
              <Input
                id="e-actual"
                name="actual_amount"
                type="text"
                inputMode="decimal"
                placeholder="0.00"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <Label htmlFor="e-paid-by">Paid by (optional)</Label>
              <Input id="e-paid-by" name="paid_by_name" placeholder="Enter name" />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <Label htmlFor="e-notes">Notes (optional)</Label>
              <Textarea id="e-notes" name="notes" rows={2} />
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
              {pending ? "Saving…" : "Add expense"}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>

      {/* List */}
      {expenses.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-12 text-center text-sm text-ink-soft">
            No expenses logged yet. Add one above.
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-visible">
          <ul className="divide-y-2 divide-dashed divide-rule">
            {expenses.map((e) => {
              const projected = projectedCents(e);
              return (
                <li
                  key={e.id}
                  className="grid gap-3 px-5 py-4 transition-colors hover:bg-paper-deep/40 sm:grid-cols-[1.6fr_1fr_auto_auto]"
                >
                  <div className="min-w-0">
                    <div className="font-display text-base font-semibold">
                      {e.name}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-ink-soft">
                      <Badge variant="outline" className="!normal-case !tracking-normal">
                        {EXPENSE_CATEGORY_LABELS[e.category]}
                      </Badge>
                      {e.paid_by_name && <span>· paid by {e.paid_by_name}</span>}
                    </div>
                    {e.notes && (
                      <p className="mt-1 font-hand text-base text-terracotta-deep">
                        "{e.notes}"
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-start sm:items-end">
                    <div className="font-display text-base font-bold">
                      {formatCurrency(projected, currency)}
                    </div>
                    <div className="text-[11px] text-ink-soft">
                      {e.actual_amount_cents != null
                        ? "Actual"
                        : e.estimated_amount_cents != null
                          ? "Estimated"
                          : "Not set"}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <PaymentBadge status={e.payment_status} />
                    <Dropdown
                      value={e.payment_status}
                      onChange={(v) =>
                        onQuickStatusChange(e, v as PaymentStatus)
                      }
                      options={PAYMENT_OPTIONS}
                      size="sm"
                      className="w-36"
                      aria-label={`Change payment status for ${e.name}`}
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setEditing(e)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-soft transition-colors hover:bg-paper-deep hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                      aria-label={`Edit ${e.name}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setToDelete(e)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-soft transition-colors hover:bg-terracotta/15 hover:text-terracotta-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                      aria-label={`Delete ${e.name}`}
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
        <EditExpenseDialog
          eventId={eventId}
          expense={editing}
          onClose={() => setEditing(null)}
        />
      )}

      <ConfirmDialog
        open={toDelete !== null}
        onClose={() => setToDelete(null)}
        onConfirm={confirmDelete}
        pending={pendingDelete}
        title="Delete this expense?"
        description={
          toDelete ? (
            <>
              <span className="font-display font-bold text-ink">{toDelete.name}</span>{" "}
              ({formatCurrency(projectedCents(toDelete), currency)}) will be
              removed from the budget. This can't be undone.
            </>
          ) : null
        }
        confirmLabel="Yes, delete"
        cancelLabel="Keep it"
      />
    </div>
  );
}

function EditExpenseDialog({
  eventId,
  expense,
  onClose,
}: {
  eventId: string;
  expense: Expense;
  onClose: () => void;
}) {
  const [pending, startTransition] = useTransition();

  function onSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await updateExpenseAction(eventId, expense.id, formData);
      if (res?.error) toast.error("Couldn't save", res.error);
      else {
        toast.success("Expense updated");
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
      scrollBody
    >
      <DialogHeader>
        <DialogTitle>Edit expense</DialogTitle>
      </DialogHeader>
      <form action={onSubmit} className="mt-5 flex min-h-0 flex-1 flex-col">
        <div className="-mr-2 grid min-h-0 flex-1 gap-3 overflow-y-auto pr-2 sm:grid-cols-2">
          <div className="space-y-1 sm:col-span-2">
            <Label htmlFor="ee-name">Name</Label>
            <Input id="ee-name" name="name" defaultValue={expense.name} required />
          </div>
          <div className="space-y-1">
            <Label htmlFor="ee-category">Category</Label>
            <Dropdown
              id="ee-category"
              name="category"
              defaultValue={expense.category}
              options={CATEGORY_OPTIONS}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="ee-status">Status</Label>
            <Dropdown
              id="ee-status"
              name="payment_status"
              defaultValue={expense.payment_status}
              options={PAYMENT_OPTIONS}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="ee-est">Estimated</Label>
            <Input
              id="ee-est"
              name="estimated_amount"
              type="text"
              inputMode="decimal"
              defaultValue={centsToInput(expense.estimated_amount_cents)}
              placeholder="0.00"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="ee-actual">Actual</Label>
            <Input
              id="ee-actual"
              name="actual_amount"
              type="text"
              inputMode="decimal"
              defaultValue={centsToInput(expense.actual_amount_cents)}
              placeholder="0.00"
            />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <Label htmlFor="ee-paid-by">Paid by</Label>
            <Input
              id="ee-paid-by"
              name="paid_by_name"
              defaultValue={expense.paid_by_name ?? ""}
            />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <Label htmlFor="ee-notes">Notes</Label>
            <Textarea
              id="ee-notes"
              name="notes"
              rows={2}
              defaultValue={expense.notes ?? ""}
            />
          </div>
        </div>
        <DialogFooter>
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
