import { defineType, defineField } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({ name: "heroTitle", title: "Hero heading", type: "string" }),
    defineField({ name: "heroSubtitle", title: "Hero subtitle", type: "text", rows: 2 }),
    defineField({ name: "welcomeHeading", title: "Welcome heading", type: "string" }),
    defineField({
      name: "welcomeBody",
      title: "Welcome text",
      description: "One paragraph per line.",
      type: "text",
      rows: 6,
    }),
    defineField({ name: "directorName", title: "Director name", type: "string" }),
    defineField({ name: "directorRole", title: "Director role", type: "string" }),
    defineField({
      name: "directorBio",
      title: "Director bio",
      description: "One paragraph per line.",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "directorImage",
      title: "Director image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});
