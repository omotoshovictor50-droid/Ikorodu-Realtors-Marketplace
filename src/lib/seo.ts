import type { Metadata } from "next";

export const SITE_URL = "https://ikorodurealtors.com";
export const SITE_NAME = "Ikorodu Realtors";
export const SITE_TITLE = "Ikorodu Realtors | Property Marketplace in Ikorodu, Lagos";
export const SITE_DESCRIPTION =
  "Browse houses, apartments, land and commercial property for sale and rent in Ikorodu, Lagos.";

const image = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Ikorodu Realtors - Discover, Connect, Own",
};

// Link-preview tags (WhatsApp, Facebook, X...) for a page at `path`.
export const share = (path: string, title = SITE_TITLE): Pick<Metadata, "openGraph" | "twitter" | "alternates"> => ({
  alternates: { canonical: path },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title,
    description: SITE_DESCRIPTION,
    url: path,
    locale: "en_NG",
    images: [image],
  },
  twitter: { card: "summary_large_image", title, description: SITE_DESCRIPTION, images: [image.url] },
});

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      alternateName: "Ikorodu Realtors Marketplace",
      inLanguage: "en-NG",
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/icon-192.png`,
      contactPoint: { "@type": "ContactPoint", telephone: "+234-913-925-5152", contactType: "customer service", areaServed: "NG" },
    },
  ],
};
