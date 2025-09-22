"use client";

import { BASE_URL } from "@/app/seo-config";
import { LatLng } from "@/hooks/useLocation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";

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
  showTooltip: () => void
) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latLng.lat}%2C${latLng.lng}`;
  const message = `Ecco qui ${markerType}: ${googleMapsUrl}

---

L'ho trovato grazie a questa app: ${BASE_URL}`;

  const shareData: ShareData = {
    title: "Posizione",
    text: message,
  };

  if (canBrowserShareData(shareData)) {
    navigator.share(shareData);
    umami.track("share_position", {
      markerType,
    });
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(message);
    showTooltip();
  } else {
    alert("Non è possibile condividere la posizione");
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
      data-tip="Elemento condiviso"
    >
      <button
        className="btn btn-outline"
        onClick={() => sharePosition(latLng, markerType, showTooltip)}
      >
        <FontAwesomeIcon icon={faShareAlt} />
      </button>
    </div>
  );
}
