import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const folder = (formData.get("folder") as string | null) ?? "uploads";

  if (!file) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const key = `${folder}/${crypto.randomUUID()}.${ext}`;

  const { env } = await getCloudflareContext();
  if (!env.MEDIA) {
    return NextResponse.json({ error: "R2 bucket not configured." }, { status: 500 });
  }

  await env.MEDIA.put(key, file.stream(), {
    httpMetadata: { contentType: file.type || "image/jpeg" },
  });

  return NextResponse.json({ key, path: `/api/r2/${key}` });
}
