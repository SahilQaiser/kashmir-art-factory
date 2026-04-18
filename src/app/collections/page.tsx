import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CollectionsGallery from "@/components/CollectionsGallery";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import VideoShowcase from "@/components/VideoShowcase";
import type { Product } from "@/lib/types";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Browse our full range of handcrafted wooden wall art — carved engravings, Islamic calligraphy, quote art, clocks, and 3D sculptures. Made in Kashmir.",
  alternates: { canonical: "https://kashmirartfactory.in/collections" },
  openGraph: {
    title: "Collections — Kashmir Art Factory",
    description: "Carved engravings, Islamic calligraphy, quote art, clocks & 3D sculptures — all handmade in Kashmir.",
    url: "https://kashmirartfactory.in/collections",
    images: [{ url: "/assets/mandala.jpg", width: 1200, height: 630, alt: "Kashmir Art Factory collections" }],
  },
};

export default async function CollectionsPage() {
  const { env } = await getCloudflareContext();
  const { results: products } = await env.DB
    .prepare("SELECT * FROM products ORDER BY sort_order")
    .all<Product>();

  // Build per-category counts dynamically
  const categoryCounts = products.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});

  const stats = Object.entries(categoryCounts).map(([label, count]) => ({
    label,
    count: `${count} ${count === 1 ? "piece" : "pieces"}`,
  }));

  return (
    <>
      <Navbar />
      <main className="pt-20">

        {/* Hero */}
        <section className="bg-kashmir-walnut py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <p className="text-kashmir-saffron text-xs font-medium tracking-[0.3em] uppercase font-sans mb-4">
                  Browse Everything
                </p>
                <h1 className="font-serif text-5xl md:text-6xl text-kashmir-cream leading-tight">
                  Our Collections
                </h1>
                <p className="text-kashmir-cream/60 text-lg font-sans mt-4 max-w-lg leading-relaxed">
                  Handcrafted wooden art from our workshop in Srinagar, Kashmir.
                  Every piece can be customised to order.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link
                  href="/custom-orders"
                  className="inline-flex items-center gap-2 bg-kashmir-saffron text-white text-sm font-medium px-6 py-3.5 hover:bg-kashmir-saffron-light transition-colors"
                >
                  Request a Custom Piece <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Stats row — live counts from DB */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-10 border-t border-kashmir-cream/10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-serif text-2xl text-kashmir-saffron-light mb-1">
                    {stat.count}
                  </div>
                  <div className="text-kashmir-cream/50 text-xs font-sans tracking-wide uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery with filters */}
        <CollectionsGallery products={products} />

        {/* Video showcase */}
        <VideoShowcase />

        {/* Custom order CTA */}
        <section className="bg-kashmir-cream-dark py-16 border-t border-kashmir-border">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <p className="text-kashmir-saffron text-xs font-medium tracking-[0.3em] uppercase font-sans mb-4">
              Don&apos;t see what you need?
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-kashmir-walnut mb-4">
              We&apos;ll Make It for You
            </h2>
            <p className="text-kashmir-muted text-base font-sans mb-8 leading-relaxed">
              Custom sizes, names, quotes, colours — share your idea and we&apos;ll
              design and make it from scratch.
            </p>
            <Link
              href="/custom-orders"
              className="inline-flex items-center gap-2 bg-kashmir-saffron text-white text-sm font-medium px-8 py-4 hover:bg-kashmir-saffron-light transition-colors"
            >
              Start a Custom Order <ArrowRight size={15} />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
