import { APP_NAME, AUTHOR_NAME, BASE_URL } from "../seo-config";

export function generateAppJsonLd({
  title = APP_NAME,
  description,
  targetPath = `${BASE_URL}/app`,
}: {
  title?: string;
  description: string;
  targetPath?: string;
}) {
  const target =
    targetPath.startsWith("http://") || targetPath.startsWith("https://")
      ? targetPath
      : `${BASE_URL}${targetPath}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    description,
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
      target,
    },
  };
}

export function generateFAQJsonLd(
  items: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
