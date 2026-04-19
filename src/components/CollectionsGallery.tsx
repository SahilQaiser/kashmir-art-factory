"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import type { Product } from "@/lib/types";

export default function CollectionsGallery({ products, initialCategory = "All" }: { products: Product[], initialCategory?: string }) {
  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];
  const [active, setActive] = useState(initialCategory);

  const filtered =
    active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <>
      {/* Filter tabs */}
      <div className="sticky top-[72px] z-30 bg-kashmir-cream border-b border-kashmir-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto scrollbar-none py-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`flex-shrink-0 text-xs font-medium tracking-wide uppercase px-4 py-2 transition-all font-sans ${active === cat
                    ? "bg-kashmir-walnut text-kashmir-cream"
                    : "text-kashmir-muted hover:text-kashmir-walnut hover:bg-kashmir-cream-dark"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product count */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-4">
        <p className="text-kashmir-muted text-sm font-sans">
          {filtered.length} piece{filtered.length !== 1 ? "s" : ""}
          {active !== "All" && ` in ${active}`}
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((piece) => (
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
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-kashmir-cream/90 backdrop-blur-sm text-kashmir-muted text-xs font-sans px-2.5 py-1 tracking-wide">
                    {piece.category}
                  </span>
                </div>
                {/* Tag */}
                {piece.tag && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-kashmir-saffron text-white text-xs font-sans px-2.5 py-1 tracking-wide">
                      {piece.tag}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-serif text-lg text-kashmir-walnut leading-snug">
                    {piece.name}
                  </h3>
                  <span className="text-kashmir-muted text-xs font-sans flex-shrink-0 mt-1 opacity-60">
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
      </div>
    </>
  );
}
