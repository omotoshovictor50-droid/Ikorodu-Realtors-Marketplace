import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ikorodu Realtors | Property Marketplace",
  description:
    "Browse houses, apartments, land and commercial property for sale and rent in Ikorodu, Lagos, Nigeria.",
};

// Content-Security-Policy: the browser will only load scripts, images, video and
// connections from these places. (Applied to the live site only, not `npm run dev`.)
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.supabase.co https://images.unsplash.com https://*.tile.openstreetmap.org",
  "media-src 'self' blob: https://*.supabase.co",
  "connect-src 'self' https://*.supabase.co",
  "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
  "font-src 'self' data:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        {process.env.NODE_ENV === "production" && (
          <meta httpEquiv="Content-Security-Policy" content={csp} />
        )}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body className="min-h-full bg-gray-50 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
