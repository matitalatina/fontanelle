import {
  Icon,
  PinSquarePanel,
  PinStarPanel,
  PinTrianglePanel,
} from "leaflet-extra-markers";
import { createMarkerIconHTML } from "@/lib/marker-icons";
import {
  faFaucetDrip,
  faRestroom,
  faParking,
  faFutbol,
} from "@fortawesome/free-solid-svg-icons";
import type { PoiType } from "@/lib/osm/types";

export const POI_TYPE_MARKERS: Record<PoiType, Icon> = {
  fountain: new Icon({
    contentHtml: createMarkerIconHTML(faFaucetDrip),
    color: "var(--color-fountain-content)",
    contentColor: "var(--color-fountain)",
    accentColor: "var(--color-fountain)",
    svg: PinSquarePanel,
  }),
  toilet: new Icon({
    contentHtml: createMarkerIconHTML(faRestroom),
    color: "var(--color-toilet-content)",
    contentColor: "var(--color-toilet)",
    accentColor: "var(--color-toilet)",
    svg: PinStarPanel,
  }),
  bicycle_parking: new Icon({
    contentHtml: createMarkerIconHTML(faParking),
    color: "var(--color-bicycle-content)",
    contentColor: "var(--color-bicycle)",
    accentColor: "var(--color-bicycle)",
    svg: PinSquarePanel,
  }),
  playground: new Icon({
    contentHtml: createMarkerIconHTML(faFutbol),
    color: "var(--color-playground-content)",
    contentColor: "var(--color-playground)",
    accentColor: "var(--color-playground)",
    svg: PinTrianglePanel,
  }),
};
