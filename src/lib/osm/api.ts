import { OSM_SERVER_URL } from "./oauth";
import { PoiType } from "./types";

const CREATED_BY = "Fontanelle Italia (https://fontanelleitalia.com)";

const POI_TAGS: Record<PoiType, Record<string, string>> = {
  fountain: { amenity: "drinking_water" },
  toilet: { amenity: "toilets" },
  bicycle_parking: { amenity: "bicycle_parking" },
  playground: { leisure: "playground" },
};

const CHANGESET_COMMENTS: Record<PoiType, string> = {
  fountain: "Add drinking fountain",
  toilet: "Add public toilet",
  bicycle_parking: "Add bicycle parking",
  playground: "Add playground",
};

async function osmRequest(
  accessToken: string,
  method: string,
  path: string,
  body: string,
): Promise<string> {
  const response = await fetch(`${OSM_SERVER_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/xml",
    },
    body,
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(
      `OSM API ${method} ${path} failed with status ${response.status}: ${detail}`,
    );
  }
  return response.text();
}

export async function createChangeset(
  accessToken: string,
  poiType: PoiType,
): Promise<number> {
  const body = `<osm><changeset><tag k="created_by" v="${CREATED_BY}"/><tag k="comment" v="${CHANGESET_COMMENTS[poiType]}"/></changeset></osm>`;
  const text = await osmRequest(
    accessToken,
    "PUT",
    "/api/0.6/changeset/create",
    body,
  );
  const changesetId = Number.parseInt(text.trim(), 10);
  if (!Number.isFinite(changesetId)) {
    throw new Error(`Invalid changeset id returned by OSM: ${text}`);
  }
  return changesetId;
}

export async function createNode(
  accessToken: string,
  changesetId: number,
  lat: number,
  lng: number,
  poiType: PoiType,
): Promise<number> {
  const tagsXml = Object.entries(POI_TAGS[poiType])
    .map(([key, value]) => `<tag k="${key}" v="${value}"/>`)
    .join("");
  const body = `<osm><node changeset="${changesetId}" lat="${lat}" lon="${lng}">${tagsXml}</node></osm>`;
  const text = await osmRequest(accessToken, "POST", "/api/0.6/nodes", body);
  const nodeId = Number.parseInt(text.trim(), 10);
  if (!Number.isFinite(nodeId)) {
    throw new Error(`Invalid node id returned by OSM: ${text}`);
  }
  return nodeId;
}

export async function closeChangeset(
  accessToken: string,
  changesetId: number,
): Promise<void> {
  await osmRequest(
    accessToken,
    "PUT",
    `/api/0.6/changeset/${changesetId}/close`,
    "",
  );
}
