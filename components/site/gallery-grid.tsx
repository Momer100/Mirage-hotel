"use client";

import * as React from "react";
import Image from "next/image";
import { Camera, Expand } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type GalleryImage = {
  src: string;
  alt: string;
  tall?: boolean;
};

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = React.useState<GalleryImage | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {images.map((img) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActive(img)}
            className={cn(
              "group relative overflow-hidden border border-hairline outline-none focus-visible:border-gold",
              img.tall ? "row-span-2 aspect-[3/5]" : "aspect-square"
            )}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/50 group-hover:opacity-100">
              <Expand className="size-5 text-gold" />
            </div>
          </button>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-4xl border-gold/30 bg-ink p-2 sm:p-3">
          <DialogTitle className="sr-only">{active?.alt ?? "Gallery image"}</DialogTitle>
          {active && (
            <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10]">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export function ComingSoonTile({ label = "More photos coming soon" }: { label?: string }) {
  return (
    <div className="flex aspect-square flex-col items-center justify-center gap-3 border border-dashed border-hairline bg-ink-elevated/30 text-center">
      <Camera className="size-5 text-gold/70" />
      <span className="max-w-[10rem] text-xs uppercase tracking-[0.1em] text-ivory-dim/70">
        {label}
      </span>
    </div>
  );
}
