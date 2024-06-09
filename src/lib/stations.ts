import fs from "fs/promises";
import { upperFirst, toLower, startCase, capitalize } from "lodash";

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
  cap: number;
  lat: number;
  lng: number;
  name: string;
  type: StationType;
};

export type StationsResponse = {
  stations: Station[];
};

export async function getStations(): Promise<StationsResponse> {
  // Get json file from db folder
  const fountains = (
    JSON.parse(
      await fs.readFile("db/vedovelle_20240603-002053_final.json", {
        encoding: "utf-8",
      })
    ) as StationRaw[]
  ).map((x) => fromRaw(x, "fountain"));

  const houses = (
    JSON.parse(
      await fs.readFile("db/caseacqua_20240603-002053_final.json", {
        encoding: "utf-8",
      })
    ) as StationRaw[]
  ).map((x) => fromRaw(x, "house"));
  return { stations: [...fountains, ...houses] };
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
