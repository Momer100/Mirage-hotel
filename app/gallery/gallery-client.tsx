"use client";

import { GalleryGrid, type GalleryImage } from "@/components/site/gallery-grid";

// 20 images so the 2- and 4-column grid always tiles into full rows.
const galleryImages: GalleryImage[] = [
  { src: "/images/hotel/exterior.jpg", alt: "Mirage Hotel frontage on Banks Street" },
  { src: "/images/hotel/lounge.jpg", alt: "Guest lounge with fireplace and TV" },
  { src: "/images/gallery/gallery-fresh-flowers.jpg", alt: "Fresh flowers welcoming guests at Mirage Hotel" },
  { src: "/images/rooms/double-sunset.jpg", alt: "Double room with sunset artwork" },
  { src: "/images/gallery/gallery-sunburst-mirrors.jpg", alt: "Gold sunburst mirrors on a feature wall" },
  { src: "/images/rooms/family-twin-1.jpg", alt: "Family room with two double beds" },
  { src: "/images/rooms/double-tree-wallpaper.jpg", alt: "Double room with feature wallpaper" },
  { src: "/images/gallery/gallery-abstract-prints.jpg", alt: "Framed abstract prints in a guest room" },
  { src: "/images/rooms/double-abstract-headboard.jpg", alt: "Double room headboard detail" },
  { src: "/images/hotel/detail-hallway-mirror-vases.jpg", alt: "Hallway mirror and vase display" },
  { src: "/images/gallery/gallery-room-tv.jpg", alt: "Wall-mounted flat-screen TV in a guest room" },
  { src: "/images/rooms/double-beach.jpg", alt: "Double room with coastal artwork" },
  { src: "/images/gallery/blackpool-display-wall.jpg", alt: "Framed Blackpool photography inside the hotel" },
  { src: "/images/hotel/detail-tea-tray.jpg", alt: "In-room tea and coffee tray" },
  { src: "/images/rooms/double-autumn-ensuite.jpg", alt: "Double room leading to en-suite" },
  { src: "/images/gallery/gallery-hospitality-tray.jpg", alt: "In-room hospitality tray with kettle, tea and coffee" },
  { src: "/images/rooms/family-twin-2.jpg", alt: "Family room, alternate view" },
  { src: "/images/hotel/detail-sunburst-mirrors.jpg", alt: "Gold sunburst mirror detail" },
  { src: "/images/gallery/blackpool-landscapes-wall.jpg", alt: "Framed landscape photography in the hallway" },
  { src: "/images/hotel/detail-mirror-roses.jpg", alt: "Gold mirror with white roses" },
];

export function GalleryClient() {
  return <GalleryGrid images={galleryImages} />;
}
