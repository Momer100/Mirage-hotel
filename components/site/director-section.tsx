import Image from "next/image";
import { Quote } from "lucide-react";

import { Eyebrow, OrnamentFrame } from "@/components/site/ornament";

export function DirectorSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:px-10">
      <div className="grid items-center gap-14 lg:grid-cols-[380px_1fr] lg:gap-20">
        <OrnamentFrame className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden border border-hairline p-2.5 lg:mx-0">
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src="/images/hotel/director-john-najdad.jpg"
              alt="Dr. John Najdad, Managing Director of Mirage Hotel"
              fill
              sizes="(min-width: 1024px) 380px, 90vw"
              className="object-cover"
            />
          </div>
        </OrnamentFrame>

        <div>
          <Eyebrow className="justify-start">About The Director</Eyebrow>
          <h2 className="mt-5 text-balance font-display text-4xl leading-tight text-ivory sm:text-5xl">
            A Personal Commitment to Hospitality
          </h2>

          <div className="mt-6 space-y-4 leading-relaxed text-ivory-dim">
            <p>
              Mirage Hotel is managed by Dr. John Najdad, who brings more
              than 20 years of experience in the hotel and hospitality
              business.
            </p>
            <p>
              With many years of experience looking after guests, he
              understands that good hospitality is about more than simply
              providing a room. It is about cleanliness, comfort, personal
              service and making guests feel genuinely welcome.
            </p>
            <p>
              His personal commitment is to build Mirage Hotel into a hotel
              known for its friendly service, comfortable rooms and
              attention to guests&apos; needs.
            </p>
          </div>

          <OrnamentFrame className="mt-8 border border-gold/30 bg-ink-elevated/40 p-7 sm:p-9">
            <Quote className="size-5 text-gold/70" />
            <p className="mt-4 font-accent text-xl italic leading-relaxed text-ivory sm:text-2xl">
              Our guests are at the heart of everything we do. We are always
              doing our best to make every guest happy, comfortable and
              welcome.
            </p>
            <p className="mt-4 text-sm uppercase tracking-[0.14em] text-gold">
              &mdash; Dr. John Najdad, Managing Director
            </p>
          </OrnamentFrame>
        </div>
      </div>
    </section>
  );
}
