import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[680px] flex items-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/assets/mandala.jpg"
        alt="Layered mandala wood art by Kashmir Art Factory"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-kashmir-walnut/85 via-kashmir-walnut/55 to-transparent" />
      <div className="absolute inset-0 bg-kashmir-walnut/15" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-kashmir-saffron" />
            <span className="text-kashmir-saffron-light text-xs font-medium tracking-[0.3em] uppercase font-sans">
              Handmade in Srinagar, Kashmir
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
            Art Made in Kashmir,{" "}
            <em className="not-italic text-kashmir-saffron-light">
              Made for You
            </em>
          </h1>

          {/* Subheadline */}
          <p className="text-white/75 text-lg md:text-xl leading-relaxed mb-10 max-w-lg font-sans font-light">
            We&apos;re a small workshop in Srinagar — we create personalized
            wooden wall art, calligraphy, and decorative pieces using modern
            precision and a whole lot of care.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 bg-kashmir-saffron text-white font-medium px-7 py-3.5 rounded-sm hover:bg-kashmir-saffron-light transition-colors text-sm tracking-wide"
            >
              Explore Collections
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/custom-orders"
              className="inline-flex items-center gap-2 border border-white/60 text-white font-medium px-7 py-3.5 rounded-sm hover:border-white hover:bg-white/10 transition-colors text-sm tracking-wide"
            >
              Order Something Custom
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-kashmir-cream to-transparent" />

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs tracking-widest uppercase font-sans">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
