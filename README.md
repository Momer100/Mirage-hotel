# Mirage Hotel — Website

A Next.js site for Mirage Hotel, a 12-room hotel at 21 Banks Street,
Blackpool. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4,
and hand-built shadcn/ui-style components, in a black/gold styling based on
the hotel's logo.

## Pages

- **/** — Home: hero, "book direct and save 10%" banner, room previews,
  policies, location teaser
- **/gallery** — Hotel and Blackpool photo tabs with a click-to-enlarge
  lightbox
- **/rooms** — Double, Triple, Family (Sleeps 4) and Family (Sleeps 5), each
  with a "Book This Room" button
- **/booking** — the booking request form (see "Booking emails" below)
- **/contact** — phone, email, address, and an embedded Google Map

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Before this goes live — please review

A few things were written as sensible placeholders because they weren't
specified in the brief. Please check these with the client before launch:

1. **Room rates.** No nightly prices were given, so every room currently
   shows "Rates on request." To add real prices, open `lib/rooms.ts` and set
   `priceFrom` on each room (e.g. `priceFrom: 79`) — it'll appear
   automatically on the Rooms page and room cards.

2. **Policies wording.** `lib/policies.ts` has check-in/out times,
   cancellation, children, and house-policy text written as reasonable
   defaults for a small UK hotel — not confirmed with the client. Please
   read through and adjust before launch, especially the cancellation terms.

3. **Blackpool gallery photos.** The Gallery page's "Blackpool" tab only had
   two real photos to work with (framed prints hanging inside the hotel), so
   I added two "coming soon" placeholder tiles rather than pulling random
   photos off the web. Swap in real Promenade/Tower/Illuminations photos in
   `app/gallery/gallery-client.tsx` (the `blackpoolImages` array) when you
   have them.

4. **Phone number.** Only one number was supplied (0796 107 5000, a UK
   mobile). It's used for both "Phone" and any mobile references — add a
   second landline number in `lib/site-config.ts` if the hotel has one.

5. **Favicon/app icon.** The current logo asset is a wide wordmark banner,
   not a compact square mark, so I generated a plain gold "M" monogram for
   the browser tab icon (`app/icon.tsx`, `app/apple-icon.tsx`). Swap in a
   proper icon-only version of the logo if one exists.

## Booking emails (important — required before the form will send)

The Booking Request form posts to `/api/booking`, which emails the request
using [Resend](https://resend.com) (free tier is generous for a small
hotel). **Until this is configured, submitted requests are only logged to
the server console — they are not emailed anywhere.**

To turn it on:

1. Create a free Resend account and verify a sending domain (or use their
   test domain while you're setting things up).
2. Copy `.env.example` to `.env.local` and fill in:
   ```
   RESEND_API_KEY=your_key_here
   BOOKING_TO_EMAIL=mirage.co.uk@gmail.com
   BOOKING_FROM_EMAIL=Mirage Hotel Website <bookings@yourverifieddomain.com>
   ```
3. Redeploy (or restart `npm run dev`).

Each submission emails the full guest details to `BOOKING_TO_EMAIL` with
the guest's own address set as reply-to, so replying goes straight to them.

## Deploying

The site is a standard Next.js app — the easiest path is
[Vercel](https://vercel.com):

1. Push this project to a GitHub repo.
2. Import it in Vercel.
3. Add the three environment variables from `.env.example` in the Vercel
   project settings.
4. Deploy, then point the hotel's domain at it.

## Editing content

- **Contact details, nav links, discount %:** `lib/site-config.ts`
- **Room types, descriptions, images:** `lib/rooms.ts`
- **Policies:** `lib/policies.ts`
- **Photos:** `public/images/` (organised into `rooms/`, `hotel/`, and
  `gallery/`)
- **Colours/fonts:** the `:root` block at the top of `app/globals.css`
  (`--gold`, `--ink`, `--navy`, etc.)

## Stack

Next.js 16 · TypeScript · Tailwind CSS v4 · Radix UI primitives (hand-built
in the shadcn/ui style, since this environment couldn't reach the shadcn CLI
registry) · react-hook-form + zod · Resend · self-hosted fonts via
`@fontsource` (Playfair Display, Cormorant Garamond, Inter)
