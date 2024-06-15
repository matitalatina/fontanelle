import { parse } from "csv-parse";
import { createReadStream } from "fs";

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
