/*
[out:csv(::"id", amenity, name, covered, indoor, access, fee, bicycle_parking, surveillance, ::lat, ::lon; true;"|")];
area[name="Segrate"]->.segrate;
area[name="Milano"]->.milano;
(node
  [amenity=bicycle_parking]
  (area.milano);
node
  [amenity=bicycle_parking]
  (area.segrate);
)->.result;
.result
out;
---
[out:csv(::"id", amenity, name, covered, indoor, access, fee, bicycle_parking, surveillance, ::lat, ::lon; true;"|")];
area[name="Italia"]->.italy;
(node
  [amenity=bicycle_parking]
  (area.italy);
)->.result;
.result
out;
*/

import { BicycleParking } from "@generated/prisma/client";
import { parse } from "csv-parse";
import { createReadStream } from "fs";
import { getLatestDataFile } from "./utils/file-utils";

export type { BicycleParking };

export async function* getBicycleParkingsFromOSM(): AsyncGenerator<BicycleParking> {
  const latestFile = getLatestDataFile("bicycleParking");
  console.log(`Loading bicycle parkings from: ${latestFile}`);

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
    covered,
    indoor,
    access,
    fee,
    bicycleParking,
    surveillance,
    capacity,
    lat,
    lng,
  ] of parser) {
    yield {
      id: parseInt(id),
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      covered: covered === "yes" ? true : covered === "no" ? false : null,
      indoor: indoor === "yes" ? true : indoor === "no" ? false : null,
      access: access || null,
      fee: fee === "yes" ? true : fee === "no" ? false : null,
      bicycleParking: bicycleParking || null,
      surveillance:
        surveillance === "yes" ? true : surveillance === "no" ? false : null,
      capacity: capacity ? parseInt(capacity) : null,
      gh5: "",
    };
  }
}

/**
 * @deprecated Use BicycleParkingRepository instead
 * This function is kept only for backwards compatibility with scripts
 */
