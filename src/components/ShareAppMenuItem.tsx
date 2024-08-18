"use client";

import { use, useEffect, useState } from "react";

type ShareData = {
  title: string;
  text: string;
  url: string;
};

function canBrowserShareData(data: ShareData): boolean {
  if (!navigator.share || !navigator.canShare) {
    return false;
  }

  return navigator.canShare(data);
}

function shareApp(showTooltip: () => void) {
  const shareData: ShareData = {
    title: "Fontanelle Milano",
    text: "Trova velocemente dove bere a Milano",
    url: "https://fontanellemilano.mattianatali.com",
  };

  if (canBrowserShareData(shareData)) {
    navigator.share(shareData);
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(shareData.url);
    showTooltip();
  } else {
    alert("Non è possibile condividere l'app");
  }
}

function useTooltip() {
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);

  function showTooltip() {
    setTooltipIsOpen(true);
    setTimeout(() => {
      setTooltipIsOpen(false);
    }, 2000);
  }

  return { tooltipIsOpen, showTooltip };
}

export default function ShareAppMenuItem() {
  const { tooltipIsOpen, showTooltip } = useTooltip();

  return (
    <div
      className={` ${
        tooltipIsOpen ? "tooltip tooltip-open" : ""
      } tooltip-bottom`}
      data-tip="Link copiato"
    >
      <li>
        <a onClick={() => shareApp(showTooltip)}>
          <i className="fa-solid fa-share-nodes"></i> Condividi App
        </a>
      </li>
    </div>
  );
}
