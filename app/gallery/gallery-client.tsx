"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GalleryGrid, ComingSoonTile, type GalleryImage } from "@/components/site/gallery-grid";

const hotelImages: GalleryImage[] = [
  { src: "/images/hotel/exterior.jpg", alt: "Mirage Hotel frontage on Banks Street", tall: true },
  { src: "/images/hotel/lounge.jpg", alt: "Guest lounge with fireplace and TV" },
  { src: "/images/rooms/family-twin-1.jpg", alt: "Family room with two double beds" },
  { src: "/images/rooms/double-sunset.jpg", alt: "Double room with sunset artwork" },
  { src: "/images/rooms/triple-bunk.jpg", alt: "Triple room with double and single beds" },
  { src: "/images/rooms/double-tree-wallpaper.jpg", alt: "Double room with feature wallpaper", tall: true },
  { src: "/images/hotel/detail-sunburst-mirrors.jpg", alt: "Gold sunburst mirror detail" },
  { src: "/images/rooms/double-abstract-headboard.jpg", alt: "Double room headboard detail" },
  { src: "/images/rooms/double-beach.jpg", alt: "Double room with coastal artwork" },
  { src: "/images/hotel/detail-hallway-mirror-vases.jpg", alt: "Hallway mirror and vase display" },
  { src: "/images/rooms/double-autumn-ensuite.jpg", alt: "Double room leading to en-suite" },
  { src: "/images/hotel/detail-tea-tray.jpg", alt: "In-room tea and coffee tray" },
  { src: "/images/rooms/family-twin-2.jpg", alt: "Family room, alternate view" },
  { src: "/images/hotel/detail-mirror-roses.jpg", alt: "Gold mirror with white roses" },
  { src: "/images/hotel/lounge-alt.jpg", alt: "Guest lounge, alternate view" },
];

const blackpoolImages: GalleryImage[] = [
  { src: "/images/gallery/blackpool-display-wall.jpg", alt: "Framed Blackpool photography inside the hotel", tall: true },
  { src: "/images/gallery/blackpool-landscapes-wall.jpg", alt: "Framed landscape photography in the hallway" },
];

export function GalleryClient() {
  return (
    <Tabs defaultValue="hotel" className="items-center">
      <TabsList>
        <TabsTrigger value="hotel">The Hotel</TabsTrigger>
        <TabsTrigger value="blackpool">Blackpool</TabsTrigger>
      </TabsList>

      <TabsContent value="hotel" className="w-full">
        <GalleryGrid images={hotelImages} />
      </TabsContent>

      <TabsContent value="blackpool" className="w-full">
        <GalleryGrid images={blackpoolImages} />
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          <ComingSoonTile label="Promenade & Tower photos coming soon" />
          <ComingSoonTile label="Illuminations photos coming soon" />
        </div>
      </TabsContent>
    </Tabs>
  );
}
