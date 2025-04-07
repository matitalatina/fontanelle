import {
  APP_DESCRIPTION,
  APP_NAME,
  AUTHOR_NAME,
  BASE_URL,
} from "../seo-config";

export function generateAppJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: APP_NAME,
    description: APP_DESCRIPTION,
    url: BASE_URL,
    applicationCategory: "Map, Utility",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
    },
    potentialAction: {
      "@type": "ViewAction",
      target: BASE_URL,
    },
  };
}
