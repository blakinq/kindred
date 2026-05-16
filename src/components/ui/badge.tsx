import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md border border-ink/30 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "bg-terracotta text-paper-light border-ink/60",
        secondary: "bg-paper-deep text-ink",
        outline: "bg-paper-light text-ink",
        success: "bg-olive/20 text-olive border-olive/40",
        warning: "bg-mustard/30 text-ink border-mustard",
        muted: "bg-paper-deep text-ink-soft",
        destructive: "bg-terracotta-deep text-paper-light border-ink/60",
        coral: "bg-coral/50 text-plum border-plum/30",
        ocean: "bg-ocean/15 text-ocean border-ocean/40",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
