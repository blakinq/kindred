"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CalendarPickerProps = {
  open: boolean;
  onClose: () => void;
  value?: string;
  onSelect: (iso: string) => void;
  title?: string;
};

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function toIso(y: number, m: number, d: number): string {
  return `${y}-${pad2(m + 1)}-${pad2(d)}`;
}

function parseIso(s?: string): { y: number; m: number; d: number } | null {
  if (!s) return null;
  const match = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  return { y: +match[1], m: +match[2] - 1, d: +match[3] };
}

function sameDate(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function CalendarPicker({
  open,
  onClose,
  value,
  onSelect,
  title = "Pick a date",
}: CalendarPickerProps) {
  const titleId = React.useId();
  const parsed = parseIso(value);
  const today = React.useMemo(() => new Date(), []);

  const [cursor, setCursor] = React.useState<Date>(() =>
    parsed
      ? new Date(parsed.y, parsed.m, 1)
      : new Date(today.getFullYear(), today.getMonth(), 1),
  );

  React.useEffect(() => {
    if (!open) return;
    const p = parseIso(value);
    setCursor(
      p
        ? new Date(p.y, p.m, 1)
        : new Date(today.getFullYear(), today.getMonth(), 1),
    );
  }, [open, value, today]);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();

  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  const cells: { date: Date; outside: boolean }[] = [];
  for (let i = firstWeekday - 1; i >= 0; i--) {
    cells.push({
      date: new Date(year, month - 1, daysInPrev - i),
      outside: true,
    });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    cells.push({ date: new Date(year, month, i), outside: false });
  }
  while (cells.length < 42) {
    const last = cells[cells.length - 1].date;
    cells.push({
      date: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1),
      outside: true,
    });
  }

  const selected = parsed ? new Date(parsed.y, parsed.m, parsed.d) : null;

  function commit(d: Date) {
    onSelect(toIso(d.getFullYear(), d.getMonth(), d.getDate()));
    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="max-w-sm"
      tape="ocean"
      labelledBy={titleId}
    >
      <DialogHeader>
        <DialogTitle id={titleId}>{title}</DialogTitle>
      </DialogHeader>

      <div className="mt-4 flex items-center justify-between gap-1">
        <div className="flex items-center gap-1">
          <NavButton
            onClick={() => setCursor(new Date(year - 1, month, 1))}
            ariaLabel="Previous year"
          >
            <ChevronsLeft className="h-4 w-4" />
          </NavButton>
          <NavButton
            onClick={() => setCursor(new Date(year, month - 1, 1))}
            ariaLabel="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </NavButton>
        </div>
        <div
          className="font-display text-base font-bold tabular-nums text-ink"
          aria-live="polite"
        >
          {MONTHS[month]} {year}
        </div>
        <div className="flex items-center gap-1">
          <NavButton
            onClick={() => setCursor(new Date(year, month + 1, 1))}
            ariaLabel="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </NavButton>
          <NavButton
            onClick={() => setCursor(new Date(year + 1, month, 1))}
            ariaLabel="Next year"
          >
            <ChevronsRight className="h-4 w-4" />
          </NavButton>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-1 text-center font-display text-[10px] font-bold uppercase tracking-wider text-ink-soft">
        {WEEKDAYS.map((wd, i) => (
          <div key={i} className="py-1">
            {wd}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((cell, i) => {
          const isToday = sameDate(cell.date, today);
          const isSelected = !!(selected && sameDate(cell.date, selected));
          return (
            <button
              key={i}
              type="button"
              onClick={() => commit(cell.date)}
              aria-pressed={isSelected}
              aria-label={cell.date.toDateString()}
              className={cn(
                "h-11 rounded-lg border-2 text-sm font-medium tabular-nums transition-all",
                "focus-visible:outline-none focus-visible:border-ink focus-visible:bg-mustard focus-visible:text-ink",
                isSelected
                  ? "border-ink bg-terracotta text-paper-light shadow-stamp-sm hover:-translate-y-px hover:shadow-stamp"
                  : cn(
                      "border-transparent hover:border-ink hover:bg-mustard hover:text-ink hover:shadow-stamp-sm",
                      cell.outside ? "text-ink-soft/40" : "text-ink",
                      isToday && "ring-2 ring-inset ring-mustard",
                    ),
              )}
            >
              {cell.date.getDate()}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 border-t-2 border-dashed border-rule pt-4">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            const t = new Date();
            commit(t);
          }}
        >
          Today
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Dialog>
  );
}

function NavButton({
  onClick,
  ariaLabel,
  children,
}: {
  onClick: () => void;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      title={ariaLabel}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-lg border-2 border-ink/40 bg-paper-deep text-ink-soft transition-all",
        "hover:border-ink hover:bg-mustard hover:text-ink hover:shadow-stamp-sm hover:-translate-y-px",
        "focus-visible:outline-none focus-visible:border-ink focus-visible:bg-mustard focus-visible:text-ink",
        "active:translate-y-px active:shadow-none",
      )}
    >
      {children}
    </button>
  );
}
