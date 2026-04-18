import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json() as {
    slug: string; title: string; description: string; image: string;
    tag?: string | null; piece_count: string; sort_order?: number;
  };

  const { slug, title, description, image, piece_count } = body;
  if (!slug || !title || !description || !image || !piece_count) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const { env } = await getCloudflareContext();
  await env.DB.prepare(
    "INSERT INTO collections (slug, title, description, image, tag, piece_count, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)"
  )
    .bind(slug, title, description, image, body.tag ?? null, piece_count, body.sort_order ?? 0)
    .run();

  return NextResponse.json({ success: true });
}
