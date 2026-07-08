import { LazyApp } from "@/components/LazyApp";
import Script from "next/script";
import { Metadata, Viewport } from "next";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { generateAppJsonLd } from "@/app/lib/jsonld";
import { createViewport, createMetadata } from "@/app/seo-config";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }

  const t = await getTranslations({ locale: lang, namespace: "app" });

  return createMetadata({
    locale: lang,
    title: t("title"),
    description: t("description"),
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

  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }

  const t = await getTranslations({ locale: lang, namespace: "app" });

  return (
    <>
      <Script
        id="schema-org-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateAppJsonLd({
              title: t("title"),
              description: t("description"),
              targetPath: `/${lang}/app`,
            }),
          ),
        }}
      />
      <LazyApp />
    </>
  );
}
