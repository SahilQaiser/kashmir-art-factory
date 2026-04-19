"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";

interface CustomOrder {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  product_type: string;
  description: string;
  status: string;
}

const STATUS_OPTIONS = ["new", "in_progress", "completed", "rejected"] as const;

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  in_progress: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

export default function OrdersClient({ orders: initial }: { orders: CustomOrder[] }) {
  const router = useRouter();
  const [orders, setOrders] = useState(initial);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  async function handleStatusChange(id: string, status: string) {
    setUpdating(id);
    await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    setUpdating(null);
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this order permanently?")) return;
    await fetch(`/api/admin/orders/${id}`, { method: "DELETE" });
    setOrders((prev) => prev.filter((o) => o.id !== id));
    router.refresh();
  }

  if (orders.length === 0) {
    return <p className="text-gray-500 text-sm">No orders yet.</p>;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
      <table className="w-full text-sm min-w-[1000px]">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Product Type</th>
            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.map((order) => (
            <>
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                  {new Date(order.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  <div>{order.name}</div>
                  {order.phone && <div className="text-xs text-gray-500">{order.phone}</div>}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  <a href={`mailto:${order.email}`} className="hover:text-blue-600">{order.email}</a>
                </td>
                <td className="px-4 py-3 text-gray-700">{order.product_type}</td>
                <td className="px-4 py-3 max-w-xs">
                  <button
                    onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                    className="flex items-center gap-1 text-gray-600 hover:text-gray-900 text-left"
                  >
                    <span className="truncate max-w-[180px]">{order.description}</span>
                    {expanded === order.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={order.status}
                    disabled={updating === order.id}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className={`text-xs font-medium px-2 py-1 rounded border-0 cursor-pointer focus:outline-none ${STATUS_COLORS[order.status] ?? "bg-gray-100 text-gray-800"}`}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s.replace("_", " ")}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
              {expanded === order.id && (
                <tr key={`${order.id}-expanded`} className="bg-amber-50">
                  <td colSpan={7} className="px-4 py-3 text-sm text-gray-700 whitespace-pre-wrap">{order.description}</td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
