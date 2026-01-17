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

import { Playground } from "@generated/prisma/client";
import { parse } from "csv-parse";
import { createReadStream } from "fs";
import geohash from "ngeohash";
import { getLatestDataFile } from "./utils/file-utils";

export type { Playground };

export async function* getPlaygroundsFromOSM(): AsyncGenerator<Playground> {
  const latestFile = getLatestDataFile("playgrounds");
  console.log(`Loading playgrounds from: ${latestFile}`);

  const parser = createReadStream(latestFile).pipe(
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

/**
 * @deprecated Use PlaygroundRepository instead
 * This function is kept only for backwards compatibility with scripts
 */
