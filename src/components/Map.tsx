"use client";

import useLocation from "@/hooks/useLocation";
import useMapEntities from "@/hooks/useMapEntities";
import { BicycleParking } from "@/lib/bicycleParking";
import { Station } from "@/lib/stations";
import { Toilet } from "@/lib/toilets";
import "@fortawesome/fontawesome-free/css/all.css";
import "leaflet";
import "leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css";
import "leaflet-extra-markers/dist/js/leaflet.extra-markers.min.js";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { ScaleControl, ZoomControl } from "react-leaflet";
import ClusterMarkers from "./ClusterMarkers";
import CustomMarker from "./CustomMarker";
import LocateButton from "./LocateButton";
import MapCenter from "./MapCenter";
import OverlaySelector, {
  AvailableOverlay,
  SelectedOverlays,
} from "./OverlaySelector";
import PersonMarker from "./PersonMarker";

/*<TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />*/

const bootstrapDate = new Date();

export default function Map({
  className,
  stations: initialStations,
  children,
  toilets: initialToilets,
  bicycleParkings: initialBicycleParkings,
}: {
  className: string;
  stations: Station[];
  toilets: Toilet[];
  bicycleParkings: BicycleParking[];
  children?: React.ReactNode;
}) {
  const { locationState, getCurrentLocation } = useLocation();
  const center =
    locationState.status == "success"
      ? locationState.location
      : { lat: 45.464664, lng: 9.18854 };
  const updatedAt =
    locationState.status === "success"
      ? locationState.updatedAt
      : bootstrapDate;

  const [selectedOverlays, setSelectedOverlays] = useState<SelectedOverlays>({
    stations: true,
    toilets: false,
    bicycleParkings: false,
  });

  return (
    <>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={16}
        scrollWheelZoom={true}
        wheelDebounceTime={100}
        zoomAnimation={true}
        markerZoomAnimation={true}
        className={`w-full h-full ${className} map-fontanelle`}
        zoomControl={false}
      >
        {children}
        <MapCenter position={center} updatedAt={updatedAt} />
        <TileLayer
          attribution='&copy; <a href="/copyright">OpenStreetMap</a> | <a href="https://www.cyclosm.org" target="_blank">CyclOSM</a>'
          url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
        />
        <ClusterMarkers selectedOverlays={selectedOverlays} />
        {locationState.status === "success" && (
          <PersonMarker
            lat={locationState.location.lat}
            lng={locationState.location.lng}
          />
        )}
        <CustomMarker />
        <OverlaySelector
          selectedOverlays={selectedOverlays}
          onChange={(a) => setSelectedOverlays(a)}
        />
        <LocateButton
          onClick={getCurrentLocation}
          locationState={locationState}
        />
        <ZoomControl position="bottomleft" />
        <ScaleControl position="bottomright" imperial={false} />
      </MapContainer>
    </>
  );
}
