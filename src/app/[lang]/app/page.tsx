import { LazyApp } from "@/components/LazyApp";
import Script from "next/script";
import { Metadata, Viewport } from "next";
import { generateAppJsonLd } from "@/app/lib/jsonld";
import { createViewport, createMetadata } from "@/app/seo-config";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/locales";
import { localizedPath } from "@/i18n/navigation";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const t = getDictionary(lang);

  return createMetadata({
    locale: lang,
    title: t.app.title,
    description: t.app.description,
    path: "/app",
  });
}

export const viewport: Viewport = createViewport({ useColorScheme: true });

export default async function AppPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const t = getDictionary(lang);

  return (
    <>
      <Script
        id="schema-org-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateAppJsonLd({
              title: t.app.title,
              description: t.app.description,
              targetPath: localizedPath(lang, "/app"),
            }),
          ),
        }}
      />
      <LazyApp />
    </>
  );
}
