"use client";
import BicycleParkingMarker from "./BicycleParkingMarker";
import MarkerClusterGroup from "./MarkerCluster";
import StationMarker from "./StationMarker";
import ToiletMarker from "./ToiletMarker";
import PlaygroundMarker from "./PlaygroundMarker";
import { memo } from "react";
import { AvailableOverlay, SelectedOverlays } from "./OverlaySelector";
import useMapEntities from "@/hooks/useMapEntities";

const getSelectedOverlays = (selectedOverlays: SelectedOverlays) =>
  Object.keys(selectedOverlays).filter(
    (key) => selectedOverlays[key as AvailableOverlay]
  ) as AvailableOverlay[];

function ClusterMarkers({
  selectedOverlays,
}: {
  selectedOverlays: SelectedOverlays;
}) {
  // Use the custom hook to manage map entities and fetching
  const { stations, toilets, bicycleParkings, playgrounds } = useMapEntities({
    selectedOverlays: getSelectedOverlays(selectedOverlays),
  });

  const stationsMarkers = stations.map((station) => (
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
  const playgroundsMarkers = playgrounds.map((playground) => (
    <PlaygroundMarker playground={playground} key={playground.id} />
  ));

  return (
    <MarkerClusterGroup>
      {stationsMarkers}
      {toiletsMarkers}
      {bicycleParkingsMarkers}
      {playgroundsMarkers}
    </MarkerClusterGroup>
  );
}

export default memo(ClusterMarkers);
