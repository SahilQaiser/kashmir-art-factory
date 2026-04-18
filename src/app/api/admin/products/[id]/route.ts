import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await req.json() as {
    name?: string; category?: string; description?: string; image?: string;
    tag?: string | null; featured?: number; sort_order?: number;
  };

  const { env } = await getCloudflareContext();
  await env.DB.prepare(
    `UPDATE products SET
      name = COALESCE(?, name),
      category = COALESCE(?, category),
      description = COALESCE(?, description),
      image = COALESCE(?, image),
      tag = ?,
      featured = COALESCE(?, featured),
      sort_order = COALESCE(?, sort_order)
    WHERE id = ?`
  )
    .bind(
      body.name ?? null, body.category ?? null, body.description ?? null, body.image ?? null,
      body.tag !== undefined ? body.tag : null,
      body.featured ?? null, body.sort_order ?? null, id
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
  await env.DB.prepare("DELETE FROM products WHERE id = ?").bind(id).run();
  return NextResponse.json({ success: true });
}
