import type { Metadata } from "next";

// Self-hosted via @fontsource so the site builds without reaching
// fonts.googleapis.com at build time, and loads faster in production too.
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/playfair-display/800.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500-italic.css";

import "./globals.css";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Toaster } from "@/components/ui/sonner";
import { JsonLd } from "@/components/seo/json-ld";
import { hotelSchema, websiteSchema } from "@/lib/structured-data";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Luxury Boutique Hotel, Blackpool`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  category: "hotel",
  keywords: [
    "Mirage Hotel Blackpool",
    "Blackpool hotel",
    "boutique hotel Blackpool",
    "Banks Street Blackpool hotel",
    "Blackpool accommodation",
    "hotels near Blackpool Tower",
  ],
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    telephone: true,
    email: false,
    address: false,
  },
  openGraph: {
    title: `${siteConfig.name} | Luxury Boutique Hotel, Blackpool`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Luxury Boutique Hotel, Blackpool`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body className="min-h-screen bg-ink text-ivory antialiased font-sans">
        <JsonLd data={hotelSchema} />
        <JsonLd data={websiteSchema} />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  );
}
