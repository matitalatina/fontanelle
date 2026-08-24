"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import type { Map as LeafletMap } from "leaflet";
import {
  Icon,
  PinSquarePanel,
  PinStarPanel,
  PinTrianglePanel,
} from "leaflet-extra-markers";
import { createMarkerIconHTML } from "@/lib/marker-icons";
import {
  faFaucetDrip,
  faRestroom,
  faParking,
  faFutbol,
} from "@fortawesome/free-solid-svg-icons";
import { TILE_LAYERS } from "@/hooks/useTileLayer";
import type { LatLng, LocationState } from "@/hooks/useLocation";
import LocateButton from "@/components/LocateButton";
import type { PoiType } from "@/lib/osm/types";

const MILAN_CENTER: LatLng = { lat: 45.464664, lng: 9.18854 };
const LOCATE_ZOOM = 17;

const POI_MARKERS: Record<PoiType, Icon> = {
  fountain: new Icon({
    contentHtml: createMarkerIconHTML(faFaucetDrip),
    color: "var(--color-fountain-content)",
    contentColor: "var(--color-fountain)",
    accentColor: "var(--color-fountain)",
    svg: PinSquarePanel,
  }),
  toilet: new Icon({
    contentHtml: createMarkerIconHTML(faRestroom),
    color: "var(--color-toilet-content)",
    contentColor: "var(--color-toilet)",
    accentColor: "var(--color-toilet)",
    svg: PinStarPanel,
  }),
  bicycle_parking: new Icon({
    contentHtml: createMarkerIconHTML(faParking),
    color: "var(--color-bicycle-content)",
    contentColor: "var(--color-bicycle)",
    accentColor: "var(--color-bicycle)",
    svg: PinSquarePanel,
  }),
  playground: new Icon({
    contentHtml: createMarkerIconHTML(faFutbol),
    color: "var(--color-playground-content)",
    contentColor: "var(--color-playground)",
    accentColor: "var(--color-playground)",
    svg: PinTrianglePanel,
  }),
};

function ClickCatcher({ onChange }: { onChange: (position: LatLng) => void }) {
  useMapEvents({
    click: (event) => {
      onChange({ lat: event.latlng.lat, lng: event.latlng.lng });
    },
  });
  return null;
}

function MapRefSetter({
  mapRef,
}: {
  mapRef: React.RefObject<LeafletMap | null>;
}) {
  const map = useMap();
  useEffect(() => {
    mapRef.current = map;
  }, [map, mapRef]);
  return null;
}

type LocateStatus =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; code: number };

export default function ContributeMiniMap({
  position,
  poiType,
  onChange,
}: {
  position: LatLng | null;
  poiType: PoiType;
  onChange: (position: LatLng) => void;
}) {
  const mapRef = useRef<LeafletMap | null>(null);
  const [locateStatus, setLocateStatus] = useState<LocateStatus>({
    status: "idle",
  });
  const center = position ?? MILAN_CENTER;

  const handleLocate = useCallback(() => {
    if (!navigator.geolocation) {
      setLocateStatus({
        status: "error",
        code: GeolocationPositionError.POSITION_UNAVAILABLE,
      });
      return;
    }
    setLocateStatus({ status: "loading" });
    navigator.geolocation.getCurrentPosition(
      (geoPosition) => {
        const latLng = {
          lat: geoPosition.coords.latitude,
          lng: geoPosition.coords.longitude,
        };
        onChange(latLng);
        setLocateStatus({ status: "idle" });
        const map = mapRef.current;
        if (map) {
          map.setView(
            [latLng.lat, latLng.lng],
            Math.max(map.getZoom(), LOCATE_ZOOM),
          );
        }
      },
      (error) => {
        console.error(error);
        setLocateStatus({ status: "error", code: error.code });
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, [onChange]);

  const locationState: LocationState =
    locateStatus.status === "loading"
      ? { status: "loading" }
      : locateStatus.status === "error"
        ? { status: "error", code: locateStatus.code }
        : { status: "success", location: position ?? MILAN_CENTER };

  return (
    <div className="relative h-64 w-full rounded-box overflow-hidden">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={17}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution={TILE_LAYERS.osm.attribution}
          url={TILE_LAYERS.osm.url}
        />
        <ClickCatcher onChange={onChange} />
        <MapRefSetter mapRef={mapRef} />
        {position && (
          <Marker
            position={[position.lat, position.lng]}
            icon={POI_MARKERS[poiType]}
            draggable={true}
            eventHandlers={{
              dragend: (event) => {
                const latLng = event.target.getLatLng();
                onChange({ lat: latLng.lat, lng: latLng.lng });
              },
            }}
          ></Marker>
        )}
      </MapContainer>
      <LocateButton onClick={handleLocate} locationState={locationState} />
    </div>
  );
}
