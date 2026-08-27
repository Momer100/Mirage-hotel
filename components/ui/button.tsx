import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium tracking-[0.04em] uppercase transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-gold text-ink hover:bg-gold-bright shadow-[0_0_0_1px_rgba(198,161,91,0.4)] hover:shadow-[0_0_24px_rgba(198,161,91,0.35)]",
        outline:
          "border border-gold/60 text-gold bg-transparent hover:bg-gold hover:text-ink hover:border-gold",
        ghost: "text-ivory hover:text-gold hover:bg-gold/10",
        link: "text-gold underline-offset-4 hover:underline normal-case tracking-normal",
        subtle:
          "bg-ivory/5 text-ivory border border-hairline hover:border-gold/60 hover:text-gold",
      },
      size: {
        default: "h-11 px-7 text-xs",
        sm: "h-9 px-5 text-[11px]",
        lg: "h-13 px-9 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
