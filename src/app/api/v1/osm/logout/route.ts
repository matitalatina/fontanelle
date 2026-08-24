import { cookies } from "next/headers";
import { OSM_TOKEN_COOKIE } from "@/lib/osm/oauth";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set(OSM_TOKEN_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 0,
  });
  return Response.json({ ok: true });
}
