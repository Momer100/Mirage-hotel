import type { SchemaTypeDefinition } from "sanity";

import { siteSettings } from "./siteSettings";
import { room } from "./room";
import { gallery } from "./gallery";
import { policies } from "./policies";
import { homePage } from "./homePage";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  homePage,
  room,
  gallery,
  policies,
];
