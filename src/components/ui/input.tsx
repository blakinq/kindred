import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-xl border-2 border-ink/85 bg-paper-light px-4 py-2 text-[15px] text-ink",
        "placeholder:text-ink-soft/70",
        "focus-visible:outline-none focus-visible:border-terracotta focus-visible:shadow-[2px_2px_0_hsl(var(--terracotta-deep))]",
        "transition-shadow",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
Input.displayName = "Input";
export { Input };
