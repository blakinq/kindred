import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 font-display text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
    >
      <ArrowLeft
        className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
        aria-hidden
      />
      {children}
    </Link>
  );
}
