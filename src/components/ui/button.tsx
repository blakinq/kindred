import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-display font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        default:
          "stamp bg-terracotta text-paper-light border-2 border-ink rounded-xl",
        secondary:
          "stamp bg-mustard text-ink border-2 border-ink rounded-xl",
        outline:
          "stamp bg-paper-light text-ink border-2 border-ink rounded-xl",
        ghost:
          "text-ink hover:bg-paper-deep rounded-lg transition-colors",
        link:
          "text-terracotta-deep underline underline-offset-4 decoration-2 hover:decoration-terracotta",
        destructive:
          "stamp bg-terracotta-deep text-paper-light border-2 border-ink rounded-xl",
      },
      size: {
        default: "h-11 px-5 text-sm",
        sm: "h-9 px-3 text-xs rounded-lg",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10 rounded-lg",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
