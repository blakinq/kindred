"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  closeOnBackdrop?: boolean;
  tape?: "mustard" | "coral" | "olive" | "ocean";
  showClose?: boolean;
  labelledBy?: string;
  describedBy?: string;
  scrollBody?: boolean;
};

export function Dialog({
  open,
  onClose,
  children,
  className,
  closeOnBackdrop = true,
  tape = "mustard",
  showClose = true,
  labelledBy,
  describedBy,
  scrollBody = false,
}: DialogProps) {
  const [mounted, setMounted] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const previousFocus = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      const focusTarget =
        cardRef.current?.querySelector<HTMLElement>(
          "[data-autofocus],button:not([disabled]),[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex='-1'])",
        ) ?? cardRef.current;
      focusTarget?.focus();
    });

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previousFocus.current?.focus?.();
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] grid place-items-center px-4 py-8"
      style={{
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
        paddingLeft: "max(1rem, env(safe-area-inset-left))",
        paddingRight: "max(1rem, env(safe-area-inset-right))",
      }}
    >
      <button
        type="button"
        aria-label="Close dialog"
        onClick={closeOnBackdrop ? onClose : undefined}
        tabIndex={-1}
        className="absolute inset-0 cursor-default bg-ink/45 backdrop-blur-[2px] animate-dialog-fade"
      />
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        tabIndex={-1}
        data-lenis-prevent
        className={cn(
          "relative z-10 w-full max-w-md overscroll-contain animate-dialog-pop rounded-2xl border-2 border-ink/85 bg-paper-light p-5 shadow-stamp-lg sm:p-6",
          "focus:outline-none",
          scrollBody
            ? "flex max-h-[min(640px,calc(100vh-4rem))] flex-col overflow-hidden"
            : "max-h-[calc(100vh-4rem)] overflow-y-auto",
          className,
        )}
      >
        <span
          className={cn(
            "tape rounded-sm",
            tape === "coral" && "tape-coral",
            tape === "olive" && "tape-olive",
            tape === "ocean" && "tape-ocean",
          )}
          aria-hidden
        />
        {showClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-soft transition-colors hover:bg-paper-deep hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body,
  );
}

export function DialogHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("space-y-1.5 pr-8", className)}>{children}</div>;
}

export function DialogTitle({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className={cn(
        "font-display text-2xl font-bold tracking-tight text-ink",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function DialogDescription({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <p id={id} className={cn("text-sm text-ink-soft", className)}>
      {children}
    </p>
  );
}

export function DialogBody({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("mt-4", className)}>{children}</div>;
}

export function DialogFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mt-6 flex flex-col-reverse gap-2 border-t-2 border-dashed border-rule pt-5 sm:flex-row sm:justify-end",
        className,
      )}
    >
      {children}
    </div>
  );
}
