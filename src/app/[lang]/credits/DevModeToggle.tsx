"use client";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import { isDevMode, setDevMode } from "@/lib/dev-mode";

const REQUIRED_CLICKS = 10;
const TOAST_DURATION_MS = 4000;

export default function DevModeHeading() {
  const t = useTranslations("credits");
  const clickCount = useRef(0);
  const toastTimeout = useRef<number | null>(null);
  const [toast, setToast] = useState<
    "enabled" | "disabled" | "progress" | null
  >(null);
  const [remainingClicks, setRemainingClicks] = useState(0);

  useEffect(() => {
    return () => {
      if (toastTimeout.current !== null) {
        clearTimeout(toastTimeout.current);
      }
    };
  }, []);

  const showToast = (value: "enabled" | "disabled" | "progress") => {
    if (toastTimeout.current !== null) {
      clearTimeout(toastTimeout.current);
    }
    setToast(value);
    toastTimeout.current = window.setTimeout(() => {
      setToast(null);
      toastTimeout.current = null;
    }, TOAST_DURATION_MS);
  };

  const handleClick = () => {
    clickCount.current += 1;
    if (clickCount.current < REQUIRED_CLICKS) {
      const remaining = REQUIRED_CLICKS - clickCount.current;
      if (clickCount.current >= REQUIRED_CLICKS / 2) {
        setRemainingClicks(remaining);
        showToast("progress");
      }
      return;
    }
    clickCount.current = 0;
    const enabled = !isDevMode();
    setDevMode(enabled);
    showToast(enabled ? "enabled" : "disabled");
  };

  return (
    <>
      <h2
        className="card-title cursor-pointer select-none"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faCode} className="text-primary mr-2" />
        {t("developmentTitle")}
      </h2>
      {toast && (
        <div className="toast toast-center z-[5000]">
          <div
            className={`alert ${
              toast === "enabled"
                ? "alert-success"
                : toast === "disabled"
                  ? "alert-warning"
                  : "alert-info"
            }`}
          >
            <span>
              {t(
                toast === "enabled"
                  ? "devModeEnabled"
                  : toast === "disabled"
                    ? "devModeDisabled"
                    : "devModeProgress",
                { count: remainingClicks },
              )}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
