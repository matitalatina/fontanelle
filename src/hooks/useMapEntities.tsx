import { useEffect, useMemo, useState } from "react";
import { Station } from "@/lib/stations";
import { Toilet } from "@/lib/toilets";
import { BicycleParking } from "@/lib/bicycleParking";
import { Playground } from "@/lib/playgrounds";
import { AvailableOverlay } from "@/components/OverlaySelector";
import { useMapEvents } from "react-leaflet";
import { IMapEntitiesService } from "@/client/MapEntities.service";
import { container } from "@/client/container";
import { TYPES } from "@/client/types";

interface UseMapEntitiesProps {
  selectedOverlays: AvailableOverlay[];
  mapEntitiesService?: IMapEntitiesService;
}

export default function useMapEntities({
  selectedOverlays,
  mapEntitiesService,
}: UseMapEntitiesProps) {
  // Get the service from the container if not provided (for testing)
  const service = useMemo(
    () =>
      mapEntitiesService ||
      container.get<IMapEntitiesService>(TYPES.MapEntitiesService),
    [mapEntitiesService],
  );

  // State for entities
  const [entities, setEntities] = useState({
    stations: [] as Station[],
    toilets: [] as Toilet[],
    bicycleParkings: [] as BicycleParking[],
    playgrounds: [] as Playground[],
  });

  // Subscribe to visible entities from the service
  useEffect(() => {
    const subscription = service.getVisibleEntities$().subscribe(setEntities);

    return () => {
      subscription.unsubscribe();
    };
  }, [service]);

  // Update service when selectedOverlays changes
  useEffect(() => {
    service.updateSelectedOverlays(selectedOverlays);
  }, [selectedOverlays, service]);

  // Handle map events
  const mapInstance = useMapEvents({
    moveend: () => {
      service.updateMap(mapInstance.getBounds(), mapInstance.getZoom());
    },
    zoomend: () => {
      service.updateMap(mapInstance.getBounds(), mapInstance.getZoom());
    },
    load: () => {
      service.updateMap(mapInstance.getBounds(), mapInstance.getZoom());
    },
  });

  // Initialize map state when ready
  useEffect(() => {
    if (mapInstance) {
      mapInstance.whenReady(() => {
        service.updateMap(mapInstance.getBounds(), mapInstance.getZoom());
      });
    }
  }, [mapInstance, service]);

  return entities;
}
