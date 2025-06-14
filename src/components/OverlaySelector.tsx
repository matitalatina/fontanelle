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
  return (
    <div
      className="collapse absolute top-4 right-4 w-auto bg-base-100 rounded-box shadow-xl"
      style={{ zIndex: 4000 }}
    >
      <input
        type="checkbox"
        id="overlay-selector"
        className="peer absolute top-0 h-14"
      />
      <div className="collapse-title p-0 mx-auto w-4 min-h-14 top-5">
        <i className="fas fa-layer-group fa-lg"></i>
      </div>
      <div className="collapse-content px-2 mt-0.5 peer-checked:pb-2">
        <div className="join join-vertical">
          <button
            className={`btn join-item px-2 ${
              selectedOverlays.stations ? "btn-neutral dark:btn-primary" : ""
            }`}
            onClick={() =>
              onChange({
                ...selectedOverlays,
                stations: !selectedOverlays.stations,
              })
            }
          >
            <i className="fas fa-faucet-drip fa-lg" />
          </button>
          <button
            className={`btn join-item px-2 ${
              selectedOverlays.toilets ? "btn-neutral dark:btn-primary" : ""
            }`}
            onClick={() =>
              onChange({
                ...selectedOverlays,
                toilets: !selectedOverlays.toilets,
              })
            }
          >
            <i className="fas fa-restroom fa-lg" />
          </button>
          <button
            className={`btn join-item px-2 ${
              selectedOverlays.bicycleParkings
                ? "btn-neutral dark:btn-primary"
                : ""
            }`}
            onClick={() =>
              onChange({
                ...selectedOverlays,
                bicycleParkings: !selectedOverlays.bicycleParkings,
              })
            }
          >
            <i className="fas fa-parking" />
          </button>
          <button
            className={`btn join-item px-2 ${
              selectedOverlays.playgrounds ? "btn-neutral dark:btn-primary" : ""
            }`}
            onClick={() =>
              onChange({
                ...selectedOverlays,
                playgrounds: !selectedOverlays.playgrounds,
              })
            }
          >
            <i className="fas fa-futbol" />
          </button>
        </div>
      </div>
    </div>
  );
}
