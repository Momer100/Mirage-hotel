import { siteConfig } from "@/lib/site-config";
import { roomTypes } from "@/lib/rooms";
import { policies } from "@/lib/policies";

const url = siteConfig.url;
const hotelId = `${url}/#hotel`;

/** The hotel as a LocalBusiness (Hotel). Rendered site-wide. */
export const hotelSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  "@id": hotelId,
  name: siteConfig.name,
  description: siteConfig.description,
  url,
  telephone: siteConfig.phoneHref.replace("tel:", ""),
  email: siteConfig.email,
  image: `${url}/opengraph-image`,
  logo: `${url}/apple-icon`,
  priceRange: "££",
  currenciesAccepted: "GBP",
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.line1,
    addressLocality: siteConfig.address.locality,
    addressRegion: siteConfig.address.region,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.countryCode,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.coordinates.lat,
    longitude: siteConfig.coordinates.lng,
  },
  hasMap: siteConfig.mapsUrl,
  areaServed: "Blackpool",
  checkinTime: "13:00",
  checkoutTime: "10:30",
  numberOfRooms: 12,
  smokingAllowed: false,
  petsAllowed: "Pets by prior arrangement",
  amenityFeature: [
    "Free Wi-Fi",
    "Freeview television",
    "Tea & coffee hospitality tray",
    "Central heating",
    "Guest lounge",
  ].map((name) => ({
    "@type": "LocationFeatureSpecification",
    name,
    value: true,
  })),
};

/** The website entity, tied to the hotel as publisher. */
export const websiteSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${url}/#website`,
  url,
  name: siteConfig.name,
  inLanguage: "en-GB",
  publisher: { "@id": hotelId },
};

/** BreadcrumbList: Home → …trail. Pass [{ name, path }] excluding Home. */
export function breadcrumbSchema(
  trail: { name: string; path: string }[]
): Record<string, unknown> {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

/** FAQPage built from the hotel policies accordion. */
export const faqSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: policies.map((policy) => ({
    "@type": "Question",
    name: policy.title,
    acceptedAnswer: {
      "@type": "Answer",
      text: policy.body,
    },
  })),
};

/** ItemList of the room types offered. */
export const roomsItemListSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `${siteConfig.name} — Rooms`,
  itemListElement: roomTypes.map((room, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "HotelRoom",
      name: room.name,
      description: room.description,
      url: `${url}/booking?room=${room.slug}`,
      occupancy: {
        "@type": "QuantitativeValue",
        maxValue: room.sleeps,
        unitText: "guests",
      },
      bed: room.bedConfig,
    },
  })),
};
