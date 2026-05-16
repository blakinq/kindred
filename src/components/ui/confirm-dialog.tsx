"use client";

import * as React from "react";
import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  description?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "destructive" | "default";
  pending?: boolean;
};

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "destructive",
  pending = false,
}: ConfirmDialogProps) {
  const titleId = React.useId();
  const descId = React.useId();

  async function handleConfirm() {
    await onConfirm();
  }

  return (
    <Dialog
      open={open}
      onClose={pending ? () => {} : onClose}
      tape={variant === "destructive" ? "coral" : "ocean"}
      labelledBy={titleId}
      describedBy={description ? descId : undefined}
      showClose={!pending}
      closeOnBackdrop={!pending}
    >
      <DialogHeader>
        <div className="flex items-start gap-3">
          {variant === "destructive" && (
            <span
              className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border-2 border-ink/85 bg-terracotta/15 text-terracotta-deep"
              aria-hidden
            >
              <AlertTriangle className="h-4 w-4" />
            </span>
          )}
          <div className="min-w-0 flex-1">
            <DialogTitle id={titleId}>{title}</DialogTitle>
            {description && (
              <DialogDescription id={descId} className="mt-1.5">
                {description}
              </DialogDescription>
            )}
          </div>
        </div>
      </DialogHeader>

      <DialogFooter>
        <Button
          type="button"
          variant="ghost"
          onClick={onClose}
          disabled={pending}
        >
          {cancelLabel}
        </Button>
        <Button
          type="button"
          variant={variant === "destructive" ? "destructive" : "default"}
          onClick={handleConfirm}
          disabled={pending}
          data-autofocus
        >
          {pending ? "Working…" : confirmLabel}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
