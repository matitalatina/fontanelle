import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
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
  return routing.locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }

  const messages = await getMessages();

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
        <NextIntlClientProvider locale={lang} messages={messages}>
          <InstallPromptProvider>{children}</InstallPromptProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
