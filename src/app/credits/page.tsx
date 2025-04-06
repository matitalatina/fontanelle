"use client";

import { useRouter } from "next/navigation";
import { shareApp, useTooltip } from "@/components/ShareAppMenuItem";

export default function CreditsPage() {
  const router = useRouter();
  const { tooltipIsOpen, showTooltip } = useTooltip();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6 ml-6">
        <h1 className="text-2xl font-bold">
          <i className="fa-solid fa-info-circle mr-2"></i>
          Crediti
        </h1>
        <button onClick={() => router.push("/")} className="btn btn-primary">
          <i className="fa-solid fa-arrow-left mr-2"></i>
          Torna alla mappa
        </button>
      </div>

      <div className="card bg-base-200 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">
            <i className="fas fa-bicycle text-primary mr-2"></i>
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
            <i className="fas fa-database text-primary mr-2"></i>
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
            <i className="fas fa-lightbulb"></i>
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
            <i className="fas fa-code text-primary mr-2"></i>
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
            <i className="fas fa-heart text-primary mr-2"></i>
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
                  <i className="fas fa-share-alt text-info mr-2"></i>
                  Condividi il progetto
                </h3>
                <p className="mb-4">
                  La condivisione è il modo più semplice ma potente per
                  supportarci! Parlane con amici, familiari o sui social media
                  per far conoscere questa risorsa ad altri ciclisti e famiglie.
                </p>
                <div className="flex flex-col gap-2">
                  <div
                    className={`${
                      tooltipIsOpen ? "tooltip tooltip-open" : ""
                    } tooltip-bottom w-full`}
                    data-tip="Link copiato"
                  >
                    <button
                      onClick={() => shareApp(showTooltip)}
                      className="btn btn-outline btn-sm w-full"
                    >
                      <i className="fa-solid fa-share-nodes mr-2"></i>
                      Condividi App
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h3 className="card-title text-base">
                  <i className="fas fa-donate text-success mr-2"></i>
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
                    <i className="fab fa-github mr-2"></i>
                    GitHub Sponsors
                  </a>
                  <a
                    href="https://www.buymeacoffee.com/mattianatali"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    <i className="fas fa-coffee mr-2"></i>
                    Buy Me A Coffee
                  </a>
                  <a
                    href="https://paypal.me/mattianatali"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    <i className="fab fa-paypal mr-2"></i>
                    PayPal
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="alert alert-success mt-6">
            <i className="fas fa-heart"></i>
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
