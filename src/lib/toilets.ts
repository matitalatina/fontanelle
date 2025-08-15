import { parse } from "csv-parse";
import { createReadStream } from "fs";
import DB from "better-sqlite3";
import path from "path";
import { getLatestDataFile } from "./utils/file-utils";

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
  const latestFile = getLatestDataFile("toilets");
  console.log(`Loading toilets from: ${latestFile}`);

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
    return rows.map((row: unknown) => {
      const typedRow = row as {
        id: number;
        lat: number;
        lng: number;
        fee: number;
        openingHours: string;
        changingTable: number;
        gh5: string;
      };
      return {
        id: typedRow.id,
        lat: typedRow.lat,
        lng: typedRow.lng,
        fee: typedRow.fee === 1,
        openingHours: typedRow.openingHours,
        changingTable: typedRow.changingTable === 1,
        gh5: typedRow.gh5,
      };
    });
  } finally {
    db.close();
  }
}
