import { parse } from "csv-parse";
import { createReadStream } from "fs";
import fs from "fs/promises";
import { capitalize } from "lodash";
import DB from "better-sqlite3";
import path from "path";

type StationRaw = {
  objectID: number;
  CAP: number;
  MUNICIPIO: number;
  ID_NIL: number;
  // Nuclei di Identità Locale
  NIL: string;
  LONG_X_4326: number;
  LAT_Y_4326: number;
  Location: string;
};

type StationType = "fountain" | "house";

export type Station = {
  id: number;
  cap: number | null;
  lat: number;
  lng: number;
  name: string | null;
  type: StationType;
};

export type StationsResponse = {
  stations: Station[];
};

export async function getStations(): Promise<StationsResponse> {
  // Get json file from db folder
  const fountains = (
    JSON.parse(
      await fs.readFile("db/water/vedovelle_20240603-002053_final.json", {
        encoding: "utf-8",
      })
    ) as StationRaw[]
  ).map((x) => fromRaw(x, "fountain"));

  const houses = (
    JSON.parse(
      await fs.readFile("db/water/caseacqua_20240603-002053_final.json", {
        encoding: "utf-8",
      })
    ) as StationRaw[]
  ).map((x) => fromRaw(x, "house"));
  const osmStations = await getStationsFromOSM();
  return { stations: [...fountains, ...houses, ...osmStations] };
}

/*
https://overpass-turbo.eu/#
[out:csv(::"id", amenity, name, ::lat, ::lon; true;"|")];
area[name="Segrate"]->.segrate;
node
  [amenity=drinking_water]
  (area.segrate);
out;
*/

export async function getStationsFromOSM(): Promise<Station[]> {
  const records: Station[] = [];
  const parser = createReadStream(`db/water/segrate.csv`).pipe(
    parse({
      delimiter: "|",
      from: 2,
    })
  );
  for await (const [id, amenity, name, lat, lng] of parser) {
    // Work with each record
    records.push({
      id: parseInt(id),
      cap: null,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      name: null,
      type: name === "Casa dell'Acqua" ? "house" : "fountain",
    });
  }
  return records;
}

function fromRaw(raw: StationRaw, type: StationType): Station {
  return {
    id: raw.objectID,
    cap: raw.CAP,
    lat: raw.LAT_Y_4326,
    lng: raw.LONG_X_4326,
    name: raw.NIL.replace(/\w+/g, capitalize),
    type,
  };
}

export async function getStationsFromDB(gh5List: string[]): Promise<Station[]> {
  const dbPath = path.join(process.cwd(), "db", "db.db");
  const db = DB(dbPath);

  try {
    const placeholders = gh5List.map(() => "?").join(",");
    const query = `
      SELECT id, cap, lat, lng, name, type
      FROM stations
      WHERE gh5 IN (${placeholders})
    `;

    const rows = db.prepare(query).all(gh5List);

    return rows.map((row: any) => ({
      id: row.id,
      cap: row.cap,
      lat: row.lat,
      lng: row.lng,
      name: row.name,
      type: row.type,
    }));
  } finally {
    db.close();
  }
}
