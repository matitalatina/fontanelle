"use client";

import { shareApp, useTooltip } from "@/components/ShareAppMenuItem";

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
        <i className="fa-solid fa-share-nodes mr-2"></i>
        Condividi App
      </button>
    </div>
  );
}
