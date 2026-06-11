import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup,
  faFaucetDrip,
  faRestroom,
  faParking,
  faFutbol,
} from "@fortawesome/free-solid-svg-icons";
import { useI18n } from "@/i18n/I18nProvider";

export type AvailableOverlay =
  | "stations"
  | "toilets"
  | "bicycleParkings"
  | "playgrounds";
export type SelectedOverlays = {
  [key in AvailableOverlay]: boolean;
};
export type OverlaySelectorProps = {
  selectedOverlays: SelectedOverlays;
  onChange: (overlay: SelectedOverlays) => void;
};
export default function OverlaySelector({
  selectedOverlays,
  onChange,
}: OverlaySelectorProps) {
  const t = useI18n();

  return (
    <div
      className="collapse absolute top-4 right-4 w-auto bg-base-100 rounded-box shadow-xl"
      style={{ zIndex: 4000 }}
    >
      <input
        type="checkbox"
        id="overlay-selector"
        className="peer absolute top-0 h-14 w-14"
      />
      <div className="collapse-title p-0 min-h-14 w-14 flex items-center justify-center">
        <FontAwesomeIcon icon={faLayerGroup} size="lg" />
      </div>
      <div className="collapse-content px-2 mt-0.5 peer-checked:pb-2">
        <div className="sr-only">{t.app.overlayLabel}</div>
        <div className="join join-vertical">
          <button
            className={`btn join-item px-2 ${
              selectedOverlays.stations ? "btn-neutral dark:btn-primary" : ""
            }`}
            aria-label={t.app.overlays.stations}
            onClick={() =>
              onChange({
                ...selectedOverlays,
                stations: !selectedOverlays.stations,
              })
            }
          >
            <FontAwesomeIcon icon={faFaucetDrip} size="lg" />
          </button>
          <button
            className={`btn join-item px-2 ${
              selectedOverlays.toilets ? "btn-neutral dark:btn-primary" : ""
            }`}
            aria-label={t.app.overlays.toilets}
            onClick={() =>
              onChange({
                ...selectedOverlays,
                toilets: !selectedOverlays.toilets,
              })
            }
          >
            <FontAwesomeIcon icon={faRestroom} size="lg" />
          </button>
          <button
            className={`btn join-item px-2 ${
              selectedOverlays.bicycleParkings
                ? "btn-neutral dark:btn-primary"
                : ""
            }`}
            aria-label={t.app.overlays.bicycleParkings}
            onClick={() =>
              onChange({
                ...selectedOverlays,
                bicycleParkings: !selectedOverlays.bicycleParkings,
              })
            }
          >
            <FontAwesomeIcon icon={faParking} />
          </button>
          <button
            className={`btn join-item px-2 ${
              selectedOverlays.playgrounds ? "btn-neutral dark:btn-primary" : ""
            }`}
            aria-label={t.app.overlays.playgrounds}
            onClick={() =>
              onChange({
                ...selectedOverlays,
                playgrounds: !selectedOverlays.playgrounds,
              })
            }
          >
            <FontAwesomeIcon icon={faFutbol} />
          </button>
        </div>
      </div>
    </div>
  );
}
