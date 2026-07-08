import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { MetadataRoute } from "next";
import { notFound } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ lang: string }> },
) {
  const { lang } = await params;

  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }

  const t = await getTranslations({ locale: lang, namespace: "manifest" });

  const manifest: MetadataRoute.Manifest = {
    name: t("name"),
    short_name: t("shortName"),
    theme_color: "#74c0fc",
    background_color: "#183153",
    display: "standalone",
    orientation: "any",
    scope: `/${lang}`,
    start_url: `/${lang}/app?source=pwa`,
    id: `/${lang}/app`,
    icons: [
      {
        src: "/images/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };

  return Response.json(manifest, {
    headers: {
      "Content-Type": "application/manifest+json",
    },
  });
}
