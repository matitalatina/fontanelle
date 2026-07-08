import { Metadata, Viewport } from "next";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { createMetadata, createViewport } from "@/app/seo-config";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }

  const t = await getTranslations({ locale: lang, namespace: "legend" });

  return createMetadata({
    locale: lang,
    title: t("title"),
    description: t("description"),
    path: "/legend",
  });
}

export const viewport: Viewport = createViewport();

const iconRows = [
  { key: "fountain" as const, icon: faFaucetDrip, bg: "bg-fountain", fg: "text-fountain-content", shape: "rounded-md" },
  { key: "waterHouse" as const, icon: faFaucetDrip, bg: "bg-blue-600", fg: "text-water-house-content", shape: "rounded-md" },
  { key: "toilet" as const, icon: faRestroom, bg: "bg-toilet", fg: "text-toilet-content", shape: "rounded-md" },
  { key: "bicycleParking" as const, icon: faParking, bg: "bg-bicycle", fg: "text-bicycle-content", shape: "rounded-md" },
  { key: "playground" as const, icon: faFutbol, bg: "bg-playground", fg: "text-playground-content", shape: "rounded-full" },
];

export default async function LegendPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }

  const t = await getTranslations({ locale: lang, namespace: "legend" });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6 ml-6">
        <h1 className="text-2xl font-bold">
          <FontAwesomeIcon icon={faBookOpen} className="mr-2" />
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
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-primary mr-2"
            />
            {t("iconTableTitle")}
          </h2>

          <div className="overflow-x-auto">
            <table className="table w-full text-left">
              <thead>
                <tr>
                  <th className="text-right">{t("iconHeader")}</th>
                  <th>{t("descriptionHeader")}</th>
                </tr>
              </thead>
              <tbody>
                {iconRows.map(({ key, icon, bg, fg, shape }) => (
                  <tr key={key}>
                    <td className="text-right">
                      <div className={`w-12 h-12 ml-auto flex items-center justify-center ${bg} ${shape}`}>
                        <FontAwesomeIcon icon={icon} className={`${fg} text-xl`} />
                      </div>
                    </td>
                    <td>
                      <p className="font-bold">{t(`rows.${key}`)}</p>
                      <p className="text-sm">{t(`rows.${key}Desc`)}</p>
                    </td>
                  </tr>
                ))}
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
            {t("attributesTitle")} {t("rows.fountain")}
          </h2>
          <div className="overflow-x-auto">
            <table className="table w-auto text-left">
              <thead>
                <tr>
                  <th className="text-right">{t("iconHeader")}</th>
                  <th>{t("descriptionHeader")}</th>
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
                    <p>{t("attributeRows.paidOrFree")}</p>
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
            {t("attributesTitle")} {t("rows.toilet")}
          </h2>
          <div className="overflow-x-auto">
            <table className="table w-auto text-left">
              <thead>
                <tr>
                  <th className="text-right">{t("iconHeader")}</th>
                  <th>{t("descriptionHeader")}</th>
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
                    <p>{t("attributeRows.paidOrFree")}</p>
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
                    <p>{t("attributeRows.changingTable")}</p>
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
            {t("attributesTitle")} {t("rows.bicycleParking")}
          </h2>
          <div className="overflow-x-auto">
            <table className="table w-auto text-left">
              <thead>
                <tr>
                  <th className="text-right">{t("iconHeader")}</th>
                  <th>{t("descriptionHeader")}</th>
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
                    <p>{t("attributeRows.paidOrFree")}</p>
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
                    <p>{t("attributeRows.coveredOrOpen")}</p>
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
                    <p>{t("attributeRows.indoorOrOutdoor")}</p>
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
                    <p>{t("attributeRows.surveillance")}</p>
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
                    <p>{t("attributeRows.capacity")}</p>
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
