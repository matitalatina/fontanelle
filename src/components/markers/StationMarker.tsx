"use client";

import { Station } from "@/lib/stations";
import { Marker, Popup } from "react-leaflet";
import { Icon, PinSquarePanel } from "leaflet-extra-markers";
import GoToButton from "../GoToButton";
import SharePositionButton from "../SharePositionButton";
import { createMarkerIconHTML } from "@/lib/marker-icons";
import { faFaucetDrip } from "@fortawesome/free-solid-svg-icons";

const fountainMarker = new Icon({
  contentHtml: createMarkerIconHTML(faFaucetDrip),
  color: "var(--color-fountain-content)",
  contentColor: "var(--color-fountain)",
  accentColor: "var(--color-fountain)",
  svg: PinSquarePanel,
});

const houseMarker = new Icon({
  contentHtml: createMarkerIconHTML(faFaucetDrip),
  color: "var(--color-water-house-content)",
  contentColor: "var(--color-water-house)",
  accentColor: "var(--color-water-house)",
  svg: PinSquarePanel,
});

export default function StationMarker({ station }: { station: Station }) {
  return (
    <Marker
      position={[station.lat, station.lng]}
      icon={station.type === "fountain" ? fountainMarker : houseMarker}
    >
      <Popup
        className={`station-popup ${station.type === "fountain" ? "popup-fountain" : "popup-water-house"}`}
        closeButton={false}
      >
        <div className="w-full min-w-32 max-w-64 flex flex-col space-y-4">
          <div className="flex flex-col flex-1 space-y-2">
            <div className="text-lg">
              {station.type === "fountain" ? "Fontanella" : "Casa dell'acqua"}
            </div>
            {station.name && (
              <div className="text-sm font-light">{station.name}</div>
            )}
          </div>
          <div className="flex flex-row justify-between">
            <SharePositionButton
              latLng={{ lat: station.lat, lng: station.lng }}
              markerType="una fontanella"
            />
            <GoToButton latLng={{ lat: station.lat, lng: station.lng }} />
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
