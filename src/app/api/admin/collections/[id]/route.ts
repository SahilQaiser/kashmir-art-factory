import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await req.json() as {
    slug?: string; title?: string; description?: string; image?: string;
    tag?: string | null; piece_count?: string; sort_order?: number;
  };

  const { env } = await getCloudflareContext();
  await env.DB.prepare(
    `UPDATE collections SET
      slug = COALESCE(?, slug),
      title = COALESCE(?, title),
      description = COALESCE(?, description),
      image = COALESCE(?, image),
      tag = ?,
      piece_count = COALESCE(?, piece_count),
      sort_order = COALESCE(?, sort_order)
    WHERE id = ?`
  )
    .bind(
      body.slug ?? null, body.title ?? null, body.description ?? null, body.image ?? null,
      body.tag !== undefined ? body.tag : null,
      body.piece_count ?? null, body.sort_order ?? null, id
    )
    .run();

  return NextResponse.json({ success: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const { env } = await getCloudflareContext();
  await env.DB.prepare("DELETE FROM collections WHERE id = ?").bind(id).run();
  return NextResponse.json({ success: true });
}
