import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Hotel name", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "phone", title: "Phone (landline)", type: "string" }),
    defineField({ name: "mobile", title: "Mobile", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({
      name: "address",
      title: "Address",
      type: "object",
      fields: [
        defineField({ name: "line1", title: "Line 1", type: "string" }),
        defineField({ name: "line2", title: "Line 2", type: "string" }),
        defineField({ name: "locality", title: "Town/City", type: "string" }),
        defineField({ name: "region", title: "County/Region", type: "string" }),
        defineField({ name: "postalCode", title: "Postcode", type: "string" }),
        defineField({ name: "country", title: "Country", type: "string" }),
        defineField({ name: "countryCode", title: "Country code (e.g. GB)", type: "string" }),
      ],
    }),
    defineField({
      name: "coordinates",
      title: "Map coordinates",
      type: "object",
      fields: [
        defineField({ name: "lat", title: "Latitude", type: "number" }),
        defineField({ name: "lng", title: "Longitude", type: "number" }),
      ],
    }),
    defineField({ name: "mapsUrl", title: "Google Maps link", type: "url" }),
    defineField({ name: "mapsEmbedSrc", title: "Google Maps embed src", type: "url" }),
    defineField({ name: "directBookingDiscount", title: "Direct booking discount (%)", type: "number" }),
    defineField({ name: "checkIn", title: "Check-in", type: "string" }),
    defineField({ name: "checkOut", title: "Check-out", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
