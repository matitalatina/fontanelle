import { parse } from "csv-parse";
import { createReadStream } from "fs";
import DB from "better-sqlite3";
import path from "path";

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

  for await (const [id, , name, lat, lng] of parser) {
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

    return rows.map((row: unknown) => {
      const typedRow = row as {
        id: number;
        cap: number | null;
        lat: number;
        lng: number;
        name: string | null;
        type: StationType;
        gh5: string;
      };
      return {
        id: typedRow.id,
        cap: typedRow.cap,
        lat: typedRow.lat,
        lng: typedRow.lng,
        name: typedRow.name,
        type: typedRow.type,
        gh5: typedRow.gh5,
      };
    });
  } finally {
    db.close();
  }
}
