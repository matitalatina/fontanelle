import Script from "next/script";
import Link from "next/link";
import { Metadata, Viewport } from "next";
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
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/locales";
import { notFound } from "next/navigation";
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
  const counts = getAmenityCounts();
  const countStr = counts.total.toLocaleString(
    lang === "it" ? "it-IT" : "en-US",
  );
  const desc = `${t.landing.descriptionParts.prefix}${t.landing.descriptionParts.bold1}${t.landing.descriptionParts.middle}${countStr} ${t.landing.descriptionParts.pointsLabel}${t.landing.descriptionParts.suffix}`;

  return createMetadata({
    locale: lang,
    title: t.landing.title,
    description: desc,
    socialDescription: t.landing.descriptionSecondary,
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

  if (!isLocale(lang)) {
    notFound();
  }

  const t = getDictionary(lang);
  const counts = getAmenityCounts();

  const statIcons = [faFaucetDrip, faParking, faRestroom, faFutbol];
  const statColors = [
    "text-fountain",
    "text-bicycle",
    "text-toilet",
    "text-playground",
  ];
  const benefitIcons = [faSearch, faFaucetDrip, faLeaf, faUsers, faSyncAlt];
  const cityIcons = [
    faLandmark,
    faBuilding,
    faChurch,
    faMountain,
    faSun,
    faMap,
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
              title: t.landing.title,
              description:
                t.landing.descriptionParts.prefix +
                t.landing.descriptionParts.bold1 +
                t.landing.descriptionParts.middle +
                counts.total.toLocaleString(lang === "it" ? "it-IT" : "en-US") +
                " " +
                t.landing.descriptionParts.pointsLabel +
                t.landing.descriptionParts.suffix,
              targetPath: localizedPath(lang, "/app"),
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
              t.landing.faq.map((faq) => ({
                question: faq.question,
                answer: faq.answer,
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
                href={localizedPath("it", "/")}
                className={`btn btn-sm ${lang === "it" ? "btn-primary" : "btn-ghost"}`}
              >
                {t.languages.it}
              </Link>
              <Link
                href={localizedPath("en", "/")}
                className={`btn btn-sm ${lang === "en" ? "btn-primary" : "btn-ghost"}`}
              >
                {t.languages.en}
              </Link>
            </div>
          </div>
          <div className="hero-content text-center relative z-10 flex-1 flex items-center justify-center pb-20 sm:pb-16">
            <div className="max-w-4xl">
              <p className="text-sm sm:text-base uppercase tracking-wide text-primary/80 font-semibold mb-3">
                {t.landing.eyebrow}
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">
                {t.landing.title}
              </h1>
              <p className="text-lg sm:text-xl mb-4 text-balance max-w-3xl mx-auto leading-relaxed">
                {t.landing.descriptionParts.prefix}
                <strong>{t.landing.descriptionParts.bold1}</strong>
                {t.landing.descriptionParts.middle}
                <strong>
                  {counts.total.toLocaleString(
                    lang === "it" ? "it-IT" : "en-US",
                  )}{" "}
                  {t.landing.descriptionParts.pointsLabel}
                </strong>
                {t.landing.descriptionParts.suffix}
              </p>
              <p className="text-base sm:text-lg mb-8 text-balance max-w-2xl mx-auto opacity-90">
                {t.landing.descriptionSecondary}
              </p>
              <div className="flex justify-center">
                <Link
                  href={localizedPath(lang, "/app")}
                  className="btn btn-primary btn-lg text-base sm:text-lg px-6 sm:px-8"
                  aria-label={t.landing.cta}
                >
                  <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2" />
                  {t.landing.cta}
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
              {t.landing.statsTitle}
            </h2>
            <p className="text-lg text-center mb-12 opacity-80">
              {t.landing.statsSubtitle}
            </p>

            <div className="flex justify-center">
              <div className="stats stats-vertical lg:stats-horizontal shadow-lg bg-base-100 rounded-2xl">
                {t.landing.stats.map((stat, index) => (
                  <div className="stat" key={stat.title}>
                    <div className={`stat-figure ${statColors[index] || ""}`}>
                      <FontAwesomeIcon
                        icon={statIcons[index]}
                        className="text-3xl"
                      />
                    </div>
                    <div className="stat-title">{stat.title}</div>
                    <div className={`stat-value ${statColors[index] || ""}`}>
                      {[
                        counts.fountains,
                        counts.bicycleParkings,
                        counts.toilets,
                        counts.playgrounds,
                      ][index].toLocaleString(
                        lang === "it" ? "it-IT" : "en-US",
                      )}
                    </div>
                    <div className="stat-desc">{stat.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-8">
              <div className="stats bg-primary text-primary-content rounded-2xl shadow-lg inline-block px-8 py-4">
                <div className="stat">
                  <div className="stat-title text-primary-content opacity-80">
                    {t.landing.totalPoints}
                  </div>
                  <div className="stat-value text-4xl lg:text-5xl">
                    {counts.total.toLocaleString(
                      lang === "it" ? "it-IT" : "en-US",
                    )}
                  </div>
                  <div className="stat-desc text-primary-content opacity-80">
                    {t.landing.totalPointsSuffix}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="come-funziona" className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-center mb-12">
              {t.landing.benefitsTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {t.landing.benefits.map((benefit, index) => (
                <div className="card bg-base-200 shadow-lg" key={benefit.title}>
                  <div className="card-body text-center">
                    <div className="flex justify-center mb-4">
                      <FontAwesomeIcon
                        icon={benefitIcons[index]}
                        className="text-4xl text-primary"
                      />
                    </div>
                    <h3 className="card-title justify-center">
                      {benefit.title}
                    </h3>
                    <p>{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-base-200">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-4xl font-bold text-center mb-6">
              {t.landing.howItWorksTitle}
            </h2>
            <p className="text-lg text-center mb-10 opacity-80">
              {t.landing.howItWorksSubtitle}
            </p>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.landing.steps.map((step, index) => (
                <li
                  className="card bg-base-100 shadow-lg border border-primary/10"
                  key={step.title}
                >
                  <div className="card-body text-center">
                    <div className="text-2xl font-bold text-primary mb-2">
                      {index + 1}
                    </div>
                    <h3 className="card-title justify-center">{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="text-center mt-10">
              <Link
                href={localizedPath(lang, "/app")}
                className="btn btn-secondary btn-lg text-base sm:text-lg px-8"
              >
                <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2" />
                {t.landing.cta}
              </Link>
            </div>
          </div>
        </section>

        <section id="citta" className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-center mb-4">
              {t.landing.citiesTitle}
            </h2>
            <p className="text-lg text-center mb-12 opacity-80">
              {t.landing.citiesSubtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.landing.cities.map((city, index) => (
                <div className="card bg-base-100 shadow-lg" key={city.title}>
                  <div className="card-body">
                    <h3 className="card-title text-xl">
                      <FontAwesomeIcon
                        icon={cityIcons[index]}
                        className="text-primary mr-2"
                      />
                      {city.title}
                    </h3>
                    <p>{city.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href={localizedPath(lang, "/app")}
                className="btn btn-primary btn-lg text-base sm:text-lg px-8"
              >
                <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2" />
                {t.landing.cta}
              </Link>
            </div>
          </div>
        </section>

        <section id="faq" className="py-16 px-4 bg-base-200">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-center mb-12">
              {t.landing.faqTitle}
            </h2>

            <div className="space-y-6">
              {t.landing.faq.map((faqItem) => (
                <div
                  className="collapse collapse-plus bg-base-200"
                  key={faqItem.question}
                >
                  <input type="radio" name="faq-accordion" />
                  <div className="collapse-title text-xl font-medium">
                    <h3>{faqItem.question}</h3>
                  </div>
                  <div className="collapse-content">
                    <p>{faqItem.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-primary text-primary-content">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">{t.landing.finalTitle}</h2>
            <p className="text-lg mb-8 opacity-90">
              {t.landing.finalDescription}
            </p>
            <Link
              href={localizedPath(lang, "/app")}
              className="btn btn-secondary btn-lg text-lg px-8"
            >
              <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2" />
              {t.landing.cta}
            </Link>
          </div>
        </section>

        <footer className="footer footer-center p-10 bg-base-200 text-base-content flex flex-col sm:flex-row justify-between">
          <nav className="grid grid-flow-col gap-4">
            <Link
              href={localizedPath(lang, "/credits")}
              className="link link-hover"
            >
              <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
              {t.common.credits}
            </Link>
            <Link
              href={localizedPath(lang, "/legend")}
              className="link link-hover"
            >
              <FontAwesomeIcon icon={faBookOpen} className="mr-1" />
              {t.common.legend}
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
              © {new Date().getFullYear()} <strong>Fontanelle in Italia</strong>{" "}
              - {t.landing.footerNote}{" "}
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
