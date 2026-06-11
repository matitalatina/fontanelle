import Link from "next/link";
import { Metadata, Viewport } from "next";
import { createMetadata, createViewport } from "@/app/seo-config";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/locales";
import { notFound } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faArrowLeft,
  faMapMarkerAlt,
  faFaucetDrip,
  faRestroom,
  faParking,
  faFutbol,
  faEuroSign,
  faBan,
  faBaby,
  faUmbrella,
  faHouse,
  faVideo,
  faBicycle,
} from "@fortawesome/free-solid-svg-icons";
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
    title: t.legend.title,
    description: t.legend.description,
    path: "/legend",
  });
}

export const viewport: Viewport = createViewport();

export default async function LegendPage({
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
          <FontAwesomeIcon icon={faBookOpen} className="mr-2" />
          {t.legend.title}
        </h1>
        <Link href={localizedPath(lang, "/app")} className="btn btn-primary">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          {t.legend.backToMap}
        </Link>
      </div>

      <div className="card bg-base-200 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-primary mr-2"
            />
            {t.legend.iconTableTitle}
          </h2>

          <div className="overflow-x-auto">
            <table className="table w-full text-left">
              <thead>
                <tr>
                  <th className="text-right">{t.legend.iconHeader}</th>
                  <th>{t.legend.descriptionHeader}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-right">
                    <div className="w-12 h-12 ml-auto flex items-center justify-center bg-fountain rounded-md">
                      <FontAwesomeIcon
                        icon={faFaucetDrip}
                        className="text-fountain-content text-xl"
                      />
                    </div>
                  </td>
                  <td>
                    <p className="font-bold">{t.legend.rows.fountain.title}</p>
                    <p className="text-sm">
                      {t.legend.rows.fountain.description}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <div className="w-12 h-12 ml-auto flex items-center justify-center bg-blue-600 rounded-md">
                      <FontAwesomeIcon
                        icon={faFaucetDrip}
                        className="text-water-house-content text-xl"
                      />
                    </div>
                  </td>
                  <td>
                    <p className="font-bold">
                      {t.legend.rows.waterHouse.title}
                    </p>
                    <p className="text-sm">
                      {t.legend.rows.waterHouse.description}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <div className="w-12 h-12 ml-auto flex items-center justify-center bg-toilet rounded-md">
                      <FontAwesomeIcon
                        icon={faRestroom}
                        className="text-toilet-content text-xl"
                      />
                    </div>
                  </td>
                  <td>
                    <p className="font-bold">{t.legend.rows.toilet.title}</p>
                    <p className="text-sm">
                      {t.legend.rows.toilet.description}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <div className="w-12 h-12 ml-auto flex items-center justify-center bg-bicycle rounded-md">
                      <FontAwesomeIcon
                        icon={faParking}
                        className="text-bicycle-content text-xl"
                      />
                    </div>
                  </td>
                  <td>
                    <p className="font-bold">
                      {t.legend.rows.bicycleParking.title}
                    </p>
                    <p className="text-sm">
                      {t.legend.rows.bicycleParking.description}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <div className="w-12 h-12 ml-auto flex items-center justify-center bg-playground rounded-full">
                      <FontAwesomeIcon
                        icon={faFutbol}
                        className="text-playground-content text-xl"
                      />
                    </div>
                  </td>
                  <td>
                    <p className="font-bold">
                      {t.legend.rows.playground.title}
                    </p>
                    <p className="text-sm">
                      {t.legend.rows.playground.description}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card bg-base-200 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">
            <div className="w-8 h-8 flex items-center justify-center bg-fountain rounded-md mr-2">
              <FontAwesomeIcon
                icon={faFaucetDrip}
                className="text-fountain-content"
              />
            </div>
            {t.legend.attributesTitle} {t.legend.rows.fountain.title}
          </h2>
          <div className="overflow-x-auto">
            <table className="table w-auto text-left">
              <thead>
                <tr>
                  <th className="text-right">{t.legend.iconHeader}</th>
                  <th>{t.legend.descriptionHeader}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-right">
                    <div className="flex items-center justify-end">
                      <FontAwesomeIcon icon={faEuroSign} className="text-xl" />
                      <span className="mx-2">/</span>
                      <span className="fa-stack">
                        <FontAwesomeIcon
                          icon={faEuroSign}
                          className="fa-stack-1x"
                        />
                        <FontAwesomeIcon
                          icon={faBan}
                          className="fa-stack-2x text-red-900"
                        />
                      </span>
                    </div>
                  </td>
                  <td>
                    <p>{t.legend.attributeRows.paidOrFree}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card bg-base-200 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">
            <div className="w-8 h-8 flex items-center justify-center bg-toilet rounded-md mr-2">
              <FontAwesomeIcon
                icon={faRestroom}
                className="text-toilet-content"
              />
            </div>
            {t.legend.attributesTitle} {t.legend.rows.toilet.title}
          </h2>
          <div className="overflow-x-auto">
            <table className="table w-auto text-left">
              <thead>
                <tr>
                  <th className="text-right">{t.legend.iconHeader}</th>
                  <th>{t.legend.descriptionHeader}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-right">
                    <div className="flex items-center justify-end">
                      <FontAwesomeIcon icon={faEuroSign} className="text-xl" />
                      <span className="mx-2">/</span>
                      <span className="fa-stack">
                        <FontAwesomeIcon
                          icon={faEuroSign}
                          className="fa-stack-1x"
                        />
                        <FontAwesomeIcon
                          icon={faBan}
                          className="fa-stack-2x text-red-900"
                        />
                      </span>
                    </div>
                  </td>
                  <td>
                    <p>{t.legend.attributeRows.paidOrFree}</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <div className="flex items-center justify-end">
                      <FontAwesomeIcon icon={faBaby} className="text-xl" />
                      <span className="mx-2">/</span>
                      <span className="fa-stack">
                        <FontAwesomeIcon
                          icon={faBaby}
                          className="fa-stack-1x"
                        />
                        <FontAwesomeIcon
                          icon={faBan}
                          className="fa-stack-2x text-red-900"
                        />
                      </span>
                    </div>
                  </td>
                  <td>
                    <p>{t.legend.attributeRows.changingTable}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card bg-base-200 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">
            <div className="w-8 h-8 flex items-center justify-center bg-bicycle rounded-md mr-2">
              <FontAwesomeIcon
                icon={faParking}
                className="text-bicycle-content"
              />
            </div>
            {t.legend.attributesTitle} {t.legend.rows.bicycleParking.title}
          </h2>
          <div className="overflow-x-auto">
            <table className="table w-auto text-left">
              <thead>
                <tr>
                  <th className="text-right">{t.legend.iconHeader}</th>
                  <th>{t.legend.descriptionHeader}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-right">
                    <div className="flex items-center justify-end">
                      <FontAwesomeIcon icon={faEuroSign} className="text-xl" />
                      <span className="mx-2">/</span>
                      <span className="fa-stack">
                        <FontAwesomeIcon
                          icon={faEuroSign}
                          className="fa-stack-1x"
                        />
                        <FontAwesomeIcon
                          icon={faBan}
                          className="fa-stack-2x text-red-900"
                        />
                      </span>
                    </div>
                  </td>
                  <td>
                    <p>{t.legend.attributeRows.paidOrFree}</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <div className="flex items-center justify-end">
                      <FontAwesomeIcon icon={faUmbrella} className="text-xl" />
                      <span className="mx-2">/</span>
                      <span className="fa-stack">
                        <FontAwesomeIcon
                          icon={faUmbrella}
                          className="fa-stack-1x"
                        />
                        <FontAwesomeIcon
                          icon={faBan}
                          className="fa-stack-2x text-red-900"
                        />
                      </span>
                    </div>
                  </td>
                  <td>
                    <p>{t.legend.attributeRows.coveredOrOpen}</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <div className="flex items-center justify-end">
                      <FontAwesomeIcon icon={faHouse} className="text-xl" />
                      <span className="mx-2">/</span>
                      <span className="fa-stack">
                        <FontAwesomeIcon
                          icon={faHouse}
                          className="fa-stack-1x"
                        />
                        <FontAwesomeIcon
                          icon={faBan}
                          className="fa-stack-2x text-red-900"
                        />
                      </span>
                    </div>
                  </td>
                  <td>
                    <p>{t.legend.attributeRows.indoorOrOutdoor}</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <div className="flex items-center justify-end">
                      <FontAwesomeIcon icon={faVideo} className="text-xl" />
                      <span className="mx-2">/</span>
                      <span className="fa-stack">
                        <FontAwesomeIcon
                          icon={faVideo}
                          className="fa-stack-1x"
                        />
                        <FontAwesomeIcon
                          icon={faBan}
                          className="fa-stack-2x text-red-900"
                        />
                      </span>
                    </div>
                  </td>
                  <td>
                    <p>{t.legend.attributeRows.surveillance}</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <div className="flex items-center justify-end">
                      <FontAwesomeIcon icon={faBicycle} />
                      <span className="ml-1">N</span>
                    </div>
                  </td>
                  <td>
                    <p>{t.legend.attributeRows.capacity}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
