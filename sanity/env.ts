export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/** True once a real Sanity project is configured; until then the site uses the
 * hardcoded fallbacks in lib/* so it keeps working with no CMS connected. */
export const sanityConfigured = projectId.length > 0;
