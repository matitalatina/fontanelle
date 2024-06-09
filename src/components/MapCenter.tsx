import { LatLng } from "@/hooks/useLocation";
import { useMap } from "react-leaflet";

export default function MapCenter({ position }: { position: LatLng }) {
  const map = useMap();
  map.setView([position.lat, position.lng]);
  return null;
}
