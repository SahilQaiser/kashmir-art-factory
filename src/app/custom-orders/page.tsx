import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomOrderForm from "@/components/CustomOrderForm";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Custom Orders",
  description:
    "Order a custom wooden piece — your text, your design, your size. We design it with you first, then make it. Fast turnaround, worldwide shipping.",
  alternates: { canonical: "https://kashmirartfactory.in/custom-orders" },
  openGraph: {
    title: "Custom Orders — Kashmir Art Factory",
    description: "Tell us what you want and we'll make it. Custom sizes, names, quotes — handcrafted in Kashmir.",
    url: "https://kashmirartfactory.in/custom-orders",
  },
};

const whats_included = [
  "A design preview before we cut anything",
  "Revisions until you're happy",
  "Careful packing and worldwide shipping",
  "Fast turnaround — most orders within a few days",
];

export default function CustomOrdersPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">

        {/* Header */}
        <section className="bg-kashmir-walnut text-kashmir-cream py-20">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <p className="text-kashmir-saffron text-xs font-medium tracking-[0.3em] uppercase font-sans mb-4">
              Custom Orders
            </p>
            <h1 className="font-serif text-5xl md:text-6xl text-kashmir-cream mb-5 leading-tight">
              Let&apos;s Make Something{" "}
              <em className="not-italic text-kashmir-saffron-light">Just for You</em>
            </h1>
            <p className="text-kashmir-cream/70 text-lg font-sans leading-relaxed">
              Fill in the form below and we&apos;ll get back to you — usually
              within a few hours.
            </p>
          </div>
        </section>

        {/* Form + sidebar */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">

            {/* Form */}
            <div className="lg:col-span-2">
              <CustomOrderForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="bg-kashmir-cream-dark rounded-sm p-7 border border-kashmir-border">
                <h3 className="font-serif text-xl text-kashmir-walnut mb-5">
                  Every custom order includes
                </h3>
                <ul className="space-y-3">
                  {whats_included.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2
                        size={16}
                        className="text-kashmir-saffron mt-0.5 flex-shrink-0"
                      />
                      <span className="text-kashmir-muted text-sm font-sans leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-kashmir-walnut rounded-sm p-7">
                <h3 className="font-serif text-xl text-kashmir-cream mb-3">
                  Prefer to WhatsApp us?
                </h3>
                <p className="text-kashmir-cream/60 text-sm font-sans leading-relaxed mb-5">
                  If it&apos;s easier, just send us a message on WhatsApp and
                  we&apos;ll sort it out from there.
                </p>
                <a
                  href="https://wa.me/917006775320?text=Hi%2C%20I%27d%20like%20to%20place%20a%20custom%20order"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-kashmir-saffron text-white text-sm font-medium px-5 py-3 rounded-sm hover:bg-kashmir-saffron-light transition-colors w-full justify-center"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
