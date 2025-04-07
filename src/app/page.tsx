import { LazyApp } from "@/components/LazyApp";
import Script from "next/script";
import { Metadata, Viewport } from "next";
import { generateAppJsonLd } from "./lib/jsonld";
import { createViewport } from "./seo-config";

export const metadata: Metadata = {
  title: "Trova dove bere in bicicletta",
  openGraph: {
    title: "Fontanelle in Italia - Trova dove bere in bicicletta",
    images: ["/opengraph-image.jpg"],
  },
  twitter: {
    title: "Fontanelle in Italia - Trova dove bere in bicicletta",
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
