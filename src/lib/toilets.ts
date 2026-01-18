import { Toilet } from "@generated/prisma/client";
import { parse } from "csv-parse";
import { createReadStream } from "fs";
import { getLatestDataFile } from "./utils/file-utils";

export type { Toilet };

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
    }),
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

/**
 * @deprecated Use ToiletRepository instead
 * This function is kept only for backwards compatibility with scripts
 */
