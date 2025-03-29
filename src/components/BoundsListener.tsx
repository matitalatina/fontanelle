import { useEffect } from "react";
import { LatLngBounds } from "leaflet";
import { useMapEvents } from "react-leaflet";

interface BoundsListenerProps {
  onBoundsChange: (bounds: LatLngBounds, zoom: number) => void;
}

/**
 * Component that tracks map bounds and zoom level changes
 * Calls onBoundsChange callback whenever the map view changes
 */
export default function BoundsListener({
  onBoundsChange,
}: BoundsListenerProps) {
  const map = useMapEvents({
    moveend: () => {
      const currentZoom = map.getZoom();
      onBoundsChange(map.getBounds(), currentZoom);
    },
    zoomend: () => {
      const currentZoom = map.getZoom();
      onBoundsChange(map.getBounds(), currentZoom);
    },
  });

  // Initial bounds notification
  useEffect(() => {
    if (map) {
      const initialZoom = map.getZoom();
      onBoundsChange(map.getBounds(), initialZoom);
    }
  }, [map, onBoundsChange]);

  return null;
}
