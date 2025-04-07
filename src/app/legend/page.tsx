import Link from "next/link";
import { Metadata, Viewport } from "next/types";
import { createViewport } from "../seo-config";

export const metadata: Metadata = {
  title: "Legenda",
  description:
    "Legenda dei simboli della mappa delle fontanelle d'acqua potabile, case dell'acqua, bagni pubblici, parcheggi per biciclette e parchi giochi in Italia.",
  alternates: {
    canonical: "/legend",
  },
};

export const viewport: Viewport = createViewport();

export default function LegendaPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6 ml-6">
        <h1 className="text-2xl font-bold">
          <i className="fa-solid fa-book-open mr-2"></i>
          Legenda
        </h1>
        <Link href="/" className="btn btn-primary">
          <i className="fa-solid fa-arrow-left mr-2"></i>
          Torna alla mappa
        </Link>
      </div>

      <div className="card bg-base-200 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">
            <i className="fas fa-map-marker-alt text-primary mr-2"></i>
            Icone sulla mappa
          </h2>

          <div className="overflow-x-auto">
            <table className="table table-zebra w-auto text-left">
              <thead>
                <tr>
                  <th className="text-right">Icona</th>
                  <th>Descrizione</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-right">
                    <div className="w-12 h-12 ml-auto flex items-center justify-center bg-green-600 rounded-md">
                      <i className="fas fa-faucet-drip text-white text-xl"></i>
                    </div>
                  </td>
                  <td>
                    <p className="font-bold">Fontanella</p>
                    <p className="text-sm">
                      Punto acqua potabile pubblico gratuito
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <div className="w-12 h-12 ml-auto flex items-center justify-center bg-blue-600 rounded-md">
                      <i className="fas fa-faucet-drip text-white text-xl"></i>
                    </div>
                  </td>
                  <td>
                    <p className="font-bold">Casa dell&apos;acqua</p>
                    <p className="text-sm">
                      Distributore automatico di acqua potabile
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <div className="w-12 h-12 ml-auto flex items-center justify-center bg-purple-600 rounded-md">
                      <i className="fas fa-restroom text-white text-xl"></i>
                    </div>
                  </td>
                  <td>
                    <p className="font-bold">Bagno pubblico</p>
                    <p className="text-sm">Servizi igienici pubblici</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <div className="w-12 h-12 ml-auto flex items-center justify-center bg-blue-600 rounded-md">
                      <i className="fas fa-parking text-white text-xl"></i>
                    </div>
                  </td>
                  <td>
                    <p className="font-bold">Parcheggio bici</p>
                    <p className="text-sm">
                      Area dedicata al parcheggio delle biciclette
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <div className="w-12 h-12 ml-auto flex items-center justify-center bg-yellow-400 rounded-full">
                      <i className="fas fa-futbol text-gray-800 text-xl"></i>
                    </div>
                  </td>
                  <td>
                    <p className="font-bold">Parco giochi</p>
                    <p className="text-sm">Area giochi per bambini</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Attributi per Fontanelle */}
      <div className="card bg-base-200 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">
            <div className="w-8 h-8 flex items-center justify-center bg-green-600 rounded-md mr-2">
              <i className="fas fa-faucet-drip text-white"></i>
            </div>
            Attributi Fontanelle
          </h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-auto text-left">
              <thead>
                <tr>
                  <th className="text-right">Icona</th>
                  <th>Descrizione</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-right">
                    <div className="w-12 h-12 ml-auto flex items-center justify-center bg-green-600 rounded-md">
                      <i className="fas fa-faucet-drip text-white text-xl"></i>
                    </div>
                  </td>
                  <td>
                    <p>Pubblico gratuito</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <div className="w-12 h-12 ml-auto flex items-center justify-center bg-blue-600 rounded-md">
                      <i className="fas fa-faucet-drip text-white text-xl"></i>
                    </div>
                  </td>
                  <td>
                    <p>Casa dell&apos;acqua (distributore automatico)</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Attributi per Bagni Pubblici */}
      <div className="card bg-base-200 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">
            <div className="w-8 h-8 flex items-center justify-center bg-purple-600 rounded-md mr-2">
              <i className="fas fa-restroom text-white"></i>
            </div>
            Attributi Bagni Pubblici
          </h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-auto text-left">
              <thead>
                <tr>
                  <th className="text-right">Icona</th>
                  <th>Descrizione</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-right">
                    <div className="flex items-center justify-end">
                      <i className="fas fa-euro-sign text-xl"></i>
                      <span className="mx-2">/</span>
                      <span className="fa-stack">
                        <i className="fa-stack-1x fas fa-euro-sign"></i>
                        <i className="fa-solid fa-ban fa-stack-2x text-red-900"></i>
                      </span>
                    </div>
                  </td>
                  <td>
                    <p>A pagamento / Gratuito</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <div className="flex items-center justify-end">
                      <i className="fas fa-baby text-xl"></i>
                      <span className="mx-2">/</span>
                      <span className="fa-stack">
                        <i className="fa-stack-1x fas fa-baby"></i>
                        <i className="fa-solid fa-ban fa-stack-2x text-red-900"></i>
                      </span>
                    </div>
                  </td>
                  <td>
                    <p>Con / Senza fasciatoio per neonati</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Attributi per Parcheggi Bici */}
      <div className="card bg-base-200 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">
            <div className="w-8 h-8 flex items-center justify-center bg-blue-600 rounded-md mr-2">
              <i className="fas fa-parking text-white"></i>
            </div>
            Attributi Parcheggi Bici
          </h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-auto text-left">
              <thead>
                <tr>
                  <th className="text-right">Icona</th>
                  <th>Descrizione</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-right">
                    <div className="flex items-center justify-end">
                      <i className="fas fa-euro-sign text-xl"></i>
                      <span className="mx-2">/</span>
                      <span className="fa-stack">
                        <i className="fa-stack-1x fas fa-euro-sign"></i>
                        <i className="fa-solid fa-ban fa-stack-2x text-red-900"></i>
                      </span>
                    </div>
                  </td>
                  <td>
                    <p>A pagamento / Gratuito</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <div className="flex items-center justify-end">
                      <i className="fas fa-umbrella text-xl"></i>
                      <span className="mx-2">/</span>
                      <span className="fa-stack">
                        <i className="fa-stack-1x fas fa-umbrella"></i>
                        <i className="fa-solid fa-ban fa-stack-2x text-red-900"></i>
                      </span>
                    </div>
                  </td>
                  <td>
                    <p>Coperto / Non coperto</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <div className="flex items-center justify-end">
                      <i className="fas fa-house text-xl"></i>
                      <span className="mx-2">/</span>
                      <span className="fa-stack">
                        <i className="fa-stack-1x fas fa-house"></i>
                        <i className="fa-solid fa-ban fa-stack-2x text-red-900"></i>
                      </span>
                    </div>
                  </td>
                  <td>
                    <p>Al chiuso / All&apos;aperto</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <div className="flex items-center justify-end">
                      <i className="fas fa-video text-xl"></i>
                      <span className="mx-2">/</span>
                      <span className="fa-stack">
                        <i className="fa-stack-1x fas fa-video"></i>
                        <i className="fa-solid fa-ban fa-stack-2x text-red-900"></i>
                      </span>
                    </div>
                  </td>
                  <td>
                    <p>Con / Senza videosorveglianza</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <div className="flex items-center justify-end">
                      <i className="fa-solid fa-bicycle"></i>
                      <span className="ml-1">N</span>
                    </div>
                  </td>
                  <td>
                    <p>Capacità (numero di posti disponibili)</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Attributi per Parchi Giochi */}
      <div className="card bg-base-200 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">
            <div className="w-8 h-8 flex items-center justify-center bg-yellow-400 rounded-full mr-2">
              <i className="fas fa-futbol text-gray-800"></i>
            </div>
            Attributi Parchi Giochi
          </h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-auto text-left">
              <thead>
                <tr>
                  <th className="text-right">Icona</th>
                  <th>Descrizione</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-right">
                    <div className="flex items-center justify-end">
                      <i className="fas fa-euro-sign text-xl"></i>
                      <span className="mx-2">/</span>
                      <span className="fa-stack">
                        <i className="fa-stack-1x fas fa-euro-sign"></i>
                        <i className="fa-solid fa-ban fa-stack-2x text-red-900"></i>
                      </span>
                    </div>
                  </td>
                  <td>
                    <p>A pagamento / Gratuito</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <div className="flex items-center justify-end">
                      <i className="fas fa-home text-xl"></i>
                      <span className="mx-2">/</span>
                      <span className="fa-stack">
                        <i className="fa-stack-1x fas fa-home"></i>
                        <i className="fa-solid fa-ban fa-stack-2x text-red-900"></i>
                      </span>
                    </div>
                  </td>
                  <td>
                    <p>Al chiuso / All&apos;aperto</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <div className="flex items-center justify-end">
                      <i className="fas fa-user-shield text-xl"></i>
                      <span className="mx-2">/</span>
                      <span className="fa-stack">
                        <i className="fa-stack-1x fas fa-user-shield"></i>
                        <i className="fa-solid fa-ban fa-stack-2x text-red-900"></i>
                      </span>
                    </div>
                  </td>
                  <td>
                    <p>Con / Senza supervisione</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Informazioni Aggiuntive */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">
            <i className="fas fa-info-circle text-primary mr-2"></i>
            Informazioni Aggiuntive
          </h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-auto text-left">
              <thead>
                <tr>
                  <th className="text-right">Icona</th>
                  <th>Descrizione</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-right">
                    <div className="flex items-center justify-end">
                      <i className="fas fa-map-marked-alt fa-sm text-xl"></i>
                    </div>
                  </td>
                  <td>
                    <p>OpenStreetMap (stile mappa standard)</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <div className="flex items-center justify-end">
                      <i className="fas fa-bicycle fa-sm text-xl"></i>
                    </div>
                  </td>
                  <td>
                    <p>CyclOSM (stile mappa per ciclisti)</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <div className="flex items-center justify-end">
                      <i className="fas fa-layer-group fa-lg text-xl"></i>
                    </div>
                  </td>
                  <td>
                    <p>Selettore di strati sulla mappa</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <div className="flex items-center justify-end">
                      <i className="fa-solid fa-share-nodes text-xl"></i>
                    </div>
                  </td>
                  <td>
                    <p>Condividi l&apos;applicazione</p>
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
