import { z } from "zod";

export const SignupSchema = z.object({
  name: z.string().min(1, "Name is required").max(80),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export const ResetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const CreateEventSchema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  event_type: z.string().max(60).optional(),
  description: z.string().max(4000).optional(),
  event_date: z.string().min(1, "Date is required"),
  start_time: z.string().min(1, "Start time is required"),
  end_time: z.string().optional(),
  timezone: z.string().default("UTC"),
  location_type: z.enum(["physical", "virtual", "both", "tbd"]).default("tbd"),
  location_name: z.string().max(200).optional(),
  address: z.string().max(500).optional(),
  virtual_link: z.string().url().optional().or(z.literal("")),
  rsvp_deadline: z.string().optional(),
  plus_one_allowed: z.boolean().default(false),
  max_plus_ones_per_guest: z.coerce.number().int().min(0).max(10).default(0),
  visibility: z
    .enum(["public_link", "link_invited_only", "invited_only"])
    .default("public_link"),
});

export const CreateGuestSchema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().max(40).optional(),
  rsvp_status: z
    .enum(["invited", "going", "maybe", "not_going", "no_response"])
    .default("invited"),
});

const ExpenseCategoryEnum = z.enum([
  "food", "drinks", "venue", "decorations", "supplies",
  "entertainment", "gifts", "transportation", "other",
]);
const PaymentStatusEnum = z.enum(["unpaid", "paid", "reimbursed"]);

export const ExpenseSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  category: ExpenseCategoryEnum.default("other"),
  estimated_amount_cents: z
    .number()
    .int()
    .nonnegative()
    .nullable()
    .optional(),
  actual_amount_cents: z
    .number()
    .int()
    .nonnegative()
    .nullable()
    .optional(),
  paid_by_name: z.string().max(120).nullable().optional(),
  payment_status: PaymentStatusEnum.default("unpaid"),
  notes: z.string().max(2000).nullable().optional(),
});

const FoodCategoryEnum = z.enum([
  "appetizers", "main_dishes", "sides", "desserts", "snacks",
  "non_alcoholic_drinks", "alcoholic_drinks", "ice",
  "plates_cups_cutlery", "decorations", "equipment", "other_supplies",
]);
const FoodStatusEnum = z.enum([
  "needed", "claimed", "purchased", "prepared", "completed",
]);

export const FoodItemSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  category: FoodCategoryEnum.default("other_supplies"),
  quantity: z
    .number()
    .nonnegative()
    .nullable()
    .optional(),
  unit: z.string().max(40).nullable().optional(),
  needed_count: z.coerce.number().int().min(1).max(999).default(1),
  estimated_cost_cents: z
    .number()
    .int()
    .nonnegative()
    .nullable()
    .optional(),
  is_guest_claimable: z.boolean().default(true),
  status: FoodStatusEnum.default("needed"),
  notes: z.string().max(2000).nullable().optional(),
});

const TaskStatusEnum = z.enum(["not_started", "in_progress", "blocked", "done"]);
const TaskPriorityEnum = z.enum(["low", "medium", "high"]);

export const TaskSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().max(4000).nullable().optional(),
  priority: TaskPriorityEnum.default("medium"),
  status: TaskStatusEnum.default("not_started"),
  due_date: z.string().nullable().optional(),
  assignee_name: z.string().max(120).nullable().optional(),
});

const MenuCourseEnum = z.enum([
  "appetizer", "main", "side", "dessert", "drink", "snack", "other",
]);
const MenuStatusEnum = z.enum([
  "planning", "shopping", "prepping", "cooking", "ready",
]);
const DietaryTagEnum = z.enum([
  "vegetarian", "vegan", "gluten_free", "dairy_free",
  "nut_free", "shellfish_free", "halal", "kosher", "spicy",
]);

export const MenuItemSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  course: MenuCourseEnum.default("main"),
  serves: z.number().int().min(1).max(999).nullable().optional(),
  dietary_tags: z.array(DietaryTagEnum).default([]),
  prep_time_minutes: z.number().int().nonnegative().nullable().optional(),
  cook_time_minutes: z.number().int().nonnegative().nullable().optional(),
  recipe_url: z
    .string()
    .url("Recipe URL must be a valid link")
    .nullable()
    .optional()
    .or(z.literal("")),
  notes: z.string().max(4000).nullable().optional(),
  status: MenuStatusEnum.default("planning"),
});

export const RsvpSchema = z.object({
  name: z.string().min(1, "Please enter your name").max(120),
  email: z.string().email().optional().or(z.literal("")),
  rsvp_status: z.enum(["going", "maybe", "not_going"]),
  party_size: z.coerce.number().int().min(1).max(11).default(1),
  dietary_restrictions: z.string().max(500).optional(),
  note: z.string().max(1000).optional(),
});
