export type ToastVariant = "success" | "error" | "info" | "warning";

export type Toast = {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
  duration: number;
};

type Listener = (toasts: Toast[]) => void;

let toasts: Toast[] = [];
const listeners = new Set<Listener>();

function emit() {
  for (const l of listeners) l(toasts);
}

function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function subscribeToasts(l: Listener): () => void {
  listeners.add(l);
  l(toasts);
  return () => {
    listeners.delete(l);
  };
}

export function dismissToast(id: string) {
  toasts = toasts.filter((t) => t.id !== id);
  emit();
}

type ToastInput = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
};

export function toast(input: ToastInput): string {
  const t: Toast = {
    id: makeId(),
    title: input.title,
    description: input.description,
    variant: input.variant ?? "success",
    duration: input.duration ?? 4000,
  };
  toasts = [...toasts, t];
  emit();
  if (t.duration > 0 && typeof window !== "undefined") {
    window.setTimeout(() => dismissToast(t.id), t.duration);
  }
  return t.id;
}

toast.success = (title: string, description?: string) =>
  toast({ title, description, variant: "success" });
toast.error = (title: string, description?: string) =>
  toast({ title, description, variant: "error" });
toast.info = (title: string, description?: string) =>
  toast({ title, description, variant: "info" });
toast.warning = (title: string, description?: string) =>
  toast({ title, description, variant: "warning" });
