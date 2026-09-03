// One-time content seed: uploads the current images and creates the CMS
// documents so Sanity Studio opens fully populated with today's site.
//
// Run:  node --env-file=.env.local scripts/seed-sanity.mjs
// Needs NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and
// SANITY_API_WRITE_TOKEN (Editor). Idempotent — safe to re-run (createOrReplace).

import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing env. Run: node --env-file=.env.local scripts/seed-sanity.mjs\n" +
      "(needs NEXT_PUBLIC_SANITY_PROJECT_ID + SANITY_API_WRITE_TOKEN)"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
});

const assetCache = new Map();
async function uploadAsset(publicPath) {
  if (assetCache.has(publicPath)) return assetCache.get(publicPath);
  const abs = join(process.cwd(), "public", publicPath);
  const filename = publicPath.split("/").pop();
  process.stdout.write(`  uploading ${filename}... `);
  const asset = await client.assets.upload("image", readFileSync(abs), { filename });
  console.log("done");
  assetCache.set(publicPath, asset._id);
  return asset._id;
}
async function image(publicPath, alt) {
  const ref = await uploadAsset(publicPath);
  return { _type: "image", _key: randomUUID(), asset: { _type: "reference", _ref: ref }, alt };
}
async function singleImage(publicPath, alt) {
  const ref = await uploadAsset(publicPath);
  return { _type: "image", asset: { _type: "reference", _ref: ref }, alt };
}

const rooms = [
  {
    slug: "double", name: "Classic Double Room", order: 1, sleeps: 2,
    bedConfig: "1 double bed",
    description:
      "An intimate room for two, finished in soft ivory linens with hand-picked artwork above the headboard. Quiet, comfortable and turned down to a high standard for a short break or a romantic stay.",
    amenities: ["Double bed with premium linens", "Freeview television", "Hospitality tray with tea & coffee", "Central heating & free Wi-Fi"],
    images: ["/images/rooms/double-sunset.jpg", "/images/rooms/double-tree-wallpaper.jpg", "/images/rooms/double-abstract-headboard.jpg", "/images/rooms/double-beach.jpg"],
  },
  {
    slug: "triple", name: "Triple Room", order: 2, sleeps: 3,
    bedConfig: "1 double bed & 1 single bed",
    description:
      "A double bed paired with a single, ideal for a small group or a family with one child. Bright, well-proportioned and dressed with the same considered finish as every room at the Mirage.",
    amenities: ["1 double bed & 1 single bed", "Freeview television", "Hospitality tray with tea & coffee", "Central heating & free Wi-Fi"],
    images: ["/images/rooms/tripleroom.jpg", "/images/rooms/tripleroom2.jpg"],
  },
  {
    slug: "family-4", name: "Family Room (Sleeps 4)", order: 3, sleeps: 4,
    bedConfig: "2 double beds",
    description:
      "Two full double beds in one generous room, giving families and small groups space to spread out without giving up the Mirage's boutique styling.",
    amenities: ["2 double beds", "Freeview television", "Hospitality tray with tea & coffee", "Central heating & free Wi-Fi"],
    images: ["/images/rooms/family-twin-1.jpg", "/images/rooms/family-twin-2.jpg"],
  },
  {
    slug: "family-5", name: "Family Room (Sleeps 5)", order: 4, sleeps: 5,
    bedConfig: "1 double bed & 1 triple bunk (double + single)",
    description:
      "Our largest family room, with a full double bed plus a triple bunk — a double below and a single above — a comfortable, practical base for bigger families visiting Blackpool together.",
    amenities: ["1 double bed & 1 triple bunk bed (double & single)", "Freeview television", "Hospitality tray with tea & coffee", "Central heating & free Wi-Fi"],
    images: ["/images/rooms/triple-bunk.jpg"],
  },
];

const galleryImages = [
  ["/images/hotel/exterior.jpg", "Mirage Hotel frontage on Banks Street"],
  ["/images/hotel/lounge.jpg", "Guest lounge with fireplace and TV"],
  ["/images/gallery/gallery-fresh-flowers.jpg", "Fresh flowers welcoming guests at Mirage Hotel"],
  ["/images/rooms/double-sunset.jpg", "Double room with sunset artwork"],
  ["/images/gallery/gallery-plant-display.jpg", "Heart-shaped plant and flower display in the hallway"],
  ["/images/rooms/family-twin-1.jpg", "Family room with two double beds"],
  ["/images/rooms/double-tree-wallpaper.jpg", "Double room with feature wallpaper"],
  ["/images/gallery/gallery-abstract-prints.jpg", "Framed abstract prints in a guest room"],
  ["/images/rooms/double-abstract-headboard.jpg", "Double room headboard detail"],
  ["/images/hotel/detail-hallway-mirror-vases.jpg", "Hallway mirror and vase display"],
  ["/images/gallery/gallery-room-tv.jpg", "Wall-mounted flat-screen TV in a guest room"],
  ["/images/rooms/double-beach.jpg", "Double room with coastal artwork"],
  ["/images/gallery/blackpool-display-wall.jpg", "Framed Blackpool photography inside the hotel"],
  ["/images/hotel/detail-tea-tray.jpg", "In-room tea and coffee tray"],
  ["/images/rooms/double-autumn-ensuite.jpg", "Double room leading to en-suite"],
  ["/images/rooms/tripleroom.jpg", "Triple room with a double bed"],
  ["/images/rooms/family-twin-2.jpg", "Family room, alternate view"],
  ["/images/hotel/detail-sunburst-mirrors.jpg", "Gold sunburst mirror detail"],
  ["/images/gallery/blackpool-landscapes-wall.jpg", "Framed landscape photography in the hallway"],
  ["/images/hotel/detail-mirror-roses.jpg", "Gold mirror with white roses"],
];

const policyItems = [
  { title: "Check-in & check-out", body: "Check-in is from 1:00 PM to 8:00 PM and check-out is by 10:30 AM. If you're planning to arrive outside these hours, let us know when you book and we'll do our best to accommodate you." },
  { title: "Booking & payment", body: "A booking request through this site is a request to reserve, not a confirmed booking. We'll come back to you directly to confirm availability, rates and how to secure payment." },
  { title: "Cancellations & changes", body: "Plans change — please contact us as soon as you can if yours do. We'll always try to be flexible, and full cancellation terms will be confirmed when your booking is secured." },
  { title: "Children & families", body: "Children are very welcome throughout the hotel. Let us know the ages of anyone travelling with you so we can point you to the room that suits your family best." },
  { title: "House policy", body: "Mirage Hotel is a non-smoking property throughout, including e-cigarettes. Please get in touch before booking if you'd like to bring a pet, and we'll let you know what we can arrange." },
];

async function run() {
  console.log(`Seeding project ${projectId} / ${dataset}\n`);

  console.log("Site settings...");
  await client.createOrReplace({
    _id: "siteSettings", _type: "siteSettings",
    name: "Mirage Hotel",
    tagline: "A Blackpool Landmark, Reimagined",
    description: "A 12-room hotel on Blackpool's Banks Street, moments from the Promenade and the Tower — refurbished with a quietly luxurious hand and run with genuine, personal hospitality.",
    phone: "01253 380 654", mobile: "0796 107 5000", email: "mirage.co.uk@gmail.com",
    address: { line1: "21 Banks Street", line2: "Blackpool, FY1 1RN", locality: "Blackpool", region: "Lancashire", postalCode: "FY1 1RN", country: "United Kingdom", countryCode: "GB" },
    coordinates: { lat: 53.8221205, lng: -3.0534256 },
    mapsUrl: "https://maps.app.goo.gl/DZV2q4PnPJD5zWdN7",
    mapsEmbedSrc: "https://www.google.com/maps?q=Mirage+Hotel+LTD,21+Banks+Street,Blackpool,FY1+1RN&z=16&output=embed",
    directBookingDiscount: 10, checkIn: "1:00 PM to 8:00 PM", checkOut: "10:30 AM",
  });

  console.log("Rooms...");
  for (const r of rooms) {
    const images = [];
    for (const p of r.images) images.push(await image(p, r.name));
    await client.createOrReplace({
      _id: `room-${r.slug}`, _type: "room",
      name: r.name, slug: r.slug, order: r.order, sleeps: r.sleeps,
      bedConfig: r.bedConfig, description: r.description, amenities: r.amenities, images,
    });
  }

  console.log("Gallery...");
  const gImages = [];
  for (const [p, alt] of galleryImages) gImages.push(await image(p, alt));
  await client.createOrReplace({ _id: "gallery", _type: "gallery", images: gImages });

  console.log("Policies...");
  await client.createOrReplace({
    _id: "policies", _type: "policies",
    items: policyItems.map((p) => ({ _key: randomUUID(), title: p.title, body: p.body })),
  });

  console.log("Home page...");
  await client.createOrReplace({
    _id: "homePage", _type: "homePage",
    heroTitle: "A Blackpool Landmark, Reimagined",
    heroSubtitle: "Twelve rooms, quietly refurbished, on a doorstep that opens onto everything Blackpool does best.",
    welcomeHeading: "Welcome to Mirage Hotel",
    welcomeBody:
      "Welcome to Mirage Hotel — a newly established, independent hotel in the heart of Blackpool, opened in 2026. Our aim is to give every guest a comfortable, friendly and enjoyable stay in a warm, welcoming atmosphere.\n\n" +
      "We take pride in looking after our guests and paying attention to the small details that make a stay special. From a warm welcome on arrival to helping with anything you may need during your visit, our goal is to make every guest feel comfortable, valued and at home.\n\n" +
      "Whether you're visiting Blackpool for a family holiday, a short break, a weekend away, or to enjoy the many attractions the town has to offer, we look forward to welcoming you to Mirage Hotel.",
    directorName: "Dr. John Najdad",
    directorRole: "Managing Director",
    directorBio:
      "Mirage Hotel is managed by Dr. John Najdad, who brings more than 20 years of experience in the hotel and hospitality business.\n\n" +
      "With many years of experience looking after guests, he understands that good hospitality is about more than simply providing a room. It is about cleanliness, comfort, personal service and making guests feel genuinely welcome.\n\n" +
      "His personal commitment is to build Mirage Hotel into a hotel known for its friendly service, comfortable rooms and attention to guests' needs.",
    directorImage: await singleImage("/images/hotel/director.png", "Dr. John Najdad, Managing Director of Mirage Hotel"),
  });

  console.log("\n✅ Seed complete.");
}

run().catch((err) => {
  console.error("\nSeed failed:", err.message);
  process.exit(1);
});
