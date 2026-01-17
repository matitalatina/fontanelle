import { LatLng } from "@/hooks/useLocation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";

export default function GoToButton({ latLng }: { latLng: LatLng }) {
  return (
    <button
      className="btn btn-primary"
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
