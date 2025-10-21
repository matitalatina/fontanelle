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
import { IEntityClient, EntityType, EntityData } from "@/services/EntityClient";
import { container, TYPES } from "@/services/container";

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

// Entity types that can be fetched
const ENTITY_TYPES: EntityType[] = [
  "stations",
  "toilets",
  "bicycleParkings",
  "playgrounds",
];

// Interface for entity cache
interface EntityCache {
  stations: Record<string, Station[]>;
  toilets: Record<string, Toilet[]>;
  bicycleParkings: Record<string, BicycleParking[]>;
  playgrounds: Record<string, Playground[]>;
}

interface UseMapEntitiesProps {
  selectedOverlays: AvailableOverlay[];
  entityClient?: IEntityClient;
}

interface MapState {
  zoom: number;
  bounds: LatLngBounds | null;
  selectedOverlays: AvailableOverlay[];
}

export default function useMapEntities({
  selectedOverlays,
  entityClient,
}: UseMapEntitiesProps) {
  // Get the entity client from the container if not provided (for testing)
  const client = useMemo(
    () => entityClient || container.get<IEntityClient>(TYPES.EntityClient),
    [entityClient]
  );

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
      const data = await client.fetchEntities(entityType, geohashes);

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
    [client, entitiesCache$]
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

        ENTITY_TYPES.forEach((entityType) => {
          if (overlays.includes(entityType)) {
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
