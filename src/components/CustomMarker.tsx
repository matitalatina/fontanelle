"use client";
import { LatLng } from "@/hooks/useLocation";
import { ExtraMarkers, Marker as LMarker } from "leaflet";
import { useRef, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import GoToButton from "./GoToButton";
import SharePositionButton from "./SharePositionButton";

const houseMarker = ExtraMarkers.icon({
  icon: "fa-map-pin",
  markerColor: "purple",
  shape: "circle",
  prefix: "fas",
});

export default function CustomMarker() {
  const [position, setPosition] = useState<LatLng | null>(null);
  const markerRef = useRef<LMarker>(null);

  const setNewMarker = (latLng: LatLng | null) => {
    setPosition(latLng);

    if (latLng === null) {
      return;
    }

    if (
      markerRef.current !== null &&
      markerRef.current.isPopupOpen() === false
    ) {
      markerRef.current.openPopup();
    }
  };

  useMapEvents({
    contextmenu: (event) => {
      setNewMarker(event.latlng);
    },
  });

  if (position === null) {
    return null;
  }

  const eventHandlers = {
    add: () => {
      if (markerRef.current !== null) {
        markerRef.current.openPopup();
      }
    },
  };

  return (
    <Marker
      position={[position.lat, position.lng]}
      icon={houseMarker}
      ref={markerRef}
      eventHandlers={eventHandlers}
    >
      <Popup className="station-popup custom-marker-popup" closeButton={false}>
        <div className="w-full min-w-32 max-w-64 flex flex-col space-y-4">
          <div className="flex flex-col flex-1 space-y-2">
            <div className="text-lg">Punto personalizzato</div>
          </div>
          <div className="flex justify-between flex-row">
            <button
              type="button"
              className="btn btn-error btn-outline"
              onClick={() => setNewMarker(null)}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
            <SharePositionButton
              latLng={{ lat: position.lat, lng: position.lng }}
              markerType="un punto personalizzato"
            />
            <GoToButton latLng={{ lat: position.lat, lng: position.lng }} />
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
