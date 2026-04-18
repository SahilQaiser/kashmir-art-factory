import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const runtime = "edge";


export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, product_type, description } = await req.json() as {
      name: string; email: string; phone?: string; product_type: string; description: string;
    };

    if (!name || !email || !product_type || !description) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const { env } = await getCloudflareContext();
    await env.DB.prepare(
      "INSERT INTO custom_orders (id, name, email, phone, product_type, description) VALUES (?, ?, ?, ?, ?, ?)"
    )
      .bind(crypto.randomUUID(), name, email, phone || null, product_type, description)
      .run();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Order submission error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
