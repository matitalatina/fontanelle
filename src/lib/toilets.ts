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
*/
export async function getToiletsFromOSM(): Promise<Toilet[]> {
  const records: Toilet[] = [];
  const parser = createReadStream(
    `db/toilets/milano-segrate_20240615.csv`
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
    fee,
    openingHours,
    changingTable,
    lat,
    lng,
  ] of parser) {
    records.push({
      id: parseInt(id),
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      fee: fee === "yes" ? true : fee === "no" ? false : null,
      openingHours: openingHours || null,
      changingTable:
        changingTable === "yes" ? true : changingTable === "no" ? false : null,
    });
  }
  return records;
}

export async function getToiletsFromDB(gh5List: string[]): Promise<Toilet[]> {
  const dbPath = path.join(process.cwd(), "db", "db.db");
  const db = DB(dbPath);

  try {
    const placeholders = gh5List.map(() => "?").join(",");
    const query = `
      SELECT id, lat, lng, fee, openingHours, changingTable
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
    }));
  } finally {
    db.close();
  }
}
