import { TileLayerType } from "@/hooks/useTileLayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMap,
  faMapMarkedAlt,
  faBicycle,
} from "@fortawesome/free-solid-svg-icons";

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
          <FontAwesomeIcon icon={faMap} size="sm" className="mr-2" />
          Stile mappa
        </summary>
        <ul>
          <li>
            <a
              className={selectedTileLayer === "osm" ? "menu-active" : ""}
              onClick={() => onChange("osm")}
            >
              <FontAwesomeIcon
                icon={faMapMarkedAlt}
                size="sm"
                className="mr-2"
              />
              <span>OpenStreetMap</span>
            </a>
          </li>
          <li>
            <a
              className={selectedTileLayer === "cyclosm" ? "menu-active" : ""}
              onClick={() => onChange("cyclosm")}
            >
              <FontAwesomeIcon icon={faBicycle} size="sm" className="mr-2" />
              <span>CyclOSM</span>
            </a>
          </li>
        </ul>
      </details>
    </li>
  );
}
