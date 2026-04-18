"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, MessageSquare, ShoppingBag, Package, Grid3X3, LogOut } from "lucide-react";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/collections", label: "Collections", icon: Grid3X3 },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <aside className="w-60 bg-[#2C1810] flex flex-col shrink-0 min-h-screen">
      <div className="px-6 py-6 border-b border-white/10">
        <p className="text-[#C8862A] text-[10px] font-medium tracking-[0.3em] uppercase mb-1">
          Kashmir Art Factory
        </p>
        <p className="text-white/60 text-xs">Admin Panel</p>
      </div>

      <nav className="flex-1 py-4">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-sans transition-colors ${
                active
                  ? "bg-white/10 text-white border-r-2 border-[#C8862A]"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-2 py-2 text-sm text-white/60 hover:text-red-400 transition-colors font-sans"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
