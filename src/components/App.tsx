"use client";
import Map from "./Map";
import ShareAppMenuItem from "./ShareAppMenuItem";
import AddToHome from "./AddToHome";
import TileLayerSelector from "./TileLayerSelector";
import useTileLayer from "@/hooks/useTileLayer";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBookOpen,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function App() {
  const { selectedTileLayer, selectTileLayer } = useTileLayer();

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-1 z-0">
        <main className="flex flex-1">
          <label
            htmlFor="my-drawer"
            className="btn drawer-button absolute top-4 left-4 w-14 h-14 bg-base-100 rounded-box shadow-xl"
            style={{ zIndex: 4000 }}
          >
            <FontAwesomeIcon icon={faBars} />
          </label>
          <Map className="flex-auto" tileLayer={selectedTileLayer} />
        </main>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu menu-xl bg-base-200 text-base-content min-h-full w-80">
          <TileLayerSelector
            selectedTileLayer={selectedTileLayer}
            onChange={selectTileLayer}
          />
          <li>
            <Link href="/legend">
              <FontAwesomeIcon icon={faBookOpen} className="mr-2" /> Legenda
            </Link>
          </li>
          <li>
            <Link href="/credits">
              <FontAwesomeIcon icon={faInfoCircle} className="mr-2" /> Crediti
            </Link>
          </li>
          <div className="flex-1"></div>
          <AddToHome />
          <ShareAppMenuItem />
        </ul>
      </div>
    </div>
  );
}
