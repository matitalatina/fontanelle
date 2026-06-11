"use client";

import { BASE_URL } from "@/app/seo-config";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { trackEvent } from "@/lib/analytics";
import { useI18n } from "@/i18n/I18nProvider";

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

type AppShareStrings = {
  appTitle: string;
  appText: string;
  unableToShareApp: string;
};

export function shareApp(showTooltip: () => void, strings: AppShareStrings) {
  const shareData: ShareData = {
    title: strings.appTitle,
    text: strings.appText,
    url: BASE_URL,
  };

  if (canBrowserShareData(shareData)) {
    navigator.share(shareData);
    trackEvent("share_app");
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(shareData.url);
    showTooltip();
  } else {
    alert(strings.unableToShareApp);
  }
}

export function useTooltip() {
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
  const t = useI18n();

  return (
    <div
      className={` ${
        tooltipIsOpen ? "tooltip tooltip-open" : ""
      } tooltip-bottom`}
      data-tip={t.share.copied}
    >
      <li>
        <a
          onClick={() =>
            shareApp(showTooltip, {
              appTitle: t.share.appTitle,
              appText: t.share.appText,
              unableToShareApp: t.share.appUnavailable,
            })
          }
        >
          <FontAwesomeIcon icon={faShareNodes} className="mr-2" />{" "}
          {t.app.sharingLabel}
        </a>
      </li>
    </div>
  );
}
