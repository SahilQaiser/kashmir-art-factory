import { cookies } from "next/headers";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { verifySessionToken } from "@/lib/auth";

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!token) return false;
  const { env } = await getCloudflareContext();
  if (!env.ADMIN_PASSWORD) return false;
  return verifySessionToken(token, env.ADMIN_PASSWORD);
}
