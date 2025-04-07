// [out:csv(::"id", leisure, name, opening_hours, indoor, fee, supervised, ::lat, ::lon; true;"|")];
// area[name="Italia"]->.italy;
// node
//   [leisure=playground]
//   (area.italy);
// out;

// [out:csv(::"id", leisure, name, opening_hours, indoor, fee, supervised, ::lat, ::lon; true;"|")];
// area[name="Italia"]->.italy;
// (
//   node[leisure=playground](area.italy);
//   way[leisure=playground](area.italy);
// );
// out center;

import { parse } from "csv-parse";
import { createReadStream } from "fs";
import geohash from "ngeohash";
import path from "path";
import DB from "better-sqlite3";

export type Playground = {
  id: number;
  name: string | null;
  openingHours: string | null;
  indoor: boolean | null;
  fee: boolean | null;
  supervised: boolean | null;
  lat: number;
  lng: number;
  gh5: string;
};

export async function* getPlaygroundsFromOSM(): AsyncGenerator<Playground> {
  const parser = createReadStream(`db/playgrounds/italy_20250404.csv`).pipe(
    parse({
      delimiter: "|",
      from: 2,
    })
  );

  for await (const [
    id,
    ,
    name,
    openingHours,
    indoor,
    fee,
    supervised,
    lat,
    lng,
  ] of parser) {
    yield {
      id: parseInt(id),
      name,
      openingHours,
      indoor: indoor === "yes",
      fee: fee === "yes",
      supervised: supervised === "yes",
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      gh5: geohash.encode(lat, lng, 5),
    };
  }
}

export async function getPlaygroundsFromDB(
  gh5List: string[]
): Promise<Playground[]> {
  const dbPath = path.join(process.cwd(), "db", "db.db");
  const db = DB(dbPath);

  try {
    const placeholders = gh5List.map(() => "?").join(",");
    const query = `
      SELECT id, lat, lng, name, openingHours, indoor, fee, supervised, gh5
      FROM playgrounds
      WHERE gh5 IN (${placeholders})
    `;

    const rows = db.prepare(query).all(gh5List);

    return rows.map((row: unknown) => {
      const typedRow = row as {
        id: number;
        lat: number;
        lng: number;
        name: string;
        openingHours: string;
        indoor: number;
        fee: number;
        supervised: number;
        gh5: string;
      };
      return {
        id: typedRow.id,
        lat: typedRow.lat,
        lng: typedRow.lng,
        name: typedRow.name,
        openingHours: typedRow.openingHours,
        indoor: typedRow.indoor === 1,
        fee: typedRow.fee === 1,
        supervised: typedRow.supervised === 1,
        gh5: typedRow.gh5,
      };
    });
  } finally {
    db.close();
  }
}
