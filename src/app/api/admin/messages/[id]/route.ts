import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const { env } = await getCloudflareContext();
  await env.DB.prepare("DELETE FROM contact_messages WHERE id = ?").bind(id).run();
  return NextResponse.json({ success: true });
}
