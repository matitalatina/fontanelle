"use client";
import { Station } from "@/lib/stations";
import MarkerClusterGroup from "./MarkerCluster";
import StationMarker from "./StationMarker";
import { Toilet } from "@/lib/toilets";
import ToiletMarker from "./ToiletMarker";
import { BicycleParking } from "@/lib/bicycleParking";
import BicycleParkingMarker from "./BicycleParkingMarker";

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
    <>
      <MarkerClusterGroup>
        {waters}
        {toiletsMarkers}
        {bicycleParkingsMarkers}
      </MarkerClusterGroup>
    </>
  );
}
