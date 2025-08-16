import { LazyApp } from "@/components/LazyApp";
import Script from "next/script";
import { Metadata, Viewport } from "next";
import { generateAppJsonLd } from "../lib/jsonld";
import { createViewport, createMetadata } from "../seo-config";

export const metadata: Metadata = createMetadata({
  title: "Mappa Interattiva",
  description:
    "Usa la mappa interattiva per trovare fontanelle, bagni pubblici, parcheggi per biciclette e parchi giochi in tutta Italia.",
  path: "/app",
});

export const viewport: Viewport = createViewport({ useColorScheme: true });

export default async function AppPage() {
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
