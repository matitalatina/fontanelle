import { LatLng } from "@/hooks/useLocation";

export default function GoToButton({ latLng }: { latLng: LatLng }) {
  return (
    <button
      className="btn btn-primary"
      onClick={() =>
        window.open(
          `https://www.google.com/maps/dir/?api=1&destination=${latLng.lat},${latLng.lng}&travelmode=bicycling`
        )
      }
    >
      <i className="fas fa-location-arrow"></i>
    </button>
  );
}
