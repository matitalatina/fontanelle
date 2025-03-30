import { parse } from "csv-parse";
import { createReadStream } from "fs";
import DB from "better-sqlite3";
import path from "path";

export type Toilet = {
  id: number;
  lat: number;
  lng: number;
  fee: boolean | null;
  openingHours: string | null;
  changingTable: boolean | null;
  gh5: string;
};

/*
[out:csv(::"id", amenity, name, fee, opening_hours, changing_table, ::lat, ::lon; true;"|")];
area[name="Segrate"]->.segrate;
area[name="Milano"]->.milano;
(node
  [amenity=toilets]
  (area.milano);
node
  [amenity=toilets]
  (area.segrate);
)->.result;
.result
out;
---
[out:csv(::"id", amenity, name, fee, opening_hours, changing_table, ::lat, ::lon; true;"|")];
area[name="Italia"]->.italy;
(node
  [amenity=toilets]
  (area.italy);
)->.result;
.result
out;
*/
export async function* getToiletsFromOSM(): AsyncGenerator<Toilet> {
  const parser = createReadStream(`db/toilets/italy_20250330.csv`).pipe(
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
    fee,
    openingHours,
    changingTable,
    lat,
    lng,
  ] of parser) {
    yield {
      id: parseInt(id),
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      fee: fee === "yes" ? true : fee === "no" ? false : null,
      openingHours: openingHours || null,
      changingTable:
        changingTable === "yes" ? true : changingTable === "no" ? false : null,
      gh5: "",
    };
  }
}

export async function getToiletsFromDB(gh5List: string[]): Promise<Toilet[]> {
  const dbPath = path.join(process.cwd(), "db", "db.db");
  const db = DB(dbPath);

  try {
    const placeholders = gh5List.map(() => "?").join(",");
    const query = `
      SELECT id, lat, lng, fee, openingHours, changingTable, gh5
      FROM toilets
      WHERE gh5 IN (${placeholders})
    `;

    const rows = db.prepare(query).all(gh5List);

    return rows.map((row: any) => ({
      id: row.id,
      lat: row.lat,
      lng: row.lng,
      fee: row.fee === 1,
      openingHours: row.openingHours,
      changingTable: row.changingTable === 1,
      gh5: row.gh5,
    }));
  } finally {
    db.close();
  }
}
