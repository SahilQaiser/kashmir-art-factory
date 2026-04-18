import { getCloudflareContext } from "@opennextjs/cloudflare";
import OrdersClient from "@/components/admin/OrdersClient";

export const dynamic = "force-dynamic";

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

export default async function OrdersPage() {
  const { env } = await getCloudflareContext();
  const { results } = await env.DB
    .prepare("SELECT * FROM custom_orders ORDER BY created_at DESC")
    .all<CustomOrder>();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-1">Custom Orders</h1>
      <p className="text-gray-500 text-sm mb-6">{results.length} order{results.length !== 1 ? "s" : ""} total</p>
      <OrdersClient orders={results} />
    </div>
  );
}
