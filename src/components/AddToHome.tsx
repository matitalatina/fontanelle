"use client";

import { useEffect, useState, useRef } from "react";

// Type for the BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

// Type for the getInstalledRelatedApps API
interface NavigatorWithRelatedApps extends Navigator {
  getInstalledRelatedApps?: () => Promise<
    Array<{ id?: string; platform?: string; url?: string }>
  >;
}

// Type for window with MSStream (for IE detection)
interface WindowWithMSStream extends Window {
  MSStream?: unknown;
}

// Type for navigator with standalone property (iOS Safari)
interface NavigatorWithStandalone extends Navigator {
  standalone?: boolean;
}

// Check if the device is iOS
function isIOS(): boolean {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as WindowWithMSStream).MSStream
  );
}

// Check if the app is running in standalone mode (already installed)
function isInStandaloneMode(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as NavigatorWithStandalone).standalone === true
  );
}

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
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    // Check if already in standalone mode
    if (isInStandaloneMode()) {
      setIsInstallable(false);
      return;
    }

    // Check if iOS device
    if (isIOS()) {
      setIsIOSDevice(true);
      setIsInstallable(true);
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the browser from displaying the default install dialog
      e.preventDefault();

      // Stash the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    // Listen for the beforeinstallprompt event
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Check if app is already installed (for supporting browsers)
    const navigatorWithApps = navigator as NavigatorWithRelatedApps;
    if (navigatorWithApps.getInstalledRelatedApps) {
      navigatorWithApps.getInstalledRelatedApps().then((apps) => {
        if (apps.length > 0) {
          setIsInstallable(false);
        }
      });
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    // For iOS devices, show the modal with instructions
    if (isIOSDevice) {
      modalRef.current?.showModal();
      return;
    }

    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
      // Clear the deferredPrompt since it can't be used again
      setDeferredPrompt(null);
      setIsInstallable(false);
    } else {
      console.log("User dismissed the install prompt");
    }
  };

  // Only render if the app is installable
  if (!isInstallable) {
    return null;
  }

  return (
    <>
      <li>
        <a onClick={handleInstallClick}>
          <i className="fa-solid fa-download"></i> Installa App
        </a>
      </li>

      {/* iOS Installation Modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box max-w-sm">
          <h3 className="font-bold text-xl text-center mb-2">
            Installa Fontanelle
          </h3>
          <p className="text-center text-sm text-base-content/70 mb-6">
            Aggiungi l&apos;app alla tua schermata Home
          </p>

          <div className="space-y-4">
            {/* Step 1 */}
            <div className="flex gap-4 items-center">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">1</span>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <span className="text-sm">Tocca</span>
                <SafariShareIcon />
                <span className="text-sm">in basso</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">2</span>
              </div>
              <div className="flex-1">
                <p className="text-sm leading-relaxed">
                  Scorri e seleziona
                  <br />
                  <span className="inline-flex items-center gap-1 mt-1">
                    <span className="font-medium">Aggiungi a Home</span>
                    <i className="fa-solid fa-plus-square text-base ml-1"></i>
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
                  Conferma toccando{" "}
                  <span className="font-medium">Aggiungi</span>
                </p>
              </div>
            </div>
          </div>

          <div className="divider my-6"></div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-base-200 rounded-xl mb-3">
              <i className="fa-solid fa-mobile-screen text-xl"></i>
            </div>
            <p className="text-xs text-base-content/60">
              L&apos;app apparirà nella tua schermata Home
            </p>
          </div>

          <div className="modal-action mt-6">
            <form method="dialog" className="w-full">
              <button className="btn btn-primary btn-block">Ho capito</button>
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
