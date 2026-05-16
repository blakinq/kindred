"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTop({ threshold = 500 }: { threshold?: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > threshold);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  function scrollUp() {
    if (window.__lenis) {
      window.__lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <button
      type="button"
      onClick={scrollUp}
      aria-label="Scroll to top"
      tabIndex={visible ? 0 : -1}
      className={cn(
        "group fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink bg-terracotta text-paper-light shadow-stamp transition-all duration-300 hover:-translate-y-0.5 hover:shadow-stamp-lg active:translate-y-0 active:shadow-stamp-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-paper md:bottom-8 md:right-8 md:h-14 md:w-14",
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-3 scale-90 opacity-0",
      )}
    >
      <ArrowUp className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 md:h-6 md:w-6" />
    </button>
  );
}
