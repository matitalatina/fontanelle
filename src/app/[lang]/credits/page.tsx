import Link from "next/link";
import ShareAppButton from "./ShareAppButton";
import { Metadata, Viewport } from "next";
import { createMetadata, createViewport } from "@/app/seo-config";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/locales";
import { notFound } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faArrowLeft,
  faBicycle,
  faDatabase,
  faLightbulb,
  faCode,
  faHeart,
  faShareAlt,
  faDonate,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faPaypal } from "@fortawesome/free-brands-svg-icons";
import { localizedPath } from "@/i18n/navigation";

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
    title: t.credits.title,
    description: t.credits.description,
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

  if (!isLocale(lang)) {
    notFound();
  }

  const t = getDictionary(lang);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6 ml-6">
        <h1 className="text-2xl font-bold">
          <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
          {t.credits.title}
        </h1>
        <Link href={localizedPath(lang, "/app")} className="btn btn-primary">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          {t.credits.backToMap}
        </Link>
      </div>

      <div className="card bg-base-200 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">
            <FontAwesomeIcon icon={faBicycle} className="text-primary mr-2" />
            {t.credits.motivationTitle}
          </h2>
          <p className="py-2">{t.credits.motivationBody[0]}</p>
          <ul className="list-disc pl-5 space-y-2 py-2">
            <li>{t.credits.motivationBody[1]}</li>
            <li>{t.credits.motivationBody[2]}</li>
            <li>{t.credits.motivationBody[3]}</li>
            <li>{t.credits.motivationBody[4]}</li>
          </ul>
          <p className="py-2">{t.credits.motivationBody[5]}</p>
        </div>
      </div>

      <div className="card bg-base-200 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">
            <FontAwesomeIcon icon={faDatabase} className="text-primary mr-2" />
            {t.credits.dataTitle}
          </h2>
          <p className="py-2">{t.credits.dataBody[0]}</p>
          <p className="py-2">{t.credits.dataBody[1]}</p>
          <div className="alert alert-info mt-4">
            <FontAwesomeIcon icon={faLightbulb} />
            <span>{t.credits.dataBody[2]}</span>
          </div>
        </div>
      </div>

      <div className="card bg-base-200 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">
            <FontAwesomeIcon icon={faCode} className="text-primary mr-2" />
            {t.credits.developmentTitle}
          </h2>
          <p className="py-2">{t.credits.developmentBody[0]}</p>
          <p className="py-2">{t.credits.developmentBody[1]}</p>
        </div>
      </div>

      <div className="card bg-base-200 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">
            <FontAwesomeIcon icon={faHeart} className="text-primary mr-2" />
            {t.credits.supportTitle}
          </h2>
          <p className="py-2">{t.credits.supportBody[0]}</p>
          <p className="py-2">{t.credits.supportBody[1]}</p>

          <div className="divider">{t.credits.supportTitle}</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h3 className="card-title text-base">
                  <FontAwesomeIcon
                    icon={faShareAlt}
                    className="text-info mr-2"
                  />
                  {t.credits.shareProjectTitle}
                </h3>
                <p className="mb-4">{t.credits.shareProjectBody}</p>
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
                  {t.credits.financialSupportTitle}
                </h3>
                <p className="mb-4">{t.credits.financialSupportBody}</p>
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
            <span>{t.credits.closingNote}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
