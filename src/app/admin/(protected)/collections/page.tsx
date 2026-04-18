import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { Collection } from "@/lib/types";
import CollectionsManager from "@/components/admin/CollectionsManager";

export const dynamic = "force-dynamic";

export default async function CollectionsPage() {
  const { env } = await getCloudflareContext();
  const { results } = await env.DB
    .prepare("SELECT * FROM collections ORDER BY sort_order")
    .all<Collection>();

  return (
    <div className="p-8">
      <CollectionsManager collections={results} />
    </div>
  );
}
