import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const SITE_URL = "https://kashmirartfactory.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kashmir Art Factory | Handcrafted Kashmiri Woodwork & Art",
    template: "%s | Kashmir Art Factory",
  },
  description:
    "Discover handcrafted Kashmiri woodwork, decorative art, and bespoke home decor. Authentic craftsmanship from the valleys of Kashmir, delivered to discerning homes worldwide.",
  keywords: [
    "Kashmir woodwork",
    "Kashmiri handicrafts",
    "hand-carved wood art",
    "custom woodwork",
    "Islamic calligraphy wall art",
    "walnut wood decor",
    "Kashmir Art Factory",
    "wooden wall art India",
    "personalized wooden gifts",
  ],
  authors: [{ name: "Kashmir Art Factory" }],
  creator: "Kashmir Art Factory",
  openGraph: {
    title: "Kashmir Art Factory | Handcrafted Kashmiri Woodwork & Art",
    description:
      "Handcrafted wooden wall art, Islamic calligraphy, and custom pieces — made by hand in Srinagar, Kashmir.",
    url: SITE_URL,
    siteName: "Kashmir Art Factory",
    images: [
      {
        url: "/assets/mandala.jpg",
        width: 1200,
        height: 630,
        alt: "Layered mandala carved in walnut — Kashmir Art Factory",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kashmir Art Factory | Handcrafted Kashmiri Woodwork & Art",
    description:
      "Handcrafted wooden wall art, Islamic calligraphy, and custom pieces — made by hand in Srinagar, Kashmir.",
    images: ["/assets/mandala.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Kashmir Art Factory",
  description:
    "Handcrafted Kashmiri woodwork — carved engravings, Islamic calligraphy, quote wall art, clocks, and 3D art. Custom orders welcome.",
  url: SITE_URL,
  telephone: "+917006775320",
  email: "kashmirartfactory@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ganderbal",
    addressRegion: "Jammu & Kashmir",
    addressCountry: "IN",
  },
  sameAs: ["https://www.instagram.com/kashmirartfactory"],
  image: `${SITE_URL}/assets/mandala.jpg`,
  priceRange: "₹₹",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans bg-kashmir-cream text-kashmir-walnut">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
