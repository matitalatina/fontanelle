"use client";

import useLocation from "@/hooks/useLocation";
import "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { ScaleControl } from "react-leaflet";
import ClusterMarkers from "./markers/ClusterMarkers";
import CustomMarker from "./markers/CustomMarker";
import LocateButton from "./LocateButton";
import MapCenter from "./MapCenter";
import OverlaySelector, { SelectedOverlays } from "./OverlaySelector";
import PersonMarker from "./markers/PersonMarker";
import { TILE_LAYERS, TileLayerType } from "@/hooks/useTileLayer";
import DisableSearchAlert from "./DisableSearchAlert";
import SearchBar from "./SearchBar";
import useSearch from "@/hooks/useSearch";
import SearchResultMarker from "./markers/SearchResultMarker";

export const ZOOM_DEFAULT = 16;

/*<TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />*/

export default function Map({
  className,
  children,
  tileLayer,
}: {
  className: string;
  tileLayer: TileLayerType;
  children?: React.ReactNode;
}) {
  const { locationState, getCurrentLocation } = useLocation();
  const [selectedOverlays, setSelectedOverlays] = useState<SelectedOverlays>({
    stations: true,
    toilets: false,
    bicycleParkings: false,
    playgrounds: false,
  });

  const {
    searchText,
    setSearchText,
    searchResult,
    setSearchResult,
    loading,
    error,
    handleSearch,
    clearSearch,
  } = useSearch();

  const activeCenter = searchResult
    ? { lat: searchResult.lat, lng: searchResult.lng }
    : locationState.status === "success"
      ? locationState.location
      : { lat: 45.464664, lng: 9.18854 };
  const centerNeedsUpdate = !!searchResult || locationState.status === "success";

  const handleLocate = () => {
    clearSearch();
    getCurrentLocation();
  };

  const tileLayerConfig = TILE_LAYERS[tileLayer];

  return (
    <>
      <MapContainer
        center={[activeCenter.lat, activeCenter.lng]}
        zoom={ZOOM_DEFAULT}
        scrollWheelZoom={true}
        wheelDebounceTime={100}
        zoomAnimation={true}
        markerZoomAnimation={true}
        className={`w-full h-full ${className} map-fontanelle`}
        zoomControl={false}
      >
        {children}
        {centerNeedsUpdate && <MapCenter position={activeCenter} />}
        <TileLayer
          attribution={tileLayerConfig.attribution}
          url={tileLayerConfig.url}
        />
        <ClusterMarkers selectedOverlays={selectedOverlays} />
        {locationState.status === "success" && (
          <PersonMarker
            lat={locationState.location.lat}
            lng={locationState.location.lng}
          />
        )}
        <CustomMarker />
        <OverlaySelector
          selectedOverlays={selectedOverlays}
          onChange={(a) => setSelectedOverlays(a)}
        />
        <LocateButton
          onClick={handleLocate}
          locationState={locationState}
        />
        <ScaleControl position="bottomright" imperial={false} />
        <div className="absolute top-4 left-0 right-0 z-4000 flex flex-col items-center gap-2 pointer-events-none px-4">
          <SearchBar
            value={searchText}
            onChange={setSearchText}
            onSearch={handleSearch}
            loading={loading}
            error={error}
          />
          <DisableSearchAlert />
        </div>
        {searchResult && (
          <SearchResultMarker
            position={{ lat: searchResult.lat, lng: searchResult.lng }}
            displayName={searchResult.displayName}
            onClear={() => setSearchResult(null)}
          />
        )}
      </MapContainer>
    </>
  );
}
