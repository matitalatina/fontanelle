import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/locales";
import { MetadataRoute } from "next";
import { notFound } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ lang: string }> },
) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const t = getDictionary(lang);

  const manifest: MetadataRoute.Manifest = {
    name: t.manifest.name,
    short_name: t.manifest.shortName,
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
