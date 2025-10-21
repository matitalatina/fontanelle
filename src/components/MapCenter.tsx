import { LatLng } from "@/hooks/useLocation";
import { useMap } from "react-leaflet";
import { useEffect } from "react";

export default function MapCenter({ position }: { position: LatLng }) {
  const map = useMap();

  useEffect(() => {
    map.setView([position.lat, position.lng], undefined, {
      animate: true,
      duration: 0.3,
    });
  }, [map, position.lat, position.lng]);

  return null;
}
