import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Kashmir Art Factory — WhatsApp, email, or our contact form. We reply within a few hours.",
  alternates: { canonical: "https://kashmirartfactory.in/contact" },
  openGraph: {
    title: "Contact Kashmir Art Factory",
    description: "WhatsApp, email, or contact form — we usually reply within a few hours.",
    url: "https://kashmirartfactory.in/contact",
  },
};

const contactDetails = [
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+91 7006775320",
    href: "https://wa.me/917006775320",
  },
  {
    icon: Mail,
    label: "Email",
    value: "kashmirartfactory@gmail.com",
    href: "mailto:kashmirartfactory@gmail.com",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@kashmirartfactory",
    href: "https://instagram.com/kashmirartfactory",
  },
  {
    icon: MapPin,
    label: "Workshop",
    value: "Ganderbal, Jammu & Kashmir, India",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">

        {/* Header */}
        <section className="bg-kashmir-walnut text-kashmir-cream py-20">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <p className="text-kashmir-saffron text-xs font-medium tracking-[0.3em] uppercase font-sans mb-4">
              Get in Touch
            </p>
            <h1 className="font-serif text-5xl text-kashmir-cream mb-5 leading-tight">
              We&apos;d Love to{" "}
              <em className="not-italic text-kashmir-saffron-light">Hear from You</em>
            </h1>
            <p className="text-kashmir-cream/70 text-lg font-sans leading-relaxed">
              A question, a custom request, or just want to say hello — we
              usually reply within a few hours.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">

            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="font-serif text-2xl text-kashmir-walnut mb-8">
                Send us a message
              </h2>
              <ContactForm />
            </div>

            {/* Contact info */}
            <div className="lg:col-span-2 space-y-5">
              <h2 className="font-serif text-2xl text-kashmir-walnut mb-8">
                Other ways to reach us
              </h2>
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 p-5 bg-kashmir-cream-dark border border-kashmir-border rounded-sm"
                >
                  <div className="w-10 h-10 bg-kashmir-saffron/10 rounded-sm flex items-center justify-center flex-shrink-0">
                    <Icon size={17} className="text-kashmir-saffron" />
                  </div>
                  <div>
                    <div className="text-xs text-kashmir-muted uppercase tracking-widest font-sans mb-0.5">
                      {label}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-kashmir-walnut text-sm font-sans hover:text-kashmir-saffron transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-kashmir-walnut text-sm font-sans">
                        {value}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              <div className="bg-kashmir-walnut rounded-sm p-6 mt-6">
                <p className="text-kashmir-cream/80 text-sm font-sans leading-relaxed">
                  <span className="text-kashmir-saffron-light font-medium">Fastest response?</span>{" "}
                  WhatsApp us directly — we&apos;re usually online and
                  reply within the hour.
                </p>
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
