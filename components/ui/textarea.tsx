import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-28 w-full rounded-sm border border-hairline bg-ink-elevated/60 px-4 py-3 text-sm text-ivory placeholder:text-ivory-dim/50 transition-colors outline-none",
        "focus-visible:border-gold focus-visible:ring-1 focus-visible:ring-gold",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
