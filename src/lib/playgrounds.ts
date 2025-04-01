// [out:csv(::"id", leisure, name, opening_hours, indoor, fee, supervised, ::lat, ::lon; true;"|")];
// area[name="Italia"]->.italy;
// node
//   [leisure=playground]
//   (area.italy);
// out;

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
  const parser = createReadStream(`db/playgrounds/italy_20250401.csv`).pipe(
    parse({
      delimiter: "|",
      from: 2,
    })
  );

  for await (const [
    id,
    _,
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

    return rows.map((row: any) => ({
      id: row.id,
      lat: row.lat,
      lng: row.lng,
      name: row.name,
      openingHours: row.openingHours,
      indoor: row.indoor,
      fee: row.fee,
      supervised: row.supervised,
      gh5: row.gh5,
    }));
  } finally {
    db.close();
  }
}
