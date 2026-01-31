"use client";

import { BicycleParking } from "@/lib/bicycleParking";
import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import FeatureIcon from "../FeatureIcon";
import GoToButton from "../GoToButton";
import SharePositionButton from "../SharePositionButton";
import { createMarkerIconHTML } from "@/lib/marker-icons";
import { faParking, faBicycle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const bicycleParkingMarker = L.ExtraMarkers.icon({
  innerHTML: createMarkerIconHTML(faParking),
  markerColor: "blue",
  shape: "square",
});

export default function BicycleParkingMarker({
  bicycleParking,
}: {
  bicycleParking: BicycleParking;
}) {
  return (
    <Marker
      position={[bicycleParking.lat, bicycleParking.lng]}
      icon={bicycleParkingMarker}
    >
      <Popup className="station-popup popup-bicycle" closeButton={false}>
        <div className="w-full min-w-32 max-w-64 flex flex-col space-y-4">
          <div className="flex flex-col flex-1 space-y-2">
            <div className="text-lg">Parcheggio Bici</div>
            <div className="flex flex-row space-x-2 items-center min-h-4 text-base">
              <FeatureIcon
                icon="fas fa-euro-sign"
                isPresent={bicycleParking.fee}
              />
              <FeatureIcon
                icon="fas fa-umbrella"
                isPresent={bicycleParking.covered}
              />
              <FeatureIcon
                icon="fas fa-house"
                isPresent={bicycleParking.indoor}
              />
              <FeatureIcon
                icon="fas fa-video"
                isPresent={bicycleParking.surveillance}
              />
            </div>
            {bicycleParking.capacity && (
              <div className="items-center text-base">
                <FontAwesomeIcon icon={faBicycle} className="mr-1" />
                {bicycleParking.capacity}{" "}
                {bicycleParking.capacity === 1 ? "posto" : "posti"}
              </div>
            )}
          </div>
          <div className="flex flex-row justify-between">
            <SharePositionButton
              latLng={{ lat: bicycleParking.lat, lng: bicycleParking.lng }}
              markerType="un parcheggio bici"
            />
            <GoToButton
              latLng={{ lat: bicycleParking.lat, lng: bicycleParking.lng }}
            />
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
