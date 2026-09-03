import type { StructureResolver } from "sanity/structure";

const SINGLETONS: { id: string; type: string; title: string }[] = [
  { id: "siteSettings", type: "siteSettings", title: "Site Settings" },
  { id: "homePage", type: "homePage", title: "Home Page" },
  { id: "gallery", type: "gallery", title: "Gallery" },
  { id: "policies", type: "policies", title: "Policies" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...SINGLETONS.map((s) =>
        S.listItem()
          .title(s.title)
          .id(s.id)
          .child(S.document().schemaType(s.type).documentId(s.id).title(s.title))
      ),
      S.divider(),
      S.documentTypeListItem("room").title("Rooms"),
    ]);
