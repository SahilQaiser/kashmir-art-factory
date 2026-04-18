import { getCloudflareContext } from "@opennextjs/cloudflare";
import MessagesClient from "@/components/admin/MessagesClient";

export const dynamic = "force-dynamic";

interface ContactMessage {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
}

export default async function MessagesPage() {
  const { env } = await getCloudflareContext();
  const { results } = await env.DB
    .prepare("SELECT * FROM contact_messages ORDER BY created_at DESC")
    .all<ContactMessage>();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-1">Contact Messages</h1>
      <p className="text-gray-500 text-sm mb-6">{results.length} message{results.length !== 1 ? "s" : ""} received</p>
      <MessagesClient messages={results} />
    </div>
  );
}
