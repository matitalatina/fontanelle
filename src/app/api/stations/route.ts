import { getStations } from "@/lib/stations";
import { get } from "http";

export async function GET() {
  return Response.json(await getStations());
}
