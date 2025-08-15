/*
[out:csv(::"id", amenity, name, covered, indoor, access, fee, bicycle_parking, surveillance, ::lat, ::lon; true;"|")];
area[name="Segrate"]->.segrate;
area[name="Milano"]->.milano;
(node
  [amenity=bicycle_parking]
  (area.milano);
node
  [amenity=bicycle_parking]
  (area.segrate);
)->.result;
.result
out;
---
[out:csv(::"id", amenity, name, covered, indoor, access, fee, bicycle_parking, surveillance, ::lat, ::lon; true;"|")];
area[name="Italia"]->.italy;
(node
  [amenity=bicycle_parking]
  (area.italy);
)->.result;
.result
out;
*/

import { parse } from "csv-parse";
import { createReadStream } from "fs";
import DB from "better-sqlite3";
import path from "path";
import { getLatestDataFile } from "./utils/file-utils";

export type BicycleParking = {
  id: number;
  lat: number;
  lng: number;
  covered: boolean | null;
  indoor: boolean | null;
  access: string | null;
  fee: boolean | null;
  bicycleParking: string | null;
  surveillance: boolean | null;
  capacity: number | null;
  gh5: string;
};

export async function* getBicycleParkingsFromOSM(): AsyncGenerator<BicycleParking> {
  const latestFile = getLatestDataFile("bicycleParking");
  console.log(`Loading bicycle parkings from: ${latestFile}`);

  const parser = createReadStream(latestFile).pipe(
    parse({
      delimiter: "|",
      from: 2,
      skip_empty_lines: true,
    })
  );
  for await (const [
    id,
    ,
    ,
    covered,
    indoor,
    access,
    fee,
    bicycleParking,
    surveillance,
    capacity,
    lat,
    lng,
  ] of parser) {
    yield {
      id: parseInt(id),
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      covered: covered === "yes" ? true : covered === "no" ? false : null,
      indoor: indoor === "yes" ? true : indoor === "no" ? false : null,
      access: access || null,
      fee: fee === "yes" ? true : fee === "no" ? false : null,
      bicycleParking: bicycleParking || null,
      surveillance:
        surveillance === "yes" ? true : surveillance === "no" ? false : null,
      capacity: capacity ? parseInt(capacity) : null,
      gh5: "",
    };
  }
}

export async function getBicycleParkingsFromDB(
  gh5List: string[]
): Promise<BicycleParking[]> {
  const dbPath = path.join(process.cwd(), "db", "db.db");
  const db = DB(dbPath);

  try {
    const placeholders = gh5List.map(() => "?").join(",");
    const query = `
      SELECT id, lat, lng, covered, indoor, access, fee, bicycleParking, surveillance, capacity, gh5
      FROM bicycle_parkings
      WHERE gh5 IN (${placeholders})
    `;

    const rows = db.prepare(query).all(gh5List);

    return rows.map((row: unknown) => {
      const typedRow = row as {
        id: number;
        lat: number;
        lng: number;
        covered: number;
        indoor: number;
        access: string;
        fee: number;
        bicycleParking: string;
        surveillance: number;
        capacity: number;
        gh5: string;
      };
      return {
        id: typedRow.id,
        lat: typedRow.lat,
        lng: typedRow.lng,
        covered: typedRow.covered === 1,
        indoor: typedRow.indoor === 1,
        access: typedRow.access,
        fee: typedRow.fee === 1,
        bicycleParking: typedRow.bicycleParking,
        surveillance: typedRow.surveillance === 1,
        capacity: typedRow.capacity,
        gh5: typedRow.gh5,
      };
    });
  } finally {
    db.close();
  }
}
