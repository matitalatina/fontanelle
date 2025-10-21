import { useCallback, useEffect, useMemo, useState } from "react";
import { LatLngBounds } from "leaflet";
import geohash from "ngeohash";
import { Station } from "@/lib/stations";
import { Toilet } from "@/lib/toilets";
import { BicycleParking } from "@/lib/bicycleParking";
import { Playground } from "@/lib/playgrounds";
import { AvailableOverlay } from "@/components/OverlaySelector";
import { useMapEvents } from "react-leaflet";
import { combineLatest, BehaviorSubject } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from "rxjs/operators";
import { isEqual, sortBy } from "lodash";

const ZOOM_THRESHOLD = 14;
const DEBOUNCE_TIME = 200;
const GEOHASH_PRECISION = 5;

// Generate geohashes for a bounding box
function getBoundingBoxGeohashes(
  bounds: LatLngBounds,
  precision = GEOHASH_PRECISION
): string[] {
  const ghs = geohash.bboxes(
    bounds.getSouthWest().lat,
    bounds.getSouthWest().lng,
    bounds.getNorthEast().lat,
    bounds.getNorthEast().lng,
    precision
  );
  return Array.from(new Set(ghs));
}

// Entity types configuration
type EntityType = "stations" | "toilets" | "bicycleParkings" | "playgrounds";
type EntityData = Station | Toilet | BicycleParking | Playground;

interface EntityConfig {
  apiPath: string;
  overlayKey: AvailableOverlay;
}

const ENTITY_CONFIG: Record<EntityType, EntityConfig> = {
  stations: { apiPath: "/api/v1/fountains", overlayKey: "stations" },
  toilets: { apiPath: "/api/v1/toilets", overlayKey: "toilets" },
  bicycleParkings: {
    apiPath: "/api/v1/bicycle-parkings",
    overlayKey: "bicycleParkings",
  },
  playgrounds: { apiPath: "/api/v1/playgrounds", overlayKey: "playgrounds" },
};

// Interface for entity cache
interface EntityCache {
  stations: Record<string, Station[]>;
  toilets: Record<string, Toilet[]>;
  bicycleParkings: Record<string, BicycleParking[]>;
  playgrounds: Record<string, Playground[]>;
}

interface UseMapEntitiesProps {
  selectedOverlays: AvailableOverlay[];
}

interface MapState {
  zoom: number;
  bounds: LatLngBounds | null;
  selectedOverlays: AvailableOverlay[];
}

export default function useMapEntities({
  selectedOverlays,
}: UseMapEntitiesProps) {
  // RxJS subjects for reactive state management
  const { mapState$, entitiesCache$, requestedGeohashes$ } = useMemo(
    () => ({
      mapState$: new BehaviorSubject<MapState>({
        zoom: 0,
        bounds: null,
        selectedOverlays: [],
      }),
      entitiesCache$: new BehaviorSubject<EntityCache>({
        stations: {},
        toilets: {},
        bicycleParkings: {},
        playgrounds: {},
      }),
      requestedGeohashes$: new BehaviorSubject<Map<string, AvailableOverlay[]>>(
        new Map()
      ),
    }),
    []
  );

  // State for entities
  const [entities, setEntities] = useState({
    stations: [] as Station[],
    toilets: [] as Toilet[],
    bicycleParkings: [] as BicycleParking[],
    playgrounds: [] as Playground[],
  });

  // Generic fetch function for any entity type
  const fetchEntityType = useCallback(
    async (entityType: EntityType, geohashes: string[]): Promise<void> => {
      const config = ENTITY_CONFIG[entityType];
      const response = await fetch(
        `${config.apiPath}?gh5=${geohashes.join(",")}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch ${entityType}`);
      }

      const data: EntityData[] = await response.json();

      // Group data by geohash
      const newCache: Record<string, EntityData[]> = {};
      geohashes.forEach((gh) => {
        newCache[gh] = data.filter((item: EntityData) => item.gh5 === gh);
      });

      // Update cache
      entitiesCache$.next({
        ...entitiesCache$.value,
        [entityType]: {
          ...entitiesCache$.value[entityType],
          ...newCache,
        },
      });
    },
    [entitiesCache$]
  );

  // Main RxJS pipeline
  useEffect(() => {
    // Stream that combines map state and determines what to fetch
    const fetchPipeline$ = mapState$.pipe(
      distinctUntilChanged((prev, curr) => {
        const boundsEqual =
          (!prev.bounds && !curr.bounds) ||
          (prev.bounds && curr.bounds
            ? prev.bounds.equals(curr.bounds)
            : false);

        return (
          prev.zoom === curr.zoom &&
          boundsEqual &&
          isEqual(sortBy(prev.selectedOverlays), sortBy(curr.selectedOverlays))
        );
      }),
      debounceTime(DEBOUNCE_TIME),
      map(({ zoom, bounds, selectedOverlays }) => {
        // Don't fetch if zoom is too low or no bounds
        if (zoom < ZOOM_THRESHOLD || !bounds || selectedOverlays.length === 0) {
          return null;
        }

        const geohashes = getBoundingBoxGeohashes(bounds);
        const requested = requestedGeohashes$.value;

        // Find geohashes that need fetching for each overlay
        const toFetch = geohashes.filter((gh) => {
          const requestedOverlays = requested.get(gh) || [];
          return !selectedOverlays.every((overlay) =>
            requestedOverlays.includes(overlay)
          );
        });

        return toFetch.length > 0
          ? { geohashes: toFetch, overlays: selectedOverlays }
          : null;
      }),
      switchMap(async (fetchData) => {
        if (!fetchData) return;

        const { geohashes, overlays } = fetchData;

        // Update requested geohashes tracking
        const updated = new Map(requestedGeohashes$.value);
        geohashes.forEach((gh) => {
          const existing = updated.get(gh) || [];
          updated.set(gh, [...new Set([...existing, ...overlays])]);
        });
        requestedGeohashes$.next(updated);

        // Fetch all entity types in parallel
        const cache = entitiesCache$.value;
        const fetchPromises: Promise<void>[] = [];

        (Object.keys(ENTITY_CONFIG) as EntityType[]).forEach((entityType) => {
          const config = ENTITY_CONFIG[entityType];

          if (overlays.includes(config.overlayKey)) {
            const uncachedGeohashes = geohashes.filter(
              (gh) => !cache[entityType][gh]
            );

            if (uncachedGeohashes.length > 0) {
              fetchPromises.push(
                fetchEntityType(entityType, uncachedGeohashes).catch((error) =>
                  console.error(`Error fetching ${entityType}:`, error)
                )
              );
            }
          }
        });

        await Promise.all(fetchPromises);
      })
    );

    // Stream that filters cached entities based on selected overlays
    const visibleEntities$ = combineLatest([
      entitiesCache$,
      mapState$.pipe(
        map((state) => state.selectedOverlays),
        distinctUntilChanged((prev, curr) =>
          isEqual(sortBy(prev), sortBy(curr))
        )
      ),
    ]).pipe(
      debounceTime(DEBOUNCE_TIME),
      map(([cache, selectedOverlays]) => ({
        stations: selectedOverlays.includes("stations")
          ? Object.values(cache.stations).flat()
          : [],
        toilets: selectedOverlays.includes("toilets")
          ? Object.values(cache.toilets).flat()
          : [],
        bicycleParkings: selectedOverlays.includes("bicycleParkings")
          ? Object.values(cache.bicycleParkings).flat()
          : [],
        playgrounds: selectedOverlays.includes("playgrounds")
          ? Object.values(cache.playgrounds).flat()
          : [],
      })),
      distinctUntilChanged(
        (prev, curr) =>
          prev.stations.length === curr.stations.length &&
          prev.toilets.length === curr.toilets.length &&
          prev.bicycleParkings.length === curr.bicycleParkings.length &&
          prev.playgrounds.length === curr.playgrounds.length
      )
    );

    const fetchSubscription = fetchPipeline$.subscribe();
    const entitiesSubscription = visibleEntities$.subscribe(setEntities);

    return () => {
      fetchSubscription.unsubscribe();
      entitiesSubscription.unsubscribe();
    };
  }, [mapState$, entitiesCache$, requestedGeohashes$, fetchEntityType]);

  // Update mapState when selectedOverlays changes
  useEffect(() => {
    mapState$.next({
      ...mapState$.value,
      selectedOverlays,
    });
  }, [selectedOverlays, mapState$]);

  // Handle map events
  const mapInstance = useMapEvents({
    moveend: () => {
      mapState$.next({
        ...mapState$.value,
        bounds: mapInstance.getBounds(),
        zoom: mapInstance.getZoom(),
      });
    },
    zoomend: () => {
      mapState$.next({
        ...mapState$.value,
        bounds: mapInstance.getBounds(),
        zoom: mapInstance.getZoom(),
      });
    },
    load: () => {
      mapState$.next({
        ...mapState$.value,
        bounds: mapInstance.getBounds(),
        zoom: mapInstance.getZoom(),
      });
    },
  });

  // Initialize map state when ready
  if (!mapState$.value.bounds && mapInstance) {
    mapInstance.whenReady(() => {
      mapState$.next({
        ...mapState$.value,
        bounds: mapInstance.getBounds(),
        zoom: mapInstance.getZoom(),
      });
    });
  }

  return entities;
}
