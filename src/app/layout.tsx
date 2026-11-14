import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ikorodu Realtors | Property Marketplace",
  description:
    "Buy, rent and sell property in Ikorodu, Lagos from verified realtors",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-gray-50 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
