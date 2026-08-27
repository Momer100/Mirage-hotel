import type { Metadata } from "next";

import { PageHero } from "@/components/site/page-hero";
import { GalleryClient } from "./gallery-client";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse photos of Mirage Hotel's rooms and interiors, plus a look at Blackpool's Promenade, Tower and Illuminations nearby.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="A Closer Look"
        subtitle="Inside Mirage Hotel, and the seaside town waiting just outside the door."
        image="/images/hotel/detail-hallway-mirror-vases.jpg"
      />

      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-10">
        <GalleryClient />
      </section>
    </>
  );
}
