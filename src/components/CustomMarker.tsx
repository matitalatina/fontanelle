"use client";
import { LatLng } from "@/hooks/useLocation";
import { ExtraMarkers, Marker as LMarker, icon } from "leaflet";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useEffect, useRef, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import GoToButton from "./GoToButton";

const houseMarker = ExtraMarkers.icon({
  icon: "fa-map-pin",
  markerColor: "purple",
  shape: "circle",
  prefix: "fas",
});

export default function CustomMarker() {
  const [position, setPosition] = useState<LatLng | null>(null);
  useMapEvents({
    contextmenu: (event) => {
      setPosition(event.latlng);
    },
  });
  const markerRef = useRef<LMarker>(null);

  useEffect(() => {
    if (position === null) {
      return;
    }

    if (
      markerRef.current !== null &&
      markerRef.current.isPopupOpen() === false
    ) {
      markerRef.current.openPopup();
    }
  }, [position]);

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
      <Popup className="station-popup" closeButton={false}>
        <div className="w-full min-w-32 max-w-64 flex flex-col space-y-4">
          <div className="flex flex-col flex-1 space-y-2">
            <div className="text-lg">Punto personalizzato</div>
          </div>
          <div className="flex justify-between flex-row">
            <button
              type="button"
              className="btn btn-error btn-outline"
              onClick={() => setPosition(null)}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
            <GoToButton latLng={{ lat: position.lat, lng: position.lng }} />
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
