import { NextRequest } from "next/server";
import { serverContainer, SERVER_TYPES } from "@/server/container";
import { IToiletRepository } from "@/server/repositories/ToiletRepository";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const gh5Param = searchParams.get("gh5");

  if (!gh5Param) {
    return Response.json({ error: "Missing gh5 parameter" }, { status: 400 });
  }

  const gh5List = gh5Param.split(",");

  try {
    const toiletRepository = serverContainer.get<IToiletRepository>(
      SERVER_TYPES.ToiletRepository
    );
    const data = await toiletRepository.findByGeohashes(gh5List);
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching toilets:", error);
    return Response.json({ error: "Failed to fetch toilets" }, { status: 500 });
  }
}
