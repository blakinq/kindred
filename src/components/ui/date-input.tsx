"use client";

import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CalendarPicker } from "@/components/ui/calendar-picker";

type DateInputProps = {
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (iso: string) => void;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: LucideIcon;
  placeholder?: string;
  className?: string;
  pickerTitle?: string;
};

export function DateInput({
  name,
  value,
  defaultValue,
  onChange,
  id,
  required,
  disabled,
  icon: Icon,
  placeholder = "DD/MM/YYYY",
  className,
  pickerTitle,
}: DateInputProps) {
  const isControlled = value !== undefined;
  const [internalIso, setInternalIso] = React.useState<string>(
    defaultValue ?? "",
  );
  const iso = isControlled ? (value as string) : internalIso;

  const [display, setDisplay] = React.useState<string>(
    iso ? formatDate(iso) : "",
  );
  const [invalid, setInvalid] = React.useState(false);
  const [pickerOpen, setPickerOpen] = React.useState(false);

  React.useEffect(() => {
    if (isControlled) {
      setDisplay(value ? formatDate(value) : "");
      setInvalid(false);
    }
  }, [value, isControlled]);

  function commit() {
    const trimmed = display.trim();
    if (!trimmed) {
      setInvalid(false);
      if (!isControlled) setInternalIso("");
      onChange?.("");
      return;
    }
    const parsed = parseDate(trimmed);
    if (parsed) {
      setInvalid(false);
      if (!isControlled) setInternalIso(parsed);
      onChange?.(parsed);
      setDisplay(formatDate(parsed));
    } else {
      setInvalid(true);
    }
  }

  function handlePickerSelect(nextIso: string) {
    setInvalid(false);
    if (!isControlled) setInternalIso(nextIso);
    setDisplay(formatDate(nextIso));
    onChange?.(nextIso);
  }

  return (
    <div className={cn("space-y-1", className)}>
      <div className="relative">
        {Icon && (
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            disabled={disabled}
            aria-label="Open calendar"
            aria-haspopup="dialog"
            aria-expanded={pickerOpen}
            title="Open calendar"
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
          inputMode="numeric"
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

            // Swallow a separator typed right after an auto-inserted one.
            if (
              display.endsWith("/") &&
              next.length === display.length + 1 &&
              /[/\-.]/.test(next[next.length - 1])
            ) {
              return;
            }

            // Auto-insert "/" once the user has completed the day or month.
            if (/^\d{2}$/.test(next) || /^\d{2}\/\d{2}$/.test(next)) {
              setDisplay(next + "/");
              return;
            }

            setDisplay(next);
          }}
          onBlur={commit}
          className={cn(
            "flex h-11 w-full rounded-xl border-2 border-ink/85 bg-paper-light px-4 py-2 text-[15px] text-ink",
            "placeholder:text-ink-soft/70",
            "focus-visible:outline-none focus-visible:border-terracotta focus-visible:shadow-[2px_2px_0_hsl(var(--terracotta-deep))]",
            "transition-shadow",
            "disabled:cursor-not-allowed disabled:opacity-60",
            Icon && "pl-10",
            invalid && "border-terracotta-deep",
          )}
        />
        {name && (
          <input type="hidden" name={name} value={iso} readOnly />
        )}
      </div>
      {invalid && (
        <p className="text-xs text-terracotta-deep">
          Use DD/MM/YYYY (e.g. 24/12/2026)
        </p>
      )}
      {Icon && (
        <CalendarPicker
          open={pickerOpen}
          onClose={() => setPickerOpen(false)}
          value={iso}
          onSelect={handlePickerSelect}
          title={pickerTitle}
        />
      )}
    </div>
  );
}

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function pad4(n: number): string {
  return String(n).padStart(4, "0");
}

function validateDate(y: number, mo: number, d: number): string | null {
  if (mo < 1 || mo > 12 || d < 1 || d > 31 || y < 1900 || y > 2100) return null;
  const date = new Date(y, mo - 1, d);
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== mo - 1 ||
    date.getDate() !== d
  )
    return null;
  return `${pad4(y)}-${pad2(mo)}-${pad2(d)}`;
}

export function parseDate(s: string): string | null {
  const trimmed = s.trim();
  if (!trimmed) return null;

  let m = trimmed.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (m) return validateDate(+m[1], +m[2], +m[3]);

  // DD/MM/YYYY (also accepts - and . separators)
  m = trimmed.match(/^(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{4})$/);
  if (m) return validateDate(+m[3], +m[2], +m[1]);

  // DD/MM/YY
  m = trimmed.match(/^(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{2})$/);
  if (m) return validateDate(2000 + +m[3], +m[2], +m[1]);

  const fallback = new Date(trimmed);
  if (
    !isNaN(fallback.getTime()) &&
    fallback.getFullYear() >= 1900 &&
    fallback.getFullYear() <= 2100
  ) {
    return validateDate(
      fallback.getFullYear(),
      fallback.getMonth() + 1,
      fallback.getDate(),
    );
  }
  return null;
}

export function formatDate(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return iso;
  return `${m[3]}/${m[2]}/${m[1]}`;
}
