"use client";
import { Station, getStations } from "@/lib/stations";
import StationMarker from "./StationMarker";
import MarkerClusterGroup from "./MarkerCluster";

export default function StationMarkers({ stations }: { stations: Station[] }) {
  const markers = stations.map((station) => (
    <StationMarker station={station} key={station.id} />
  ));
  return <MarkerClusterGroup>{markers}</MarkerClusterGroup>;
}
