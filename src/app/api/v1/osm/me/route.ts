import { cookies } from "next/headers";
import { OSM_TOKEN_COOKIE, fetchOsmUser } from "@/lib/osm/oauth";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(OSM_TOKEN_COOKIE)?.value;
  if (!accessToken) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const user = await fetchOsmUser(accessToken);
    return Response.json(user);
  } catch (error) {
    console.error("Failed to fetch OSM user:", error);
    return Response.json({ error: "Invalid session" }, { status: 401 });
  }
}
