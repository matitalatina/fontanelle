import { useCallback, useEffect, useMemo, useState } from "react";
import { LatLngBounds } from "leaflet";
import geohash from "ngeohash";
import { Station } from "@/lib/stations";
import { Toilet } from "@/lib/toilets";
import { BicycleParking } from "@/lib/bicycleParking";
import {
  AvailableOverlay,
  SelectedOverlays,
} from "@/components/OverlaySelector";
import { useMapEvents } from "react-leaflet";

// Generate geohashes for a bounding box
function getBoundingBoxGeohashes(
  bounds: LatLngBounds,
  precision = 5
): string[] {
  const geohashes = new Set<string>();

  const ghs = geohash.bboxes(
    bounds.getSouthWest().lat,
    bounds.getSouthWest().lng,
    bounds.getNorthEast().lat,
    bounds.getNorthEast().lng,
    precision
  );
  ghs.forEach((gh) => geohashes.add(gh));
  return Array.from(geohashes);
}

// Debounce function
function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return function (...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

// Interface for entity cache
interface EntityCache {
  stations: Record<string, Station[]>;
  toilets: Record<string, Toilet[]>;
  bicycleParkings: Record<string, BicycleParking[]>;
}

interface UseMapEntitiesProps {
  selectedOverlays: AvailableOverlay[];
}

export default function useMapEntities({
  selectedOverlays,
}: UseMapEntitiesProps) {
  // State for entities
  const [stations, setStations] = useState<Station[]>([]);
  const [toilets, setToilets] = useState<Toilet[]>([]);
  const [bicycleParkings, setBicycleParkings] = useState<BicycleParking[]>([]);

  // Cache for already fetched geohashes and their associated overlays
  const [requestedGeohashes, setRequestedGeohashes] = useState<
    Map<string, string[]>
  >(new Map());
  const [entitiesCache, setEntitiesCache] = useState<EntityCache>({
    stations: {},
    toilets: {},
    bicycleParkings: {},
  });

  // Function to fetch data for specific geohashes and overlays
  const fetchDataForGeohashes = useCallback(
    async (geohashes: string[], overlays: string[]) => {
      if (geohashes.length === 0 || overlays.length === 0) return;

      try {
        // Fetch data for new geohashes with selected overlays
        const response = await fetch(
          `/api/v1/entities?gh5=${geohashes.join(",")}&overlays=${overlays.join(
            ","
          )}`
        );

        if (!response.ok) {
          console.error("Failed to fetch entities:", await response.text());
          return;
        }

        const data = await response.json();

        // Create new caches for each entity type
        const newStationsCache: Record<string, Station[]> = {};
        const newToiletsCache: Record<string, Toilet[]> = {};
        const newBicycleParkingsCache: Record<string, BicycleParking[]> = {};

        // Group entities by geohash
        geohashes.forEach((gh) => {
          if (overlays.includes("stations")) {
            newStationsCache[gh] = data.stations.filter(
              (s: Station) => s.gh5 === gh
            );
          }

          if (overlays.includes("toilets")) {
            newToiletsCache[gh] = data.toilets.filter(
              (t: Toilet) => t.gh5 === gh
            );
          }

          if (overlays.includes("bicycleParkings")) {
            newBicycleParkingsCache[gh] = data.bicycleParkings.filter(
              (b: BicycleParking) => b.gh5 === gh
            );
          }
        });

        // Update entity caches
        setEntitiesCache((prev) => ({
          stations: { ...prev.stations, ...newStationsCache },
          toilets: { ...prev.toilets, ...newToiletsCache },
          bicycleParkings: {
            ...prev.bicycleParkings,
            ...newBicycleParkingsCache,
          },
        }));

        // Update entities state with proper typing
        if (overlays.includes("stations")) {
          setStations((prev) => {
            // Combine previous stations with new ones
            const allStations = [
              ...prev,
              ...Object.values(newStationsCache).flat(),
            ];

            // Use Map for faster deduplication (better performance than object)
            const stationsMap = new Map<number, Station>();

            // Deduplicate by ID
            allStations.forEach((station) => {
              stationsMap.set(station.id, station);
            });

            // Convert back to array
            return Array.from(stationsMap.values());
          });
        }

        if (overlays.includes("toilets")) {
          setToilets((prev) => {
            const allToilets = [
              ...prev,
              ...Object.values(newToiletsCache).flat(),
            ];

            // Use Map for faster deduplication
            const toiletsMap = new Map<number, Toilet>();

            // Deduplicate by ID
            allToilets.forEach((toilet) => {
              toiletsMap.set(toilet.id, toilet);
            });

            return Array.from(toiletsMap.values());
          });
        }

        if (overlays.includes("bicycleParkings")) {
          setBicycleParkings((prev) => {
            const allBicycleParkings = [
              ...prev,
              ...Object.values(newBicycleParkingsCache).flat(),
            ];

            // Use Map for faster deduplication
            const bicycleParkingsMap = new Map<number, BicycleParking>();

            // Deduplicate by ID
            allBicycleParkings.forEach((bicycleParking) => {
              bicycleParkingsMap.set(bicycleParking.id, bicycleParking);
            });

            return Array.from(bicycleParkingsMap.values());
          });
        }
      } catch (error) {
        console.error("Error fetching entities:", error);
      }
    },
    []
  );

  // Function to handle bounds change without debounce
  const handleBoundsChangeWithoutDebounce = useCallback(
    async (
      bounds: LatLngBounds,
      zoom: number,
      selectedOverlays: AvailableOverlay[]
    ) => {
      if (zoom < 14) return;

      // Get geohashes for the visible area
      const geohashes = getBoundingBoxGeohashes(bounds);

      if (selectedOverlays.length === 0) return;

      // Filter out geohashes that have already been requested with all active overlays
      const newGeohashes = geohashes.filter((gh) => {
        const requestedOverlays = requestedGeohashes.get(gh) || [];
        return !selectedOverlays.every((overlay) =>
          requestedOverlays.includes(overlay)
        );
      });

      // If no new geohashes, do nothing
      if (newGeohashes.length === 0) return;

      // Mark these geohashes as requested with the current active overlays
      setRequestedGeohashes((prev) => {
        const updated = new Map(prev);
        newGeohashes.forEach((gh) => {
          const existingOverlays = updated.get(gh) || [];
          const newOverlays = [
            ...new Set([...existingOverlays, ...selectedOverlays]),
          ];
          updated.set(gh, newOverlays);
        });
        return updated;
      });

      // Fetch data for the new geohashes
      await fetchDataForGeohashes(newGeohashes, selectedOverlays);
    },
    [requestedGeohashes, selectedOverlays, fetchDataForGeohashes]
  );

  // Create a debounced version of the bounds change handler
  const handleBoundsChange = useMemo(
    () => debounce(handleBoundsChangeWithoutDebounce, 150),
    [handleBoundsChangeWithoutDebounce]
  );

  const map = useMapEvents({
    moveend: () => {
      handleBoundsChange(map.getBounds(), map.getZoom(), selectedOverlays);
    },
    zoomend: () => {
      handleBoundsChange(map.getBounds(), map.getZoom(), selectedOverlays);
    },
  });

  return {
    stations,
    toilets,
    bicycleParkings,
  };
}
