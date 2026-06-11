import { notFound } from "next/navigation";
import { SUPPORTED_LOCALES, isLocale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionaries";
import { I18nProvider } from "@/i18n/I18nProvider";
import { InstallPromptProvider } from "@/contexts/InstallPromptContext";
import Meta from "../meta";
import Script from "next/script";
import "../globals.css";
import "@/lib/fontawesome";
import type { Metadata, Viewport } from "next";
import { baseMetadata, createViewport } from "../seo-config";

export const metadata: Metadata = baseMetadata;
export const viewport: Viewport = createViewport({ themeColor: undefined });

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const dictionary = getDictionary(lang);

  return (
    <html lang={lang}>
      <head>
        <Meta />
        <link rel="icon" href="/icon.png" sizes="any" />
        <link rel="manifest" href={`/${lang}/manifest.webmanifest`} />
        <Script
          src="https://umami.serina.mattianatali.com/script.js"
          data-website-id="0532f00f-c7ff-4e8f-80ac-f09b1ad90d01"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <I18nProvider locale={lang} dictionary={dictionary}>
          <InstallPromptProvider>{children}</InstallPromptProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
