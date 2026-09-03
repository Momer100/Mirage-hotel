import { groq } from "next-sanity";

export const settingsQuery = groq`*[_type == "siteSettings"][0]`;

export const roomsQuery = groq`*[_type == "room"] | order(order asc){
  name, slug, order, sleeps, bedConfig, description, priceFrom, amenities,
  images[]{ ..., "alt": coalesce(alt, "") }
}`;

export const galleryQuery = groq`*[_type == "gallery"][0]{
  images[]{ ..., "alt": coalesce(alt, "") }
}`;

export const policiesQuery = groq`*[_type == "policies"][0]{ items[]{ title, body } }`;

export const homePageQuery = groq`*[_type == "homePage"][0]`;
