"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { ExpenseSchema } from "@/lib/validation";
import { parseMoneyToCents } from "@/lib/money";
import type { ExpenseCategory, PaymentStatus } from "@/lib/types";

type ActionResult = { error?: string } | undefined;

function pickExpense(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    category: (formData.get("category") || "other") as ExpenseCategory,
    estimated_amount_cents: parseMoneyToCents(formData.get("estimated_amount")),
    actual_amount_cents: parseMoneyToCents(formData.get("actual_amount")),
    paid_by_name:
      String(formData.get("paid_by_name") ?? "").trim() || null,
    payment_status: (formData.get("payment_status") || "unpaid") as PaymentStatus,
    notes: String(formData.get("notes") ?? "").trim() || null,
  };
}

export async function addExpenseAction(
  eventId: string,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = ExpenseSchema.safeParse(pickExpense(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const supabase = await createClient();
  const { error } = await supabase.from("expenses").insert({
    event_id: eventId,
    name: parsed.data.name,
    category: parsed.data.category,
    estimated_amount_cents: parsed.data.estimated_amount_cents ?? null,
    actual_amount_cents: parsed.data.actual_amount_cents ?? null,
    paid_by_name: parsed.data.paid_by_name ?? null,
    payment_status: parsed.data.payment_status,
    notes: parsed.data.notes ?? null,
  });
  if (error) return { error: error.message };
  revalidatePath(`/app/events/${eventId}/budget`);
  revalidatePath(`/app/events/${eventId}`);
}

export async function updateExpenseAction(
  eventId: string,
  expenseId: string,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = ExpenseSchema.safeParse(pickExpense(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const supabase = await createClient();
  const { error } = await supabase
    .from("expenses")
    .update({
      name: parsed.data.name,
      category: parsed.data.category,
      estimated_amount_cents: parsed.data.estimated_amount_cents ?? null,
      actual_amount_cents: parsed.data.actual_amount_cents ?? null,
      paid_by_name: parsed.data.paid_by_name ?? null,
      payment_status: parsed.data.payment_status,
      notes: parsed.data.notes ?? null,
    })
    .eq("id", expenseId)
    .eq("event_id", eventId);
  if (error) return { error: error.message };
  revalidatePath(`/app/events/${eventId}/budget`);
  revalidatePath(`/app/events/${eventId}`);
}

export async function deleteExpenseAction(
  eventId: string,
  expenseId: string,
): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("expenses")
    .delete()
    .eq("id", expenseId)
    .eq("event_id", eventId);
  if (error) return { error: error.message };
  revalidatePath(`/app/events/${eventId}/budget`);
  revalidatePath(`/app/events/${eventId}`);
}

export async function updateExpensePaymentStatusAction(
  eventId: string,
  expenseId: string,
  status: PaymentStatus,
): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("expenses")
    .update({ payment_status: status })
    .eq("id", expenseId)
    .eq("event_id", eventId);
  if (error) return { error: error.message };
  revalidatePath(`/app/events/${eventId}/budget`);
}

export async function updateBudgetTargetAction(
  eventId: string,
  rawAmount: string,
): Promise<ActionResult> {
  const cents = rawAmount.trim() === "" ? null : parseMoneyToCents(rawAmount);
  if (rawAmount.trim() !== "" && cents == null) {
    return { error: "Enter a valid amount" };
  }
  const supabase = await createClient();
  const { error } = await supabase
    .from("events")
    .update({ budget_target_cents: cents })
    .eq("id", eventId);
  if (error) return { error: error.message };
  revalidatePath(`/app/events/${eventId}/budget`);
  revalidatePath(`/app/events/${eventId}`);
}
