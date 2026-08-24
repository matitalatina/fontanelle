import { Toilet } from "@/lib/toilets";
import { Marker, Popup } from "react-leaflet";
import GoToButton from "../GoToButton";
import FeatureIcon from "../FeatureIcon";
import SharePositionButton from "../SharePositionButton";
import { useTranslations } from "next-intl";
import { POI_TYPE_MARKERS } from "./poi-markers";

export default function ToiletMarker({ toilet }: { toilet: Toilet }) {
  const t = useTranslations("app");

  return (
    <Marker position={[toilet.lat, toilet.lng]} icon={POI_TYPE_MARKERS.toilet}>
      <Popup className="station-popup popup-toilet" closeButton={false}>
        <div className="w-full min-w-32 max-w-64 flex flex-col space-y-4">
          <div className="flex flex-col flex-1 space-y-2">
            <div className="text-lg">{t("markerLabels.toilet")}</div>
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
              markerType={t("markerTypes.toilet")}
            />
            <GoToButton latLng={{ lat: toilet.lat, lng: toilet.lng }} />
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
