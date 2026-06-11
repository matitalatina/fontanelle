"use client";

import { useRef } from "react";
import { useInstallPrompt } from "@/contexts/InstallPromptContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faPlusSquare,
  faMobileScreen,
} from "@fortawesome/free-solid-svg-icons";
import { useI18n } from "@/i18n/I18nProvider";

// Safari Share Icon Component
function SafariShareIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="inline-block mx-1 text-blue-500"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

export default function AddToHome() {
  const { isInstallable, isIOSDevice, handleInstallClick } = useInstallPrompt();
  const modalRef = useRef<HTMLDialogElement>(null);
  const t = useI18n();

  const handleClick = async () => {
    // For iOS devices, show the modal with instructions
    if (isIOSDevice) {
      modalRef.current?.showModal();
      return;
    }

    // For Android/other platforms, use the context handler
    await handleInstallClick();
  };

  // Only render if the app is installable
  if (!isInstallable) {
    return null;
  }

  return (
    <>
      <li>
        <a onClick={handleClick}>
          <FontAwesomeIcon icon={faDownload} className="mr-2" />{" "}
          {t.app.installApp}
        </a>
      </li>

      {/* iOS Installation Modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box max-w-sm">
          <h3 className="font-bold text-xl text-center mb-2">
            {t.app.installTitle}
          </h3>
          <p className="text-center text-sm text-base-content/70 mb-6">
            {t.app.installSubtitle}
          </p>

          <div className="space-y-4">
            {/* Step 1 */}
            <div className="flex gap-4 items-center">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">1</span>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <span className="text-sm">{t.app.installStep1}</span>
                <SafariShareIcon />
                <span className="text-sm">{t.app.installStep2}</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">2</span>
              </div>
              <div className="flex-1">
                <p className="text-sm leading-relaxed">
                  {t.app.installStep2}
                  <br />
                  <span className="inline-flex items-center gap-1 mt-1">
                    <span className="font-medium">
                      {t.app.installMenuAction}
                    </span>
                    <FontAwesomeIcon
                      icon={faPlusSquare}
                      className="text-base ml-1"
                    />
                  </span>
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4 items-center">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">3</span>
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  {t.app.installStep3}{" "}
                  <span className="font-medium">{t.app.installAction}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="divider my-6"></div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-base-200 rounded-xl mb-3">
              <FontAwesomeIcon icon={faMobileScreen} className="text-xl" />
            </div>
            <p className="text-xs text-base-content/60">
              {t.app.installedHint}
            </p>
          </div>

          <div className="modal-action mt-6">
            <form method="dialog" className="w-full">
              <button className="btn btn-primary btn-block">
                {t.common.close}
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
