import { useEffect, useState } from "react";

export type TileLayerType = "cyclosm" | "osm";

export interface TileLayerConfig {
  name: string;
  url: string;
  attribution: string;
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

const STORAGE_KEY = "fontanelle-tile-layer";
const DEFAULT_TILE_LAYER: TileLayerType = "osm";

export default function useTileLayer() {
  const [selectedTileLayer, setSelectedTileLayer] =
    useState<TileLayerType>(DEFAULT_TILE_LAYER);

  // Load from localStorage on initial render
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && (stored === "cyclosm" || stored === "osm")) {
      setSelectedTileLayer(stored);
    }
  }, []);

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
