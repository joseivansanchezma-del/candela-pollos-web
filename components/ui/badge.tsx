import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-display font-semibold tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-brand-ink/5 text-brand-ink dark:bg-white/10 dark:text-white",
        recomendado: "bg-brand-gold/20 text-brand-maroon dark:text-brand-gold",
        "mas-vendido": "bg-brand-red text-white",
        nuevo: "bg-brand-orange text-white",
        outline: "border border-white/30 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
