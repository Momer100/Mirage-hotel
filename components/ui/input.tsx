import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 w-full min-w-0 rounded-sm border border-hairline bg-ink-elevated/60 px-4 py-2 text-sm text-ivory placeholder:text-ivory-dim/50 transition-colors outline-none",
        "focus-visible:border-gold focus-visible:ring-1 focus-visible:ring-gold",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-error aria-invalid:ring-error",
        className
      )}
      {...props}
    />
  );
}

export { Input };
