import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await req.json() as {
    video_url?: string; title?: string; source?: string; description?: string; sort_order?: number;
  };

  const { env } = await getCloudflareContext({ async: true });
  await env.DB.prepare(
    `UPDATE media_mentions SET
      video_url = COALESCE(?, video_url),
      title = COALESCE(?, title),
      source = COALESCE(?, source),
      description = COALESCE(?, description),
      sort_order = COALESCE(?, sort_order)
    WHERE id = ?`
  )
    .bind(
      body.video_url ?? null, body.title ?? null, body.source ?? null, 
      body.description ?? null, body.sort_order ?? null, id
    )
    .run();

  return NextResponse.json({ success: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const { env } = await getCloudflareContext({ async: true });
  await env.DB.prepare("DELETE FROM media_mentions WHERE id = ?").bind(id).run();
  return NextResponse.json({ success: true });
}
