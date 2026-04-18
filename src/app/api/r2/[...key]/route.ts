import { NextRequest } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const MIME: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  svg: "image/svg+xml",
  avif: "image/avif",
};

export async function GET(_req: NextRequest, { params }: { params: Promise<{ key: string[] }> }) {
  const { key } = await params;
  const objectKey = key.join("/");

  const { env } = await getCloudflareContext();
  if (!env.MEDIA) {
    return new Response("R2 not configured", { status: 500 });
  }

  const object = await env.MEDIA.get(objectKey);
  if (!object) {
    return new Response("Not found", { status: 404 });
  }

  const buffer = await object.arrayBuffer();

  const ext = objectKey.split(".").pop()?.toLowerCase() ?? "";
  const contentType =
    object.httpMetadata?.contentType ||
    MIME[ext] ||
    "image/jpeg";

  return new Response(buffer, {
    status: 200,
    headers: {
      "content-type": contentType,
      "content-length": buffer.byteLength.toString(),
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
}
