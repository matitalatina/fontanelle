"use client";

import { BASE_URL } from "@/app/seo-config";
import { LatLng } from "@/hooks/useLocation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { trackEvent } from "@/lib/analytics";
import { useI18n } from "@/i18n/I18nProvider";

type ShareData = {
  title: string;
  text: string;
};

function canBrowserShareData(data: ShareData): boolean {
  if (!navigator.share || !navigator.canShare) {
    return false;
  }

  return navigator.canShare(data);
}

function sharePosition(
  latLng: LatLng,
  markerType: string,
  strings: {
    positionTitle: string;
    positionPrefix: string;
    positionSuffix: string;
    unableToSharePosition: string;
  },
  showTooltip: () => void,
) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latLng.lat}%2C${latLng.lng}`;
  const message = `${strings.positionPrefix} ${markerType}: ${googleMapsUrl}

---

${strings.positionSuffix} ${BASE_URL}`;

  const shareData: ShareData = {
    title: strings.positionTitle,
    text: message,
  };

  if (canBrowserShareData(shareData)) {
    navigator.share(shareData);
    trackEvent("share_position", {
      markerType,
    });
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(message);
    showTooltip();
  } else {
    alert(strings.unableToSharePosition);
  }
}

export default function SharePositionButton({
  latLng,
  markerType,
}: {
  latLng: LatLng;
  markerType: string;
}) {
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
  const t = useI18n();

  function showTooltip() {
    setTooltipIsOpen(true);
    setTimeout(() => {
      setTooltipIsOpen(false);
    }, 2000);
  }

  return (
    <div
      className={`${
        tooltipIsOpen ? "tooltip tooltip-open" : ""
      } tooltip-bottom`}
      data-tip={t.share.shared}
    >
      <button
        className="btn btn-outline"
        aria-label={t.app.sharingLabel}
        onClick={() =>
          sharePosition(
            latLng,
            markerType,
            {
              positionTitle: t.share.positionTitle,
              positionPrefix: t.share.positionPrefix,
              positionSuffix: t.share.positionSuffix,
              unableToSharePosition: t.share.positionUnavailable,
            },
            showTooltip,
          )
        }
      >
        <FontAwesomeIcon icon={faShareAlt} />
      </button>
    </div>
  );
}
