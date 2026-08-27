"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4", className)}
      classNames={{
        months: "relative flex flex-col gap-6 sm:flex-row sm:gap-8",
        month: "flex flex-col gap-3",
        month_caption: "flex h-9 items-center justify-center",
        caption_label:
          "font-display text-sm uppercase tracking-[0.15em] text-ivory",
        nav: "absolute inset-x-0 top-0 z-10 flex h-9 items-center justify-between",
        button_previous:
          "inline-flex size-9 items-center justify-center rounded-sm text-ivory-dim outline-none transition-colors hover:bg-gold/10 hover:text-gold disabled:pointer-events-none disabled:opacity-30",
        button_next:
          "inline-flex size-9 items-center justify-center rounded-sm text-ivory-dim outline-none transition-colors hover:bg-gold/10 hover:text-gold disabled:pointer-events-none disabled:opacity-30",
        month_grid: "w-full border-collapse",
        weekday:
          "size-10 pb-1 text-[0.68rem] font-normal uppercase tracking-wider text-ivory-dim/50",
        day: "relative p-0 text-center text-sm",
        range_start:
          "rounded-l-sm bg-gold/15 [&>button]:bg-gold [&>button]:font-semibold [&>button]:text-ink [&>button]:hover:bg-gold [&>button]:hover:text-ink",
        range_middle:
          "bg-gold/15 [&>button]:text-gold [&>button]:hover:bg-gold/20 [&>button]:hover:text-gold",
        range_end:
          "rounded-r-sm bg-gold/15 [&>button]:bg-gold [&>button]:font-semibold [&>button]:text-ink [&>button]:hover:bg-gold [&>button]:hover:text-ink",
        today: "[&>button]:ring-1 [&>button]:ring-inset [&>button]:ring-gold/40",
        outside: "[&>button]:text-ivory-dim/25",
        disabled:
          "[&>button]:pointer-events-none [&>button]:text-ivory-dim/20 [&>button]:opacity-60",
        hidden: "invisible",
        day_button:
          "inline-flex size-10 items-center justify-center rounded-sm text-ivory outline-none transition-colors hover:bg-gold/15 hover:text-gold focus-visible:ring-1 focus-visible:ring-gold",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight;
          return <Icon className="size-4" />;
        },
      }}
      {...props}
    />
  );
}

export { Calendar };
