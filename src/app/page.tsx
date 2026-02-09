import Script from "next/script";
import Link from "next/link";
import { Metadata, Viewport } from "next";
import { generateAppJsonLd, generateFAQJsonLd } from "./lib/jsonld";
import { createViewport, createMetadata } from "./seo-config";
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

// Landing page specific metadata constants
const LANDING_PAGE_TITLE = "Mappa Fontanelle in Italia";
const LANDING_PAGE_DESCRIPTION =
  "Trova fontanelle d'acqua potabile in Italia con la mappa interattiva più completa. Scopri fontanelle gratuite, bagni pubblici, parcheggi bici e parchi giochi a Roma, Milano e in tutte le città.";
const LANDING_PAGE_DESCRIPTION_SHORT =
  "Mappa fontanelle in Italia: fontanelle gratuite, bagni pubblici e parcheggi bici nelle principali città.";
const LANDING_PAGE_KEYWORDS = [
  "fontanelle acqua potabile",
  "mappa fontanelle",
  "acqua gratis Italia",
  "fontanelle Roma",
  "fontanelle Milano",
  "fontanelle Firenze",
  "fontanelle Torino",
  "fontanelle Napoli",
  "bere acqua potabile gratis",
  "fontanelle pubbliche",
  "acqua pubblica Italia",
];

export const metadata: Metadata = createMetadata({
  title: LANDING_PAGE_TITLE,
  description: LANDING_PAGE_DESCRIPTION,
  socialDescription: LANDING_PAGE_DESCRIPTION_SHORT,
  keywords: LANDING_PAGE_KEYWORDS,
  path: "/",
});

export const viewport: Viewport = createViewport({ useColorScheme: true });

export default async function Home() {
  const counts = getAmenityCounts();

  return (
    <>
      <Script
        id="schema-org-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateAppJsonLd()),
        }}
      />
      <Script
        id="faq-schema-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQJsonLd()),
        }}
      />

      <main className="min-h-screen bg-base-100">
        {/* Hero Section */}
        <section className="hero min-h-svh relative overflow-hidden flex flex-col bg-linear-to-br from-primary/10 via-secondary/5 to-accent/10">
          <AnimatedHeroBackground />
          <div className="hero-content text-center relative z-10 flex-1 flex items-center justify-center pb-20 sm:pb-16">
            <div className="max-w-4xl">
              <p className="text-sm sm:text-base uppercase tracking-wide text-primary/80 font-semibold mb-3">
                Mappa fontanelle d&apos;acqua potabile in Italia
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">
                Trova fontanelle gratuite vicino a te
              </h1>
              <p className="text-lg sm:text-xl mb-4 text-balance max-w-3xl mx-auto leading-relaxed">
                La mappa interattiva per trovare <strong>acqua potabile gratuita</strong> in tutta
                Italia: <strong>{counts.total.toLocaleString("it-IT")} punti</strong> tra
                fontanelle, bagni pubblici, parcheggi bici e parchi giochi.
              </p>
              <p className="text-base sm:text-lg mb-8 text-balance max-w-2xl mx-auto opacity-90">
                Ideale per ciclisti, turisti e famiglie che vogliono muoversi
                leggeri e sostenibili.
              </p>
              <div className="flex justify-center">
                <Link
                  href="/app"
                  className="btn btn-primary btn-lg text-base sm:text-lg px-6 sm:px-8"
                  aria-label="Apri la mappa interattiva"
                >
                  <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2" />
                  Apri la mappa
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll down arrow positioned at the bottom of the hero with proper spacing */}
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <ScrollDownArrow className="scale-90 sm:scale-100" />
          </div>
        </section>

        {/* Statistics Section */}
        <section id="dati" className="py-16 px-4 bg-base-200">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-center mb-4">
              La mappa più completa d&apos;Italia
            </h2>
            <p className="text-lg text-center mb-12 opacity-80">
              Migliaia di punti di interesse verificati e costantemente
              aggiornati
            </p>

            <div className="flex justify-center">
              <div className="stats stats-vertical lg:stats-horizontal shadow-lg bg-base-100 rounded-2xl">
                <div className="stat">
                  <div className="stat-figure text-fountain">
                    <FontAwesomeIcon icon={faFaucetDrip} className="text-3xl" />
                  </div>
                  <div className="stat-title">Fontanelle</div>
                  <div className="stat-value text-fountain">
                    {counts.fountains.toLocaleString("it-IT")}
                  </div>
                  <div className="stat-desc">Acqua potabile gratuita</div>
                </div>

                <div className="stat">
                  <div className="stat-figure text-bicycle">
                    <FontAwesomeIcon icon={faParking} className="text-3xl" />
                  </div>
                  <div className="stat-title">Parcheggi bici</div>
                  <div className="stat-value text-bicycle">
                    {counts.bicycleParkings.toLocaleString("it-IT")}
                  </div>
                  <div className="stat-desc">Posti sicuri per biciclette</div>
                </div>

                <div className="stat">
                  <div className="stat-figure text-toilet">
                    <FontAwesomeIcon icon={faRestroom} className="text-3xl" />
                  </div>
                  <div className="stat-title">Bagni pubblici</div>
                  <div className="stat-value text-toilet">
                    {counts.toilets.toLocaleString("it-IT")}
                  </div>
                  <div className="stat-desc">Servizi igienici</div>
                </div>

                <div className="stat">
                  <div className="stat-figure text-playground">
                    <FontAwesomeIcon icon={faFutbol} className="text-3xl" />
                  </div>
                  <div className="stat-title">Parchi giochi</div>
                  <div className="stat-value text-playground">
                    {counts.playgrounds.toLocaleString("it-IT")}
                  </div>
                  <div className="stat-desc">Aree per bambini</div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <div className="stats bg-primary text-primary-content rounded-2xl shadow-lg inline-block px-8 py-4">
                <div className="stat">
                  <div className="stat-title text-primary-content opacity-80">
                    Totale punti di interesse
                  </div>
                  <div className="stat-value text-4xl lg:text-5xl">
                    {counts.total.toLocaleString("it-IT")}
                  </div>
                  <div className="stat-desc text-primary-content opacity-80">
                    in tutta Italia
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </section>

        {/* Benefits Section */}
        <section id="come-funziona" className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-center mb-12">
              Perché usare la nostra mappa delle fontanelle?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              <div className="card bg-base-200 shadow-lg border-2 border-primary/20">
                <div className="card-body text-center">
                  <div className="flex justify-center mb-4 text-primary">
                    <div className="indicator">
                      <span className="indicator-item badge badge-secondary">Nuovo</span>
                      <FontAwesomeIcon icon={faSearch} className="text-4xl" />
                    </div>
                  </div>
                  <h3 className="card-title justify-center">Cerca luoghi</h3>
                  <p>
                    Trova istantaneamente fontanelle in qualsiasi città
                    grazie al nuovo potente motore di ricerca
                  </p>
                </div>
              </div>
              <div className="card bg-base-200 shadow-lg">
                <div className="card-body text-center">
                  <div className="flex justify-center mb-4">
                    <FontAwesomeIcon
                      icon={faFaucetDrip}
                      className="text-4xl text-primary"
                    />
                  </div>
                  <h3 className="card-title justify-center">
                    Acqua potabile gratis
                  </h3>
                  <p>
                    Bevi acqua potabile di qualità ovunque ti trovi in Italia,
                    senza spendere un centesimo
                  </p>
                </div>
              </div>
              <div className="card bg-base-200 shadow-lg">
                <div className="card-body text-center">
                  <div className="flex justify-center mb-4">
                    <FontAwesomeIcon
                      icon={faLeaf}
                      className="text-4xl text-success"
                    />
                  </div>
                  <h3 className="card-title justify-center">
                    Rispetto dell&apos;ambiente
                  </h3>
                  <p>
                    Riduci l&apos;uso di bottiglie di plastica e contribuisci
                    attivamente alla sostenibilità
                  </p>
                </div>
              </div>
              <div className="card bg-base-200 shadow-lg">
                <div className="card-body text-center">
                  <div className="flex justify-center mb-4">
                    <FontAwesomeIcon
                      icon={faUsers}
                      className="text-4xl text-info"
                    />
                  </div>
                  <h3 className="card-title justify-center">Per tutti</h3>
                  <p>
                    Ideale per turisti, cittadini, ciclisti e famiglie in
                    movimento
                  </p>
                </div>
              </div>
              <div className="card bg-base-200 shadow-lg">
                <div className="card-body text-center">
                  <div className="flex justify-center mb-4">
                    <FontAwesomeIcon
                      icon={faSyncAlt}
                      className="text-4xl text-warning"
                    />
                  </div>
                  <h3 className="card-title justify-center">
                    Sempre aggiornata
                  </h3>
                  <p>
                    Dati costantemente aggiornati grazie alla community di
                    OpenStreetMap
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 px-4 bg-base-200">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-4xl font-bold text-center mb-6">
              Come funziona la mappa delle fontanelle
            </h2>
            <p className="text-lg text-center mb-10 opacity-80">
              In tre passaggi trovi acqua potabile gratuita ovunque in Italia.
            </p>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <li className="card bg-base-100 shadow-lg border border-primary/10">
                <div className="card-body text-center">
                  <div className="text-2xl font-bold text-primary mb-2">1</div>
                  <h3 className="card-title justify-center">Apri la mappa</h3>
                  <p>
                    Accedi alla mappa interattiva e visualizza subito tutte le
                    fontanelle, i bagni pubblici e i parcheggi bici.
                  </p>
                </div>
              </li>
              <li className="card bg-base-100 shadow-lg border border-primary/10">
                <div className="card-body text-center">
                  <div className="text-2xl font-bold text-primary mb-2">2</div>
                  <h3 className="card-title justify-center">Cerca la tua zona</h3>
                  <p>
                    Usa la ricerca per città, comune o via e centra la mappa
                    esattamente dove ti serve.
                  </p>
                </div>
              </li>
              <li className="card bg-base-100 shadow-lg border border-primary/10">
                <div className="card-body text-center">
                  <div className="text-2xl font-bold text-primary mb-2">3</div>
                  <h3 className="card-title justify-center">Filtra i servizi</h3>
                  <p>
                    Seleziona solo ciò che ti interessa: fontanelle, bagni,
                    parcheggi bici o parchi giochi.
                  </p>
                </div>
              </li>
            </ol>
            <div className="text-center mt-10">
              <Link href="/app" className="btn btn-secondary btn-lg text-base sm:text-lg px-8">
                <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2" />
                Vai alla mappa
              </Link>
            </div>
          </div>
        </section>

        {/* Cities Section */}
        <section id="citta" className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-center mb-4">
              Fontanelle nelle principali città italiane
            </h2>
            <p className="text-lg text-center mb-12 opacity-80">
              Trova fontanelle d&apos;acqua potabile nelle città più importanti
              d&apos;Italia
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-xl">
                    <FontAwesomeIcon
                      icon={faLandmark}
                      className="text-primary mr-2"
                    />
                    Fontanelle a Roma
                  </h3>
                  <p>
                    La Capitale offre centinaia di fontanelle storiche e
                    moderne. Dalle iconiche &quot;nasoni&quot; ai punti
                    d&apos;acqua nei parchi, trova sempre dove dissetarti
                    gratuitamente.
                  </p>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-xl">
                    <FontAwesomeIcon
                      icon={faBuilding}
                      className="text-primary mr-2"
                    />
                    Fontanelle a Milano
                  </h3>
                  <p>
                    Nel capoluogo lombardo trova facilmente fontanelle nei
                    parchi, nelle stazioni e nei quartieri. Perfetto per chi si
                    muove in bicicletta o a piedi per la città.
                  </p>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-xl">
                    <FontAwesomeIcon
                      icon={faChurch}
                      className="text-primary mr-2"
                    />
                    Fontanelle a Firenze
                  </h3>
                  <p>
                    Nella culla del Rinascimento scopri fontanelle artistiche e
                    funzionali. Ideali per turisti che visitano i musei e i
                    monumenti storici.
                  </p>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-xl">
                    <FontAwesomeIcon
                      icon={faMountain}
                      className="text-primary mr-2"
                    />
                    Fontanelle a Torino
                  </h3>
                  <p>
                    La città sabauda offre numerosi punti d&apos;acqua nei suoi
                    eleganti parchi e lungo le vie del centro storico. Acqua
                    fresca di montagna sempre disponibile.
                  </p>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-xl">
                    <FontAwesomeIcon
                      icon={faSun}
                      className="text-primary mr-2"
                    />
                    Fontanelle a Napoli
                  </h3>
                  <p>
                    Nel capoluogo campano trova refrigerio presso le fontanelle
                    pubbliche. Particolarmente utili durante le calde giornate
                    estive mentre esplori la città partenopea.
                  </p>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-xl">
                    <FontAwesomeIcon
                      icon={faMap}
                      className="text-primary mr-2"
                    />
                    E molte altre città
                  </h3>
                  <p>
                    La nostra mappa copre tutta l&apos;Italia! Trova fontanelle
                    anche a Bologna, Genova, Palermo, Bari, Venezia e in
                    centinaia di altre città e paesi.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-10">
              <Link href="/app" className="btn btn-primary btn-lg text-base sm:text-lg px-8">
                <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2" />
                Apri la mappa delle fontanelle
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 px-4 bg-base-200">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-center mb-12">
              Domande frequenti
            </h2>

            <div className="space-y-6">
              <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title text-xl font-medium">
                  <h3>L&apos;acqua delle fontanelle è potabile?</h3>
                </div>
                <div className="collapse-content">
                  <p>
                    Sì, l&apos;acqua delle fontanelle pubbliche in Italia è
                    generalmente potabile e sicura da bere. Viene regolarmente
                    controllata dalle autorità sanitarie locali. In caso di
                    problemi temporanei, vengono esposti cartelli che ne
                    sconsigliano l&apos;uso.
                  </p>
                </div>
              </div>

              <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title text-xl font-medium">
                  <h3>Posso segnalare una nuova fontanella?</h3>
                </div>
                <div className="collapse-content">
                  <p>
                    I dati provengono da OpenStreetMap, un progetto
                    collaborativo. Puoi contribuire direttamente modificando i
                    dati su OpenStreetMap per aggiungere nuove fontanelle o
                    aggiornare informazioni esistenti. Le modifiche saranno
                    visibili anche sulla nostra mappa.
                  </p>
                </div>
              </div>

              <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title text-xl font-medium">
                  <h3>Come posso cercare una città specifica?</h3>
                </div>
                <div className="collapse-content">
                  <p>
                    È semplicissimo! Sulla mappa troverai una barra di ricerca in alto.
                    Scrivi il nome della città, di un comune o di una via specifica e la
                    mappa si centrerà automaticamente mostrandoti tutti i punti di
                    interesse in quella zona.
                  </p>
                </div>
              </div>

              <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title text-xl font-medium">
                  <h3>È disponibile in tutta Italia?</h3>
                </div>
                <div className="collapse-content">
                  <p>
                    Sì, la copertura si estende a tutta l&apos;Italia! La
                    disponibilità dei dati dipende da quanto le singole zone
                    sono state mappate su OpenStreetMap. Le grandi città hanno
                    una copertura più completa, ma stiamo costantemente
                    espandendo la mappa anche nei centri più piccoli.
                  </p>
                </div>
              </div>

              <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title text-xl font-medium">
                  <h3>L&apos;app funziona anche offline?</h3>
                </div>
                <div className="collapse-content">
                  <p>
                    L&apos;app è progettata come Progressive Web App (PWA) e può
                    funzionare con connettività limitata. Una volta caricata la
                    mappa, potrai consultare le informazioni anche senza
                    connessione internet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 px-4 bg-primary text-primary-content">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">
              Inizia subito a trovare fontanelle vicino a te!
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Unisciti a migliaia di persone che hanno già scoperto come bere
              acqua gratis in tutta Italia contribuendo alla sostenibilità
              ambientale.
            </p>
            <Link href="/app" className="btn btn-secondary btn-lg text-lg px-8">
              <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2" />
              Apri la mappa
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer footer-center p-10 bg-base-200 text-base-content flex flex-col sm:flex-row justify-between">
          <nav className="grid grid-flow-col gap-4">
            <Link href="/credits" className="link link-hover">
              <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
              Crediti
            </Link>
            <Link href="/legend" className="link link-hover">
              <FontAwesomeIcon icon={faBookOpen} className="mr-1" />
              Legenda
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
              - Dati da{" "}
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
