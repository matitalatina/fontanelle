import { getBicycleParkingsFromDB } from "@/lib/bicycleParking";
import { getStationsFromDB } from "@/lib/stations";
import { getToiletsFromDB } from "@/lib/toilets";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const gh5Param = searchParams.get("gh5");

  if (!gh5Param) {
    return Response.json({ error: "Missing gh5 parameter" }, { status: 400 });
  }

  const gh5List = gh5Param.split(",");

  try {
    const [stations, toilets, bicycleParkings] = await Promise.all([
      getStationsFromDB(gh5List),
      getToiletsFromDB(gh5List),
      getBicycleParkingsFromDB(gh5List),
    ]);

    return Response.json({
      stations,
      toilets,
      bicycleParkings,
    });
  } catch (error) {
    console.error("Error fetching entities:", error);
    return Response.json(
      { error: "Failed to fetch entities" },
      { status: 500 }
    );
  }
}
