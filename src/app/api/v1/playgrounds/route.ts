import { getPlaygroundsFromDB } from "@/lib/playgrounds";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const gh5Param = searchParams.get("gh5");

  if (!gh5Param) {
    return Response.json({ error: "Missing gh5 parameter" }, { status: 400 });
  }

  const gh5List = gh5Param.split(",");

  try {
    const data = await getPlaygroundsFromDB(gh5List);
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching playgrounds:", error);
    return Response.json(
      { error: "Failed to fetch playgrounds" },
      { status: 500 }
    );
  }
}
