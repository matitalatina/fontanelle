/* eslint-disable react-hooks/exhaustive-deps */

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
import { debounceTime, distinctUntilChanged, tap, map } from "rxjs/operators";
import { isEqual, sortBy } from "lodash";

const zoomThreshold = 14;

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

export default function useMapEntities({
  selectedOverlays,
}: UseMapEntitiesProps) {
  // Move RxJS subjects inside the hook to avoid sharing state across instances
  const zoom$ = useMemo(() => new BehaviorSubject<number>(0), []);
  const bounds$ = useMemo(
    () => new BehaviorSubject<LatLngBounds | null>(null),
    []
  );
  const selectedOverlays$ = useMemo(
    () => new BehaviorSubject<AvailableOverlay[]>(selectedOverlays),
    []
  );
  const requestedGeohashes$ = useMemo(
    () => new BehaviorSubject<Map<string, string[]>>(new Map()),
    []
  );

  const onUpdateMap$ = useMemo(() => {
    console.log("!!!!Creating onUpdateMap$");
    const subscription = combineLatest({
      zoom: zoom$.pipe(distinctUntilChanged()).pipe(
        tap((zoom) => {
          console.log("zoom$", zoom);
        })
      ),
      bounds: bounds$.pipe(
        distinctUntilChanged(),
        tap((bounds) => {
          console.log("bounds$", bounds);
        })
      ),
      selectedOverlays: selectedOverlays$.pipe(
        distinctUntilChanged((prev, curr) =>
          isEqual(sortBy(prev), sortBy(curr))
        ),
        tap((selectedOverlays) => {
          console.log("selectedOverlays$", selectedOverlays);
        })
      ),
    }).pipe(
      debounceTime(150),
      tap(({ zoom, bounds, selectedOverlays }) => {
        console.log("updates$$", zoom, bounds, selectedOverlays);
      })
    );
    return subscription;
  }, []);

  const entitiesCache$ = useMemo(() => {
    return new BehaviorSubject<EntityCache>({
      stations: {},
      toilets: {},
      bicycleParkings: {},
      playgrounds: {},
    });
  }, []);

  const onNeedChangeVisibleEntities$ = useMemo(() => {
    return combineLatest([
      entitiesCache$,
      selectedOverlays$.pipe(
        distinctUntilChanged((prev, curr) =>
          isEqual(sortBy(prev), sortBy(curr))
        )
      ),
    ]).pipe(
      tap(([entitiesCache, selectedOverlays]) => {
        console.log(
          "onNeedChangeVisibleEntities$",
          entitiesCache,
          selectedOverlays
        );
      })
    );
  }, []);

  const onVisibleEntities$ = useMemo(() => {
    return onNeedChangeVisibleEntities$.pipe(
      map(([entitiesCache, selectedOverlays]) => {
        const stations = selectedOverlays.includes("stations")
          ? Object.values(entitiesCache.stations).flat()
          : [];
        const toilets = selectedOverlays.includes("toilets")
          ? Object.values(entitiesCache.toilets).flat()
          : [];
        const bicycleParkings = selectedOverlays.includes("bicycleParkings")
          ? Object.values(entitiesCache.bicycleParkings).flat()
          : [];
        const playgrounds = selectedOverlays.includes("playgrounds")
          ? Object.values(entitiesCache.playgrounds).flat()
          : [];
        return { stations, toilets, bicycleParkings, playgrounds };
      }),
      distinctUntilChanged(
        (prev, curr) =>
          prev.bicycleParkings.length === curr.bicycleParkings.length &&
          prev.toilets.length === curr.toilets.length &&
          prev.stations.length === curr.stations.length &&
          prev.playgrounds.length === curr.playgrounds.length
      )
    );
  }, [onNeedChangeVisibleEntities$]);
  // State for entities
  const [stations, setStations] = useState<Station[]>([]);
  const [toilets, setToilets] = useState<Toilet[]>([]);
  const [bicycleParkings, setBicycleParkings] = useState<BicycleParking[]>([]);
  const [playgrounds, setPlaygrounds] = useState<Playground[]>([]);

  // Cache for already fetched geohashes and their associated overlays
  const [requestedGeohashes, setRequestedGeohashes] = useState<
    Map<string, string[]>
  >(new Map());

  // Function to fetch data for specific geohashes and overlays
  const fetchDataForGeohashes = useCallback(
    async (geohashes: string[], overlays: string[]) => {
      if (geohashes.length === 0 || overlays.length === 0) return;

      try {
        const promises = [];
        const currentCache = entitiesCache$.value;

        // Fetch fountains/stations
        if (overlays.includes("stations")) {
          // Filter out geohashes that are already in the cache
          const geohashesToFetch = geohashes.filter(
            (gh) => !currentCache.stations[gh]
          );

          if (geohashesToFetch.length > 0) {
            promises.push(
              fetch(`/api/v1/fountains?gh5=${geohashesToFetch.join(",")}`)
                .then((response) => {
                  if (!response.ok)
                    throw new Error("Failed to fetch fountains");
                  return response.json();
                })
                .then((data) => {
                  // Create cache for this data
                  const newStationsCache: Record<string, Station[]> = {};
                  geohashesToFetch.forEach((gh) => {
                    newStationsCache[gh] = data.filter(
                      (s: Station) => s.gh5 === gh
                    );
                  });

                  // Update entities cache
                  entitiesCache$.next({
                    ...entitiesCache$.value,
                    stations: {
                      ...entitiesCache$.value.stations,
                      ...newStationsCache,
                    },
                  });
                })
                .catch((error) =>
                  console.error("Error fetching fountains:", error)
                )
            );
          }
        }

        // Fetch toilets
        if (overlays.includes("toilets")) {
          // Filter out geohashes that are already in the cache
          const geohashesToFetch = geohashes.filter(
            (gh) => !currentCache.toilets[gh]
          );

          if (geohashesToFetch.length > 0) {
            promises.push(
              fetch(`/api/v1/toilets?gh5=${geohashesToFetch.join(",")}`)
                .then((response) => {
                  if (!response.ok) throw new Error("Failed to fetch toilets");
                  return response.json();
                })
                .then((data) => {
                  // Create cache for this data
                  const newToiletsCache: Record<string, Toilet[]> = {};
                  geohashesToFetch.forEach((gh) => {
                    newToiletsCache[gh] = data.filter(
                      (t: Toilet) => t.gh5 === gh
                    );
                  });

                  // Update entities cache
                  entitiesCache$.next({
                    ...entitiesCache$.value,
                    toilets: {
                      ...entitiesCache$.value.toilets,
                      ...newToiletsCache,
                    },
                  });
                })
                .catch((error) =>
                  console.error("Error fetching toilets:", error)
                )
            );
          }
        }

        // Fetch bicycle parkings
        if (overlays.includes("bicycleParkings")) {
          // Filter out geohashes that are already in the cache
          const geohashesToFetch = geohashes.filter(
            (gh) => !currentCache.bicycleParkings[gh]
          );

          if (geohashesToFetch.length > 0) {
            promises.push(
              fetch(
                `/api/v1/bicycle-parkings?gh5=${geohashesToFetch.join(",")}`
              )
                .then((response) => {
                  if (!response.ok)
                    throw new Error("Failed to fetch bicycle parkings");
                  return response.json();
                })
                .then((data) => {
                  // Create cache for this data
                  const newBicycleParkingsCache: Record<
                    string,
                    BicycleParking[]
                  > = {};
                  geohashesToFetch.forEach((gh) => {
                    newBicycleParkingsCache[gh] = data.filter(
                      (b: BicycleParking) => b.gh5 === gh
                    );
                  });

                  // Update entities cache
                  entitiesCache$.next({
                    ...entitiesCache$.value,
                    bicycleParkings: {
                      ...entitiesCache$.value.bicycleParkings,
                      ...newBicycleParkingsCache,
                    },
                  });
                })
                .catch((error) =>
                  console.error("Error fetching bicycle parkings:", error)
                )
            );
          }
        }

        // Fetch playgrounds
        if (overlays.includes("playgrounds")) {
          // Filter out geohashes that are already in the cache
          const geohashesToFetch = geohashes.filter(
            (gh) => !currentCache.playgrounds[gh]
          );

          if (geohashesToFetch.length > 0) {
            promises.push(
              fetch(`/api/v1/playgrounds?gh5=${geohashesToFetch.join(",")}`)
                .then((response) => {
                  if (!response.ok)
                    throw new Error("Failed to fetch playgrounds");
                  return response.json();
                })
                .then((data) => {
                  // Create cache for this data
                  const newPlaygroundsCache: Record<string, Playground[]> = {};
                  geohashesToFetch.forEach((gh) => {
                    newPlaygroundsCache[gh] = data.filter(
                      (p: Playground) => p.gh5 === gh
                    );
                  });

                  // Update entities cache
                  entitiesCache$.next({
                    ...entitiesCache$.value,
                    playgrounds: {
                      ...entitiesCache$.value.playgrounds,
                      ...newPlaygroundsCache,
                    },
                  });
                })
                .catch((error) =>
                  console.error("Error fetching playgrounds:", error)
                )
            );
          }
        }

        // Wait for all fetch operations to complete
        await Promise.all(promises);
      } catch (error) {
        console.error("Error fetching entities:", error);
      }
    },
    [entitiesCache$]
  );

  // Function to handle bounds change without debounce
  const fetchDataIfNeeded = useCallback(
    async ({
      bounds,
      zoom,
      selectedOverlays,
    }: {
      bounds: LatLngBounds;
      zoom: number;
      selectedOverlays: AvailableOverlay[];
    }) => {
      if (zoom < zoomThreshold) return;

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
      const prev = requestedGeohashes$.value;
      const updated = new Map(prev);
      newGeohashes.forEach((gh) => {
        const existingOverlays = updated.get(gh) || [];
        const newOverlays = [
          ...new Set([...existingOverlays, ...selectedOverlays]),
        ];
        updated.set(gh, newOverlays);
      });
      requestedGeohashes$.next(updated);

      // Fetch data for the new geohashes
      await fetchDataForGeohashes(newGeohashes, selectedOverlays);
    },
    [requestedGeohashes$, fetchDataForGeohashes, requestedGeohashes]
  );

  useEffect(() => {
    // Subscribe to onUpdateMap$ and handle map updates
    console.log("Setting up subscription");
    const fetchSubscription = onUpdateMap$.subscribe(
      ({ zoom, bounds, selectedOverlays: currentOverlays }) => {
        console.log("onUpdateMap$ triggered with overlays:", currentOverlays);
        if (bounds) {
          console.log("Handling bounds change");
          fetchDataIfNeeded({
            bounds,
            zoom,
            selectedOverlays: currentOverlays,
          });
        }
      }
    );

    const updateVisibleSubscription = onVisibleEntities$.subscribe(
      ({ stations, toilets, bicycleParkings, playgrounds }) => {
        setStations(stations);
        setToilets(toilets);
        setBicycleParkings(bicycleParkings);
        setPlaygrounds(playgrounds);
      }
    );

    return () => {
      console.log("Cleaning up subscription");
      fetchSubscription.unsubscribe();
      updateVisibleSubscription.unsubscribe();
    };
  }, []);

  // Update selectedOverlays$ whenever selectedOverlays changes
  useEffect(() => {
    console.log("selectedOverlays changed:", selectedOverlays);
    selectedOverlays$.next(selectedOverlays);
  }, [selectedOverlays, selectedOverlays$]);

  const mapInstance = useMapEvents({
    moveend: () => {
      console.log("moveend");
      bounds$.next(mapInstance.getBounds());
      zoom$.next(mapInstance.getZoom());
    },
    zoomend: () => {
      console.log("zoomend");
      bounds$.next(mapInstance.getBounds());
      zoom$.next(mapInstance.getZoom());
    },
    load: () => {
      console.log("map loaded");
      bounds$.next(mapInstance.getBounds());
      zoom$.next(mapInstance.getZoom());
    },
  });

  // Initialize map values when component mounts
  useEffect(() => {
    if (mapInstance) {
      console.log("Initializing map values");
      bounds$.next(mapInstance.getBounds());
      zoom$.next(mapInstance.getZoom());
    }
  }, [mapInstance, bounds$, zoom$]);

  return {
    stations,
    toilets,
    bicycleParkings,
    playgrounds,
  };
}
