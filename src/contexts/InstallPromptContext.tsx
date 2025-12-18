"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

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

interface InstallPromptContextType {
  deferredPrompt: BeforeInstallPromptEvent | null;
  isInstallable: boolean;
  isIOSDevice: boolean;
  handleInstallClick: () => Promise<void>;
  clearPrompt: () => void;
}

const InstallPromptContext = createContext<
  InstallPromptContextType | undefined
>(undefined);

export function useInstallPrompt() {
  const context = useContext(InstallPromptContext);
  if (context === undefined) {
    throw new Error(
      "useInstallPrompt must be used within an InstallPromptProvider"
    );
  }
  return context;
}

interface InstallPromptProviderProps {
  children: ReactNode;
}

export function InstallPromptProvider({
  children,
}: InstallPromptProviderProps) {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode
    if (isInStandaloneMode()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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

  const clearPrompt = () => {
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  const value: InstallPromptContextType = {
    deferredPrompt,
    isInstallable,
    isIOSDevice,
    handleInstallClick,
    clearPrompt,
  };

  return (
    <InstallPromptContext.Provider value={value}>
      {children}
    </InstallPromptContext.Provider>
  );
}
