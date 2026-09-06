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
  CONTRIBUTE_BASEMAPS,
  type ContributeBasemapType,
} from "@/hooks/useTileLayer";
import type { LatLng, LocationState } from "@/hooks/useLocation";
import LocateButton from "@/components/LocateButton";
import { POI_TYPE_MARKERS } from "@/components/markers/poi-markers";
import type { PoiType } from "@/lib/osm/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faSatellite } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";

const MILAN_CENTER: LatLng = { lat: 45.464664, lng: 9.18854 };
const LOCATE_ZOOM = 17;

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
  const t = useTranslations("contribute");
  const [basemap, setBasemap] = useState<ContributeBasemapType>("osm");
  const [locateStatus, setLocateStatus] = useState<LocateStatus>({
    status: "idle",
  });
  const center = position ?? MILAN_CENTER;
  const basemapConfig = CONTRIBUTE_BASEMAPS[basemap];

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
          key={basemap}
          attribution={basemapConfig.attribution}
          url={basemapConfig.url}
          maxZoom={basemapConfig.maxZoom ?? 19}
        />
        <ClickCatcher onChange={onChange} />
        <MapRefSetter mapRef={mapRef} />
        {position && (
          <Marker
            position={[position.lat, position.lng]}
            icon={POI_TYPE_MARKERS[poiType]}
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
      <div
        className="absolute top-2 right-2 join shadow-xl"
        style={{ zIndex: 4000 }}
        role="group"
        aria-label={t("basemapLabel")}
      >
        <button
          type="button"
          className={`btn btn-xs join-item ${basemap === "osm" ? "btn-primary" : "bg-base-100"}`}
          onClick={() => setBasemap("osm")}
          aria-pressed={basemap === "osm"}
        >
          <FontAwesomeIcon icon={faMap} className="mr-1" />
          {t("basemapOsm")}
        </button>
        <button
          type="button"
          className={`btn btn-xs join-item ${basemap === "esriAerial" ? "btn-primary" : "bg-base-100"}`}
          onClick={() => setBasemap("esriAerial")}
          aria-pressed={basemap === "esriAerial"}
        >
          <FontAwesomeIcon icon={faSatellite} className="mr-1" />
          {t("basemapSatellite")}
        </button>
      </div>
      <LocateButton onClick={handleLocate} locationState={locationState} />
    </div>
  );
}
