import {
  APP_DESCRIPTION,
  APP_NAME,
  AUTHOR_NAME,
  BASE_URL,
} from "../seo-config";

export function generateAppJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: APP_NAME,
    description: APP_DESCRIPTION,
    url: BASE_URL,
    applicationCategory: "Map, Utility",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
    },
    potentialAction: {
      "@type": "ViewAction",
      target: `${BASE_URL}/app`,
    },
  };
}

export function generateFAQJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "L'acqua delle fontanelle è potabile?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sì, l'acqua delle fontanelle pubbliche in Italia è generalmente potabile e sicura da bere. Viene regolarmente controllata dalle autorità sanitarie locali. In caso di problemi temporanei, vengono esposti cartelli che ne sconsigliano l'uso.",
        },
      },
      {
        "@type": "Question",
        name: "L'app funziona anche offline?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "L'app è progettata come una Progressive Web App (PWA) e può funzionare con connettività limitata. Una volta caricata la mappa, potrai continuare a consultare le informazioni anche senza connessione internet.",
        },
      },
      {
        "@type": "Question",
        name: "Posso segnalare una nuova fontanella?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "I dati provengono da OpenStreetMap, un progetto collaborativo. Puoi contribuire direttamente modificando i dati su OpenStreetMap per aggiungere nuove fontanelle o aggiornare informazioni esistenti. Le modifiche saranno visibili anche sulla nostra mappa.",
        },
      },
      {
        "@type": "Question",
        name: "Come posso cercare una città specifica?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "È semplicissimo! Sulla mappa troverai una barra di ricerca in alto. Scrivi il nome della città, di un comune o di una via specifica e la mappa si centrerà automaticamente mostrandoti tutti i punti di interesse in quella zona.",
        },
      },
      {
        "@type": "Question",
        name: "È disponibile in tutta Italia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sì, la copertura si estende a tutta l'Italia! La disponibilità dei dati dipende da quanto le singole zone sono state mappate su OpenStreetMap. Le grandi città hanno una copertura più completa, ma stiamo costantemente espandendo la mappa anche nei centri più piccoli.",
        },
      },
    ],
  };
}
