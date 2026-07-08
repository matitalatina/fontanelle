import Script from "next/script";
import { Metadata, Viewport } from "next";
import { getTranslations, getFormatter } from "next-intl/server";
import { hasLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { generateAppJsonLd, generateFAQJsonLd } from "@/app/lib/jsonld";
import { createViewport, createMetadata } from "@/app/seo-config";
import { getAmenityCounts } from "@/lib/amenity-counts";
import AnimatedHeroBackground from "@/components/AnimatedHeroBackground";
import ScrollDownArrow from "@/components/ScrollDownArrow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkedAlt,
  faFaucetDrip,
  faParking,
  faRestroom,
  faFutbol,
  faLeaf,
  faUsers,
  faSyncAlt,
  faLandmark,
  faBuilding,
  faChurch,
  faMountain,
  faSun,
  faMap,
  faInfoCircle,
  faBookOpen,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
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

  const t = await getTranslations({ locale: lang, namespace: "landing" });
  const counts = getAmenityCounts();

  const desc = t("descriptionMeta", {
    total: counts.total,
  });

  return createMetadata({
    locale: lang,
    title: t("title"),
    description: desc,
    socialDescription: t("descriptionSecondary"),
    keywords:
      lang === "it"
        ? [
            "fontanelle acqua potabile",
            "mappa fontanelle",
            "acqua gratis Italia",
            "fontanelle Roma",
            "fontanelle Milano",
            "fontanelle Firenze",
            "fontanelle Torino",
            "fontanelle Napoli",
            "fontanelle pubbliche",
            "acqua pubblica Italia",
          ]
        : [
            "drinking fountains Italy",
            "fountain map",
            "free water Italy",
            "fountains Rome",
            "fountains Milan",
            "fountains Florence",
            "fountains Turin",
            "fountains Naples",
            "public fountains",
            "public water Italy",
          ],
    path: "/",
  });
}

export const viewport: Viewport = createViewport({ useColorScheme: true });

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }

  const t = await getTranslations({ locale: lang, namespace: "landing" });
  const tRoot = await getTranslations({ locale: lang });
  const counts = getAmenityCounts();
  const format = await getFormatter({ locale: lang });

  const statIcons = [faFaucetDrip, faParking, faRestroom, faFutbol];
  const statColors = [
    "text-fountain",
    "text-bicycle",
    "text-toilet",
    "text-playground",
  ];
  const statKeys = ["fountains", "bikeParking", "toilets", "playgrounds"] as const;
  const benefitIcons = [faSearch, faFaucetDrip, faLeaf, faUsers, faSyncAlt];
  const benefitKeys = [
    "search",
    "freeWater",
    "environment",
    "everyone",
    "updated",
  ] as const;
  const cityIcons = [
    faLandmark,
    faBuilding,
    faChurch,
    faMountain,
    faSun,
    faMap,
  ];
  const cityKeys = ["rome", "milan", "florence", "turin", "naples", "more"] as const;
  const stepKeys = ["openMap", "searchArea", "filter"] as const;
  const faqKeys = ["potable", "report", "search", "coverage", "offline"] as const;

  const countsArr = [
    counts.fountains,
    counts.bicycleParkings,
    counts.toilets,
    counts.playgrounds,
  ];

  return (
    <>
      <Script
        id="schema-org-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateAppJsonLd({
              title: t("title"),
              description: t("descriptionMeta", {
                total: counts.total,
              }),
              targetPath: `/${lang}/app`,
            }),
          ),
        }}
      />
      <Script
        id="faq-schema-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateFAQJsonLd(
              faqKeys.map((key) => ({
                question: t(`faq.${key}`),
                answer: t(`faq.${key}Answer`),
              })),
            ),
          ),
        }}
      />

      <main className="min-h-screen bg-base-100">
        <section className="hero min-h-svh relative overflow-hidden flex flex-col bg-linear-to-br from-primary/10 via-secondary/5 to-accent/10">
          <AnimatedHeroBackground />
          <div className="flex flex-direction-row justify-end w-full">
            <div className="m-4 z-20 flex gap-2">
              <Link
                href="/"
                locale="it"
                className={`btn btn-sm ${lang === "it" ? "btn-primary" : "btn-ghost"}`}
              >
                {tRoot("languages.it")}
              </Link>
              <Link
                href="/"
                locale="en"
                className={`btn btn-sm ${lang === "en" ? "btn-primary" : "btn-ghost"}`}
              >
                {tRoot("languages.en")}
              </Link>
            </div>
          </div>
          <div className="hero-content text-center relative z-10 flex-1 flex items-center justify-center pb-20 sm:pb-16">
            <div className="max-w-4xl">
              <p className="text-sm sm:text-base uppercase tracking-wide text-primary/80 font-semibold mb-3">
                {t("eyebrow")}
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">
                {t("title")}
              </h1>
              <p className="text-lg sm:text-xl mb-4 text-balance max-w-3xl mx-auto leading-relaxed">
                {t.rich("description", {
                  total: counts.total,
                  bold: (c) => <strong>{c}</strong>,
                  count: (c) => <>{c}</>,
                })}
              </p>
              <p className="text-base sm:text-lg mb-8 text-balance max-w-2xl mx-auto opacity-90">
                {t("descriptionSecondary")}
              </p>
              <div className="flex justify-center">
                <Link
                  href="/app"
                  className="btn btn-primary btn-lg text-base sm:text-lg px-6 sm:px-8"
                  aria-label={t("cta")}
                >
                  <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2" />
                  {t("cta")}
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <ScrollDownArrow className="scale-90 sm:scale-100" />
          </div>
        </section>

        <section id="dati" className="py-16 px-4 bg-base-200">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-center mb-4">
              {t("statsTitle")}
            </h2>
            <p className="text-lg text-center mb-12 opacity-80">
              {t("statsSubtitle")}
            </p>

            <div className="flex justify-center">
              <div className="stats stats-vertical lg:stats-horizontal shadow-lg bg-base-100 rounded-2xl">
                {statKeys.map((key, index) => (
                  <div className="stat" key={key}>
                    <div className={`stat-figure ${statColors[index] || ""}`}>
                      <FontAwesomeIcon
                        icon={statIcons[index]}
                        className="text-3xl"
                      />
                    </div>
                    <div className="stat-title">{t(`stats.${key}`)}</div>
                    <div className={`stat-value ${statColors[index] || ""}`}>
                      {format.number(countsArr[index])}
                    </div>
                    <div className="stat-desc">{t(`stats.${key}Desc`)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-8">
              <div className="stats bg-primary text-primary-content rounded-2xl shadow-lg inline-block px-8 py-4">
                <div className="stat">
                  <div className="stat-title text-primary-content opacity-80">
                    {t("totalPoints")}
                  </div>
                  <div className="stat-value text-4xl lg:text-5xl">
                    {format.number(counts.total)}
                  </div>
                  <div className="stat-desc text-primary-content opacity-80">
                    {t("totalPointsSuffix")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="come-funziona" className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-center mb-12">
              {t("benefitsTitle")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {benefitKeys.map((key, index) => (
                <div className="card bg-base-200 shadow-lg" key={key}>
                  <div className="card-body text-center">
                    <div className="flex justify-center mb-4">
                      <FontAwesomeIcon
                        icon={benefitIcons[index]}
                        className="text-4xl text-primary"
                      />
                    </div>
                    <h3 className="card-title justify-center">
                      {t(`benefits.${key}`)}
                    </h3>
                    <p>{t(`benefits.${key}Desc`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-base-200">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-4xl font-bold text-center mb-6">
              {t("howItWorksTitle")}
            </h2>
            <p className="text-lg text-center mb-10 opacity-80">
              {t("howItWorksSubtitle")}
            </p>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stepKeys.map((key, index) => (
                <li
                  className="card bg-base-100 shadow-lg border border-primary/10"
                  key={key}
                >
                  <div className="card-body text-center">
                    <div className="text-2xl font-bold text-primary mb-2">
                      {index + 1}
                    </div>
                    <h3 className="card-title justify-center">
                      {t(`steps.${key}`)}
                    </h3>
                    <p>{t(`steps.${key}Desc`)}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="text-center mt-10">
              <Link
                href="/app"
                className="btn btn-secondary btn-lg text-base sm:text-lg px-8"
              >
                <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2" />
                {t("cta")}
              </Link>
            </div>
          </div>
        </section>

        <section id="citta" className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-center mb-4">
              {t("citiesTitle")}
            </h2>
            <p className="text-lg text-center mb-12 opacity-80">
              {t("citiesSubtitle")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cityKeys.map((key, index) => (
                <div className="card bg-base-100 shadow-lg" key={key}>
                  <div className="card-body">
                    <h3 className="card-title text-xl">
                      <FontAwesomeIcon
                        icon={cityIcons[index]}
                        className="text-primary mr-2"
                      />
                      {t(`cities.${key}`)}
                    </h3>
                    <p>{t(`cities.${key}Desc`)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/app"
                className="btn btn-primary btn-lg text-base sm:text-lg px-8"
              >
                <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2" />
                {t("cta")}
              </Link>
            </div>
          </div>
        </section>

        <section id="faq" className="py-16 px-4 bg-base-200">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-center mb-12">
              {t("faqTitle")}
            </h2>

            <div className="space-y-6">
              {faqKeys.map((key) => (
                <div className="collapse collapse-plus bg-base-200" key={key}>
                  <input type="radio" name="faq-accordion" />
                  <div className="collapse-title text-xl font-medium">
                    <h3>{t(`faq.${key}`)}</h3>
                  </div>
                  <div className="collapse-content">
                    <p>{t(`faq.${key}Answer`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-primary text-primary-content">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">{t("finalTitle")}</h2>
            <p className="text-lg mb-8 opacity-90">
              {t("finalDescription")}
            </p>
            <Link href="/app" className="btn btn-secondary btn-lg text-lg px-8">
              <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2" />
              {t("cta")}
            </Link>
          </div>
        </section>

        <footer className="footer footer-center p-10 bg-base-200 text-base-content flex flex-col sm:flex-row justify-between">
          <nav className="grid grid-flow-col gap-4">
            <Link href="/credits" className="link link-hover">
              <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
              {tRoot("common.credits")}
            </Link>
            <Link href="/legend" className="link link-hover">
              <FontAwesomeIcon icon={faBookOpen} className="mr-1" />
              {tRoot("common.legend")}
            </Link>
            <a
              href="https://www.facebook.com/profile.php?id=61579750226046"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover"
            >
              <FontAwesomeIcon icon={faFacebook} className="mr-1" />
              Facebook
            </a>
            <a
              href="https://www.instagram.com/fontanelle.italia"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover"
            >
              <FontAwesomeIcon icon={faInstagram} className="mr-1" />
              Instagram
            </a>
            <a
              href="https://github.com/matitalatina/fontanelle"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover"
            >
              <FontAwesomeIcon icon={faGithub} className="mr-1" />
              GitHub
            </a>
          </nav>
          <aside>
            <p>
              © {new Date().getFullYear()}{" "}
              <strong>Fontanelle in Italia</strong> - {t("footerNote")}{" "}
              <a
                href="https://www.openstreetmap.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="link link-primary"
              >
                OpenStreetMap
              </a>
            </p>
          </aside>
        </footer>
      </main>
    </>
  );
}
