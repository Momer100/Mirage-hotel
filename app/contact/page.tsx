import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Navigation, MessageSquareText } from "lucide-react";

import { PageHero } from "@/components/site/page-hero";
import { Eyebrow, GoldDivider, OrnamentFrame } from "@/components/site/ornament";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Mirage Hotel, Blackpool — phone, email, address, and directions to 21 Banks Street.",
};

const contactCards = [
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.phone,
    href: siteConfig.phoneHref,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: MapPin,
    label: "Address",
    value: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
    href: siteConfig.mapsUrl,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Contact Us"
        subtitle="Questions, group bookings, or just want to talk it through? We're one call away."
        image="/images/hotel/detail-mirror-roses.jpg"
      />

      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-10">
        <div className="grid gap-6 sm:grid-cols-3">
          {contactCards.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={label === "Address" ? "_blank" : undefined}
              rel={label === "Address" ? "noreferrer" : undefined}
              className="group flex flex-col items-center gap-4 border border-hairline bg-ink-elevated/40 px-6 py-10 text-center transition-colors hover:border-gold/50"
            >
              <span className="flex size-12 items-center justify-center rounded-full border border-gold/40 bg-gold/5 transition-colors group-hover:bg-gold/10">
                <Icon className="size-5 text-gold" />
              </span>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-ivory-dim">
                  {label}
                </p>
                <p className="mt-2 font-display text-lg text-ivory">{value}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/booking">
              <MessageSquareText className="size-4" />
              Send a Booking Request
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">
              <Navigation className="size-4" />
              Get Directions
            </a>
          </Button>
        </div>
      </section>

      <GoldDivider className="mx-auto max-w-7xl px-6 lg:px-10" />

      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Find Us</Eyebrow>
          <h2 className="mt-5 font-display text-4xl text-ivory sm:text-5xl">
            21 Banks Street, Blackpool
          </h2>
          <p className="mt-5 leading-relaxed text-ivory-dim">
            A short stroll from the Promenade, Blackpool Tower and Blackpool
            North station, in the heart of North Shore.
          </p>
        </div>

        <OrnamentFrame className="mt-14 overflow-hidden border border-hairline p-2.5">
          <div className="relative h-[420px] w-full overflow-hidden sm:h-[480px]">
            <iframe
              title="Mirage Hotel location on Google Maps"
              src={siteConfig.mapsEmbedSrc}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(0.4) contrast(1.05)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full"
            />
          </div>
        </OrnamentFrame>
      </section>
    </>
  );
}
