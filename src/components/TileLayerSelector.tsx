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
    <li>
      <details>
        <summary>
          <i className="fas fa-map fa-sm mr-2"></i>
          Stile mappa
        </summary>
        <ul>
          <li>
            <a
              className={selectedTileLayer === "osm" ? "menu-active" : ""}
              onClick={() => onChange("osm")}
            >
              <i className="fas fa-map-marked-alt fa-sm mr-2" />
              <span>OpenStreetMap</span>
            </a>
          </li>
          <li>
            <a
              className={selectedTileLayer === "cyclosm" ? "menu-active" : ""}
              onClick={() => onChange("cyclosm")}
            >
              <i className="fas fa-bicycle fa-sm mr-2" />
              <span>CyclOSM</span>
            </a>
          </li>
        </ul>
      </details>
    </li>
  );
}
