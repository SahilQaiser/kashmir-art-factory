import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { isAdminAuthenticated } from "@/lib/adminAuth";

const VALID_STATUSES = ["new", "in_progress", "completed", "rejected"];

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const { status } = await req.json() as { status: string };

  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const { env } = await getCloudflareContext();
  await env.DB.prepare("UPDATE custom_orders SET status = ? WHERE id = ?").bind(status, id).run();
  return NextResponse.json({ success: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const { env } = await getCloudflareContext();
  await env.DB.prepare("DELETE FROM custom_orders WHERE id = ?").bind(id).run();
  return NextResponse.json({ success: true });
}
