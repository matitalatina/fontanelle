import { BicycleParking } from "@/lib/bicycleParking";
import { Playground } from "@/lib/playgrounds";
import { Station } from "@/lib/stations";
import { Toilet } from "@/lib/toilets";
import { inject, injectable } from "inversify";
import { LatLngBounds } from "leaflet";
import { BehaviorSubject, Observable } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  shareReplay,
} from "rxjs/operators";
import geohash from "ngeohash";
import { isEqual, sortBy } from "lodash";
import { AvailableOverlay } from "@/components/OverlaySelector";
import {
  EntityType,
  EntityData,
  type IEntityClient,
} from "@/client/EntityClient";
import { TYPES } from "./types";

const ZOOM_THRESHOLD = 14;
const DEBOUNCE_TIME = 100;
const GEOHASH_PRECISION = 5;

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

interface MapState {
  zoom: number;
  bounds: LatLngBounds | null;
  selectedOverlays: AvailableOverlay[];
}

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

export interface IMapEntitiesService {
  updateMap: (bounds: LatLngBounds, zoom: number) => void;
  updateSelectedOverlays: (selectedOverlays: AvailableOverlay[]) => void;
  getVisibleEntities$(): Observable<{
    stations: Station[];
    toilets: Toilet[];
    bicycleParkings: BicycleParking[];
    playgrounds: Playground[];
  }>;
}

@injectable()
export class MapEntitiesService implements IMapEntitiesService {
  private readonly mapState$: BehaviorSubject<MapState>;
  private readonly entitiesCache: EntityCache;
  private readonly requestedGeohashes: Map<string, AvailableOverlay[]>;
  private readonly visibleEntities$: Observable<{
    stations: Station[];
    toilets: Toilet[];
    bicycleParkings: BicycleParking[];
    playgrounds: Playground[];
  }>;

  constructor(
    @inject(TYPES.EntityClient)
    private readonly entityClient: IEntityClient
  ) {
    // Initialize state
    this.mapState$ = new BehaviorSubject<MapState>({
      zoom: 0,
      bounds: null,
      selectedOverlays: [],
    });

    this.entitiesCache = {
      stations: {},
      toilets: {},
      bicycleParkings: {},
      playgrounds: {},
    };

    this.requestedGeohashes = new Map();

    // Set up the visible entities stream with fetch as intermediate step
    // This will only run when there are active subscribers
    this.visibleEntities$ = this.createVisibleEntitiesStream();
  }

  updateMap(bounds: LatLngBounds, zoom: number): void {
    this.mapState$.next({
      ...this.mapState$.value,
      bounds,
      zoom,
    });
  }

  updateSelectedOverlays(selectedOverlays: AvailableOverlay[]): void {
    this.mapState$.next({
      ...this.mapState$.value,
      selectedOverlays,
    });
  }

  getVisibleEntities$(): Observable<{
    stations: Station[];
    toilets: Toilet[];
    bicycleParkings: BicycleParking[];
    playgrounds: Playground[];
  }> {
    return this.visibleEntities$;
  }

  private createVisibleEntitiesStream(): Observable<{
    stations: Station[];
    toilets: Toilet[];
    bicycleParkings: BicycleParking[];
    playgrounds: Playground[];
  }> {
    // Stream that triggers fetching as an intermediate step when mapState changes
    const mapStateWithFetch$ = this.mapState$.pipe(
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
      // Fetch data as a side effect when map state changes
      switchMap(async (mapState) => {
        const { zoom, bounds, selectedOverlays } = mapState;

        // Don't fetch if zoom is too low or no bounds
        if (zoom >= ZOOM_THRESHOLD && bounds && selectedOverlays.length > 0) {
          const geohashes = getBoundingBoxGeohashes(bounds);

          // Find geohashes that need fetching for each overlay
          const toFetch = geohashes.filter((gh) => {
            const requestedOverlays = this.requestedGeohashes.get(gh) || [];
            return !selectedOverlays.every((overlay) =>
              requestedOverlays.includes(overlay)
            );
          });

          if (toFetch.length > 0) {
            // Update requested geohashes tracking
            toFetch.forEach((gh) => {
              const existing = this.requestedGeohashes.get(gh) || [];
              this.requestedGeohashes.set(gh, [
                ...new Set([...existing, ...selectedOverlays]),
              ]);
            });

            // Fetch all entity types in parallel
            const fetchPromises: Promise<void>[] = [];

            ENTITY_TYPES.forEach((entityType) => {
              if (selectedOverlays.includes(entityType)) {
                const uncachedGeohashes = toFetch.filter(
                  (gh) => !this.entitiesCache[entityType][gh]
                );

                if (uncachedGeohashes.length > 0) {
                  fetchPromises.push(
                    this.fetchEntityType(entityType, uncachedGeohashes).catch(
                      (error) =>
                        console.error(`Error fetching ${entityType}:`, error)
                    )
                  );
                }
              }
            });

            await Promise.all(fetchPromises);
          }
        }

        return mapState;
      })
    );

    // Map the state (with fetch side effect) to visible entities
    return mapStateWithFetch$.pipe(
      map(({ selectedOverlays }) => ({
        stations: selectedOverlays.includes("stations")
          ? Object.values(this.entitiesCache.stations).flat()
          : [],
        toilets: selectedOverlays.includes("toilets")
          ? Object.values(this.entitiesCache.toilets).flat()
          : [],
        bicycleParkings: selectedOverlays.includes("bicycleParkings")
          ? Object.values(this.entitiesCache.bicycleParkings).flat()
          : [],
        playgrounds: selectedOverlays.includes("playgrounds")
          ? Object.values(this.entitiesCache.playgrounds).flat()
          : [],
      })),
      distinctUntilChanged(
        (prev, curr) =>
          prev.stations.length === curr.stations.length &&
          prev.toilets.length === curr.toilets.length &&
          prev.bicycleParkings.length === curr.bicycleParkings.length &&
          prev.playgrounds.length === curr.playgrounds.length
      ),
      // Share the subscription and only run when there are active subscribers
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  private async fetchEntityType(
    entityType: EntityType,
    geohashes: string[]
  ): Promise<void> {
    const data = await this.entityClient.fetchEntities(entityType, geohashes);

    // Group data by geohash and update cache directly
    // TypeScript can't narrow the union type, so we cast the cache for this operation
    const cache = this.entitiesCache[entityType] as Record<
      string,
      EntityData[]
    >;
    geohashes.forEach((gh) => {
      cache[gh] = data.filter((item) => item.gh5 === gh);
    });
  }
}
