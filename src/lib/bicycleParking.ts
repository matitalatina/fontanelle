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
*/

import { parse } from "csv-parse";
import { createReadStream } from "fs";

export type BicycleParking = {
  id: number;
  lat: number;
  lng: number;
  covered: boolean | null;
  indoor: boolean | null;
  access: string | null;
  fee: boolean | null;
  bicycleParking: string | null;
  surveillance: boolean | null;
};

export async function getBicycleParkingsFromOSM(): Promise<BicycleParking[]> {
  const records: BicycleParking[] = [];
  const parser = createReadStream(
    `db/bicycleParking/milano-segrate_20240615.csv`
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
    covered,
    indoor,
    access,
    fee,
    bicycleParking,
    surveillance,
    lat,
    lng,
  ] of parser) {
    records.push({
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
    });
  }
  return records;
}
