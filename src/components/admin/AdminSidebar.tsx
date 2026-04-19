"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Package, 
  LogOut, 
  Menu, 
  X, 
  Library, 
  Video, 
  ShoppingCart 
} from "lucide-react";
import { useState, useEffect } from "react";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/collections", label: "Collections", icon: Library },
  { href: "/admin/media-mentions", label: "Media Mentions", icon: Video },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 left-6 z-[60] p-2 bg-[#2C1810] text-white rounded-md shadow-lg"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-[#2C1810] flex flex-col shrink-0 
          transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="px-6 py-8 border-b border-white/10">
          <p className="text-[#C8862A] text-[10px] font-medium tracking-[0.3em] uppercase mb-1">
            Kashmir Art Factory
          </p>
          <p className="text-white/60 text-xs">Admin Panel</p>
        </div>

        <nav className="flex-1 py-6">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-6 py-3.5 text-sm font-sans transition-colors ${
                  active
                    ? "bg-white/10 text-white border-r-2 border-[#C8862A]"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-6 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-2 py-2 text-sm text-white/60 hover:text-red-400 transition-colors font-sans"
          >
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
