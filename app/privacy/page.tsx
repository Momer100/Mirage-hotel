import type { Metadata } from "next";

import { PageHero } from "@/components/site/page-hero";
import { GoldDivider } from "@/components/site/ornament";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy & Cookies",
  description:
    "How Mirage Hotel, Blackpool handles the information you send through this website, and how we use cookies and analytics.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "2 September 2026";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl text-ivory sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 leading-relaxed text-ivory-dim">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy & Cookies"
        subtitle="How we handle the information you share with us, in plain English."
        image="/images/hotel/detail-hallway-mirror-vases.jpg"
        imageAlt="Interior detail at Mirage Hotel, Blackpool"
      />

      <section className="mx-auto max-w-3xl px-6 py-20 sm:py-24 lg:px-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-ivory-dim/60">
          Last updated: {LAST_UPDATED}
        </p>

        <Section title="Who we are">
          <p>
            This website is operated by {siteConfig.name}, {siteConfig.address.line1},{" "}
            {siteConfig.address.line2}. {siteConfig.name} is the data controller for personal
            information collected through this site. For any privacy question or request, contact
            us at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-gold underline-offset-4 hover:underline"
            >
              {siteConfig.email}
            </a>{" "}
            or{" "}
            <a
              href={siteConfig.phoneHref}
              className="text-gold underline-offset-4 hover:underline"
            >
              {siteConfig.phone}
            </a>
            .
          </p>
        </Section>

        <Section title="Information we collect">
          <p>
            We only collect the details you choose to send us through our booking request form:
            your name, email address, mobile number, stay dates, number of guests and rooms, room
            preference, and any special requests you add. We do not ask for or store payment
            details on this website.
          </p>
        </Section>

        <Section title="How we use it">
          <p>
            Your booking request is sent by email directly to the hotel so we can respond to your
            enquiry and arrange your stay. Your email address is used as the reply-to so we can get
            back to you. We do not use these details for marketing, and we do not sell or share
            them.
          </p>
        </Section>

        <Section title="Services we use">
          <ul className="space-y-3">
            <li>
              <strong className="text-ivory">Email delivery (Resend).</strong> Our booking form is
              delivered to us using Resend, an email service provider; your submission passes
              through Resend to reach our inbox.
            </li>
            <li>
              <strong className="text-ivory">Analytics (Google Analytics).</strong> If you accept
              analytics cookies, we use Google Analytics (GA4) to understand how visitors use the
              site — pages viewed, general location and device type — so we can improve it.
              Analytics do not run until you accept.
            </li>
            <li>
              <strong className="text-ivory">Maps (Google Maps).</strong> Our Contact page embeds a
              Google Map; loading it connects your browser to Google.
            </li>
          </ul>
        </Section>

        <Section title="Cookies">
          <p>
            We do not set any non-essential cookies until you choose “Accept” on the cookie banner.
            If you accept, Google Analytics sets cookies to measure site usage. If you decline, no
            analytics cookies are set and we remove any that were already placed. You can change
            your choice at any time using the <strong className="text-ivory">Cookie settings</strong>{" "}
            link in the footer.
          </p>
        </Section>

        <Section title="Storage & retention">
          <p>
            Booking enquiries live in our email inbox and are kept only as long as we need them to
            handle your enquiry and our normal business records, then deleted. This website does not
            store your booking in a database.
          </p>
        </Section>

        <Section title="Your rights">
          <p>
            Under UK data protection law you have the right to access, correct or ask us to delete
            the personal information we hold about you, and to object to or restrict how we use it.
            To exercise any of these, contact us at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-gold underline-offset-4 hover:underline"
            >
              {siteConfig.email}
            </a>
            . You also have the right to complain to the UK Information Commissioner’s Office at{" "}
            <a
              href="https://ico.org.uk"
              target="_blank"
              rel="noreferrer"
              className="text-gold underline-offset-4 hover:underline"
            >
              ico.org.uk
            </a>
            .
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            We may update this policy from time to time. The date at the top shows when it was last
            revised.
          </p>
        </Section>

        <GoldDivider className="mt-14" />
      </section>
    </>
  );
}
