import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json() as {
    id: string; name: string; category: string; description: string;
    image: string; tag?: string | null; featured?: number; sort_order?: number;
  };

  const { id, name, category, description, image } = body;
  if (!id || !name || !category || !description || !image) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const { env } = await getCloudflareContext();
  await env.DB.prepare(
    "INSERT INTO products (id, name, category, description, image, tag, featured, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
  )
    .bind(id, name, category, description, image, body.tag ?? null, body.featured ?? 0, body.sort_order ?? 0)
    .run();

  return NextResponse.json({ success: true });
}
