import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[90px] w-full rounded-xl border-2 border-ink/85 bg-paper-light px-4 py-3 text-[15px] text-ink",
      "placeholder:text-ink-soft/70",
      "focus-visible:outline-none focus-visible:border-terracotta focus-visible:shadow-[2px_2px_0_hsl(var(--terracotta-deep))]",
      "transition-shadow",
      "disabled:cursor-not-allowed disabled:opacity-60",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
export { Textarea };
