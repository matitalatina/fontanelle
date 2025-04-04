"use client";
import Map from "./Map";
import ShareAppMenuItem from "./ShareAppMenuItem";
import TileLayerSelector from "./TileLayerSelector";
import useTileLayer from "@/hooks/useTileLayer";

export default function App() {
  const { selectedTileLayer, selectTileLayer } = useTileLayer();

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-1 z-0">
        <main className="flex flex-1">
          <label
            htmlFor="my-drawer"
            className="btn drawer-button absolute top-4 left-4 w-auto bg-base-100 shadow-xl"
            style={{ zIndex: 4000 }}
          >
            <i className="fa-solid fa-bars"></i>
          </label>
          <Map
            className="flex-auto"
            stations={[]}
            toilets={[]}
            bicycleParkings={[]}
            tileLayer={selectedTileLayer}
          />
        </main>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu menu-lg bg-base-200 text-base-content min-h-full w-80 p-4">
          <ShareAppMenuItem />
          <li className="menu-title mt-4">
            <span>Impostazioni</span>
          </li>
          <li>
            <details>
              <summary>
                <i className="fas fa-map fa-sm mr-2"></i>
                Stile mappa
              </summary>
              <TileLayerSelector
                selectedTileLayer={selectedTileLayer}
                onChange={selectTileLayer}
              />
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}
