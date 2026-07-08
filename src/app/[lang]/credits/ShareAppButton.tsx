"use client";

import { shareApp, useTooltip } from "@/components/ShareAppMenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";

export default function ShareAppButton() {
  const { tooltipIsOpen, showTooltip } = useTooltip();
  const t = useTranslations();

  return (
    <div
      className={`${
        tooltipIsOpen ? "tooltip tooltip-open" : ""
      } tooltip-bottom w-full`}
      data-tip={t('share.copied')}
    >
      <button
        onClick={() =>
          shareApp(showTooltip, {
            appTitle: t('share.appTitle'),
            appText: t('share.appText'),
            unableToShareApp: t('share.appUnavailable'),
          })
        }
        className="btn btn-outline btn-sm w-full"
      >
        <FontAwesomeIcon icon={faShareNodes} className="mr-2" />
        {t('credits.shareProjectButton')}
      </button>
    </div>
  );
}
