import { Playground } from "@/lib/playgrounds";
import { Icon, PinTrianglePanel } from "leaflet-extra-markers";
import { Marker, Popup } from "react-leaflet";
import { createMarkerIconHTML } from "@/lib/marker-icons";
import { faFutbol } from "@fortawesome/free-solid-svg-icons";
import FeatureIcon from "../FeatureIcon";
import SharePositionButton from "../SharePositionButton";
import GoToButton from "../GoToButton";

const playgroundMarker = new Icon({
  contentHtml: createMarkerIconHTML(faFutbol),
  color: "var(--color-playground-content)",
  contentColor: "var(--color-playground)",
  accentColor: "var(--color-playground)",
  svg: PinTrianglePanel,
});

export default function PlaygroundMarker({
  playground,
}: {
  playground: Playground;
}) {
  return (
    <Marker position={[playground.lat, playground.lng]} icon={playgroundMarker}>
      <Popup className="station-popup popup-playground" closeButton={false}>
        <div className="w-full min-w-32 max-w-64 flex flex-col space-y-4">
          <div className="flex flex-col flex-1 space-y-2">
            <div className="text-lg">Parco Giochi</div>
            <div className="flex flex-row space-x-2 items-center min-h-4 text-base">
              <FeatureIcon icon="fas fa-euro-sign" isPresent={playground.fee} />
              <FeatureIcon icon="fas fa-home" isPresent={playground.indoor} />
              <FeatureIcon
                icon="fas fa-user-shield"
                isPresent={playground.supervised}
              />
            </div>
            {playground.name && (
              <div className="font-base">{playground.name}</div>
            )}
            {playground.openingHours && (
              <div className="font-base">{playground.openingHours}</div>
            )}
          </div>
          <div className="flex flex-row justify-between">
            <SharePositionButton
              latLng={{ lat: playground.lat, lng: playground.lng }}
              markerType="un parco giochi"
            />
            <GoToButton latLng={{ lat: playground.lat, lng: playground.lng }} />
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
