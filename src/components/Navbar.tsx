"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, ChevronDown } from "lucide-react";

type NavLink = {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
};

const navLinks: NavLink[] = [
  { label: "Collections", href: "/collections" },
  { label: "Custom Orders", href: "/custom-orders" },
  { label: "Craftsmanship", href: "/craftsmanship" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-kashmir-cream/95 backdrop-blur-md shadow-sm border-b border-kashmir-border"
          : "bg-transparent"
        }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span className="font-serif text-xl font-bold tracking-wide text-kashmir-walnut group-hover:text-kashmir-saffron transition-colors">
              Kashmir
            </span>
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-kashmir-muted font-medium">
              Art Factory
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() =>
                  link.dropdown && setOpenDropdown(link.label)
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-sm font-medium text-kashmir-walnut/80 hover:text-kashmir-saffron transition-colors tracking-wide"
                >
                  {link.label}
                  {link.dropdown && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`}
                    />
                  )}
                </Link>

                {link.dropdown && openDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-2 w-52 bg-kashmir-cream border border-kashmir-border rounded-sm shadow-lg overflow-hidden">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-3 text-sm text-kashmir-walnut/80 hover:text-kashmir-saffron hover:bg-kashmir-cream-dark transition-colors border-b border-kashmir-border/50 last:border-0"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              aria-label="Search"
              className="text-kashmir-walnut/70 hover:text-kashmir-saffron transition-colors"
            >
              <Search size={18} />
            </button>
            <Link
              href="/custom-orders"
              className="inline-flex items-center gap-2 bg-kashmir-saffron text-white text-sm font-medium px-5 py-2.5 rounded-sm hover:bg-kashmir-saffron-light transition-colors tracking-wide"
            >
              Request a Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-kashmir-walnut"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-kashmir-cream border-t border-kashmir-border">
          <div className="max-w-7xl mx-auto px-6 py-6 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className="block py-3 text-base font-medium text-kashmir-walnut border-b border-kashmir-border/50"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.dropdown && (
                  <div className="pl-4">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block py-2 text-sm text-kashmir-muted hover:text-kashmir-saffron"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4">
              <Link
                href="/custom-orders"
                className="block text-center bg-kashmir-saffron text-white text-sm font-medium px-5 py-3 rounded-sm"
                onClick={() => setMobileOpen(false)}
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
