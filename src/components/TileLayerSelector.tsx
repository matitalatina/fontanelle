import { TileLayerType } from "@/hooks/useTileLayer";

export interface TileLayerSelectorProps {
  selectedTileLayer: TileLayerType;
  onChange: (layer: TileLayerType) => void;
}

export default function TileLayerSelector({
  selectedTileLayer,
  onChange,
}: TileLayerSelectorProps) {
  return (
    <ul className="menu menu-compact">
      <li>
        <a
          className={selectedTileLayer === "osm" ? "active" : ""}
          onClick={() => onChange("osm")}
        >
          <i className="fas fa-map-marked-alt fa-sm mr-2" />
          <span>OpenStreetMap</span>
        </a>
      </li>
      <li>
        <a
          className={selectedTileLayer === "cyclosm" ? "active" : ""}
          onClick={() => onChange("cyclosm")}
        >
          <i className="fas fa-bicycle fa-sm mr-2" />
          <span>CyclOSM</span>
        </a>
      </li>
    </ul>
  );
}
