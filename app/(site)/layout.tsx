import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Toaster } from "@/components/ui/sonner";
import { JsonLd } from "@/components/seo/json-ld";
import { CookieConsent } from "@/components/site/cookie-consent";
import { hotelSchema, websiteSchema } from "@/lib/structured-data";
import { getSettings } from "@/sanity/lib/data";

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings();
  return (
    <>
      <JsonLd data={hotelSchema} />
      <JsonLd data={websiteSchema} />
      <SiteHeader settings={settings} />
      <main>{children}</main>
      <SiteFooter settings={settings} />
      <Toaster />
      {/* Cookie consent — loads Google Analytics only after acceptance. */}
      <CookieConsent />
    </>
  );
}
