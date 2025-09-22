"use client";

import { shareApp, useTooltip } from "@/components/ShareAppMenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";

export default function ShareAppButton() {
  const { tooltipIsOpen, showTooltip } = useTooltip();

  return (
    <div
      className={`${
        tooltipIsOpen ? "tooltip tooltip-open" : ""
      } tooltip-bottom w-full`}
      data-tip="Link copiato"
    >
      <button
        onClick={() => shareApp(showTooltip)}
        className="btn btn-outline btn-sm w-full"
      >
        <FontAwesomeIcon icon={faShareNodes} className="mr-2" />
        Condividi App
      </button>
    </div>
  );
}
