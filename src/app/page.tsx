import { LazyApp } from "@/components/LazyApp";
import Script from "next/script";
import { Metadata, Viewport } from "next";
import { generateAppJsonLd } from "./lib/jsonld";
import { APP_NAME, BASE_URL, createViewport, LOCALE } from "./seo-config";

export const metadata: Metadata = {
  title: APP_NAME,
  openGraph: {
    title: APP_NAME,
    url: BASE_URL,
    locale: LOCALE,
    type: "website",
    siteName: APP_NAME,
  },
  twitter: {
    title: APP_NAME,
    card: "summary_large_image",
  },
};

export const viewport: Viewport = createViewport({ useColorScheme: true });

export default async function Home() {
  return (
    <>
      <Script
        id="schema-org-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateAppJsonLd()),
        }}
      />
      <LazyApp />
    </>
  );
}
