import { LatLng } from "@/hooks/useLocation";
import { differenceInSeconds } from "date-fns";
import { useMap } from "react-leaflet";
import { useEffect } from "react";

export default function MapCenter({
  position,
  updatedAt,
}: {
  position: LatLng;
  updatedAt: Date;
}) {
  const map = useMap();

  useEffect(() => {
    if (
      (map.getCenter().lat === position.lat &&
        map.getCenter().lng === position.lng) ||
      differenceInSeconds(new Date(), updatedAt) > 1
    ) {
      return;
    }

    map.setView([position.lat, position.lng]);
  }, [map, position, updatedAt]);

  return null;
}
