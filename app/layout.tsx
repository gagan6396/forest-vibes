import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Forrest Vibes | Luxury Nature Resort & Stay",
  description: " Looking for the best nature retreat? Forrest Vibes offers luxury cottages, organic dining, and scenic forest trails. Perfect for families, couples, and nature lovers.",
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Resort",
  "name": "Forrest Vibes",
  "image": "https://www.forrestvibes.com/logo.png",
  "@id": "https://www.forrestvibes.com",
  "url": "https://www.forrestvibes.com",
  "telephone": "+917500131319",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Khasra No- 51, Moza, PO: Raipur, Bajhet",
    "addressLocality": "Dehradun",
    "addressRegion": "Uttarakhand",
    "postalCode": "248008",
    "addressCountry": "IN",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 30.335520170064303,
    "longitude": 78.10267869140513,
  },
  "openingHours": "Mo-Su 06:00-21:00",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <link rel="canonical" href="https://forrestvibes.com/" />
      </head>
      <body className="min-h-full bg-white flex flex-col">{children}</body>
    </html>
  );
}