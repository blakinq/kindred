export type RsvpStatus = "invited" | "going" | "maybe" | "not_going" | "no_response";
export type EventVisibility = "public_link" | "link_invited_only" | "invited_only";
export type EventStatus = "active" | "archived" | "deleted";
export type LocationType = "physical" | "virtual" | "both" | "tbd";

export type ExpenseCategory =
  | "food" | "drinks" | "venue" | "decorations" | "supplies"
  | "entertainment" | "gifts" | "transportation" | "other";

export type PaymentStatus = "unpaid" | "paid" | "reimbursed";

export type FoodCategory =
  | "appetizers" | "main_dishes" | "sides" | "desserts" | "snacks"
  | "non_alcoholic_drinks" | "alcoholic_drinks" | "ice"
  | "plates_cups_cutlery" | "decorations" | "equipment" | "other_supplies";

export type FoodStatus = "needed" | "claimed" | "purchased" | "prepared" | "completed";
export type TaskStatus = "not_started" | "in_progress" | "blocked" | "done";
export type TaskPriority = "low" | "medium" | "high";
export type AssigneeType = "host" | "cohost" | "guest" | "unassigned";
export type TaskVisibility = "host_only" | "assignee_visible" | "all_participants";

export type MenuCourse =
  | "appetizer" | "main" | "side" | "dessert" | "drink" | "snack" | "other";
export type MenuStatus =
  | "planning" | "shopping" | "prepping" | "cooking" | "ready";
export type DietaryTag =
  | "vegetarian" | "vegan" | "gluten_free" | "dairy_free"
  | "nut_free" | "shellfish_free" | "halal" | "kosher" | "spicy";

export type Event = {
  id: string;
  host_user_id: string;
  name: string;
  event_type: string | null;
  description: string | null;
  event_date: string;
  start_time: string;
  end_time: string | null;
  timezone: string;
  location_type: LocationType;
  location_name: string | null;
  address: string | null;
  virtual_link: string | null;
  rsvp_deadline: string | null;
  rsvps_closed: boolean;
  plus_one_allowed: boolean;
  max_plus_ones_per_guest: number;
  visibility: EventVisibility;
  guest_list_visible: boolean;
  food_claiming_enabled: boolean;
  task_guest_interaction_enabled: boolean;
  budget_target_cents: number | null;
  currency: string;
  invite_slug: string;
  status: EventStatus;
  created_at: string;
  updated_at: string;
};

export type Guest = {
  id: string;
  event_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  rsvp_status: RsvpStatus;
  party_size: number;
  dietary_restrictions: string | null;
  note: string | null;
  invite_token: string;
  invitation_sent_at: string | null;
  rsvp_updated_at: string | null;
  created_at: string;
  updated_at: string;
};

export const RSVP_LABELS: Record<RsvpStatus, string> = {
  invited: "Invited",
  going: "Going",
  maybe: "Maybe",
  not_going: "Not going",
  no_response: "No response",
};

export const EXPENSE_CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  food: "Food",
  drinks: "Drinks",
  venue: "Venue",
  decorations: "Decorations",
  supplies: "Supplies",
  entertainment: "Entertainment",
  gifts: "Gifts",
  transportation: "Transportation",
  other: "Other",
};

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  unpaid: "Unpaid",
  paid: "Paid",
  reimbursed: "Reimbursed",
};

export const FOOD_CATEGORY_LABELS: Record<FoodCategory, string> = {
  appetizers: "Appetizers",
  main_dishes: "Main dishes",
  sides: "Sides",
  desserts: "Desserts",
  snacks: "Snacks",
  non_alcoholic_drinks: "Drinks (non-alc)",
  alcoholic_drinks: "Drinks (alc)",
  ice: "Ice",
  plates_cups_cutlery: "Plates / cups / cutlery",
  decorations: "Decorations",
  equipment: "Equipment",
  other_supplies: "Other supplies",
};

export const FOOD_STATUS_LABELS: Record<FoodStatus, string> = {
  needed: "Needed",
  claimed: "Claimed",
  purchased: "Purchased",
  prepared: "Prepared",
  completed: "Done",
};

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  not_started: "To do",
  in_progress: "In progress",
  blocked: "Blocked",
  done: "Done",
};

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export type Expense = {
  id: string;
  event_id: string;
  name: string;
  category: ExpenseCategory;
  estimated_amount_cents: number | null;
  actual_amount_cents: number | null;
  paid_by_name: string | null;
  paid_by_user_id: string | null;
  payment_status: PaymentStatus;
  expense_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type FoodSupplyItem = {
  id: string;
  event_id: string;
  name: string;
  category: FoodCategory;
  quantity: number | null;
  unit: string | null;
  needed_count: number;
  claimed_count: number;
  claimed_by_guest_id: string | null;
  claimed_by_name: string | null;
  estimated_cost_cents: number | null;
  actual_cost_cents: number | null;
  status: FoodStatus;
  is_guest_claimable: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type Task = {
  id: string;
  event_id: string;
  title: string;
  description: string | null;
  assignee_type: AssigneeType;
  assignee_user_id: string | null;
  assignee_guest_id: string | null;
  assignee_name: string | null;
  due_date: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  visibility: TaskVisibility;
  created_by_user_id: string | null;
  created_at: string;
  updated_at: string;
};

export type MenuItem = {
  id: string;
  event_id: string;
  name: string;
  course: MenuCourse;
  serves: number | null;
  dietary_tags: DietaryTag[];
  prep_time_minutes: number | null;
  cook_time_minutes: number | null;
  recipe_url: string | null;
  notes: string | null;
  status: MenuStatus;
  created_at: string;
  updated_at: string;
};

export const MENU_COURSE_LABELS: Record<MenuCourse, string> = {
  appetizer: "Appetizer",
  main: "Main",
  side: "Side",
  dessert: "Dessert",
  drink: "Drink",
  snack: "Snack",
  other: "Other",
};

export const MENU_STATUS_LABELS: Record<MenuStatus, string> = {
  planning: "Planning",
  shopping: "Shopping",
  prepping: "Prepping",
  cooking: "Cooking",
  ready: "Ready",
};

export const DIETARY_TAG_LABELS: Record<DietaryTag, string> = {
  vegetarian: "Vegetarian",
  vegan: "Vegan",
  gluten_free: "Gluten-free",
  dairy_free: "Dairy-free",
  nut_free: "Nut-free",
  shellfish_free: "Shellfish-free",
  halal: "Halal",
  kosher: "Kosher",
  spicy: "Spicy",
};

export const MENU_COURSE_ORDER: MenuCourse[] = [
  "appetizer",
  "main",
  "side",
  "dessert",
  "snack",
  "drink",
  "other",
];
