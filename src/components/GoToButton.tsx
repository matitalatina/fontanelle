import { LatLng } from "@/hooks/useLocation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { useI18n } from "@/i18n/I18nProvider";

export default function GoToButton({ latLng }: { latLng: LatLng }) {
  const t = useI18n();
  return (
    <button
      className="btn btn-primary"
      aria-label={t.common.openInMaps}
      onClick={() =>
        window.open(
          `https://www.google.com/maps/dir/?api=1&destination=${latLng.lat},${latLng.lng}&travelmode=bicycling`,
        )
      }
    >
      <FontAwesomeIcon icon={faLocationArrow} />
    </button>
  );
}
