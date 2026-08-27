import { cn } from "@/lib/utils";

/**
 * The site's signature motif: a scrollwork corner bracket lifted directly
 * from the gold ornamentation on the Mirage Hotel logo. Reused around the
 * hero, room cards, and the booking panel so the whole site reads as one
 * engraved gold sign rather than a stock template.
 */
function CornerFlourish({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={cn("text-gold", className)}
      aria-hidden="true"
    >
      <path d="M2 26 V8 A6 6 0 0 1 8 2 H26" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M2 40 C 2 18, 18 2, 40 2"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.45"
      />
      <path
        d="M15 2 C 15 10 10 15 2 15"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.8"
      />
      <circle cx="2" cy="2" r="2" fill="currentColor" />
      <circle cx="8" cy="8" r="1" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

/**
 * Wraps any panel (hero, card, form) with the four corner flourishes and a
 * thin gold hairline border, evoking an engraved brass plaque.
 */
export function OrnamentFrame({
  className,
  children,
  cornerClassName,
}: {
  className?: string;
  children: React.ReactNode;
  cornerClassName?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <CornerFlourish className={cn("absolute top-0 left-0 h-8 w-8 sm:h-10 sm:w-10", cornerClassName)} />
      <CornerFlourish
        className={cn(
          "absolute top-0 right-0 h-8 w-8 -scale-x-100 sm:h-10 sm:w-10",
          cornerClassName
        )}
      />
      <CornerFlourish
        className={cn(
          "absolute bottom-0 left-0 h-8 w-8 -scale-y-100 sm:h-10 sm:w-10",
          cornerClassName
        )}
      />
      <CornerFlourish
        className={cn(
          "absolute bottom-0 right-0 h-8 w-8 -scale-x-100 -scale-y-100 sm:h-10 sm:w-10",
          cornerClassName
        )}
      />
      {children}
    </div>
  );
}

/** Hairline rule with a small gold diamond at its centre, lifted from the logo's dividers. */
export function GoldDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)} role="presentation">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/50" />
      <svg width="9" height="9" viewBox="0 0 10 10" className="shrink-0 text-gold">
        <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="currentColor" />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/50" />
    </div>
  );
}

/** Small tracked-caps eyebrow label flanked by hairlines, e.g. "OUR ROOMS". */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)}>
      <span className="h-px w-8 bg-gold/50" />
      <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-gold">
        {children}
      </span>
      <span className="h-px w-8 bg-gold/50" />
    </div>
  );
}

export { CornerFlourish };
