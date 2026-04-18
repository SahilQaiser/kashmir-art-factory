import Image from "next/image";
import { Cpu, Hand, Sparkles, Truck } from "lucide-react";

const steps = [
  {
    icon: Cpu,
    title: "Modern Precision",
    description:
      "We use laser cutters and CNC machines to achieve clean, intricate cuts that would take hours by hand alone.",
  },
  {
    icon: Hand,
    title: "Handcrafted Finishing",
    description:
      "Every piece is sanded, assembled, and finished by hand — the machines do the cutting, we do the caring.",
  },
  {
    icon: Sparkles,
    title: "Personalized for You",
    description:
      "Names, quotes, dates, messages — we customize almost anything. Just tell us what you want and we'll make it.",
  },
  {
    icon: Truck,
    title: "Packed & Delivered",
    description:
      "We pack everything carefully and ship worldwide. Most orders are ready within a few days.",
  },
];

export default function Craftsmanship() {
  return (
    <section className="bg-kashmir-cream-dark py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <div className="relative">
            <div className="relative h-[520px] rounded-sm overflow-hidden">
              <Image
                src="/assets/horse_engraving.jpg"
                alt="Detailed horse relief carving — Kashmir Art Factory"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating accent card */}
            <div className="absolute -bottom-6 -right-6 bg-kashmir-walnut text-kashmir-cream p-6 w-52">
              <div className="font-serif text-lg font-bold text-kashmir-saffron-light mb-1">
                Modern + Handmade
              </div>
              <div className="text-xs text-kashmir-cream/70 font-sans leading-relaxed">
                The best of machines and the best of human hands
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <p className="text-kashmir-saffron text-xs font-medium tracking-[0.3em] uppercase font-sans mb-4">
              How We Make It
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-kashmir-walnut leading-tight mb-5">
              Modern Tools,{" "}
              <em className="not-italic text-kashmir-saffron">Handcrafted Heart</em>
            </h2>
            <p className="text-kashmir-muted text-lg leading-relaxed font-sans mb-10">
              We run a hands-on workshop in Kashmir where we combine laser
              precision with careful handwork — so every piece looks sharp
              and feels personal.
            </p>

            <div className="space-y-7">
              {steps.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex gap-5">
                  <div className="flex-shrink-0 w-10 h-10 bg-kashmir-saffron/10 rounded-sm flex items-center justify-center">
                    <Icon size={18} className="text-kashmir-saffron" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-kashmir-walnut mb-1">
                      {title}
                    </h3>
                    <p className="text-kashmir-muted text-sm leading-relaxed font-sans">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
