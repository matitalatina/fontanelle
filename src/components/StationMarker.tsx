"use client";
import { Station } from "@/lib/stations";
import { icon } from "leaflet";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { Marker, Popup } from "react-leaflet";
import { ExtraMarkers } from "leaflet";

const i = icon({
  iconRetinaUrl: iconRetina.src,
  iconUrl: iconMarker.src,
  shadowUrl: iconShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const fountainMarker = ExtraMarkers.icon({
  icon: "fa-faucet-drip",
  markerColor: "green",
  shape: "square",
  prefix: "fas",
});

const houseMarker = ExtraMarkers.icon({
  icon: "fa-faucet-drip",
  markerColor: "blue",
  shape: "square",
  prefix: "fas",
});

export default function StationMarker({ station }: { station: Station }) {
  return (
    <Marker
      position={[station.lat, station.lng]}
      icon={station.type === "fountain" ? fountainMarker : houseMarker}
    >
      <Popup className="station-popup" closeButton={false}>
        <div className="w-full min-w-32 max-w-64 flex flex-col space-y-4">
          <div className="flex flex-col flex-1 space-y-2">
            <div className="text-base">
              {station.type === "fountain" ? "Vedovella" : "Casa dell'acqua"}
            </div>
            <div className="text-sm font-light">{station.name}</div>
          </div>
          <div className="flex flex-row justify-end">
            <button
              className="btn btn-outline btn-primary"
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}&travelmode=bicycling`
                )
              }
            >
              <i className="fas fa-location-arrow"></i>
            </button>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
