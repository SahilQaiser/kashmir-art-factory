import Link from "next/link";
import { ArrowRight, MessageCircle, Pencil, PackageCheck } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    step: "01",
    title: "Tell Us What You Want",
    description:
      "Send us a message — a quote, a name, a design idea, or just a photo of something you like. We'll figure it out together.",
  },
  {
    icon: Pencil,
    step: "02",
    title: "We Design It for You",
    description:
      "We'll send you a preview before we cut anything. You approve it, we make it — no surprises.",
  },
  {
    icon: PackageCheck,
    step: "03",
    title: "Made & Shipped Fast",
    description:
      "Most custom pieces are ready within a few days. We pack carefully and ship to you — wherever you are.",
  },
];

export default function CustomOrderCTA() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
      <div className="bg-kashmir-walnut rounded-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left content */}
          <div className="p-10 md:p-14 flex flex-col justify-center">
            <p className="text-kashmir-saffron text-xs font-medium tracking-[0.3em] uppercase font-sans mb-4">
              Custom Orders
            </p>
            <h2 className="font-serif text-4xl text-kashmir-cream leading-tight mb-5">
              Want Something{" "}
              <em className="not-italic text-kashmir-saffron-light">
                Made Just for You?
              </em>
            </h2>
            <p className="text-kashmir-cream/70 text-base leading-relaxed font-sans mb-8">
              Custom pieces are kind of our favourite thing to make. A name,
              a verse, a memory — we'll turn it into something you can hang
              on your wall. Just reach out and we'll take it from there.
            </p>

            <div className="space-y-5 mb-10">
              {steps.map(({ icon: Icon, step, title, description }) => (
                <div key={step} className="flex gap-4">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full border border-kashmir-saffron/40 flex items-center justify-center">
                    <Icon size={15} className="text-kashmir-saffron" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-kashmir-saffron/60 text-xs font-mono">{step}</span>
                      <h3 className="text-kashmir-cream text-sm font-semibold font-sans">
                        {title}
                      </h3>
                    </div>
                    <p className="text-kashmir-cream/60 text-xs font-sans leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/custom-orders"
              className="inline-flex items-center gap-2 bg-kashmir-saffron text-white text-sm font-medium px-7 py-3.5 rounded-sm hover:bg-kashmir-saffron-light transition-colors tracking-wide self-start"
            >
              Start a Custom Order
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Right: visual panel */}
          <div className="relative hidden lg:block bg-kashmir-walnut-mid">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 10px,
                  rgba(200,134,42,0.3) 10px,
                  rgba(200,134,42,0.3) 11px
                )`,
              }}
            />
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-14 text-center">
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                className="mb-8 opacity-30"
              >
                <circle cx="60" cy="60" r="58" stroke="#C8862A" strokeWidth="1" />
                <circle cx="60" cy="60" r="45" stroke="#C8862A" strokeWidth="0.5" />
                <path
                  d="M60 10 L65 30 L85 20 L75 40 L95 45 L75 50 L85 70 L65 60 L60 80 L55 60 L35 70 L45 50 L25 45 L45 40 L35 20 L55 30 Z"
                  stroke="#C8862A"
                  strokeWidth="0.8"
                  fill="none"
                />
              </svg>
              <p className="font-serif text-2xl text-kashmir-cream/80 italic mb-3">
                &ldquo;No two pieces are the same&rdquo;
              </p>
              <p className="text-kashmir-cream/40 text-xs tracking-widest uppercase font-sans">
                Every order is unique to you
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
