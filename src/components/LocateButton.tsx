import { LocationState } from "@/hooks/useLocation";

export default function LocateButton({
  onClick,
  locationState,
}: {
  onClick: () => void;
  locationState: LocationState;
}) {
  const zIndex = 4000;
  const positionStyle = `absolute bottom-8 right-4`;

  if (locationState.status === "loading") {
    return (
      <button
        type="button"
        className={`btn btn-circle btn-primary ${positionStyle}`}
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
        className={`tooltip tooltip-open tooltip-error ${positionStyle} tooltip-left`}
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
      className={`btn btn-circle btn-primary ${positionStyle}`}
      style={{ zIndex }}
      onClick={onClick}
    >
      <i className="fas fa-location-crosshairs fa-lg"></i>
    </button>
  );
}
