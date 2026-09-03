"use client";

import { GalleryGrid, type GalleryImage } from "@/components/site/gallery-grid";

export function GalleryClient({ images }: { images: GalleryImage[] }) {
  return <GalleryGrid images={images} />;
}
