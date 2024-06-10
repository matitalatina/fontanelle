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
import StationMarkers from "./StationMarkers";
/*<TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />*/

export default function Map({
  className,
  stations,
  children,
}: {
  className: string;
  stations: Station[];
  children?: React.ReactNode;
}) {
  const { location, getCurrentLocation } = useLocation();
  const center = location ?? { lat: 45.464664, lng: 9.18854 };
  // const center = { lat: 45.464664, lng: 9.18854 };
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
          attribution='&copy; <a href="/copyright">OpenStreetMap contributors</a>. Tiles style by <a href="https://www.cyclosm.org" target="_blank">CyclOSM</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>. <a href="https://wiki.osmfoundation.org/wiki/Terms_of_Use">Website and API terms</a>'
          url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
        />
        <StationMarkers stations={stations} />
        {location && <PersonMarker lat={location.lat} lng={location.lng} />}
        <button
          type="button"
          className="btn btn-circle btn-primary absolute bottom-12 right-4"
          style={{ zIndex: 4000 }}
          onClick={getCurrentLocation}
        >
          <i className="fas fa-location-crosshairs fa-lg"></i>
        </button>
      </MapContainer>
    </>
  );
}
