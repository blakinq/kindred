import { cn } from "@/lib/utils";

export function Squiggle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 24"
      fill="none"
      className={cn("h-3 w-auto", className)}
      aria-hidden
    >
      <path
        d="M2 12 C 16 2, 32 22, 48 12 S 80 2, 96 12 S 128 22, 144 12 S 176 2, 198 12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DotGrid({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={cn("h-20 w-20", className)}
      aria-hidden
    >
      <defs>
        <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="80" height="80" fill="url(#dots)" />
    </svg>
  );
}

export function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5", className)} aria-hidden>
      <path
        d="M12 1.5 L13.8 9.2 L21.5 11 L13.8 12.8 L12 20.5 L10.2 12.8 L2.5 11 L10.2 9.2 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Stamp({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border-2 border-current px-2 py-0.5 text-[11px] font-display font-bold uppercase tracking-[0.18em]",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function TrailArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 24"
      fill="none"
      className={cn("h-6 w-14", className)}
      aria-hidden
    >
      <path
        d="M2 12 C 12 4, 22 20, 32 12 S 46 4, 50 12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M46 6 L 54 12 L 46 18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TrailArrowDown({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 60"
      fill="none"
      className={cn("h-14 w-6", className)}
      aria-hidden
    >
      <path
        d="M12 2 C 4 12, 20 22, 12 32 S 4 46, 12 50"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M6 46 L 12 54 L 18 46"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CornerCurl({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-8 w-8", className)} aria-hidden>
      <path
        d="M2 38 Q 20 36, 28 28 Q 36 20, 38 2"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="38" cy="2" r="2" fill="currentColor" />
    </svg>
  );
}
