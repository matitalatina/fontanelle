"use client";

import { Marker } from "react-leaflet";
import { ExtraMarkers } from "leaflet";

const redMarker = ExtraMarkers.icon({
  icon: "fa-user",
  markerColor: "red",
  shape: "square",
  prefix: "fas",
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
