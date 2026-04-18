import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json() as {
      name: string; email: string; phone?: string; message: string;
    };

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const { env } = await getCloudflareContext();
    await env.DB.prepare(
      "INSERT INTO contact_messages (id, name, email, phone, message) VALUES (?, ?, ?, ?, ?)"
    )
      .bind(crypto.randomUUID(), name, email, phone || null, message)
      .run();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact submission error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
