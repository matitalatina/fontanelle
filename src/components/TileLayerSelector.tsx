import { TileLayerType } from "@/hooks/useTileLayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMap,
  faMapMarkedAlt,
  faBicycle,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";

export interface TileLayerSelectorProps {
  selectedTileLayer: TileLayerType;
  onChange: (layer: TileLayerType) => void;
}

export default function TileLayerSelector({
  selectedTileLayer,
  onChange,
}: TileLayerSelectorProps) {
  const t = useTranslations('common');

  return (
    <li>
      <details>
        <summary>
          <FontAwesomeIcon icon={faMap} className="mr-2" />
          {t('mapStyle')}
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
              <span>{t('openStreetMap')}</span>
            </a>
          </li>
          <li>
            <a
              className={selectedTileLayer === "cyclosm" ? "menu-active" : ""}
              onClick={() => onChange("cyclosm")}
            >
              <FontAwesomeIcon icon={faBicycle} size="sm" className="mr-2" />
              <span>{t('cyclosm')}</span>
            </a>
          </li>
        </ul>
      </details>
    </li>
  );
}
