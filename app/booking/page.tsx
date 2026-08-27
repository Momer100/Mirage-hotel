import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, Phone, ShieldCheck, Clock, BadgePercent } from "lucide-react";

import { PageHero } from "@/components/site/page-hero";
import { Eyebrow } from "@/components/site/ornament";
import { siteConfig } from "@/lib/site-config";
import { BookingForm } from "./booking-form";

export const metadata: Metadata = {
  title: "Booking Request",
  description:
    "Request your stay at Mirage Hotel, Blackpool — send your dates, guests and room preference and we'll confirm your booking directly, saving you 10%.",
};

const reassurances = [
  {
    icon: BadgePercent,
    title: `${siteConfig.directBookingDiscount}% off, guaranteed`,
    body: "Booking direct always beats third-party rates, with no booking fees.",
  },
  {
    icon: ShieldCheck,
    title: "A real reply, from us",
    body: "Every request is answered personally by the Mirage Hotel team.",
  },
  {
    icon: Clock,
    title: "Quick turnaround",
    body: "We aim to confirm availability and rates within one business day.",
  },
];

export default function BookingPage() {
  return (
    <>
      <PageHero
        eyebrow="Reservations"
        title="Booking Request"
        subtitle="Tell us your dates and we'll take it from there."
        image="/images/rooms/family-twin-1.jpg"
      />

      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
          <Suspense fallback={<div className="h-[600px]" />}>
            <BookingForm />
          </Suspense>

          <aside className="flex flex-col gap-8">
            <div>
              <Eyebrow className="justify-start">Why Book Direct</Eyebrow>
              <ul className="mt-6 flex flex-col gap-6">
                {reassurances.map(({ icon: Icon, title, body }) => (
                  <li key={title} className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/5">
                      <Icon className="size-4 text-gold" />
                    </span>
                    <div>
                      <p className="font-display text-lg text-ivory">{title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ivory-dim">{body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-hairline pt-8">
              <Eyebrow className="justify-start">Prefer To Talk?</Eyebrow>
              <div className="mt-6 flex flex-col gap-4">
                <a
                  href={siteConfig.phoneHref}
                  className="flex items-center gap-3 text-sm text-ivory-dim transition-colors hover:text-gold"
                >
                  <Phone className="size-4 text-gold" /> {siteConfig.phone}
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-sm text-ivory-dim transition-colors hover:text-gold"
                >
                  <Mail className="size-4 text-gold" /> {siteConfig.email}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
