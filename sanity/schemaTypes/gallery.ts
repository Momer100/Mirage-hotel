import { defineType, defineField, defineArrayMember } from "sanity";

export const gallery = defineType({
  name: "gallery",
  title: "Gallery",
  type: "document",
  fields: [
    defineField({
      name: "images",
      title: "Gallery photos",
      description: "Drag to reorder. For a tidy grid, keep the count a multiple of 4.",
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
  preview: { prepare: () => ({ title: "Gallery" }) },
});
