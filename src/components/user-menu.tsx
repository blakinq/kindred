"use client";

import { useEffect, useRef, useState } from "react";
import { logoutAction } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0]!.toUpperCase();
  return (parts[0][0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

export function UserMenu({ name, email }: { name: string; email: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const initials = getInitials(name);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Account menu"
        className="group inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-terracotta font-display text-sm font-bold text-paper-light shadow-stamp-sm transition-all hover:-translate-y-0.5 hover:shadow-stamp focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      >
        {initials}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-3 w-64 origin-top-right animate-fade-up rounded-2xl border-2 border-ink/85 bg-paper-light shadow-stamp"
        >
          <span className="tape rounded-sm" aria-hidden />

          <div className="px-5 py-4">
            <p className="font-hand text-xl leading-none text-terracotta">
              hey there
            </p>
            <p className="mt-2 truncate font-display text-base font-bold tracking-tight text-ink">
              {name}
            </p>
            <p className="mt-0.5 truncate text-xs text-ink-soft">{email}</p>
          </div>

          <div className="border-t-2 border-dashed border-rule p-3">
            <form action={logoutAction}>
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="w-full"
                role="menuitem"
              >
                Sign out
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
