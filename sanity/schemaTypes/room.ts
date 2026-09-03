import { defineType, defineField, defineArrayMember } from "sanity";

/** Room content is editable, but the slug is limited to the fixed set the
 * booking form + validation depend on (see lib/booking-schema.ts). */
export const room = defineType({
  name: "room",
  title: "Room",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (fixed — do not change)",
      type: "string",
      options: {
        list: [
          { title: "Classic Double (double)", value: "double" },
          { title: "Triple (triple)", value: "triple" },
          { title: "Family — Sleeps 4 (family-4)", value: "family-4" },
          { title: "Family — Sleeps 5 (family-5)", value: "family-5" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
    defineField({ name: "sleeps", title: "Sleeps", type: "number" }),
    defineField({ name: "bedConfig", title: "Bed configuration", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({
      name: "priceFrom",
      title: "Price from (£/night) — leave blank for 'Rates on request'",
      type: "number",
    }),
    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
        }),
      ],
    }),
  ],
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "slug", media: "images.0" },
  },
});
