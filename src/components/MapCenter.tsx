import { LatLng } from "@/hooks/useLocation";
import { differenceInSeconds } from "date-fns";
import { useMap } from "react-leaflet";

export default function MapCenter({
  position,
  updatedAt,
}: {
  position: LatLng;
  updatedAt: Date;
}) {
  const map = useMap();

  if (
    map.getCenter().equals(position) ||
    differenceInSeconds(new Date(), updatedAt) > 1
  )
    return null;

  map.setView([position.lat, position.lng]);
  return null;
}
