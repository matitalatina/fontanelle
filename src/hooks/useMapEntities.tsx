import { useCallback, useEffect, useMemo, useState } from "react";
import { LatLngBounds } from "leaflet";
import geohash from "ngeohash";
import { Station } from "@/lib/stations";
import { Toilet } from "@/lib/toilets";
import { BicycleParking } from "@/lib/bicycleParking";

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
  initialStations: Station[];
  initialToilets: Toilet[];
  initialBicycleParkings: BicycleParking[];
}

export default function useMapEntities({
  initialStations,
  initialToilets,
  initialBicycleParkings,
}: UseMapEntitiesProps) {
  // State for entities
  const [stations, setStations] = useState<Station[]>(initialStations);
  const [toilets, setToilets] = useState<Toilet[]>(initialToilets);
  const [bicycleParkings, setBicycleParkings] = useState<BicycleParking[]>(
    initialBicycleParkings
  );

  // Cache for already fetched geohashes
  const [requestedGeohashes, setRequestedGeohashes] = useState<Set<string>>(
    new Set()
  );
  const [entitiesCache, setEntitiesCache] = useState<EntityCache>({
    stations: {},
    toilets: {},
    bicycleParkings: {},
  });

  // Function to handle bounds change without debounce
  const handleBoundsChangeWithoutDebounce = useCallback(
    async (bounds: LatLngBounds, zoom: number) => {
      if (zoom < 14) return;

      // Get geohashes for the visible area
      const geohashes = getBoundingBoxGeohashes(bounds);

      // Filter out already requested geohashes
      const newGeohashes = geohashes.filter(
        (gh) => !requestedGeohashes.has(gh)
      );

      // If no new geohashes, do nothing
      if (newGeohashes.length === 0) return;

      // Mark these geohashes as requested
      setRequestedGeohashes((prev) => {
        const updated = new Set(prev);
        newGeohashes.forEach((gh) => updated.add(gh));
        return updated;
      });

      try {
        // Fetch data for new geohashes
        const response = await fetch(
          `/api/v1/entities?gh5=${newGeohashes.join(",")}`
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
        newGeohashes.forEach((gh) => {
          newStationsCache[gh] = data.stations.filter(
            (s: Station) => geohash.encode(s.lat, s.lng, 5) === gh
          );

          newToiletsCache[gh] = data.toilets.filter(
            (t: Toilet) => geohash.encode(t.lat, t.lng, 5) === gh
          );

          newBicycleParkingsCache[gh] = data.bicycleParkings.filter(
            (b: BicycleParking) => geohash.encode(b.lat, b.lng, 5) === gh
          );
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
        setStations((prev) => {
          // Combine previous stations with new ones
          const allStations = [
            ...prev,
            ...Object.values(newStationsCache).flat(),
          ];

          // Create an object for deduplication
          const uniqueStations: Record<number, Station> = {};

          // Deduplicate by ID
          allStations.forEach((station) => {
            uniqueStations[station.id] = station;
          });

          // Convert back to array
          return Object.values(uniqueStations);
        });

        setToilets((prev) => {
          const allToilets = [
            ...prev,
            ...Object.values(newToiletsCache).flat(),
          ];

          // Create an object for deduplication
          const uniqueToilets: Record<number, Toilet> = {};

          // Deduplicate by ID
          allToilets.forEach((toilet) => {
            uniqueToilets[toilet.id] = toilet;
          });

          return Object.values(uniqueToilets);
        });

        setBicycleParkings((prev) => {
          const allBicycleParkings = [
            ...prev,
            ...Object.values(newBicycleParkingsCache).flat(),
          ];

          // Create an object for deduplication
          const uniqueBicycleParkings: Record<number, BicycleParking> = {};

          // Deduplicate by ID
          allBicycleParkings.forEach((bicycleParking) => {
            uniqueBicycleParkings[bicycleParking.id] = bicycleParking;
          });

          return Object.values(uniqueBicycleParkings);
        });
      } catch (error) {
        console.error("Error fetching entities:", error);
      }
    },
    [requestedGeohashes]
  );

  // Create a debounced version of the bounds change handler
  const handleBoundsChange = useMemo(
    () => debounce(handleBoundsChangeWithoutDebounce, 500),
    [handleBoundsChangeWithoutDebounce]
  );

  return {
    stations,
    toilets,
    bicycleParkings,
    handleBoundsChange,
  };
}
