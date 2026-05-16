"use client";

import * as React from "react";
import { ArrowLeftRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { TimePicker } from "@/components/ui/time-picker";

export type TimeFormat = "12h" | "24h";

const STORAGE_KEY = "kindred:timeFormat";
const listeners = new Set<(f: TimeFormat) => void>();
let sharedFormat: TimeFormat = "12h";

if (typeof window !== "undefined") {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "12h" || stored === "24h") sharedFormat = stored;
}

function publishFormat(next: TimeFormat) {
  if (sharedFormat === next) return;
  sharedFormat = next;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, next);
  }
  listeners.forEach((l) => l(next));
}

function useSharedTimeFormat(
  initial?: TimeFormat,
): [TimeFormat, (next: TimeFormat) => void] {
  const [format, setFormat] = React.useState<TimeFormat>(() => sharedFormat);

  // First mount on the client: honor `initial` only when nothing's stored.
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.localStorage.getItem(STORAGE_KEY) && initial) {
      publishFormat(initial);
    }
    setFormat(sharedFormat);
    const listener = (f: TimeFormat) => setFormat(f);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [format, publishFormat];
}

type TimeInputProps = {
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (iso: string) => void;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: LucideIcon;
  defaultFormat?: TimeFormat;
  className?: string;
  pickerTitle?: string;
};

export function TimeInput({
  name,
  value,
  defaultValue,
  onChange,
  id,
  required,
  disabled,
  icon: Icon,
  defaultFormat = "12h",
  className,
  pickerTitle,
}: TimeInputProps) {
  const isControlled = value !== undefined;
  const [internalIso, setInternalIso] = React.useState<string>(
    defaultValue ?? "",
  );
  const iso = isControlled ? (value as string) : internalIso;

  const [format, setFormat] = useSharedTimeFormat(defaultFormat);
  const [display, setDisplay] = React.useState<string>(
    iso ? formatTime(iso, sharedFormat) : "",
  );
  const [invalid, setInvalid] = React.useState(false);
  const [pickerOpen, setPickerOpen] = React.useState(false);

  // Format flipped (locally or by a sibling input) — reflow display.
  React.useEffect(() => {
    if (iso) setDisplay(formatTime(iso, format));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [format]);

  React.useEffect(() => {
    if (isControlled) {
      setDisplay(value ? formatTime(value, format) : "");
      setInvalid(false);
    }
  }, [value, isControlled, format]);

  function commit() {
    const trimmed = display.trim();
    if (!trimmed) {
      setInvalid(false);
      if (!isControlled) setInternalIso("");
      onChange?.("");
      return;
    }
    const parsed = parseTime(trimmed);
    if (parsed) {
      setInvalid(false);
      if (!isControlled) setInternalIso(parsed);
      onChange?.(parsed);
      setDisplay(formatTime(parsed, format));
    } else {
      setInvalid(true);
    }
  }

  function handlePickerSelect(nextIso: string) {
    setInvalid(false);
    if (!isControlled) setInternalIso(nextIso);
    setDisplay(formatTime(nextIso, format));
    onChange?.(nextIso);
  }

  const placeholder = format === "12h" ? "7:30 PM" : "19:30";
  const otherFormat: TimeFormat = format === "12h" ? "24h" : "12h";

  return (
    <div className={cn("space-y-1", className)}>
      <div className="relative">
        {Icon && (
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            disabled={disabled}
            aria-label="Open time picker"
            aria-haspopup="dialog"
            aria-expanded={pickerOpen}
            title="Open time picker"
            className={cn(
              "absolute left-1.5 top-1/2 z-10 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-ink-soft transition-colors",
              "hover:bg-paper-deep hover:text-ink",
              "focus-visible:outline-none focus-visible:bg-paper-deep focus-visible:text-ink focus-visible:ring-2 focus-visible:ring-terracotta",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-ink-soft",
            )}
          >
            <Icon className="h-4 w-4" aria-hidden />
          </button>
        )}
        <input
          id={id}
          type="text"
          inputMode="text"
          autoComplete="off"
          spellCheck={false}
          value={display}
          required={required}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          placeholder={placeholder}
          onChange={(e) => {
            const next = e.target.value;
            if (invalid) setInvalid(false);

            // Deletion: accept whatever the user has now, no reformatting.
            if (next.length < display.length) {
              setDisplay(next);
              return;
            }

            // Swallow a colon typed right after an auto-inserted one.
            if (
              display.endsWith(":") &&
              next === display + ":"
            ) {
              return;
            }

            // 24h: auto-insert ":" once the user has typed two hour digits.
            if (format === "24h") {
              if (/^\d{2}$/.test(next)) {
                setDisplay(next + ":");
                return;
              }
              setDisplay(next);
              return;
            }

            // 12h: hour can be 1-2 digits depending on the first digit.
            if (/^[2-9]$/.test(next) || /^1[0-2]$/.test(next)) {
              setDisplay(next + ":");
              return;
            }
            // "13"-"19": first digit was hour 1, second digit starts minutes.
            if (/^1[3-9]$/.test(next)) {
              setDisplay(next[0] + ":" + next[1]);
              return;
            }

            setDisplay(next);
          }}
          onBlur={commit}
          className={cn(
            "flex h-11 w-full rounded-xl border-2 border-ink/85 bg-paper-light px-4 py-2 pr-[68px] text-[15px] text-ink",
            "placeholder:text-ink-soft/70",
            "focus-visible:outline-none focus-visible:border-terracotta focus-visible:shadow-[2px_2px_0_hsl(var(--terracotta-deep))]",
            "transition-shadow",
            "disabled:cursor-not-allowed disabled:opacity-60",
            Icon && "pl-10",
            invalid && "border-terracotta-deep",
          )}
        />
        <FormatToggle
          format={format}
          otherFormat={otherFormat}
          onToggle={() => setFormat(otherFormat)}
          disabled={disabled}
        />
        {name && (
          <input type="hidden" name={name} value={iso} readOnly />
        )}
      </div>
      {invalid && (
        <p className="text-xs text-terracotta-deep">
          {format === "12h"
            ? "Use h:mm AM/PM (e.g. 7:30 PM)"
            : "Use HH:mm (e.g. 19:30)"}
        </p>
      )}
      {Icon && (
        <TimePicker
          open={pickerOpen}
          onClose={() => setPickerOpen(false)}
          value={iso}
          onSelect={handlePickerSelect}
          format={format}
          title={pickerTitle}
        />
      )}
    </div>
  );
}

function FormatToggle({
  format,
  otherFormat,
  onToggle,
  disabled,
}: {
  format: TimeFormat;
  otherFormat: TimeFormat;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onToggle}
      aria-label={`Switch to ${otherFormat === "12h" ? "12-hour" : "24-hour"} format`}
      title={`Switch to ${otherFormat === "12h" ? "12-hour" : "24-hour"} format`}
      className={cn(
        "group absolute right-1.5 top-1/2 inline-flex h-7 -translate-y-1/2 select-none items-center gap-1 rounded-md border-2 border-ink/40 bg-paper-deep px-1.5 font-display text-[10px] font-bold uppercase tracking-wider text-ink-soft transition-all",
        "hover:-translate-y-[calc(50%+1px)] hover:border-ink hover:bg-mustard hover:text-ink hover:shadow-stamp-sm",
        "focus-visible:outline-none focus-visible:border-ink focus-visible:bg-mustard focus-visible:text-ink",
        "active:translate-y-[calc(-50%+1px)] active:shadow-none",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-[-50%] disabled:hover:bg-paper-deep disabled:hover:border-ink/40 disabled:hover:text-ink-soft disabled:hover:shadow-none",
      )}
    >
      <ArrowLeftRight
        className="h-3 w-3 transition-transform group-hover:rotate-180"
        aria-hidden
      />
      <span>{format === "12h" ? "12H" : "24H"}</span>
    </button>
  );
}

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

export function parseTime(s: string): string | null {
  const trimmed = s.trim();
  if (!trimmed) return null;

  let m = trimmed.match(/^(\d{1,2})(?::(\d{2})?)?\s*(am|pm|a|p)\.?$/i);
  if (m) {
    let h = +m[1];
    const min = m[2] ? +m[2] : 0;
    const ampm = m[3].toLowerCase()[0];
    if (h < 1 || h > 12 || min < 0 || min > 59) return null;
    if (ampm === "p" && h !== 12) h += 12;
    if (ampm === "a" && h === 12) h = 0;
    return `${pad2(h)}:${pad2(min)}`;
  }

  m = trimmed.match(/^(\d{1,2}):(\d{2})$/);
  if (m) {
    const h = +m[1];
    const min = +m[2];
    if (h < 0 || h > 23 || min < 0 || min > 59) return null;
    return `${pad2(h)}:${pad2(min)}`;
  }

  m = trimmed.match(/^(\d{4})$/);
  if (m) {
    const h = +m[1].slice(0, 2);
    const min = +m[1].slice(2);
    if (h < 0 || h > 23 || min < 0 || min > 59) return null;
    return `${pad2(h)}:${pad2(min)}`;
  }

  m = trimmed.match(/^(\d{1,2})$/);
  if (m) {
    const h = +m[1];
    if (h < 0 || h > 23) return null;
    return `${pad2(h)}:00`;
  }

  return null;
}

export function formatTime(iso: string, format: TimeFormat): string {
  const m = iso.match(/^(\d{2}):(\d{2})$/);
  if (!m) return iso;
  const h24 = +m[1];
  const min = +m[2];
  if (format === "24h") return `${pad2(h24)}:${pad2(min)}`;
  const ampm = h24 >= 12 ? "PM" : "AM";
  let h12 = h24 % 12;
  if (h12 === 0) h12 = 12;
  return `${h12}:${pad2(min)} ${ampm}`;
}
