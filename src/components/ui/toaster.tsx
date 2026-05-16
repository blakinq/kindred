"use client";

import * as React from "react";
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from "lucide-react";
import { dismissToast, subscribeToasts, type Toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
} as const;

const TONE = {
  success: {
    border: "border-olive/70",
    icon: "text-olive bg-olive/15",
    tape: "bg-olive/40",
  },
  error: {
    border: "border-terracotta-deep/70",
    icon: "text-terracotta-deep bg-terracotta/15",
    tape: "bg-terracotta/60",
  },
  warning: {
    border: "border-mustard/80",
    icon: "text-ink bg-mustard/40",
    tape: "bg-mustard/70",
  },
  info: {
    border: "border-ocean/60",
    icon: "text-ocean bg-ocean/15",
    tape: "bg-ocean/35",
  },
} as const;

export function Toaster() {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  React.useEffect(() => subscribeToasts(setToasts), []);

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed inset-x-0 top-4 z-[300] flex flex-col items-center gap-2 px-4 sm:left-auto sm:right-6 sm:top-6 sm:items-end sm:px-0"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={() => dismissToast(t.id)} />
      ))}
    </div>
  );
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: () => void;
}) {
  const Icon = ICONS[toast.variant];
  const tone = TONE[toast.variant];

  return (
    <div
      role={toast.variant === "error" ? "alert" : "status"}
      className={cn(
        "pointer-events-auto relative w-full max-w-sm animate-fade-up rounded-2xl border-2 bg-paper-light p-4 pr-10 shadow-stamp",
        tone.border,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute -top-1.5 left-5 h-2 w-10 -rotate-2 rounded-sm border border-ink/15",
          tone.tape,
        )}
      />
      <div className="flex items-start gap-3">
        <span
          aria-hidden
          className={cn(
            "mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-ink/85",
            tone.icon,
          )}
        >
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-bold tracking-tight text-ink">
            {toast.title}
          </p>
          {toast.description && (
            <p className="mt-0.5 text-xs text-ink-soft">{toast.description}</p>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss"
        className="absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-md text-ink-soft transition-colors hover:bg-paper-deep hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
