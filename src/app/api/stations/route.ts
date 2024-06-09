import { getStations } from "@/lib/stations";

export async function GET() {
  return Response.json(await getStations());
}
