import Image from "next/image";

import { Eyebrow } from "@/components/site/ornament";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt = "",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative flex h-[46vh] min-h-[340px] w-full items-center justify-center overflow-hidden pt-16">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/70 to-ink" />
      <div className="absolute inset-0 bg-noise" />
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 font-display text-4xl text-ivory sm:text-5xl lg:text-6xl">{title}</h1>
        {subtitle && (
          <p className="mt-5 max-w-xl font-accent text-xl italic leading-relaxed text-ivory-dim">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
