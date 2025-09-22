import Link from "next/link";
import ShareAppButton from "./ShareAppButton";
import { Metadata, Viewport } from "next";
import { createViewport } from "../seo-config";
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

export const metadata: Metadata = {
  title: "Crediti",
  description:
    "Informazioni sul progetto Fontanelle in Italia, motivazioni, fonte dei dati OpenStreetMap e come supportare lo sviluppo dell'app.",
  alternates: {
    canonical: "/credits",
  },
};

export const viewport: Viewport = createViewport();

export default function CreditsPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6 ml-6">
        <h1 className="text-2xl font-bold">
          <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
          Crediti
        </h1>
        <Link href="/app" className="btn btn-primary">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Torna alla mappa
        </Link>
      </div>

      <div className="card bg-base-200 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">
            <FontAwesomeIcon icon={faBicycle} className="text-primary mr-2" />
            Motivazione
          </h2>
          <p className="py-2">
            Ho iniziato a usare la bicicletta per i miei spostamenti quotidiani
            e ho subito notato la necessità di avere informazioni rapide su
            servizi essenziali durante i miei percorsi:
          </p>
          <ul className="list-disc pl-5 space-y-2 py-2">
            <li>Fontanelle d&apos;acqua potabile per riempire la borraccia</li>
            <li>
              Bagni pubblici per le necessità durante i percorsi più lunghi
            </li>
            <li>Parcheggi per biciclette sicuri</li>
            <li>
              Parchi giochi dove portare mia figlia durante le nostre gite in
              bici
            </li>
          </ul>
          <p className="py-2">
            Inizialmente ho concentrato l&apos;app su Milano, ma vista
            l&apos;utilità ho deciso di espanderla a tutta l&apos;Italia,
            creando uno strumento pratico e immediato per tutti i ciclisti e le
            famiglie in movimento.
          </p>
        </div>
      </div>

      <div className="card bg-base-200 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">
            <FontAwesomeIcon icon={faDatabase} className="text-primary mr-2" />
            Fonte dei dati
          </h2>
          <p className="py-2">
            Tutti i dati visualizzati sulla mappa provengono da{" "}
            <a
              href="https://www.openstreetmap.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-primary"
            >
              OpenStreetMap
            </a>
            , un progetto collaborativo per creare una mappa libera e
            modificabile del mondo.
          </p>
          <p className="py-2">
            OpenStreetMap è creato da una comunità di mappatori che
            contribuiscono e mantengono i dati sulle strade, sentieri, caffè,
            stazioni ferroviarie e molto altro ancora in tutto il mondo.
          </p>
          <div className="alert alert-info mt-4">
            <FontAwesomeIcon icon={faLightbulb} />
            <span>
              Se trovi informazioni mancanti o imprecise, puoi contribuire
              direttamente a OpenStreetMap per migliorare i dati non solo su
              questa app ma anche per l&apos;intera comunità.
            </span>
          </div>
        </div>
      </div>

      <div className="card bg-base-200 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">
            <FontAwesomeIcon icon={faCode} className="text-primary mr-2" />
            Sviluppo
          </h2>
          <p className="py-2">
            Questa applicazione è stata sviluppata con Next.js e utilizza
            diverse librerie open source, tra cui Leaflet per la visualizzazione
            delle mappe e DaisyUI per l&apos;interfaccia utente.
          </p>
          <p className="py-2">
            Il codice di questa app è completamente open source, disponibile su{" "}
            <a
              href="https://github.com/matitalatina/fontanelle"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-primary"
            >
              GitHub
            </a>
            . Ho scelto di rendere il progetto open source come modo per
            restituire qualcosa alla comunità, riconoscendo che questa app non
            sarebbe stata possibile senza altri straordinari progetti open
            source che l&apos;hanno preceduta.
          </p>
        </div>
      </div>

      <div className="card bg-base-200 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">
            <FontAwesomeIcon icon={faHeart} className="text-primary mr-2" />
            Supportaci
          </h2>
          <p className="py-2">
            Questa app è sviluppata e mantenuta nel tempo libero, con passione e
            dedizione. I costi di hosting, dominio e manutenzione sono sostenuti
            personalmente, e ogni aiuto è prezioso per garantire che il servizio
            rimanga attivo, aggiornato e in continuo miglioramento.
          </p>
          <p className="py-2">
            Il tuo supporto è un incentivo fondamentale per continuare a
            investire tempo ed energie in questo progetto, permettendoci di
            espandere le funzionalità e mantenere l&apos;infrastruttura
            necessaria.
          </p>

          <div className="divider">Come puoi aiutarci</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h3 className="card-title text-base">
                  <FontAwesomeIcon
                    icon={faShareAlt}
                    className="text-info mr-2"
                  />
                  Condividi il progetto
                </h3>
                <p className="mb-4">
                  La condivisione è il modo più semplice ma potente per
                  supportarci! Parlane con amici, familiari o sui social media
                  per far conoscere questa risorsa ad altri ciclisti e famiglie.
                </p>
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
                  Supporto finanziario
                </h3>
                <p className="mb-4">
                  Se l&apos;app ti è utile e vuoi sostenerla economicamente,
                  puoi farlo attraverso:
                </p>
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
            <span>
              Ogni contributo, grande o piccolo, fa la differenza. Grazie per
              supportare questo progetto open source!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
