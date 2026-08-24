import ShareAppButton from "./ShareAppButton";
import DevModeHeading from "./DevModeToggle";
import { Metadata, Viewport } from "next";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { createMetadata, createViewport } from "@/app/seo-config";
import { notFound } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faArrowLeft,
  faBicycle,
  faDatabase,
  faLightbulb,
  faHeart,
  faShareAlt,
  faDonate,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faPaypal } from "@fortawesome/free-brands-svg-icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }

  const t = await getTranslations({ locale: lang, namespace: "credits" });

  return createMetadata({
    locale: lang,
    title: t("title"),
    description: t("description"),
    path: "/credits",
  });
}

export const viewport: Viewport = createViewport();

export default async function CreditsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }

  const t = await getTranslations({ locale: lang, namespace: "credits" });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6 ml-6">
        <h1 className="text-2xl font-bold">
          <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
          {t("title")}
        </h1>
        <Link href="/app" className="btn btn-primary">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          {t("backToMap")}
        </Link>
      </div>

      <div className="card bg-base-200 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">
            <FontAwesomeIcon icon={faBicycle} className="text-primary mr-2" />
            {t("motivationTitle")}
          </h2>
          <p className="py-2">{t("motivationBody0")}</p>
          <ul className="list-disc pl-5 space-y-2 py-2">
            <li>{t("motivationBody1")}</li>
            <li>{t("motivationBody2")}</li>
            <li>{t("motivationBody3")}</li>
            <li>{t("motivationBody4")}</li>
          </ul>
          <p className="py-2">{t("motivationBody5")}</p>
        </div>
      </div>

      <div className="card bg-base-200 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">
            <FontAwesomeIcon icon={faDatabase} className="text-primary mr-2" />
            {t("dataTitle")}
          </h2>
          <p className="py-2">{t("dataBody0")}</p>
          <p className="py-2">{t("dataBody1")}</p>
          <div className="alert alert-info mt-4">
            <FontAwesomeIcon icon={faLightbulb} />
            <span>{t("dataBody2")}</span>
          </div>
        </div>
      </div>

      <div className="card bg-base-200 shadow-xl mb-8">
        <div className="card-body">
          <DevModeHeading />
          <p className="py-2">{t("developmentBody0")}</p>
          <p className="py-2">{t("developmentBody1")}</p>
        </div>
      </div>

      <div className="card bg-base-200 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">
            <FontAwesomeIcon icon={faHeart} className="text-primary mr-2" />
            {t("supportTitle")}
          </h2>
          <p className="py-2">{t("supportBody0")}</p>
          <p className="py-2">{t("supportBody1")}</p>

          <div className="divider">{t("supportTitle")}</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h3 className="card-title text-base">
                  <FontAwesomeIcon
                    icon={faShareAlt}
                    className="text-info mr-2"
                  />
                  {t("shareProjectTitle")}
                </h3>
                <p className="mb-4">{t("shareProjectBody")}</p>
                <div className="flex flex-col gap-2">
                  <ShareAppButton />
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h3 className="card-title text-base">
                  <FontAwesomeIcon
                    icon={faDonate}
                    className="text-success mr-2"
                  />
                  {t("financialSupportTitle")}
                </h3>
                <p className="mb-4">{t("financialSupportBody")}</p>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://github.com/sponsors/matitalatina"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    <FontAwesomeIcon icon={faGithub} className="mr-2" />
                    GitHub Sponsors
                  </a>
                  <a
                    href="https://www.buymeacoffee.com/mattianatali"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    <FontAwesomeIcon icon={faCoffee} className="mr-2" />
                    Buy Me A Coffee
                  </a>
                  <a
                    href="https://paypal.me/mattianatali"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    <FontAwesomeIcon icon={faPaypal} className="mr-2" />
                    PayPal
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="alert alert-success mt-6">
            <FontAwesomeIcon icon={faHeart} />
            <span>{t("closingNote")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
