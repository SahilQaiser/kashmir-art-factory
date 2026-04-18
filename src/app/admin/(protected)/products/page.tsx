import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { Product } from "@/lib/types";
import ProductsManager from "@/components/admin/ProductsManager";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const { env } = await getCloudflareContext();
  const { results } = await env.DB
    .prepare("SELECT * FROM products ORDER BY sort_order")
    .all<Product>();

  return (
    <div className="p-8">
      <ProductsManager products={results} />
    </div>
  );
}
