import { client } from "./client";
import { urlFor } from "./image";
import {
  settingsQuery,
  roomsQuery,
  galleryQuery,
  policiesQuery,
  homePageQuery,
} from "./queries";
import { sanityConfigured } from "../env";
import { siteConfig } from "@/lib/site-config";
import { roomTypes, getRoomBySlug, type RoomType } from "@/lib/rooms";
import { policies as defaultPolicies } from "@/lib/policies";
import { defaultGallery, type GalleryImage } from "@/lib/gallery";

// Query Sanity with a 60s revalidate; returns null (→ fallback) if the CMS
// isn't configured or the request fails, so the site is always robust.
async function sanityFetch<T>(query: string): Promise<T | null> {
  if (!sanityConfigured) return null;
  try {
    return await client.fetch<T>(query, {}, { next: { revalidate: 60 } });
  } catch (err) {
    console.error("[sanity] fetch failed:", (err as Error).message);
    return null;
  }
}

/** UK phone display string → tel: href (leading 0 → +44). */
function ukTel(display: string) {
  const digits = display.replace(/[^\d]/g, "");
  const e164 = digits.startsWith("0") ? "+44" + digits.slice(1) : "+" + digits;
  return `tel:${e164}`;
}

export type Settings = {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  phoneHref: string;
  mobile: string;
  mobileHref: string;
  email: string;
  address: typeof siteConfig.address;
  coordinates: { lat: number; lng: number };
  mapsUrl: string;
  mapsEmbedSrc: string;
  directBookingDiscount: number;
  checkIn: string;
  checkOut: string;
  url: string;
  nav: typeof siteConfig.nav;
};

export async function getSettings(): Promise<Settings> {
  const s = (await sanityFetch<Record<string, unknown>>(settingsQuery)) || {};
  const phone = (s.phone as string) || siteConfig.phone;
  const mobile = (s.mobile as string) || siteConfig.mobile;
  return {
    name: (s.name as string) || siteConfig.name,
    tagline: (s.tagline as string) || siteConfig.tagline,
    description: (s.description as string) || siteConfig.description,
    phone,
    phoneHref: ukTel(phone),
    mobile,
    mobileHref: ukTel(mobile),
    email: (s.email as string) || siteConfig.email,
    address: { ...siteConfig.address, ...((s.address as object) || {}) },
    coordinates: (s.coordinates as Settings["coordinates"]) || siteConfig.coordinates,
    mapsUrl: (s.mapsUrl as string) || siteConfig.mapsUrl,
    mapsEmbedSrc: (s.mapsEmbedSrc as string) || siteConfig.mapsEmbedSrc,
    directBookingDiscount:
      (s.directBookingDiscount as number) ?? siteConfig.directBookingDiscount,
    checkIn: (s.checkIn as string) || siteConfig.checkIn,
    checkOut: (s.checkOut as string) || siteConfig.checkOut,
    url: siteConfig.url,
    nav: siteConfig.nav,
  };
}

type SanityImage = { alt?: string } & Record<string, unknown>;

export async function getRooms(): Promise<RoomType[]> {
  const docs = await sanityFetch<
    (Omit<RoomType, "images"> & { images?: SanityImage[] })[]
  >(roomsQuery);
  if (!docs || docs.length === 0) return roomTypes;
  return docs.map((d) => {
    const images = (d.images || []).map((im) => urlFor(im).width(1600).quality(80).url());
    return {
      slug: d.slug,
      name: d.name,
      sleeps: d.sleeps ?? 0,
      bedConfig: d.bedConfig || "",
      description: d.description || "",
      amenities: d.amenities || [],
      priceFrom: d.priceFrom,
      images: images.length ? images : getRoomBySlug(d.slug)?.images || [],
    };
  });
}

export async function getGallery(): Promise<GalleryImage[]> {
  const d = await sanityFetch<{ images?: SanityImage[] }>(galleryQuery);
  const imgs = d?.images || [];
  if (!imgs.length) return defaultGallery;
  return imgs.map((im) => ({
    src: urlFor(im).width(1200).quality(80).url(),
    alt: im.alt || "",
  }));
}

export async function getPolicies(): Promise<{ title: string; body: string }[]> {
  const d = await sanityFetch<{ items?: { title: string; body: string }[] }>(policiesQuery);
  return d?.items?.length ? d.items : defaultPolicies;
}

const DEFAULT_WELCOME =
  "Welcome to Mirage Hotel — a newly established, independent hotel in the heart of Blackpool, opened in 2026. Our aim is to give every guest a comfortable, friendly and enjoyable stay in a warm, welcoming atmosphere.\n\n" +
  "We take pride in looking after our guests and paying attention to the small details that make a stay special. From a warm welcome on arrival to helping with anything you may need during your visit, our goal is to make every guest feel comfortable, valued and at home.\n\n" +
  "Whether you're visiting Blackpool for a family holiday, a short break, a weekend away, or to enjoy the many attractions the town has to offer, we look forward to welcoming you to Mirage Hotel.";

const DEFAULT_DIRECTOR_BIO =
  "Mirage Hotel is managed by Dr. John Najdad, who brings more than 20 years of experience in the hotel and hospitality business.\n\n" +
  "With many years of experience looking after guests, he understands that good hospitality is about more than simply providing a room. It is about cleanliness, comfort, personal service and making guests feel genuinely welcome.\n\n" +
  "His personal commitment is to build Mirage Hotel into a hotel known for its friendly service, comfortable rooms and attention to guests' needs.";

export type HomeContent = {
  heroTitle: string;
  heroSubtitle: string;
  welcomeHeading: string;
  welcomeBody: string;
  directorName: string;
  directorRole: string;
  directorBio: string;
  directorImage: string;
  directorImageAlt: string;
};

export async function getHomePage(): Promise<HomeContent> {
  const d = (await sanityFetch<Record<string, unknown>>(homePageQuery)) || {};
  const directorImage = d.directorImage as SanityImage | undefined;
  return {
    heroTitle: (d.heroTitle as string) || siteConfig.tagline,
    heroSubtitle:
      (d.heroSubtitle as string) ||
      "Twelve rooms, quietly refurbished, on a doorstep that opens onto everything Blackpool does best.",
    welcomeHeading: (d.welcomeHeading as string) || "Welcome to Mirage Hotel",
    welcomeBody: (d.welcomeBody as string) || DEFAULT_WELCOME,
    directorName: (d.directorName as string) || "Dr. John Najdad",
    directorRole: (d.directorRole as string) || "Managing Director",
    directorBio: (d.directorBio as string) || DEFAULT_DIRECTOR_BIO,
    directorImage: directorImage
      ? urlFor(directorImage).width(1200).quality(85).url()
      : "/images/hotel/director.png",
    directorImageAlt:
      directorImage?.alt || "Dr. John Najdad, Managing Director of Mirage Hotel",
  };
}

/** Split a multi-paragraph text field into paragraphs. */
export function paragraphs(text: string): string[] {
  return text.split(/\n+/).map((p) => p.trim()).filter(Boolean);
}
