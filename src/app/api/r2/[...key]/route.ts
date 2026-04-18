import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ key: string[] }> }) {
  const { key } = await params;
  const objectKey = key.join("/");

  const { env } = await getCloudflareContext();
  if (!env.MEDIA) {
    return new NextResponse("R2 not configured", { status: 500 });
  }

  const object = await env.MEDIA.get(objectKey);
  if (!object) {
    return new NextResponse("Not found", { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("cache-control", "public, max-age=31536000, immutable");

  return new NextResponse(object.body, { headers });
}
