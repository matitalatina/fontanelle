export type PoiType = "fountain" | "toilet" | "bicycle_parking" | "playground";

export const POI_TYPES: readonly PoiType[] = [
  "fountain",
  "toilet",
  "bicycle_parking",
  "playground",
];

export function isPoiType(value: unknown): value is PoiType {
  return typeof value === "string" && POI_TYPES.includes(value as PoiType);
}
