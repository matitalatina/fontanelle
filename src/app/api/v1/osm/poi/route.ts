import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createHash } from "node:crypto";
import {
  OSM_SERVER_URL,
  OSM_TOKEN_COOKIE,
  fetchOsmUser,
} from "@/lib/osm/oauth";
import { closeChangeset, createChangeset, createNode } from "@/lib/osm/api";
import { isPoiType } from "@/lib/osm/types";

const RATE_LIMIT = 6;
const RATE_WINDOW_MS = 60_000;

const submissionCounts = new Map<
  string,
  { count: number; windowStart: number }
>();

function isRateLimited(accessToken: string): boolean {
  const key = createHash("sha256").update(accessToken).digest("hex");
  const now = Date.now();
  const entry = submissionCounts.get(key);
  if (!entry || now - entry.windowStart >= RATE_WINDOW_MS) {
    submissionCounts.set(key, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

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

  if (isRateLimited(accessToken)) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const changesetId = await createChangeset(accessToken, type);
    try {
      const nodeId = await createNode(accessToken, changesetId, lat, lng, type);
      return Response.json({
        nodeId,
        changesetId,
        osmUrl: `${OSM_SERVER_URL}/node/${nodeId}`,
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
