"use client";
import Map from "./Map";
import ShareAppMenuItem from "./ShareAppMenuItem";
import AddToHome from "./AddToHome";
import TileLayerSelector from "./TileLayerSelector";
import useTileLayer from "@/hooks/useTileLayer";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBookOpen,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useI18n, useLocale } from "@/i18n/I18nProvider";
import { localizedPath } from "@/i18n/navigation";

export default function App() {
  const { selectedTileLayer, selectTileLayer } = useTileLayer();
  const t = useI18n();
  const locale = useLocale();

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
        <ul
          className="menu menu-xl bg-base-200/85 backdrop-blur-sm text-base-content min-h-full w-80"
          aria-label={t.app.appMenuLabel}
        >
          <ThemeToggle />
          <TileLayerSelector
            selectedTileLayer={selectedTileLayer}
            onChange={selectTileLayer}
          />
          <li>
            <Link href={localizedPath(locale, "/legend")}>
              <FontAwesomeIcon icon={faBookOpen} className="mr-2" />{" "}
              {t.common.legend}
            </Link>
          </li>
          <li>
            <Link href={localizedPath(locale, "/credits")}>
              <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />{" "}
              {t.common.credits}
            </Link>
          </li>
          <div className="flex-1"></div>
          <AddToHome />
          <ShareAppMenuItem />
          <LanguageSwitcher />
        </ul>
      </div>
    </div>
  );
}
