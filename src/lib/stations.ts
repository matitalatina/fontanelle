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
  gh5: string;
};

export type StationsResponse = {
  stations: Station[];
};

export async function* getStations(): AsyncGenerator<Station> {
  // // Yield fountains
  // const fountainsData = await fs.readFile(
  //   "db/water/vedovelle_20240603-002053_final.json",
  //   {
  //     encoding: "utf-8",
  //   }
  // );
  // const fountains = JSON.parse(fountainsData) as StationRaw[];
  // for (const fountain of fountains) {
  //   yield fromRaw(fountain, "fountain");
  // }

  // // Yield houses
  // const housesData = await fs.readFile(
  //   "db/water/caseacqua_20240603-002053_final.json",
  //   {
  //     encoding: "utf-8",
  //   }
  // );
  // const houses = JSON.parse(housesData) as StationRaw[];
  // for (const house of houses) {
  //   yield fromRaw(house, "house");
  // }

  // Yield OSM stations
  yield* getStationsFromOSM();
}

/*
https://overpass-turbo.eu/#
[out:csv(::"id", amenity, name, ::lat, ::lon; true;"|")];
area[name="Segrate"]->.segrate;
node
  [amenity=drinking_water]
  (area.segrate);
out;
---
[out:csv(::"id", amenity, name, ::lat, ::lon; true; "|")];
area[name="Italia"]->.italy;
(
  node["amenity"="drinking_water"](area.italy);
  node["man_made"="water_tap"](area.italy);
);
out;
*/

export async function* getStationsFromOSM(): AsyncGenerator<Station> {
  // Process CSV files
  yield* processCSVFile("db/water/italy_20250406.csv");
}

async function* processCSVFile(filePath: string): AsyncGenerator<Station> {
  const parser = createReadStream(filePath).pipe(
    parse({
      delimiter: "|",
      from: 2,
    })
  );

  for await (const [id, amenity, name, lat, lng] of parser) {
    yield {
      id: parseInt(id),
      cap: null,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      name: null,
      type: name === "Casa dell'Acqua" ? "house" : "fountain",
      gh5: "",
    };
  }
}

function fromRaw(raw: StationRaw, type: StationType): Station {
  return {
    id: raw.objectID,
    cap: raw.CAP,
    lat: raw.LAT_Y_4326,
    lng: raw.LONG_X_4326,
    name: raw.NIL.replace(/\w+/g, capitalize),
    type,
    gh5: "",
  };
}

export async function getStationsFromDB(gh5List: string[]): Promise<Station[]> {
  const dbPath = path.join(process.cwd(), "db", "db.db");
  const db = DB(dbPath);

  try {
    const placeholders = gh5List.map(() => "?").join(",");
    const query = `
      SELECT id, cap, lat, lng, name, type, gh5
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
      gh5: row.gh5,
    }));
  } finally {
    db.close();
  }
}
