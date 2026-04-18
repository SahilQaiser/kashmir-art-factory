import { getCloudflareContext } from "@opennextjs/cloudflare";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const { env } = await getCloudflareContext();

  const [messages, orders, products, collections] = await Promise.all([
    env.DB.prepare("SELECT COUNT(*) as count FROM contact_messages").first<{ count: number }>(),
    env.DB.prepare("SELECT status, COUNT(*) as count FROM custom_orders GROUP BY status").all<{ status: string; count: number }>(),
    env.DB.prepare("SELECT COUNT(*) as count FROM products").first<{ count: number }>(),
    env.DB.prepare("SELECT COUNT(*) as count FROM collections").first<{ count: number }>(),
  ]);

  const ordersByStatus = Object.fromEntries(
    (orders.results ?? []).map((r) => [r.status, r.count])
  );
  const totalOrders = Object.values(ordersByStatus).reduce((a, b) => a + b, 0);

  const stats = [
    { label: "Contact Messages", value: messages?.count ?? 0, href: "/admin/messages", color: "bg-blue-50 border-blue-200" },
    { label: "Total Orders", value: totalOrders, href: "/admin/orders", color: "bg-amber-50 border-amber-200" },
    { label: "Products", value: products?.count ?? 0, href: "/admin/products", color: "bg-green-50 border-green-200" },
    { label: "Collections", value: collections?.count ?? 0, href: "/admin/collections", color: "bg-purple-50 border-purple-200" },
  ];

  const orderStatuses = [
    { key: "new", label: "New", color: "bg-blue-100 text-blue-800" },
    { key: "in_progress", label: "In Progress", color: "bg-yellow-100 text-yellow-800" },
    { key: "completed", label: "Completed", color: "bg-green-100 text-green-800" },
    { key: "rejected", label: "Rejected", color: "bg-red-100 text-red-800" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-1">Dashboard</h1>
      <p className="text-gray-500 text-sm mb-8">Overview of your Kashmir Art Factory admin panel.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <a
            key={s.label}
            href={s.href}
            className={`block border rounded-lg p-5 ${s.color} hover:shadow-sm transition-shadow`}
          >
            <div className="text-3xl font-bold text-gray-900">{s.value}</div>
            <div className="text-sm text-gray-600 mt-1">{s.label}</div>
          </a>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-sm">
        <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Orders by Status</h2>
        <div className="space-y-2">
          {orderStatuses.map(({ key, label, color }) => (
            <div key={key} className="flex items-center justify-between">
              <span className={`text-xs font-medium px-2 py-1 rounded ${color}`}>{label}</span>
              <span className="text-sm font-semibold text-gray-900">{ordersByStatus[key] ?? 0}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
