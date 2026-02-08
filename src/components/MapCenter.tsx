import { LatLng } from "@/hooks/useLocation";
import { useMap } from "react-leaflet";
import { useEffect } from "react";
import { ZOOM_DEFAULT } from "./Map";

export default function MapCenter({ position }: { position: LatLng }) {
  const map = useMap();

  useEffect(() => {
    map.setView([position.lat, position.lng], ZOOM_DEFAULT, {
      animate: true,
      duration: 0.3,
    });
  }, [map, position.lat, position.lng]);

  return null;
}
