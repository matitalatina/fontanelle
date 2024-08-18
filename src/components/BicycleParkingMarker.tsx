import { BicycleParking } from "@/lib/bicycleParking";
import { ExtraMarkers } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import FeatureIcon from "./FeatureIcon";
import GoToButton from "./GoToButton";

const bicycleParkingMarker = ExtraMarkers.icon({
  icon: "fa-parking",
  markerColor: "blue",
  shape: "square",
  prefix: "fas",
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
      <Popup className="station-popup" closeButton={false}>
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
          </div>
          <div className="flex flex-row justify-end">
            <GoToButton
              latLng={{ lat: bicycleParking.lat, lng: bicycleParking.lng }}
            />
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
