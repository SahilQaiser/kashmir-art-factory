import Image from "next/image";
import Link from "next/link";

export default function HeritageBanner() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background */}
      <Image
        src="/assets/mashaallah.jpg"
        alt="Mashaallah engraved walnut plaque"
        fill
        className="object-cover object-center scale-105 blur-[1px]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-kashmir-walnut/80" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
        {/* Ornament */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-kashmir-saffron/60" />
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 2L11.8 7.2H17.6L12.9 10.5L14.7 15.7L10 12.4L5.3 15.7L7.1 10.5L2.4 7.2H8.2L10 2Z"
              fill="#C8862A"
              opacity="0.8"
            />
          </svg>
          <div className="h-px w-16 bg-kashmir-saffron/60" />
        </div>

        <blockquote className="font-serif text-3xl md:text-4xl text-white italic leading-snug mb-6">
          &ldquo;Every piece we make carries a little piece of Kashmir with
          it — and a little piece of you.&rdquo;
        </blockquote>

        <cite className="not-italic text-kashmir-saffron-light text-sm tracking-widest uppercase font-sans block mb-10">
          — Kashmir Art Factory, Ganderbal
        </cite>

        <Link
          href="/custom-orders"
          className="inline-flex items-center gap-2 border border-kashmir-saffron text-kashmir-saffron-light text-sm font-medium px-7 py-3.5 rounded-sm hover:bg-kashmir-saffron hover:text-white transition-colors tracking-wide"
        >
          Start a Custom Order
        </Link>
      </div>
    </section>
  );
}
