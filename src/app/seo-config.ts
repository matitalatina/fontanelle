import { Metadata, Viewport } from "next";

// Base metadata that all pages will extend
export const BASE_URL = "https://fontanelleitalia.com";
export const APP_NAME = "Fontanelle in Italia";
export const APP_DESCRIPTION =
  "Trova velocemente dove bere in Italia quando sei in bicicletta! Mappa interattiva di fontanelle, case dell'acqua, bagni pubblici, parcheggi per biciclette e parchi giochi in tutta Italia.";
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
export const LOCALE = "it_IT";

// Base metadata object that will be used as a starting point
export const baseMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: `%s - ${APP_NAME}`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  keywords: APP_KEYWORDS,
  authors: [{ name: AUTHOR_NAME }],
  creator: AUTHOR_NAME,
  publisher: AUTHOR_NAME,
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
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
  overrides?: Partial<Metadata>;
}): Metadata {
  const url = `${BASE_URL}${path}`;
  const effectiveSocialDescription = socialDescription || description;

  const pageMetadata: Metadata = {
    alternates: {
      canonical: path,
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
      locale: LOCALE,
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
