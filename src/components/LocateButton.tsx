import { LocationState } from "@/hooks/useLocation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";

export default function LocateButton({
  onClick,
  locationState,
}: {
  onClick: () => void;
  locationState: LocationState;
}) {
  const zIndex = 4000;
  const positionStyle = `absolute bottom-8 right-4`;
  const t = useTranslations('app');

  if (locationState.status === "loading") {
    return (
      <div
        className={`tooltip tooltip-open tooltip-left ${positionStyle} tooltip-primary opacity-90`}
        style={{ zIndex }}
      >
        <div className="tooltip-content">
          <div className="shine-text-primary animate-shine">
            {t('locationLoading')}
          </div>
        </div>
        <button
          type="button"
          className="btn btn-circle btn-primary w-14 h-14 shadow-xl pointer-events-none"
          aria-label={t('locationLoading')}
        >
          <span className="loading loading-ring"></span>
        </button>
      </div>
    );
  }
  if (locationState.status === "error") {
    let message = null;

    switch (locationState.code) {
      case GeolocationPositionError.PERMISSION_DENIED:
        message = t('locationPermissionDenied');
        break;
      case GeolocationPositionError.POSITION_UNAVAILABLE:
        message = t('locationUnavailable');
        break;
      case GeolocationPositionError.TIMEOUT:
        message = t('locationTimeout');
        break;
      default:
        message = t('locationError');
    }

    return (
      <div
        className={`tooltip tooltip-open tooltip-error ${positionStyle} tooltip-left`}
        data-tip={message}
        style={{ zIndex }}
      >
        <button
          type="button"
          className="btn btn-circle btn-primary w-14 h-14 shadow-xl"
          onClick={onClick}
          aria-label={message ?? t('locationError')}
        >
          <FontAwesomeIcon icon={faLocationCrosshairs} size="lg" />
        </button>
      </div>
    );
  }
  return (
    <button
      type="button"
      className={`btn btn-circle btn-primary ${positionStyle} w-14 h-14 shadow-xl`}
      style={{ zIndex }}
      onClick={onClick}
      aria-label={t('locateMe')}
    >
      <FontAwesomeIcon icon={faLocationCrosshairs} size="lg" />
    </button>
  );
}
