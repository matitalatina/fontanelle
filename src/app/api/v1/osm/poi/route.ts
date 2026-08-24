import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { OSM_TOKEN_COOKIE, fetchOsmUser } from "@/lib/osm/oauth";
import { closeChangeset, createChangeset, createNode } from "@/lib/osm/api";
import { isPoiType } from "@/lib/osm/types";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(OSM_TOKEN_COOKIE)?.value;
  if (!accessToken) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { lat, lng, type } = (body ?? {}) as Record<string, unknown>;

  if (
    typeof lat !== "number" ||
    typeof lng !== "number" ||
    !Number.isFinite(lat) ||
    !Number.isFinite(lng) ||
    lat < -90 ||
    lat > 90 ||
    lng < -180 ||
    lng > 180
  ) {
    return Response.json({ error: "Invalid coordinates" }, { status: 400 });
  }

  if (!isPoiType(type)) {
    return Response.json({ error: "Invalid POI type" }, { status: 400 });
  }

  try {
    await fetchOsmUser(accessToken);
  } catch {
    return Response.json({ error: "Invalid session" }, { status: 401 });
  }

  try {
    const changesetId = await createChangeset(accessToken, type);
    try {
      const nodeId = await createNode(accessToken, changesetId, lat, lng, type);
      return Response.json({
        nodeId,
        changesetId,
        osmUrl: `${process.env.OSM_SERVER_URL?.replace(/\/+$/, "") || "https://www.openstreetmap.org"}/node/${nodeId}`,
      });
    } finally {
      try {
        await closeChangeset(accessToken, changesetId);
      } catch (error) {
        console.error(`Failed to close changeset ${changesetId}:`, error);
      }
    }
  } catch (error) {
    console.error("Failed to create POI on OpenStreetMap:", error);
    return Response.json(
      { error: "Failed to create POI on OpenStreetMap" },
      { status: 502 },
    );
  }
}
