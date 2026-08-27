import Image from "next/image";
import Link from "next/link";
import {
  BedDouble,
  Coffee,
  MapPin,
  ShieldCheck,
  Sparkles,
  Tv,
  Wifi,
  DoorOpen,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { OrnamentFrame, GoldDivider, Eyebrow } from "@/components/site/ornament";
import { DirectorSection } from "@/components/site/director-section";
import { RoomCard } from "@/components/site/room-card";
import { roomTypes } from "@/lib/rooms";
import { policies } from "@/lib/policies";
import { siteConfig } from "@/lib/site-config";

const highlights = [
  { icon: DoorOpen, label: "12 individually dressed rooms" },
  { icon: MapPin, label: "Moments from the Promenade & the Tower" },
  { icon: Coffee, label: "Tea & coffee tray in every room" },
  { icon: Wifi, label: "Free Wi-Fi throughout" },
  { icon: Tv, label: "Guest lounge with Sky TV & fireplace" },
  { icon: ShieldCheck, label: "Warm, personal hospitality" },
];

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- HERO */}
      <section className="relative flex min-h-[92vh] w-full items-center justify-center overflow-hidden">
        <Image
          src="/images/hotel/exterior.jpg"
          alt="The Mirage Hotel frontage on Banks Street, Blackpool"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/55 to-ink" />
        <div className="absolute inset-0 bg-noise" />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-24 text-center animate-fade-up">
          <Eyebrow>Banks Street &middot; Blackpool</Eyebrow>
          <h1 className="mt-6 text-balance font-display text-5xl leading-[1.05] text-ivory sm:text-6xl lg:text-7xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-6 max-w-xl font-accent text-xl italic leading-relaxed text-ivory-dim sm:text-2xl">
            Twelve rooms, quietly refurbished, on a doorstep that opens onto
            everything Blackpool does best.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/booking">Book Your Stay</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/rooms">View Our Rooms</Link>
            </Button>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 border-t border-gold/30 bg-ink/70 py-3 backdrop-blur-sm">
          <p className="px-6 text-center text-[11px] font-medium uppercase tracking-[0.22em] text-gold sm:text-xs">
            Book direct and save {siteConfig.directBookingDiscount}% &mdash; our best
            rate, guaranteed, every time
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------- WELCOME */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>Welcome</Eyebrow>
            <h2 className="mt-5 text-balance font-display text-4xl leading-tight text-ivory sm:text-5xl">
              Welcome to Mirage Hotel
            </h2>
            <p className="mt-6 leading-relaxed text-ivory-dim">
              Welcome to Mirage Hotel &mdash; a newly established, independent
              hotel in the heart of Blackpool, opened in 2026. Our aim is to
              give every guest a comfortable, friendly and enjoyable stay in
              a warm, welcoming atmosphere.
            </p>
            <p className="mt-4 leading-relaxed text-ivory-dim">
              We take pride in looking after our guests and paying attention
              to the small details that make a stay special. From a warm
              welcome on arrival to helping with anything you may need
              during your visit, our goal is to make every guest feel
              comfortable, valued and at home.
            </p>
            <p className="mt-4 leading-relaxed text-ivory-dim">
              Whether you&apos;re visiting Blackpool for a family holiday, a
              short break, a weekend away, or to enjoy the many attractions
              the town has to offer, we look forward to welcoming you to
              Mirage Hotel.
            </p>

            <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              {highlights.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/5">
                    <Icon className="size-4 text-gold" />
                  </span>
                  <span className="text-sm text-ivory-dim">{label}</span>
                </li>
              ))}
            </ul>
          </div>

          <OrnamentFrame className="relative aspect-[4/5] w-full overflow-hidden border border-hairline p-2.5">
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src="/images/rooms/double-sunset.jpg"
                alt="A guest room at Mirage Hotel"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
          </OrnamentFrame>
        </div>
      </section>

      {/* --------------------------------------------------------- BOOK DIRECT */}
      <section className="border-y border-hairline bg-navy/60">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center lg:px-10">
          <Eyebrow>Book Direct &amp; Save {siteConfig.directBookingDiscount}%</Eyebrow>
          <h2 className="mt-5 font-display text-4xl text-ivory sm:text-5xl">
            Save {siteConfig.directBookingDiscount}%, every time
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-ivory-dim">
            Book directly with Mirage Hotel and receive a{" "}
            {siteConfig.directBookingDiscount}% discount off our standard
            rate &mdash; with no third-party booking fees added on top.
          </p>
          <div className="mt-10">
            <Button asChild size="lg">
              <Link href="/booking">Book Your Stay</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- ROOMS */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Our Rooms</Eyebrow>
          <h2 className="mt-5 font-display text-4xl text-ivory sm:text-5xl">
            A room for every kind of stay
          </h2>
          <p className="mt-5 leading-relaxed text-ivory-dim">
            From a quiet double to a room built for the whole family, every
            space carries the same considered, boutique finish.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {roomTypes.map((room, i) => (
            <RoomCard key={room.slug} room={room} priority={i === 0} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/rooms">See All Rooms</Link>
          </Button>
        </div>
      </section>

      {/* ----------------------------------------------------------- POLICIES */}
      <section className="border-t border-hairline bg-navy/40">
        <div className="mx-auto max-w-4xl px-6 py-24 sm:py-28 lg:px-10">
          <div className="text-center">
            <Eyebrow>Good to Know</Eyebrow>
            <h2 className="mt-5 font-display text-4xl text-ivory sm:text-5xl">
              Our Policies
            </h2>
          </div>

          <div className="mt-14">
            <Accordion type="single" collapsible className="w-full">
              {policies.map((policy) => (
                <AccordionItem key={policy.title} value={policy.title}>
                  <AccordionTrigger>{policy.title}</AccordionTrigger>
                  <AccordionContent>{policy.body}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- DIRECTOR */}
      <DirectorSection />

      {/* ---------------------------------------------------------- LOCATION */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <OrnamentFrame className="relative order-2 aspect-[4/3] w-full overflow-hidden border border-hairline p-2.5 lg:order-1">
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src="/images/hotel/lounge.jpg"
                alt="The guest lounge at Mirage Hotel"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
          </OrnamentFrame>

          <div className="order-1 lg:order-2">
            <Eyebrow>Location</Eyebrow>
            <h2 className="mt-5 text-balance font-display text-4xl leading-tight text-ivory sm:text-5xl">
              Everything Blackpool, right outside the door
            </h2>
            <p className="mt-6 leading-relaxed text-ivory-dim">
              We&apos;re tucked on Banks Street in North Shore &mdash; a short
              stroll from the seafront Promenade, Blackpool Tower and the
              Winter Gardens, with Blackpool North station and the tram close
              by too. Spend the day on the Golden Mile and come home to a
              quiet room and a proper cup of tea.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button asChild>
                <Link href="/contact">Get Directions</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/gallery">View Gallery</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <GoldDivider className="mx-auto max-w-7xl px-6 lg:px-10" />

      {/* --------------------------------------------------------- FINAL CTA */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center sm:py-28 lg:px-10">
        <Sparkles className="mx-auto size-6 text-gold" />
        <h2 className="mt-5 font-display text-4xl text-ivory sm:text-5xl">
          Ready when you are
        </h2>
        <p className="mx-auto mt-5 max-w-lg leading-relaxed text-ivory-dim">
          Send us your dates and we&apos;ll come straight back to you &mdash; no
          call centres, no booking fees, just Blackpool hospitality.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/booking">Book Your Stay</Link>
          </Button>
          <Button asChild variant="subtle" size="lg">
            <Link href="/contact">
              <BedDouble className="size-4" />
              Contact the Hotel
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
