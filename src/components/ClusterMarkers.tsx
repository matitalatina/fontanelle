"use client";
import { Station } from "@/lib/stations";
import MarkerClusterGroup from "./MarkerCluster";
import StationMarker from "./StationMarker";
import { Toilet } from "@/lib/toilets";
import ToiletMarker from "./ToiletMarker";

export default function ClusterMarkers({
  stations,
  toilets,
}: {
  stations: Station[];
  toilets: Toilet[];
}) {
  const waters = stations.map((station) => (
    <StationMarker station={station} key={station.id} />
  ));
  const toiletsMarkers = toilets.map((toilet) => (
    <ToiletMarker toilet={toilet} key={toilet.id} />
  ));
  return (
    <MarkerClusterGroup>
      {waters}
      {toiletsMarkers}
    </MarkerClusterGroup>
  );
}
