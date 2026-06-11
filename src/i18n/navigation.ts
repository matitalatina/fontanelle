import type { Locale } from "./locales";

export function localizedPath(locale: Locale, path: string): string {
  if (!path || path === "/") {
    return `/${locale}`;
  }

  return path.startsWith("/") ? `/${locale}${path}` : `/${locale}/${path}`;
}
