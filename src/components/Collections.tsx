import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { Collection } from "@/lib/types";

export default async function Collections() {
  const { env } = await getCloudflareContext({ async: true });
  const { results } = await env.DB
    .prepare("SELECT * FROM collections ORDER BY sort_order")
    .all<Collection>();

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
      {/* Section header */}
      <div className="text-center mb-14">
        <p className="text-kashmir-saffron text-xs font-medium tracking-[0.3em] uppercase font-sans mb-3">
          Our Collections
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-kashmir-walnut mb-4">
          Something for Every Wall
        </h2>
        <p className="text-kashmir-muted text-lg max-w-xl mx-auto leading-relaxed font-sans">
          From carved engravings to personalized quote frames — browse what
          we make, or tell us what you have in mind.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.map((col, i) => (
          <Link
            key={col.slug}
            href={`/collections/${col.slug}`}
            className={`group relative overflow-hidden rounded-sm bg-kashmir-walnut ${
              i === 0 ? "md:row-span-2" : ""
            }`}
          >
            <div
              className={`relative w-full ${i === 0 ? "h-[500px] md:h-full min-h-[500px]" : "h-72"}`}
            >
              <Image
                src={col.image}
                alt={col.title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-kashmir-walnut/80 via-kashmir-walnut/20 to-transparent" />

              {/* Tag */}
              {col.tag && (
                <span className="absolute top-4 left-4 bg-kashmir-saffron text-white text-xs font-medium px-3 py-1 tracking-wide uppercase font-sans">
                  {col.tag}
                </span>
              )}

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-kashmir-saffron-light/80 text-xs tracking-widest uppercase font-sans mb-1">
                  {col.piece_count}
                </p>
                <h3 className="font-serif text-2xl text-white mb-2">
                  {col.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed font-sans mb-4 max-w-sm">
                  {col.description}
                </p>
                <span className="inline-flex items-center gap-2 text-kashmir-saffron-light text-sm font-medium group-hover:gap-3 transition-all">
                  Explore <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
