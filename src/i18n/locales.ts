export const SUPPORTED_LOCALES = ["it", "en"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "it";

export function isLocale(value: string | null | undefined): value is Locale {
  return value !== null && value !== undefined
    ? (SUPPORTED_LOCALES as readonly string[]).includes(value)
    : false;
}

export function getOpenGraphLocale(locale: Locale): string {
  return locale === "it" ? "it_IT" : "en_US";
}

export function detectLocaleFromHeader(
  acceptLanguage: string | null | undefined,
): Locale {
  const preferences = (acceptLanguage ?? "")
    .split(",")
    .map((entry) => entry.split(";")[0]?.trim())
    .filter(Boolean);

  for (const preference of preferences) {
    if (preference.startsWith("en")) {
      return "en";
    }

    if (preference.startsWith("it")) {
      return "it";
    }
  }

  return DEFAULT_LOCALE;
}
