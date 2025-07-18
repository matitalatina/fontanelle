import { Toilet } from "@/lib/toilets";
import { ExtraMarkers } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import GoToButton from "./GoToButton";
import FeatureIcon from "./FeatureIcon";
import SharePositionButton from "./SharePositionButton";

const toiletMarker = ExtraMarkers.icon({
  icon: "fa-restroom",
  markerColor: "purple",
  shape: "star",
  prefix: "fas",
});

export default function ToiletMarker({ toilet }: { toilet: Toilet }) {
  return (
    <Marker position={[toilet.lat, toilet.lng]} icon={toiletMarker}>
      <Popup className="station-popup" closeButton={false}>
        <div className="w-full min-w-32 max-w-64 flex flex-col space-y-4">
          <div className="flex flex-col flex-1 space-y-2">
            <div className="text-lg">Toilet</div>
            <div className="flex flex-row space-x-2 items-center min-h-4 text-base">
              <FeatureIcon icon="fas fa-euro-sign" isPresent={toilet.fee} />
              <FeatureIcon
                icon="fas fa-baby"
                isPresent={toilet.changingTable}
              />
            </div>
            {toilet.openingHours && (
              <div className="font-base">{toilet.openingHours}</div>
            )}
          </div>
          <div className="flex flex-row justify-between">
            <SharePositionButton
              latLng={{ lat: toilet.lat, lng: toilet.lng }}
              markerType="un bagno"
            />
            <GoToButton latLng={{ lat: toilet.lat, lng: toilet.lng }} />
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
