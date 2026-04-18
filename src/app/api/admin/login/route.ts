import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { createSessionToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json() as { password: string };

    const { env } = await getCloudflareContext();
    if (!env.ADMIN_PASSWORD || password !== env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid password." }, { status: 401 });
    }

    const token = await createSessionToken(env.ADMIN_PASSWORD);
    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
