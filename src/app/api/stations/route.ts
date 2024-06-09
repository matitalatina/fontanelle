import { getStations, getStationsFromOSM } from "@/lib/stations";

export async function GET() {
  return Response.json(await getStationsFromOSM());
}
