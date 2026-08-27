import Image from "next/image";
import Link from "next/link";
import { Users, BedDouble } from "lucide-react";

import type { RoomType } from "@/lib/rooms";
import { Button } from "@/components/ui/button";
import { OrnamentFrame } from "@/components/site/ornament";

export function RoomCard({ room, priority = false }: { room: RoomType; priority?: boolean }) {
  return (
    <OrnamentFrame className="group flex h-full flex-col border border-hairline bg-ink-elevated/40 p-2.5 transition-colors duration-500 hover:border-gold/50">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={room.images[0]}
          alt={room.name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 border border-gold/40 bg-ink/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-gold backdrop-blur-sm">
          {room.eyebrow}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="font-display text-2xl text-ivory">{room.name}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] uppercase tracking-[0.12em] text-ivory-dim">
            <span className="flex items-center gap-1.5">
              <Users className="size-3.5 text-gold" /> Sleeps {room.sleeps}
            </span>
            <span className="flex items-center gap-1.5">
              <BedDouble className="size-3.5 text-gold" /> {room.bedConfig}
            </span>
          </div>
        </div>

        <p className="flex-1 text-sm leading-relaxed text-ivory-dim">{room.description}</p>

        <div className="flex items-center justify-between gap-3 pt-2">
          <span className="font-display text-lg text-gold">
            {room.priceFrom ? `From £${room.priceFrom}/night` : "Rates on request"}
          </span>
          <Button asChild variant="outline" size="sm">
            <Link href={`/booking?room=${room.slug}`}>Book This Room</Link>
          </Button>
        </div>
      </div>
    </OrnamentFrame>
  );
}
