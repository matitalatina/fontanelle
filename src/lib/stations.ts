import { Station, StationType } from "@generated/prisma/client";
import { parse } from "csv-parse";
import { createReadStream } from "fs";
import { getLatestDataFile } from "./utils/file-utils";

export type { Station };

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
  const latestFile = getLatestDataFile("water");
  console.log(`Loading water stations from: ${latestFile}`);
  yield* processCSVFile(latestFile);
}

async function* processCSVFile(filePath: string): AsyncGenerator<Station> {
  const parser = createReadStream(filePath).pipe(
    parse({
      delimiter: "|",
      from: 2,
    }),
  );

  for await (const [id, , name, lat, lng] of parser) {
    yield {
      id: parseInt(id),
      cap: null,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      name: null,
      type:
        name === "Casa dell'Acqua" ? StationType.house : StationType.fountain,
      gh5: "",
    };
  }
}

/**
 * @deprecated Use StationRepository instead
 * This function is kept only for backwards compatibility with scripts
 */
