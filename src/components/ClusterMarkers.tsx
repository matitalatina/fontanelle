"use client";
import { BicycleParking } from "@/lib/bicycleParking";
import { Station } from "@/lib/stations";
import { Toilet } from "@/lib/toilets";
import BicycleParkingMarker from "./BicycleParkingMarker";
import MarkerClusterGroup from "./MarkerCluster";
import StationMarker from "./StationMarker";
import ToiletMarker from "./ToiletMarker";

export default function ClusterMarkers({
  stations,
  toilets,
  bicycleParkings,
}: {
  stations: Station[];
  toilets: Toilet[];
  bicycleParkings: BicycleParking[];
}) {
  const waters = stations.map((station) => (
    <StationMarker station={station} key={station.id} />
  ));
  const toiletsMarkers = toilets.map((toilet) => (
    <ToiletMarker toilet={toilet} key={toilet.id} />
  ));
  const bicycleParkingsMarkers = bicycleParkings.map((bicycleParking) => (
    <BicycleParkingMarker
      bicycleParking={bicycleParking}
      key={bicycleParking.id}
    />
  ));

  return (
    <MarkerClusterGroup>
      {waters}
      {toiletsMarkers}
      {bicycleParkingsMarkers}
    </MarkerClusterGroup>
  );
}
