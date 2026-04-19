import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, Zap, MapPin, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "We're a hands-on workshop in Ganderbal, Kashmir — making hand-crafted wooden wall art, calligraphy, and custom pieces for homes around the world.",
  alternates: { canonical: "https://kashmirartfactory.in/about" },
  openGraph: {
    title: "About Kashmir Art Factory",
    description:
      "A small workshop with a lot of heart — handcrafting wooden art from Ganderbal, Kashmir since day one.",
    url: "https://kashmirartfactory.in/about",
    images: [{ url: "/assets/bismillah2.jpg", width: 1200, height: 630, alt: "Kashmir Art Factory workshop" }],
  },
};

const values = [
  {
    icon: Heart,
    title: "Made with Care",
    description:
      "Every order — big or small — gets our full attention. We take pride in what we make, and we want you to feel that when you hold it.",
  },
  {
    icon: Zap,
    title: "Quality Without the Markup",
    description:
      "Beautiful wooden art shouldn't cost a fortune. We keep our prices fair because we want more people to own something they love.",
  },
  {
    icon: MapPin,
    title: "Proudly from Kashmir",
    description:
      "We're based in Srinagar and every piece that leaves our workshop carries a little bit of Kashmir with it — and we're proud of that.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">

        {/* Hero */}
        <section className="relative bg-kashmir-walnut text-kashmir-cream py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image
              src="/assets/art1.jpg"
              alt=""
              fill
              className="object-cover object-center blur-sm"
              sizes="100vw"
            />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <p className="text-kashmir-saffron text-xs font-medium tracking-[0.3em] uppercase font-sans mb-4">
              Who We Are
            </p>
            <h1 className="font-serif text-5xl md:text-6xl text-kashmir-cream mb-6 leading-tight">
              A Small Workshop.<br />
              <em className="not-italic text-kashmir-saffron-light">A Lot of Heart.</em>
            </h1>
            <p className="text-kashmir-cream/70 text-lg leading-relaxed font-sans">
              We&apos;re Kashmir Art Factory — a hands-on workshop in Srinagar
              making wooden wall art, calligraphy, and custom pieces for people
              all over the world.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-kashmir-saffron text-xs font-medium tracking-[0.3em] uppercase font-sans mb-4">
                Our Story
              </p>
              <h2 className="font-serif text-4xl text-kashmir-walnut mb-6 leading-tight">
                Why We Started
              </h2>
              <div className="space-y-4 text-kashmir-muted text-base leading-relaxed font-sans">
                <p>
                  Kashmir has always been known for its craft — carpets, shawls,
                  woodwork. But a lot of that tradition lives in expensive
                  showrooms or gets watered down for mass production.
                </p>
                <p>
                  We started Kashmir Art Factory because we wanted something
                  different: well-made wooden pieces, at honest prices, that
                  people could actually customize and call their own.
                </p>
                <p>
                  So we set up a workshop in Ganderbal, got our hands on some
                  good machines, and started making things. Bit by bit, order by
                  order, we&apos;ve grown — and the best part of the job is still
                  seeing a finished piece and knowing someone somewhere is going
                  to love having it on their wall.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[480px] rounded-sm overflow-hidden">
                <Image
                  src="/assets/bismillah2.jpg"
                  alt="Kashmir Art Factory — engraved Bismillah plaque"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-kashmir-saffron text-white p-5 w-44">
                <div className="font-serif text-lg font-bold mb-0.5">Srinagar</div>
                <div className="text-xs text-white/80 font-sans leading-relaxed">
                  Our home & workshop, Kashmir
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section className="bg-kashmir-cream-dark py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Image grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { src: "/assets/mandala.jpg", alt: "Layered mandala" },
                  { src: "/assets/horse_engraving.jpg", alt: "Horse relief carving" },
                  { src: "/assets/love.jpg", alt: "Quote wall art" },
                  { src: "/assets/clock2.jpg", alt: "Wooden wall clock" },
                ].map((img) => (
                  <div key={img.src} className="relative h-44 rounded-sm overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover object-center"
                      sizes="25vw"
                    />
                  </div>
                ))}
              </div>

              <div>
                <p className="text-kashmir-saffron text-xs font-medium tracking-[0.3em] uppercase font-sans mb-4">
                  How We Work
                </p>
                <h2 className="font-serif text-4xl text-kashmir-walnut mb-6 leading-tight">
                  Machines & Hands — <em className="not-italic text-kashmir-saffron">Both Matter</em>
                </h2>
                <div className="space-y-4 text-kashmir-muted text-base leading-relaxed font-sans">
                  <p>
                    We use laser cutters and CNC machines for the precision
                    work — the kind of clean lines and fine details that hands
                    alone can&apos;t reliably produce at scale.
                  </p>
                  <p>
                    But every piece still goes through human hands for assembly,
                    sanding, finishing, and quality checking. The machine does
                    the cutting — we do the caring.
                  </p>
                  <p>
                    And when you order something custom, we design it together
                    with you before we cut a single thing. You see it first,
                    you approve it — then we make it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="text-center mb-14">
            <p className="text-kashmir-saffron text-xs font-medium tracking-[0.3em] uppercase font-sans mb-3">
              What We Stand For
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-kashmir-walnut">
              What Guides Everything We Make
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="text-center px-4">
                <div className="w-14 h-14 bg-kashmir-saffron/10 rounded-sm flex items-center justify-center mx-auto mb-5">
                  <Icon size={22} className="text-kashmir-saffron" />
                </div>
                <h3 className="font-serif text-xl text-kashmir-walnut mb-3">{title}</h3>
                <p className="text-kashmir-muted text-sm leading-relaxed font-sans">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-kashmir-cream-dark py-16">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h2 className="font-serif text-3xl text-kashmir-walnut mb-4">
              Want to order something?
            </h2>
            <p className="text-kashmir-muted text-base font-sans mb-8">
              Browse what we&apos;ve already made, or tell us what you have in
              mind and we&apos;ll make it for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 bg-kashmir-saffron text-white text-sm font-medium px-7 py-3.5 rounded-sm hover:bg-kashmir-saffron-light transition-colors"
              >
                See Collections <ArrowRight size={15} />
              </Link>
              <Link
                href="/custom-orders"
                className="inline-flex items-center gap-2 border border-kashmir-walnut/30 text-kashmir-walnut text-sm font-medium px-7 py-3.5 rounded-sm hover:border-kashmir-saffron hover:text-kashmir-saffron transition-colors"
              >
                Custom Order
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
