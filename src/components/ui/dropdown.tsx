"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type DropdownOption = {
  value: string;
  label: React.ReactNode;
  hint?: string;
  disabled?: boolean;
};

type DropdownProps = {
  options: DropdownOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: "default" | "sm";
  className?: string;
  panelClassName?: string;
  "aria-label"?: string;
};

type PanelRect =
  | { mode: "below"; top: number; left: number; width: number }
  | { mode: "above"; bottom: number; left: number; width: number };

const PANEL_MAX_HEIGHT = 256;
const PANEL_GAP = 8;

export function Dropdown({
  options,
  value,
  defaultValue,
  onChange,
  name,
  id,
  placeholder,
  disabled,
  size = "default",
  className,
  panelClassName,
  "aria-label": ariaLabel,
}: DropdownProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState<string>(defaultValue ?? "");
  const current = isControlled ? (value as string) : internal;

  const [open, setOpen] = React.useState(false);
  const [activeIdx, setActiveIdx] = React.useState<number>(-1);
  const [mounted, setMounted] = React.useState(false);
  const [rect, setRect] = React.useState<PanelRect | null>(null);

  const rootRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);

  const selected = options.find((o) => o.value === current);

  React.useEffect(() => setMounted(true), []);

  const updateRect = React.useCallback(() => {
    const btn = buttonRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const viewportH = window.innerHeight;
    const spaceBelow = viewportH - r.bottom;
    const spaceAbove = r.top;
    const wantFlip =
      spaceBelow < Math.min(PANEL_MAX_HEIGHT, 200) && spaceAbove > spaceBelow;
    if (wantFlip) {
      setRect({
        mode: "above",
        bottom: viewportH - r.top + PANEL_GAP,
        left: r.left,
        width: r.width,
      });
    } else {
      setRect({
        mode: "below",
        top: r.bottom + PANEL_GAP,
        left: r.left,
        width: r.width,
      });
    }
  }, []);

  React.useLayoutEffect(() => {
    if (!open) return;
    updateRect();
  }, [open, updateRect]);

  React.useEffect(() => {
    if (!open) return;
    function onScrollOrResize() {
      updateRect();
    }
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [open, updateRect]);

  React.useEffect(() => {
    if (!open) return;
    function onMouseDown(e: MouseEvent) {
      const target = e.target as Node;
      if (rootRef.current?.contains(target)) return;
      if (listRef.current?.contains(target)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const i = options.findIndex((o) => o.value === current);
    setActiveIdx(i >= 0 ? i : 0);
  }, [open, current, options]);

  React.useEffect(() => {
    if (!open || activeIdx < 0) return;
    const node = listRef.current?.querySelector<HTMLElement>(
      `[data-idx="${activeIdx}"]`,
    );
    node?.scrollIntoView({ block: "nearest" });
  }, [open, activeIdx]);

  function commit(v: string) {
    if (!isControlled) setInternal(v);
    onChange?.(v);
    setOpen(false);
    buttonRef.current?.focus();
  }

  function moveActive(delta: number) {
    setActiveIdx((curr) => {
      const len = options.length;
      let next = curr;
      for (let step = 0; step < len; step++) {
        next = (next + delta + len) % len;
        if (!options[next]?.disabled) return next;
      }
      return curr;
    });
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Tab") {
      if (open) setOpen(false);
      return;
    }
    if (e.key === "Escape" && open) {
      e.preventDefault();
      setOpen(false);
      buttonRef.current?.focus();
      return;
    }
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      moveActive(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      moveActive(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveIdx(options.findIndex((o) => !o.disabled));
    } else if (e.key === "End") {
      e.preventDefault();
      for (let i = options.length - 1; i >= 0; i--) {
        if (!options[i]!.disabled) {
          setActiveIdx(i);
          break;
        }
      }
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const opt = options[activeIdx];
      if (opt && !opt.disabled) commit(opt.value);
    }
  }

  const sizeBtn =
    size === "sm" ? "h-8 px-3 text-xs" : "h-11 px-4 text-[15px]";
  const sizeChevron = size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5";

  const panel = open && mounted && rect ? (
    <ul
      ref={listRef}
      role="listbox"
      data-lenis-prevent
      aria-activedescendant={
        activeIdx >= 0 ? `${id ?? name ?? "dd"}-opt-${activeIdx}` : undefined
      }
      style={
        rect.mode === "below"
          ? {
              position: "fixed",
              top: rect.top,
              left: rect.left,
              width: rect.width,
            }
          : {
              position: "fixed",
              bottom: rect.bottom,
              left: rect.left,
              width: rect.width,
            }
      }
      className={cn(
        "z-[300] max-h-64 overflow-auto overscroll-contain rounded-xl border-2 border-ink/85 bg-paper-light p-1.5 shadow-stamp-lg",
        rect.mode === "below" ? "origin-top animate-fade-up" : "origin-bottom animate-fade-down",
        panelClassName,
      )}
    >
      {options.map((opt, i) => {
        const isSelected = opt.value === current;
        const isActive = i === activeIdx;
        return (
          <li key={opt.value}>
            <button
              type="button"
              role="option"
              id={`${id ?? name ?? "dd"}-opt-${i}`}
              data-idx={i}
              aria-selected={isSelected}
              disabled={opt.disabled}
              onMouseEnter={() => !opt.disabled && setActiveIdx(i)}
              onClick={() => !opt.disabled && commit(opt.value)}
              className={cn(
                "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                isActive && !opt.disabled && "bg-mustard/30",
                isSelected && "font-display font-bold text-terracotta-deep",
                opt.disabled && "cursor-not-allowed opacity-50",
              )}
            >
              <span className="flex-1 truncate">
                {opt.label}
                {opt.hint && (
                  <span className="ml-1.5 text-xs font-normal text-ink-soft">
                    {opt.hint}
                  </span>
                )}
              </span>
              {isSelected && (
                <Check
                  className="h-3.5 w-3.5 shrink-0 text-terracotta-deep"
                  aria-hidden
                />
              )}
            </button>
          </li>
        );
      })}
    </ul>
  ) : null;

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={buttonRef}
        type="button"
        id={id}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={onKeyDown}
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-xl border-2 border-ink/85 bg-paper-light text-left text-ink transition-shadow",
          "focus-visible:outline-none focus-visible:border-terracotta focus-visible:shadow-[2px_2px_0_hsl(var(--terracotta-deep))]",
          "disabled:cursor-not-allowed disabled:opacity-60",
          open && "border-terracotta shadow-[2px_2px_0_hsl(var(--terracotta-deep))]",
          sizeBtn,
        )}
      >
        <span className={cn("truncate", !selected && "text-ink-soft")}>
          {selected?.label ?? placeholder ?? "Select…"}
        </span>
        <ChevronDown
          className={cn(
            "shrink-0 text-terracotta transition-transform",
            open && "rotate-180",
            sizeChevron,
          )}
          aria-hidden
        />
      </button>

      {panel && createPortal(panel, document.body)}

      {name && <input type="hidden" name={name} value={current} />}
    </div>
  );
}
