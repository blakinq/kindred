"use client";

import * as React from "react";
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TimeFormat } from "@/components/ui/time-input";

type TimePickerProps = {
  open: boolean;
  onClose: () => void;
  value?: string;
  onSelect: (hhmm: string) => void;
  format: TimeFormat;
  title?: string;
};

const MINUTES_GRID = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
const HOURS_12 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const HOURS_24 = Array.from({ length: 24 }, (_, i) => i);

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function parseHHmm(s?: string): { h: number; min: number } | null {
  if (!s) return null;
  const m = s.match(/^(\d{2}):(\d{2})$/);
  if (!m) return null;
  return { h: +m[1], min: +m[2] };
}

function snapMinute(m: number): number {
  return (5 * Math.round(m / 5)) % 60;
}

export function TimePicker({
  open,
  onClose,
  value,
  onSelect,
  format,
  title = "Pick a time",
}: TimePickerProps) {
  const titleId = React.useId();

  const [hour24, setHour24] = React.useState<number>(() => {
    const p = parseHHmm(value);
    return p?.h ?? 12;
  });
  const [minute, setMinute] = React.useState<number>(() => {
    const p = parseHHmm(value);
    return snapMinute(p?.min ?? 0);
  });

  React.useEffect(() => {
    if (!open) return;
    const p = parseHHmm(value);
    setHour24(p?.h ?? 12);
    setMinute(snapMinute(p?.min ?? 0));
  }, [open, value]);

  const isPm = hour24 >= 12;
  const hour12 = ((hour24 + 11) % 12) + 1;

  function setAmPm(pm: boolean) {
    if (pm === isPm) return;
    setHour24((h) => (pm ? (h % 12) + 12 : h % 12));
  }

  function selectHour(h: number) {
    if (format === "12h") {
      const base = h % 12;
      setHour24(isPm ? base + 12 : base);
    } else {
      setHour24(h);
    }
  }

  function confirm() {
    onSelect(`${pad2(hour24)}:${pad2(minute)}`);
    onClose();
  }

  const hours = format === "12h" ? HOURS_12 : HOURS_24;
  const previewLabel =
    format === "12h"
      ? `${hour12}:${pad2(minute)} ${isPm ? "PM" : "AM"}`
      : `${pad2(hour24)}:${pad2(minute)}`;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="max-w-sm"
      tape="mustard"
      labelledBy={titleId}
    >
      <DialogHeader>
        <DialogTitle id={titleId}>{title}</DialogTitle>
      </DialogHeader>

      <div className="mt-3 rounded-xl border-2 border-ink/20 bg-paper-deep px-4 py-3 text-center">
        <div className="font-display text-[10px] font-bold uppercase tracking-wider text-ink-soft">
          Selected
        </div>
        <div
          className="mt-1 font-display text-3xl font-bold tabular-nums text-ink"
          aria-live="polite"
        >
          {previewLabel}
        </div>
      </div>

      {format === "12h" && (
        <div className="mt-4 grid grid-cols-2 gap-1.5 rounded-xl border-2 border-ink/40 bg-paper-deep p-1">
          <SegmentButton active={!isPm} onClick={() => setAmPm(false)}>
            AM
          </SegmentButton>
          <SegmentButton active={isPm} onClick={() => setAmPm(true)}>
            PM
          </SegmentButton>
        </div>
      )}

      <div className="mt-4">
        <div className="mb-2 font-display text-[10px] font-bold uppercase tracking-wider text-ink-soft">
          Hour
        </div>
        <div className="grid grid-cols-6 gap-1.5">
          {hours.map((h) => {
            const active = format === "12h" ? h === hour12 : h === hour24;
            return (
              <CellButton
                key={h}
                active={active}
                onClick={() => selectHour(h)}
              >
                {format === "24h" ? pad2(h) : h}
              </CellButton>
            );
          })}
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 font-display text-[10px] font-bold uppercase tracking-wider text-ink-soft">
          Minute
        </div>
        <div className="grid grid-cols-6 gap-1.5">
          {MINUTES_GRID.map((m) => (
            <CellButton
              key={m}
              active={m === minute}
              onClick={() => setMinute(m)}
            >
              {pad2(m)}
            </CellButton>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-col-reverse gap-2 border-t-2 border-dashed border-rule pt-4 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button type="button" size="sm" onClick={confirm} data-autofocus>
          Set time
        </Button>
      </div>
    </Dialog>
  );
}

function SegmentButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "h-9 rounded-lg font-display text-xs font-bold uppercase tracking-wider transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-paper-deep",
        active
          ? "border-2 border-ink bg-terracotta text-paper-light shadow-stamp-sm"
          : "border-2 border-transparent text-ink-soft hover:bg-paper-light hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

function CellButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "h-9 rounded-lg border-2 text-sm font-medium tabular-nums transition-all",
        "focus-visible:outline-none focus-visible:border-ink focus-visible:bg-mustard focus-visible:text-ink",
        active
          ? "border-ink bg-terracotta text-paper-light shadow-stamp-sm"
          : "border-transparent text-ink hover:border-ink hover:bg-mustard hover:text-ink hover:shadow-stamp-sm",
      )}
    >
      {children}
    </button>
  );
}
