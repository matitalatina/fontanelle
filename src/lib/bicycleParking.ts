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
*/

import { parse } from "csv-parse";
import { createReadStream } from "fs";
import DB from "better-sqlite3";
import path from "path";

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
};

export async function getBicycleParkingsFromOSM(): Promise<BicycleParking[]> {
  const records: BicycleParking[] = [];
  const parser = createReadStream(
    `db/bicycleParking/milano-segrate_20240615.csv`
  ).pipe(
    parse({
      delimiter: "|",
      from: 2,
      skip_empty_lines: true,
    })
  );
  for await (const [
    id,
    amenity,
    name,
    covered,
    indoor,
    access,
    fee,
    bicycleParking,
    surveillance,
    lat,
    lng,
  ] of parser) {
    records.push({
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
    });
  }
  return records;
}

export async function getBicycleParkingsFromDB(
  gh5List: string[]
): Promise<BicycleParking[]> {
  const dbPath = path.join(process.cwd(), "db", "db.db");
  const db = DB(dbPath);

  try {
    const placeholders = gh5List.map(() => "?").join(",");
    const query = `
      SELECT id, lat, lng, covered, indoor, access, fee, bicycleParking, surveillance
      FROM bicycle_parkings
      WHERE gh5 IN (${placeholders})
    `;

    const rows = db.prepare(query).all(gh5List);

    return rows.map((row: any) => ({
      id: row.id,
      lat: row.lat,
      lng: row.lng,
      covered: row.covered === 1,
      indoor: row.indoor === 1,
      access: row.access,
      fee: row.fee === 1,
      bicycleParking: row.bicycleParking,
      surveillance: row.surveillance === 1,
    }));
  } finally {
    db.close();
  }
}
