"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Wallet,
  ChefHat,
  ShoppingBasket,
  ListChecks,
  Settings,
} from "lucide-react";

const items = [
  { href: "", label: "Overview", icon: LayoutDashboard },
  { href: "/guests", label: "Guests", icon: Users },
  { href: "/budget", label: "Budget", icon: Wallet },
  { href: "/food", label: "Food", icon: ChefHat },
  { href: "/food-supplies", label: "To Bring", icon: ShoppingBasket },
  { href: "/tasks", label: "Tasks", icon: ListChecks },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function EventSidebar({ eventId }: { eventId: string }) {
  const pathname = usePathname();
  const base = `/app/events/${eventId}`;

  return (
    <nav
      className="flex flex-row gap-1 overflow-x-auto pb-1 [mask-image:linear-gradient(to_right,black_calc(100%-32px),transparent)] md:flex-col md:overflow-visible md:pb-0 md:[mask-image:none]"
    >
      {items.map(({ href, label, icon: Icon }) => {
        const full = `${base}${href}`;
        const isActive =
          href === ""
            ? pathname === base
            : pathname === full || pathname?.startsWith(`${full}/`);
        return (
          <Link
            key={label}
            href={full}
            className={cn(
              "group relative flex items-center gap-2.5 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-display font-semibold transition-all",
              isActive
                ? "bg-ink text-paper-light"
                : "text-ink-soft hover:bg-paper-deep hover:text-ink",
            )}
          >
            <Icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", isActive && "text-mustard")} />
            {label}
            {isActive && (
              <span
                className="ml-auto h-1.5 w-1.5 rounded-full bg-mustard"
                aria-hidden
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
