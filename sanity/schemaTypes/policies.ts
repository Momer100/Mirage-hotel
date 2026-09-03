import { defineType, defineField, defineArrayMember } from "sanity";

export const policies = defineType({
  name: "policies",
  title: "Policies",
  type: "document",
  fields: [
    defineField({
      name: "items",
      title: "Policies",
      description: "Drag to reorder.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Policies" }) },
});
