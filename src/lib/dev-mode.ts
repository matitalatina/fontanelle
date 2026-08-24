const DEV_MODE_KEY = "fontanelle-dev-mode";

export function isDevMode(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return window.localStorage.getItem(DEV_MODE_KEY) === "true";
}

export function setDevMode(enabled: boolean): void {
  if (typeof window === "undefined") {
    return;
  }
  if (enabled) {
    window.localStorage.setItem(DEV_MODE_KEY, "true");
  } else {
    window.localStorage.removeItem(DEV_MODE_KEY);
  }
}
