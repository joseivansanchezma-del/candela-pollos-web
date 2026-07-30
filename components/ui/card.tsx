import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-3xl border border-black/5 bg-white/80 backdrop-blur-xl shadow-soft dark:border-white/10 dark:bg-white/5",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

export { Card };
