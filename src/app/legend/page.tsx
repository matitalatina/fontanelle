import Link from "next/link";
import { Metadata, Viewport } from "next";
import { createViewport } from "../seo-config";
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
  faInfoCircle,
  faLayerGroup,
  faShareNodes,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";

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
          <FontAwesomeIcon icon={faBookOpen} className="mr-2" />
          Legenda
        </h1>
        <Link href="/app" className="btn btn-primary">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Torna alla mappa
        </Link>
      </div>

      <div className="card bg-base-200 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-primary mr-2"
            />
            Icone sulla mappa
          </h2>

          <div className="overflow-x-auto">
            <table className="table w-auto text-left">
              <thead>
                <tr>
                  <th className="text-right">Icona</th>
                  <th>Descrizione</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-right">
                    <div className="w-12 h-12 ml-auto flex items-center justify-center bg-fountain rounded-md">
                      <FontAwesomeIcon
                        icon={faFaucetDrip}
                        className="text-white text-xl"
                      />
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
                      <FontAwesomeIcon
                        icon={faFaucetDrip}
                        className="text-white text-xl"
                      />
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
                    <div className="w-12 h-12 ml-auto flex items-center justify-center bg-toilet rounded-md">
                      <FontAwesomeIcon
                        icon={faRestroom}
                        className="text-white text-xl"
                      />
                    </div>
                  </td>
                  <td>
                    <p className="font-bold">Bagno pubblico</p>
                    <p className="text-sm">Servizi igienici pubblici</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <div className="w-12 h-12 ml-auto flex items-center justify-center bg-bicycle rounded-md">
                      <FontAwesomeIcon
                        icon={faParking}
                        className="text-white text-xl"
                      />
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
                    <div className="w-12 h-12 ml-auto flex items-center justify-center bg-playground rounded-full">
                      <FontAwesomeIcon
                        icon={faFutbol}
                        className="text-white text-xl"
                      />
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
            <div className="w-8 h-8 flex items-center justify-center bg-fountain rounded-md mr-2">
              <FontAwesomeIcon icon={faFaucetDrip} className="text-white" />
            </div>
            Attributi Fontanelle
          </h2>
          <div className="overflow-x-auto">
            <table className="table w-auto text-left">
              <thead>
                <tr>
                  <th className="text-right">Icona</th>
                  <th>Descrizione</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-right">
                    <div className="w-12 h-12 ml-auto flex items-center justify-center bg-fountain rounded-md">
                      <FontAwesomeIcon
                        icon={faFaucetDrip}
                        className="text-white text-xl"
                      />
                    </div>
                  </td>
                  <td>
                    <p>Pubblico gratuito</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <div className="w-12 h-12 ml-auto flex items-center justify-center bg-blue-600 rounded-md">
                      <FontAwesomeIcon
                        icon={faFaucetDrip}
                        className="text-white text-xl"
                      />
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
            <div className="w-8 h-8 flex items-center justify-center bg-toilet rounded-md mr-2">
              <FontAwesomeIcon icon={faRestroom} className="text-white" />
            </div>
            Attributi Bagni Pubblici
          </h2>
          <div className="overflow-x-auto">
            <table className="table w-auto text-left">
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
                    <p>A pagamento / Gratuito</p>
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
              <FontAwesomeIcon icon={faParking} className="text-white" />
            </div>
            Attributi Parcheggi Bici
          </h2>
          <div className="overflow-x-auto">
            <table className="table w-auto text-left">
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
                    <p>A pagamento / Gratuito</p>
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
                    <p>Coperto / Non coperto</p>
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
                    <p>Al chiuso / All&apos;aperto</p>
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
                    <p>Con / Senza videosorveglianza</p>
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
              <FontAwesomeIcon icon={faFutbol} className="text-gray-800" />
            </div>
            Attributi Parchi Giochi
          </h2>
          <div className="overflow-x-auto">
            <table className="table w-auto text-left">
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
                    <p>A pagamento / Gratuito</p>
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
                    <p>Al chiuso / All&apos;aperto</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <div className="flex items-center justify-end">
                      <FontAwesomeIcon
                        icon={faUserShield}
                        className="text-xl"
                      />
                      <span className="mx-2">/</span>
                      <span className="fa-stack">
                        <FontAwesomeIcon
                          icon={faUserShield}
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
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="text-primary mr-2"
            />
            Informazioni Aggiuntive
          </h2>
          <div className="overflow-x-auto">
            <table className="table w-auto text-left">
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
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        size="sm"
                        className="text-xl"
                      />
                    </div>
                  </td>
                  <td>
                    <p>OpenStreetMap (stile mappa standard)</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <div className="flex items-center justify-end">
                      <FontAwesomeIcon
                        icon={faBicycle}
                        size="sm"
                        className="text-xl"
                      />
                    </div>
                  </td>
                  <td>
                    <p>CyclOSM (stile mappa per ciclisti)</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <div className="flex items-center justify-end">
                      <FontAwesomeIcon
                        icon={faLayerGroup}
                        size="lg"
                        className="text-xl"
                      />
                    </div>
                  </td>
                  <td>
                    <p>Selettore di strati sulla mappa</p>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">
                    <div className="flex items-center justify-end">
                      <FontAwesomeIcon
                        icon={faShareNodes}
                        className="text-xl"
                      />
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
