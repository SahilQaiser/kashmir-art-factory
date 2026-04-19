import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json() as {
    video_url: string; title: string; source: string; description: string; sort_order?: number;
  };

  const { video_url, title, source, description } = body;
  if (!video_url || !title || !source || !description) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const { env } = await getCloudflareContext();
  await env.DB.prepare(
    "INSERT INTO media_mentions (video_url, title, source, description, sort_order) VALUES (?, ?, ?, ?, ?)"
  )
    .bind(video_url, title, source, description, body.sort_order ?? 0)
    .run();

  return NextResponse.json({ success: true });
}
