import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-display font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange disabled:pointer-events-none disabled:opacity-50 overflow-hidden",
  {
    variants: {
      variant: {
        primary:
          "bg-flame-gradient text-white shadow-glow hover:scale-[1.03] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_25px_70px_-15px_rgba(255,107,53,0.6)] active:scale-[0.98]",
        secondary:
          "bg-white/10 text-white border border-white/25 backdrop-blur-md hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98]",
        outline:
          "border border-brand-ink/15 text-brand-ink dark:text-white dark:border-white/20 hover:bg-brand-ink/5 dark:hover:bg-white/10",
        ghost: "text-brand-ink dark:text-white hover:bg-brand-ink/5 dark:hover:bg-white/10",
        whatsapp:
          "bg-[#25D366] text-white shadow-lg hover:scale-[1.04] active:scale-[0.97]",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-12 px-6 text-base",
        lg: "h-14 px-8 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
