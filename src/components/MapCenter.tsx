import { LatLng } from "@/hooks/useLocation";
import { useMap, useMapEvents } from "react-leaflet";

export default function MapCenter({ position }: { position: LatLng }) {
  const map = useMap();

  if (map.getCenter().equals(position)) return null;

  map.setView([position.lat, position.lng]);
  return null;
}
