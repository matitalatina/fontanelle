import LazyContributeClient from "./LazyContributeClient";
import { Metadata, Viewport } from "next";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { createMetadata, createViewport } from "@/app/seo-config";
import { notFound } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faInfoCircle,
  faMapPin,
} from "@fortawesome/free-solid-svg-icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }

  const t = await getTranslations({ locale: lang, namespace: "contribute" });

  return createMetadata({
    locale: lang,
    title: t("title"),
    description: t("description"),
    path: "/contribute",
    overrides: {
      robots: {
        index: false,
        follow: false,
      },
    },
  });
}

export const viewport: Viewport = createViewport();

export default async function ContributePage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{
    lat?: string;
    lng?: string;
    osm_auth_error?: string;
  }>;
}) {
  const { lang } = await params;

  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }

  const t = await getTranslations({ locale: lang, namespace: "contribute" });
  const { lat, lng, osm_auth_error } = await searchParams;

  const latNumber = lat !== undefined ? Number.parseFloat(lat) : Number.NaN;
  const lngNumber = lng !== undefined ? Number.parseFloat(lng) : Number.NaN;
  const hasCoords =
    Number.isFinite(latNumber) &&
    Number.isFinite(lngNumber) &&
    Math.abs(latNumber) <= 90 &&
    Math.abs(lngNumber) <= 180;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6 ml-6">
        <h1 className="text-2xl font-bold">
          <FontAwesomeIcon icon={faMapPin} className="mr-2" />
          {t("title")}
        </h1>
        <Link href="/app" className="btn btn-primary">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          {t("backToMap")}
        </Link>
      </div>

      <div className="alert alert-info mb-6">
        <FontAwesomeIcon icon={faInfoCircle} />
        <span>{t("osmNote")}</span>
      </div>

      <LazyContributeClient
        initialCoords={hasCoords ? { lat: latNumber, lng: lngNumber } : null}
        authError={osm_auth_error ?? null}
      />
    </div>
  );
}
