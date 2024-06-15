"use client";

import useLocation from "@/hooks/useLocation";
import { Station } from "@/lib/stations";
import "@fortawesome/fontawesome-free/css/all.css";
import "leaflet";
import "leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css";
import "leaflet-extra-markers/dist/js/leaflet.extra-markers.min.js";
import "leaflet/dist/leaflet.css";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import MapCenter from "./MapCenter";
import PersonMarker from "./PersonMarker";
import ClusterMarkers from "./ClusterMarkers";
import LocateButton from "./LocateButton";
import { Toilet } from "@/lib/toilets";
import { BicycleParking } from "@/lib/bicycleParking";
import { useMapEvents } from "react-leaflet";
/*<TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />*/

export default function Map({
  className,
  stations,
  children,
  toilets,
  bicycleParkings,
}: {
  className: string;
  stations: Station[];
  toilets: Toilet[];
  bicycleParkings: BicycleParking[];
  children?: React.ReactNode;
}) {
  const { locationState, getCurrentLocation } = useLocation();
  // const center =
  //   locationState.status == "success"
  //     ? locationState.location
  //     : { lat: 45.464664, lng: 9.18854 };
  const center = { lat: 45.464664, lng: 9.18854 };
  return (
    <>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={16}
        scrollWheelZoom={false}
        className={`w-full h-full ${className}`}
      >
        {children}
        <MapCenter position={center} />
        <TileLayer
          attribution='&copy; <a href="/copyright">OpenStreetMap</a> | <a href="https://www.cyclosm.org" target="_blank">CyclOSM</a>'
          url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
        />
        <ClusterMarkers
          stations={stations}
          toilets={toilets}
          bicycleParkings={bicycleParkings}
        />
        {locationState.status === "success" && (
          <PersonMarker
            lat={locationState.location.lat}
            lng={locationState.location.lng}
          />
        )}
        <LocateButton
          onClick={getCurrentLocation}
          locationState={locationState}
        />
      </MapContainer>
    </>
  );
}
