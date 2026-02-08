"use client";
import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import GoToButton from "../GoToButton";
import SharePositionButton from "../SharePositionButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faLocationDot, faSearch } from "@fortawesome/free-solid-svg-icons";
import { createMarkerIconHTML } from "@/lib/marker-icons";

const searchMarkerIcon = L.ExtraMarkers.icon({
  innerHTML: createMarkerIconHTML(faSearch),
  markerColor: "cyan",
  shape: "circle",
});

interface SearchResultMarkerProps {
    position: { lat: number; lng: number };
    displayName: string;
    onClear: () => void;
}

export default function SearchResultMarker({ position, displayName, onClear }: SearchResultMarkerProps) {
  return (
    <Marker
      position={[position.lat, position.lng]}
      icon={searchMarkerIcon}
    >
      <Popup
        className="station-popup custom-marker-popup popup-custom"
        closeButton={false}
      >
        <div className="w-full min-w-32 max-w-64 flex flex-col space-y-4">
          <div className="flex flex-col flex-1 space-y-2">
            <div className="text-lg font-bold">Risultato ricerca</div>
            <div className="text-sm">{displayName}</div>
          </div>
          <div className="flex justify-between flex-row gap-2">
            <button
              type="button"
              className="btn btn-error btn-outline"
              onClick={onClear}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            <SharePositionButton
              latLng={position}
              markerType="un risultato della ricerca"
            />
            <GoToButton latLng={position} />
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
