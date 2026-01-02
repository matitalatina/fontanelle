"use client";

import { isSearchEnabled } from "@/client/MapEntities.service";
import { useState } from "react";
import { useMapEvent } from "react-leaflet/hooks";

export default function DisableSearchAlert() {
  const [showAlert, setShowAlert] = useState(false);
  useMapEvent("zoomend", (evt) => {
    setShowAlert(!isSearchEnabled(evt.target.getZoom()));
  });
  return showAlert ? (
    <div
      role="alert"
      className="backdrop-blur-xs alert alert-warning alert-vertical alert-soft absolute z-4000 right-0 left-0 m-auto mb-4 sm:w-fit w-1/2 shadow-lg top-4 bg-[color-mix(in_oklab,color-mix(in_oklab,var(--alert-color,var(--color-base-content))_8%,var(--color-base-100))_90%,transparent)]"
    >
      <h3 className="font-bold flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <div>Ricerca in pausa</div>
      </h3>
      <div className="text-xs">
        L&apos;area visualizzata è troppo grande. Aumenta lo zoom riattivare la
        ricerca.
      </div>
    </div>
  ) : null;
}
