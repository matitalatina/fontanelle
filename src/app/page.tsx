import Script from "next/script";
import Link from "next/link";
import { Metadata, Viewport } from "next";
import { generateAppJsonLd, generateFAQJsonLd } from "./lib/jsonld";
import { APP_NAME, BASE_URL, createViewport, LOCALE } from "./seo-config";
import { getAmenityCounts } from "@/lib/amenity-counts";
import AnimatedHeroBackground from "@/components/AnimatedHeroBackground";

export const metadata: Metadata = {
  title:
    "Trova fontanelle d'acqua potabile in Italia - Mappa fontanelle gratis",
  description:
    "Trova fontanelle d'acqua potabile in Italia. Scopri la mappa delle fontanelle gratuite a Roma, Milano e in tutte le principali città. Bere acqua gratis ovunque!",
  keywords: [
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
  ],
  openGraph: {
    title:
      "Trova fontanelle d'acqua potabile in Italia - Mappa fontanelle gratis",
    description:
      "Trova fontanelle d'acqua potabile in Italia. Scopri la mappa delle fontanelle gratuite a Roma, Milano e in tutte le principali città.",
    url: BASE_URL,
    locale: LOCALE,
    type: "website",
    siteName: APP_NAME,
  },
  twitter: {
    title:
      "Trova fontanelle d'acqua potabile in Italia - Mappa fontanelle gratis",
    description:
      "Trova fontanelle d'acqua potabile in Italia. Scopri la mappa delle fontanelle gratuite a Roma, Milano e in tutte le principali città.",
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = createViewport({ useColorScheme: true });

export default async function Home() {
  const counts = getAmenityCounts();

  return (
    <>
      <Script
        id="schema-org-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateAppJsonLd()),
        }}
      />
      <Script
        id="faq-schema-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQJsonLd()),
        }}
      />

      <div className="min-h-screen bg-base-100">
        {/* Hero Section */}
        <div className="hero min-h-screen relative overflow-hidden">
          <AnimatedHeroBackground />
          <div className="hero-content text-center relative z-10">
            <div className="max-w-4xl">
              <h1 className="text-5xl font-bold mb-6 text-balance">
                Trova fontanelle d&apos;acqua potabile in Italia
              </h1>
              <p className="text-xl mb-4 text-balance max-w-3xl mx-auto leading-relaxed">
                Scopri dove bere <strong>acqua potabile gratuita</strong> in
                tutta Italia! La nostra mappa interattiva ti aiuta a trovare
                <strong>
                  {" "}
                  oltre {counts.total.toLocaleString("it-IT")} punti di
                  interesse
                </strong>{" "}
                tra fontanelle, parcheggi per biciclette, bagni pubblici e
                parchi giochi nelle principali città italiane.
              </p>
              <p className="text-lg mb-8 text-balance max-w-2xl mx-auto opacity-90">
                Perfetto per ciclisti, turisti e famiglie che vogliono ridurre
                l&apos;uso della plastica e contribuire alla sostenibilità
                ambientale.
              </p>
              <Link href="/app" className="btn btn-primary btn-lg text-lg px-8">
                <i className="fas fa-map-marked-alt mr-2"></i>
                Apri la mappa delle fontanelle
              </Link>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="py-16 px-4 bg-base-200">
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
                  <div className="stat-figure text-primary">
                    <i className="fas fa-faucet-drip text-3xl"></i>
                  </div>
                  <div className="stat-title">Fontanelle</div>
                  <div className="stat-value text-primary">
                    {counts.fountains.toLocaleString("it-IT")}
                  </div>
                  <div className="stat-desc">Acqua potabile gratuita</div>
                </div>

                <div className="stat">
                  <div className="stat-figure text-info">
                    <i className="fas fa-parking text-3xl"></i>
                  </div>
                  <div className="stat-title">Parcheggi bici</div>
                  <div className="stat-value text-info">
                    {counts.bicycleParkings.toLocaleString("it-IT")}
                  </div>
                  <div className="stat-desc">Posti sicuri per biciclette</div>
                </div>

                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <i className="fas fa-restroom text-3xl"></i>
                  </div>
                  <div className="stat-title">Bagni pubblici</div>
                  <div className="stat-value text-secondary">
                    {counts.toilets.toLocaleString("it-IT")}
                  </div>
                  <div className="stat-desc">Servizi igienici</div>
                </div>

                <div className="stat">
                  <div className="stat-figure text-warning">
                    <i className="fas fa-futbol text-3xl"></i>
                  </div>
                  <div className="stat-title">Parchi giochi</div>
                  <div className="stat-value text-warning">
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
        </div>

        {/* Benefits Section */}
        <div className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-center mb-12">
              Perché usare la nostra mappa delle fontanelle?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="card bg-base-200 shadow-lg">
                <div className="card-body text-center">
                  <div className="flex justify-center mb-4">
                    <i className="fas fa-faucet-drip text-4xl text-primary"></i>
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
                    <i className="fas fa-leaf text-4xl text-success"></i>
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
                    <i className="fas fa-users text-4xl text-info"></i>
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
                    <i className="fas fa-sync-alt text-4xl text-warning"></i>
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
        </div>

        {/* Cities Section */}
        <div className="py-16 px-4">
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
                    <i className="fas fa-landmark text-primary mr-2"></i>
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
                    <i className="fas fa-building text-primary mr-2"></i>
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
                    <i className="fas fa-church text-primary mr-2"></i>
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
                    <i className="fas fa-mountain text-primary mr-2"></i>
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
                    <i className="fas fa-sun text-primary mr-2"></i>
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
                    <i className="fas fa-map text-primary mr-2"></i>E molte
                    altre città
                  </h3>
                  <p>
                    La nostra mappa copre tutta l&apos;Italia! Trova fontanelle
                    anche a Bologna, Genova, Palermo, Bari, Venezia e in
                    centinaia di altre città e paesi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-16 px-4 bg-base-200">
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
                  <h3>L&apos;app funziona anche offline?</h3>
                </div>
                <div className="collapse-content">
                  <p>
                    L&apos;app è progettata come una Progressive Web App (PWA) e
                    può funzionare con connettività limitata. Una volta caricata
                    la mappa, potrai continuare a consultare le informazioni
                    anche senza connessione internet.
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
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="py-16 px-4 bg-primary text-primary-content">
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
              <i className="fas fa-map-marked-alt mr-2"></i>
              Apri la mappa delle fontanelle
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer footer-center p-10 bg-base-200 text-base-content flex flex-col sm:flex-row justify-between">
          <nav className="grid grid-flow-col gap-4">
            <Link href="/credits" className="link link-hover">
              <i className="fas fa-info-circle mr-1"></i>
              Crediti
            </Link>
            <Link href="/legend" className="link link-hover">
              <i className="fas fa-book-open mr-1"></i>
              Legenda
            </Link>
            <a
              href="https://github.com/matitalatina/fontanelle"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover"
            >
              <i className="fab fa-github mr-1"></i>
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
      </div>
    </>
  );
}
