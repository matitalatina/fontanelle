import { LocationState } from "@/hooks/useLocation";

export default function LocateButton({
  onClick,
  locationState,
}: {
  onClick: () => void;
  locationState: LocationState;
}) {
  const zIndex = 4000;
  if (locationState.status === "loading") {
    return (
      <button
        type="button"
        className="btn btn-circle btn-primary absolute bottom-12 right-4"
        style={{ zIndex }}
        disabled
      >
        <span className="loading loading-ring"></span>
      </button>
    );
  }
  if (locationState.status === "error") {
    let message = null;

    switch (locationState.code) {
      case GeolocationPositionError.PERMISSION_DENIED:
        message = "Permesso negato";
        break;
      case GeolocationPositionError.POSITION_UNAVAILABLE:
        message = "Posizione non disponibile";
        break;
      case GeolocationPositionError.TIMEOUT:
        message = "Timeout";
        break;
      default:
        message = "Error";
    }

    return (
      <div
        className="tooltip tooltip-open tooltip-error absolute bottom-12 right-4 tooltip-left"
        data-tip={message}
        style={{ zIndex }}
      >
        <button
          type="button"
          className="btn btn-circle btn-primary"
          onClick={onClick}
        >
          <i className="fas fa-location-crosshairs fa-lg"></i>
        </button>
      </div>
    );
  }
  return (
    <button
      type="button"
      className="btn btn-circle btn-primary absolute bottom-12 right-4"
      style={{ zIndex }}
      onClick={onClick}
    >
      <i className="fas fa-location-crosshairs fa-lg"></i>
    </button>
  );
}
