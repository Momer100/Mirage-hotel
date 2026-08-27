export type RoomType = {
  slug: string;
  name: string;
  eyebrow: string;
  sleeps: number;
  bedConfig: string;
  description: string;
  amenities: string[];
  images: string[];
  /**
   * No nightly rate was supplied for the site build — add a number here
   * (e.g. 79) once rates are confirmed and the "from £" price will appear
   * automatically on the Rooms page and room cards.
   */
  priceFrom?: number;
};

export const roomTypes: RoomType[] = [
  {
    slug: "double",
    name: "Classic Double Room",
    eyebrow: "Room 01",
    sleeps: 2,
    bedConfig: "1 double bed",
    description:
      "An intimate room for two, finished in soft ivory linens with hand-picked artwork above the headboard. Quiet, comfortable and turned down to a high standard for a short break or a romantic stay.",
    amenities: [
      "Double bed with premium linens",
      "Freeview television",
      "Hospitality tray with tea & coffee",
      "Central heating & free Wi-Fi",
    ],
    images: [
      "/images/rooms/double-sunset.jpg",
      "/images/rooms/double-tree-wallpaper.jpg",
      "/images/rooms/double-abstract-headboard.jpg",
      "/images/rooms/double-beach.jpg",
    ],
  },
  {
    slug: "triple",
    name: "Triple Room",
    eyebrow: "Room 02",
    sleeps: 3,
    bedConfig: "1 double bed & 1 single bed",
    description:
      "A double bed paired with a single, ideal for a small group or a family with one child. Bright, well-proportioned and dressed with the same considered finish as every room at the Mirage.",
    amenities: [
      "1 double bed & 1 single bed",
      "Freeview television",
      "Hospitality tray with tea & coffee",
      "Central heating & free Wi-Fi",
    ],
    images: ["/images/rooms/triple-bunk.jpg"],
  },
  {
    slug: "family-4",
    name: "Family Room (Sleeps 4)",
    eyebrow: "Room 03",
    sleeps: 4,
    bedConfig: "2 double beds",
    description:
      "Two full double beds in one generous room, giving families and small groups space to spread out without giving up the Mirage's boutique styling.",
    amenities: [
      "2 double beds",
      "Freeview television",
      "Hospitality tray with tea & coffee",
      "Central heating & free Wi-Fi",
    ],
    images: ["/images/rooms/family-twin-1.jpg", "/images/rooms/family-twin-2.jpg"],
  },
  {
    slug: "family-5",
    name: "Family Room (Sleeps 5)",
    eyebrow: "Room 04",
    sleeps: 5,
    bedConfig: "2 double beds, plus an additional put-up bed",
    description:
      "Our largest family room, built around two double beds with an additional put-up bed available on request — a comfortable base for bigger families visiting Blackpool together.",
    amenities: [
      "2 double beds + 1 additional put-up bed",
      "Freeview television",
      "Hospitality tray with tea & coffee",
      "Central heating & free Wi-Fi",
    ],
    images: ["/images/rooms/family-twin-1.jpg", "/images/rooms/family-twin-2.jpg"],
  },
];

export function getRoomBySlug(slug: string) {
  return roomTypes.find((r) => r.slug === slug);
}
