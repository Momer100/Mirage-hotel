import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";

import { siteConfig } from "@/lib/site-config";
import { GoldDivider } from "@/components/site/ornament";
import { CookieSettingsButton } from "@/components/site/cookie-settings-button";

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/images/logo.png"
              alt="Mirage Hotel"
              width={220}
              height={100}
              className="h-9 w-auto"
            />
            <p className="mt-5 max-w-xs font-accent text-lg italic leading-relaxed text-ivory-dim">
              {siteConfig.tagline}
            </p>
          </div>

          <div>
            <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ivory-dim transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-ivory-dim">
              <li>
                <a href={siteConfig.phoneHref} className="flex items-center gap-2 hover:text-gold transition-colors">
                  <Phone className="size-3.5 text-gold" /> {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={siteConfig.mobileHref} className="flex items-center gap-2 hover:text-gold transition-colors">
                  <Phone className="size-3.5 text-gold" /> {siteConfig.mobile}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 hover:text-gold transition-colors"
                >
                  <Mail className="size-3.5 text-gold" /> {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-2 hover:text-gold transition-colors"
                >
                  <MapPin className="mt-0.5 size-3.5 shrink-0 text-gold" />
                  <span>
                    {siteConfig.address.line1}
                    <br />
                    {siteConfig.address.line2}
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
              Book Direct
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-ivory-dim">
              Save {siteConfig.directBookingDiscount}% when you book your stay directly
              with us, guaranteed.
            </p>
            <Link
              href="/booking"
              className="mt-4 inline-block text-xs font-medium uppercase tracking-[0.16em] text-gold hover:text-gold-bright"
            >
              Reserve a room &rarr;
            </Link>
          </div>
        </div>

        <GoldDivider className="my-10" />

        <div className="flex flex-col items-center justify-between gap-4 text-center text-[11px] uppercase tracking-[0.14em] text-ivory-dim/60 sm:flex-row sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="uppercase tracking-[0.14em] text-ivory-dim/60 transition-colors hover:text-gold"
            >
              Privacy
            </Link>
            <CookieSettingsButton />
          </div>
          <p>{siteConfig.address.line1}, {siteConfig.address.line2}</p>
        </div>
      </div>
    </footer>
  );
}
