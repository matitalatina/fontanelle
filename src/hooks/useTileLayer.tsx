import { useState } from "react";

export type TileLayerType = "cyclosm" | "osm";

export interface TileLayerConfig {
  name: string;
  url: string;
  attribution: string;
  maxZoom?: number;
}

export const TILE_LAYERS: Record<TileLayerType, TileLayerConfig> = {
  osm: {
    name: "OpenStreetMap",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
  cyclosm: {
    name: "CyclOSM",
    url: "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="/copyright">OpenStreetMap</a> | <a href="https://www.cyclosm.org" target="_blank">CyclOSM</a>',
  },
};

export type ContributeBasemapType = "osm" | "esriAerial";

export const CONTRIBUTE_BASEMAPS: Record<
  ContributeBasemapType,
  TileLayerConfig
> = {
  osm: TILE_LAYERS.osm,
  esriAerial: {
    name: "Esri World Imagery",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution:
      "Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics",
    maxZoom: 19,
  },
};

const STORAGE_KEY = "fontanelle-tile-layer";
const DEFAULT_TILE_LAYER: TileLayerType = "osm";

export default function useTileLayer() {
  const [selectedTileLayer, setSelectedTileLayer] = useState<TileLayerType>(
    () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "cyclosm" || stored === "osm") {
        return stored;
      }
      return DEFAULT_TILE_LAYER;
    },
  );

  // Save to localStorage whenever selection changes
  const selectTileLayer = (layer: TileLayerType) => {
    setSelectedTileLayer(layer);
    localStorage.setItem(STORAGE_KEY, layer);
  };

  return {
    selectedTileLayer,
    selectTileLayer,
    tileLayerConfig: TILE_LAYERS[selectedTileLayer],
  };
}
