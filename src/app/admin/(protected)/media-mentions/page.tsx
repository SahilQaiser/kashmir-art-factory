import { getCloudflareContext } from "@opennextjs/cloudflare";
import MediaMentionsManager from "@/components/admin/MediaMentionsManager";
import type { MediaMention } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminMediaMentionsPage() {
  const { env } = await getCloudflareContext({ async: true });
  const { results } = await env.DB
    .prepare("SELECT * FROM media_mentions ORDER BY sort_order ASC")
    .all<MediaMention>();

  return <MediaMentionsManager mentions={results} />;
}
