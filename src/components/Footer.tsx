import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from "lucide-react";

const footerLinks = {
  Collections: [
    { label: "Decorative Pieces", href: "/collections/decorative" },
    { label: "Home Decor", href: "/collections/home-decor" },
    { label: "Wall Art & Panels", href: "/collections/wall-art" },
    { label: "Gift Collections", href: "/collections/gifts" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Craftsmanship", href: "/craftsmanship" },
    { label: "Custom Orders", href: "/custom-orders" },
    { label: "Contact", href: "/contact" },
  ],
  Support: [
    { label: "Shipping & Delivery", href: "/shipping" },
    { label: "Care Instructions", href: "/care" },
    { label: "Returns", href: "/returns" },
    { label: "FAQ", href: "/faq" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-kashmir-walnut text-kashmir-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-16 border-b border-kashmir-walnut-mid">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex flex-col leading-none mb-5 group">
              <span className="font-serif text-2xl font-bold text-kashmir-cream group-hover:text-kashmir-saffron-light transition-colors">
                Kashmir
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-kashmir-cream/50 font-sans">
                Art Factory
              </span>
            </Link>
            <p className="text-kashmir-cream/60 text-sm leading-relaxed font-sans mb-6 max-w-xs">
              Handcrafted Kashmiri woodwork and decorative art. Each piece is
              carved by master artisans in Ganderbal, Kashmir.
            </p>

            {/* Contact */}
            <div className="space-y-2.5 mb-6">
              <a
                href="mailto:kashmirartfactory@gmail.com"
                className="flex items-center gap-2.5 text-kashmir-cream/60 hover:text-kashmir-saffron-light text-sm transition-colors font-sans"
              >
                <Mail size={14} />
                kashmirartfactory@gmail.com
              </a>
              <a
                href="tel:+917006775320"
                className="flex items-center gap-2.5 text-kashmir-cream/60 hover:text-kashmir-saffron-light text-sm transition-colors font-sans"
              >
                <Phone size={14} />
                +91 70067 75320
              </a>
              <div className="flex items-start gap-2.5 text-kashmir-cream/60 text-sm font-sans">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                Ganderbal, Jammu & Kashmir, India
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "https://instagram.com/kashmirartfactory", label: "Instagram" },
                { icon: Facebook, href: "https://www.facebook.com/immyshah888/", label: "Facebook" },
                { icon: Youtube, href: "https://www.youtube.com/@kashmirartfactory", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 border border-kashmir-walnut-mid rounded-sm flex items-center justify-center text-kashmir-cream/50 hover:text-kashmir-saffron-light hover:border-kashmir-saffron/40 transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-kashmir-cream text-xs font-medium tracking-[0.2em] uppercase font-sans mb-4">
                {heading}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-kashmir-cream/55 hover:text-kashmir-saffron-light text-sm font-sans transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6 text-kashmir-cream/40 text-xs font-sans">
          <span>
            &copy; {new Date().getFullYear()} Kashmir Art Factory. All rights
            reserved.
          </span>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-kashmir-saffron-light transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-kashmir-saffron-light transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
