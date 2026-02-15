"use client";

import { Marker } from "react-leaflet";
import { Icon, PinSquarePanel } from "leaflet-extra-markers";
import { createMarkerIconHTML } from "@/lib/marker-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const redMarker = new Icon({
  contentHtml: createMarkerIconHTML(faUser),
  color: "#a23337",
  svg: PinSquarePanel,
});

export default function PersonMarker({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) {
  return <Marker position={[lat, lng]} icon={redMarker}></Marker>;
}
