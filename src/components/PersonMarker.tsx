"use client";

import { Marker } from "react-leaflet";
import L from "leaflet";
import { createMarkerIconHTML } from "@/lib/marker-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const redMarker = L.ExtraMarkers.icon({
  innerHTML: createMarkerIconHTML(faUser),
  markerColor: "red",
  shape: "square",
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
