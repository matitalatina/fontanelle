import { Metadata, Viewport } from "next";
import {
  DEFAULT_LOCALE,
  getOpenGraphLocale,
  type Locale,
  SUPPORTED_LOCALES,
} from "@/i18n/locales";
import { localizedPath } from "@/i18n/navigation";

// Base metadata that all pages will extend
export const BASE_URL = "https://fontanelleitalia.com";
export const APP_NAME = "Fontanelle in Italia";
export const APP_DESCRIPTION =
  "Interactive map for drinking fountains, public toilets, bike parking, and playgrounds across Italy.";
export const APP_KEYWORDS = [
  "fontanelle",
  "Italia",
  "acqua potabile",
  "ciclisti",
  "bicicletta",
  "Milano",
  "case dell'acqua",
  "bagni pubblici",
  "parcheggi bici",
  "mappa",
  "OpenStreetMap",
  "parchi giochi",
  "aree giochi",
  "bambini",
];
export const AUTHOR_NAME = "Mattia Natali";
export const AUTHOR_TWITTER = "@matitalatina";
export const THEME_COLOR = "#74c0fc";
export const DARK_THEME_COLOR = "#1971c2";
export const LOCALE = getOpenGraphLocale(DEFAULT_LOCALE);

// Base metadata object that will be used as a starting point
export const baseMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: `%s - ${APP_NAME}`,
    default: APP_NAME,
  },
  keywords: APP_KEYWORDS,
  authors: [{ name: AUTHOR_NAME }],
  creator: AUTHOR_NAME,
  publisher: AUTHOR_NAME,
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
  },
  twitter: {
    card: "summary_large_image",
    creator: AUTHOR_TWITTER,
  },
  category: "Maps & Navigation",
};

// Base viewport object
export const baseViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

// Function to create viewport for a specific page
export function createViewport({
  themeColor = THEME_COLOR,
  darkThemeColor = DARK_THEME_COLOR,
  width = "device-width",
  initialScale = 1,
  maximumScale = 5,
  userScalable = true,
  useColorScheme = false,
  overrides = {},
}: {
  themeColor?: string;
  darkThemeColor?: string;
  width?: string;
  initialScale?: number;
  maximumScale?: number;
  userScalable?: boolean;
  useColorScheme?: boolean;
  overrides?: Partial<Viewport>;
} = {}): Viewport {
  const viewportConfig: Viewport = {
    width,
    initialScale,
    maximumScale,
    userScalable,
  };

  // Add theme color with media queries for light/dark mode
  if (useColorScheme) {
    viewportConfig.themeColor = [
      { media: "(prefers-color-scheme: light)", color: themeColor },
      { media: "(prefers-color-scheme: dark)", color: darkThemeColor },
    ];
  } else {
    viewportConfig.themeColor = themeColor;
  }

  // Merge with any custom overrides
  return {
    ...viewportConfig,
    ...overrides,
  };
}

// Function to create metadata for a specific page
export function createMetadata({
  locale = DEFAULT_LOCALE,
  title,
  description = APP_DESCRIPTION,
  socialDescription,
  keywords,
  path = "/",
  overrides = {},
}: {
  title?: string;
  description?: string;
  socialDescription?: string;
  keywords?: string[];
  path?: string;
  locale?: Locale;
  overrides?: Partial<Metadata>;
}): Metadata {
  const url = `${BASE_URL}${localizedPath(locale, path)}`;
  const effectiveSocialDescription = socialDescription || description;
  const localizedAlternates = Object.fromEntries(
    SUPPORTED_LOCALES.map((supportedLocale) => [
      supportedLocale,
      `${BASE_URL}${localizedPath(supportedLocale, path)}`,
    ]),
  ) as Record<Locale, string>;

  const pageMetadata: Metadata = {
    alternates: {
      canonical: `${BASE_URL}${localizedPath(locale, path)}`,
      languages: localizedAlternates,
    },
  };

  // Only add title if provided (otherwise use template from baseMetadata)
  if (title) {
    pageMetadata.title = title;
  }

  // Only add description if different from base
  if (description !== APP_DESCRIPTION) {
    pageMetadata.description = description;
  }

  // Add keywords if provided
  if (keywords) {
    pageMetadata.keywords = keywords;
  }

  // Add OpenGraph and Twitter metadata
  if (
    title ||
    description !== APP_DESCRIPTION ||
    path !== "/" ||
    socialDescription ||
    keywords
  ) {
    pageMetadata.openGraph = {
      url,
      title: title || APP_NAME,
      description: effectiveSocialDescription,
      locale: getOpenGraphLocale(locale),
      type: "website",
      siteName: APP_NAME,
    };

    pageMetadata.twitter = {
      title: title || APP_NAME,
      description: effectiveSocialDescription,
      card: "summary_large_image",
    };
  }

  // Merge with any custom overrides
  return {
    ...pageMetadata,
    ...overrides,
  };
}
