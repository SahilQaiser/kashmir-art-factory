import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { Product } from "@/lib/types";

export default async function FeaturedPieces() {
  const { env } = await getCloudflareContext({ async: true });
  const { results } = await env.DB
    .prepare("SELECT * FROM products WHERE featured = 1 ORDER BY sort_order LIMIT 6")
    .all<Product>();

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <p className="text-kashmir-saffron text-xs font-medium tracking-[0.3em] uppercase font-sans mb-3">
            Featured Pieces
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-kashmir-walnut">
            From Our Workshop
          </h2>
        </div>
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 text-kashmir-saffron text-sm font-medium hover:gap-3 transition-all flex-shrink-0"
        >
          View all pieces <ArrowRight size={14} />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((piece) => (
          <div
            key={piece.id}
            className="group bg-white rounded-sm overflow-hidden border border-kashmir-border hover:border-kashmir-border-dark hover:shadow-md transition-all"
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden bg-kashmir-cream-dark">
              <Image
                src={piece.image}
                alt={piece.name}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-kashmir-cream/90 backdrop-blur-sm text-kashmir-muted text-xs font-sans px-2.5 py-1 tracking-wide">
                  {piece.category}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-5">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-serif text-lg text-kashmir-walnut leading-snug">
                  {piece.name}
                </h3>
                <span className="text-kashmir-muted text-xs font-sans flex-shrink-0 mt-1">
                  {piece.id}
                </span>
              </div>
              <p className="text-kashmir-muted text-sm font-sans leading-relaxed mb-4">
                {piece.description}
              </p>
              <Link
                href="/custom-orders"
                className="inline-flex items-center gap-2 text-xs font-medium text-kashmir-saffron hover:text-kashmir-saffron-light transition-colors"
              >
                <MessageCircle size={13} />
                Enquire / Order Custom
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
