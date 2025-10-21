"use client";

import useLocation from "@/hooks/useLocation";
import "leaflet";
import "leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css";
import "leaflet-extra-markers/dist/js/leaflet.extra-markers.min.js";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { ScaleControl } from "react-leaflet";
import ClusterMarkers from "./ClusterMarkers";
import CustomMarker from "./CustomMarker";
import LocateButton from "./LocateButton";
import MapCenter from "./MapCenter";
import OverlaySelector, { SelectedOverlays } from "./OverlaySelector";
import PersonMarker from "./PersonMarker";
import { TILE_LAYERS, TileLayerType } from "@/hooks/useTileLayer";

/*<TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />*/

export default function Map({
  className,
  children,
  tileLayer,
}: {
  className: string;
  tileLayer: TileLayerType;
  children?: React.ReactNode;
}) {
  const { locationState, getCurrentLocation } = useLocation();
  const center =
    locationState.status == "success"
      ? locationState.location
      : { lat: 45.464664, lng: 9.18854 };
  const centerNeedsUpdate = locationState.status === "success";

  const [selectedOverlays, setSelectedOverlays] = useState<SelectedOverlays>({
    stations: true,
    toilets: false,
    bicycleParkings: false,
    playgrounds: false,
  });

  const tileLayerConfig = TILE_LAYERS[tileLayer];

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
        {centerNeedsUpdate && <MapCenter position={center} />}
        <TileLayer
          attribution={tileLayerConfig.attribution}
          url={tileLayerConfig.url}
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
        <ScaleControl position="bottomright" imperial={false} />
      </MapContainer>
    </>
  );
}
