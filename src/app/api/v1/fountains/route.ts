import { NextRequest } from "next/server";
import { serverContainer, SERVER_TYPES } from "@/server/container";
import { IStationRepository } from "@/server/repositories/StationRepository";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const gh5Param = searchParams.get("gh5");

  if (!gh5Param) {
    return Response.json({ error: "Missing gh5 parameter" }, { status: 400 });
  }

  const gh5List = gh5Param.split(",");

  try {
    const stationRepository = serverContainer.get<IStationRepository>(
      SERVER_TYPES.StationRepository,
    );
    const data = await stationRepository.findByGeohashes(gh5List);
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching fountains:", error);
    return Response.json(
      { error: "Failed to fetch fountains" },
      { status: 500 },
    );
  }
}
