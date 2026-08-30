import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Users, BedDouble, Check } from "lucide-react";

import { PageHero } from "@/components/site/page-hero";
import { OrnamentFrame, GoldDivider, Eyebrow } from "@/components/site/ornament";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, roomsItemListSchema } from "@/lib/structured-data";
import { roomTypes } from "@/lib/rooms";

export const metadata: Metadata = {
  title: "Our Rooms",
  description:
    "Double, Triple and Family rooms at Mirage Hotel, Blackpool — twelve individually dressed rooms, each with tea & coffee, Freeview TV and free Wi-Fi.",
  alternates: { canonical: "/rooms" },
};

export default function RoomsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Our Rooms", path: "/rooms" }])} />
      <JsonLd data={roomsItemListSchema} />
      <PageHero
        eyebrow="Accommodation"
        title="Our Rooms"
        subtitle="Twelve rooms, individually dressed — a fit for every party, from a quiet double to the whole family."
        image="/images/rooms/double-abstract-headboard.jpg"
        imageAlt="A guest room at Mirage Hotel, Blackpool"
      />

      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:px-10">
        <div className="flex flex-col gap-24">
          {roomTypes.map((room, index) => (
            <div
              key={room.slug}
              id={room.slug}
              className="grid scroll-mt-28 items-center gap-12 lg:grid-cols-2 lg:gap-16"
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <OrnamentFrame className="relative aspect-[4/3] w-full overflow-hidden border border-hairline p-2.5">
                  <div className="relative h-full w-full overflow-hidden">
                    <Image
                      src={room.images[0]}
                      alt={room.name}
                      fill
                      sizes="(min-width: 1024px) 45vw, 90vw"
                      className="object-cover"
                    />
                  </div>
                </OrnamentFrame>
                {room.images.length > 1 && (
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    {room.images.slice(1, 4).map((img) => (
                      <div key={img} className="relative aspect-square overflow-hidden border border-hairline">
                        <Image
                          src={img}
                          alt={room.name}
                          fill
                          sizes="15vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <h2 className="font-display text-4xl text-ivory sm:text-5xl">
                  {room.name}
                </h2>

                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm uppercase tracking-[0.1em] text-ivory-dim">
                  <span className="flex items-center gap-2">
                    <Users className="size-4 text-gold" /> Sleeps {room.sleeps}
                  </span>
                  <span className="flex items-center gap-2">
                    <BedDouble className="size-4 text-gold" /> {room.bedConfig}
                  </span>
                </div>

                <p className="mt-6 leading-relaxed text-ivory-dim">{room.description}</p>

                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {room.amenities.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-sm text-ivory-dim">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-gold" />
                      {a}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-6">
                  {room.priceFrom ? (
                    <span className="whitespace-nowrap font-display text-2xl text-gold">
                      From £{room.priceFrom} / night
                    </span>
                  ) : (
                    <span className="whitespace-nowrap font-accent text-xl italic text-gold">
                      Rates on request
                    </span>
                  )}
                  <Button asChild size="lg">
                    <Link href={`/booking?room=${room.slug}`}>Book This Room</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <GoldDivider className="mx-auto max-w-7xl px-6 lg:px-10" />

      <section className="mx-auto max-w-4xl px-6 py-24 text-center sm:py-28 lg:px-10">
        <Eyebrow>Not Sure Which Room?</Eyebrow>
        <h2 className="mt-5 font-display text-4xl text-ivory sm:text-5xl">
          Tell us about your stay
        </h2>
        <p className="mx-auto mt-5 max-w-lg leading-relaxed text-ivory-dim">
          Send us a booking request with your party size and dates and we&apos;ll
          recommend the right room for you.
        </p>
        <div className="mt-10">
          <Button asChild size="lg">
            <Link href="/booking">Book Your Stay</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
