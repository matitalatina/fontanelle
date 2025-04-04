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
    <div
      tabIndex={0}
      className="collapse absolute top-4 right-20 w-auto bg-base-100 rounded-box shadow-xl"
      style={{ zIndex: 4000 }}
    >
      <input type="checkbox" className="absolute peer" />
      <div className="collapse-title p-0 mx-auto w-4 min-h-14 top-5">
        <i className="fas fa-map fa-lg"></i>
      </div>
      <div className="collapse-content px-2 peer-checked:pb-2 w-14 peer-checked:w-auto">
        <div className="join join-vertical">
          <button
            className={`btn join-item px-2 ${
              selectedTileLayer === "osm" ? "btn-neutral" : ""
            }`}
            onClick={() => onChange("osm")}
          >
            <span className="text-xs mr-1">OSM</span>
            <i className="fas fa-map-marked-alt fa-sm" />
          </button>
          <button
            className={`btn join-item px-2 ${
              selectedTileLayer === "cyclosm" ? "btn-neutral" : ""
            }`}
            onClick={() => onChange("cyclosm")}
          >
            <span className="text-xs mr-1">CyclOSM</span>
            <i className="fas fa-bicycle fa-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}
