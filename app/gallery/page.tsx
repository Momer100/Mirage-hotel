import type { Metadata } from "next";

import { PageHero } from "@/components/site/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/structured-data";
import { GalleryClient } from "./gallery-client";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse photos of Mirage Hotel's rooms, guest lounge and interior details in the heart of Blackpool.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Gallery", path: "/gallery" }])} />
      <PageHero
        eyebrow="Gallery"
        title="A Closer Look"
        subtitle="Inside Mirage Hotel, and the seaside town waiting just outside the door."
        image="/images/hotel/detail-hallway-mirror-vases.jpg"
        imageAlt="Interior details at Mirage Hotel, Blackpool"
      />

      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-10">
        <GalleryClient />
      </section>
    </>
  );
}
