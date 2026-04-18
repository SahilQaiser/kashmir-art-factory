import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Collections from "@/components/Collections";
import Craftsmanship from "@/components/Craftsmanship";
import FeaturedPieces from "@/components/FeaturedPieces";
import HeritageBanner from "@/components/HeritageBanner";
import Testimonials from "@/components/Testimonials";
import CustomOrderCTA from "@/components/CustomOrderCTA";
import Footer from "@/components/Footer";

import type { Metadata } from "next";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kashmir Art Factory | Handcrafted Kashmiri Woodwork & Art",
  description:
    "Discover handcrafted Kashmiri woodwork, decorative art, and bespoke home decor. Authentic craftsmanship from the valleys of Kashmir, delivered to discerning homes worldwide.",
  alternates: { canonical: "https://kashmirartfactory.in" },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Collections />
        <Craftsmanship />
        <FeaturedPieces />
        <HeritageBanner />
        <Testimonials />
        <CustomOrderCTA />
      </main>
      <Footer />
    </>
  );
}
