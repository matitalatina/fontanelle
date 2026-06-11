import "server-only";

import type { Locale } from "./locales";

export type Dictionary = {
  languages: {
    it: string;
    en: string;
  };
  manifest: {
    name: string;
    shortName: string;
  };
  common: {
    backToMap: string;
    legend: string;
    credits: string;
    theme: string;
    language: string;
    mapStyle: string;
    openStreetMap: string;
    cyclosm: string;
    copyLink: string;
    linkCopied: string;
    unableToShareApp: string;
    unableToSharePosition: string;
    openInMaps: string;
    close: string;
  };
  app: {
    title: string;
    description: string;
    searchPlaceholder: string;
    searchNoResult: string;
    searchError: string;
    searchPausedTitle: string;
    searchPausedDescription: string;
    locationLoading: string;
    locationPermissionDenied: string;
    locationUnavailable: string;
    locationTimeout: string;
    locationError: string;
    locateMe: string;
    sharingLabel: string;
    appMenuLabel: string;
    installApp: string;
    installTitle: string;
    installSubtitle: string;
    installStep1: string;
    installStep2: string;
    installStep3: string;
    installMenuAction: string;
    installAction: string;
    installedHint: string;
    capacitySingular: string;
    capacityPlural: string;
    themeLabel: string;
    overlayLabel: string;
    overlays: {
      stations: string;
      toilets: string;
      bicycleParkings: string;
      playgrounds: string;
    };
    markerLabels: {
      fountain: string;
      waterHouse: string;
      toilet: string;
      bicycleParking: string;
      playground: string;
      customPoint: string;
      searchResult: string;
    };
    markerTypes: {
      fountain: string;
      customPoint: string;
      playground: string;
      toilet: string;
      bicycleParking: string;
      searchResult: string;
    };
  };
  landing: {
    eyebrow: string;
    title: string;
    descriptionParts: {
      prefix: string;
      bold1: string;
      middle: string;
      pointsLabel: string;
      suffix: string;
    };
    descriptionSecondary: string;
    cta: string;
    scrollDownAria: string;
    scrollDownHint: string;
    statsTitle: string;
    statsSubtitle: string;
    totalPoints: string;
    totalPointsSuffix: string;
    stats: Array<{
      title: string;
      description: string;
    }>;
    benefitsTitle: string;
    benefits: Array<{
      title: string;
      description: string;
    }>;
    howItWorksTitle: string;
    howItWorksSubtitle: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
    citiesTitle: string;
    citiesSubtitle: string;
    cities: Array<{
      title: string;
      description: string;
    }>;
    faqTitle: string;
    faq: Array<{
      question: string;
      answer: string;
    }>;
    finalTitle: string;
    finalDescription: string;
    footerNote: string;
  };
  credits: {
    title: string;
    description: string;
    backToMap: string;
    motivationTitle: string;
    motivationBody: string[];
    dataTitle: string;
    dataBody: string[];
    developmentTitle: string;
    developmentBody: string[];
    supportTitle: string;
    supportBody: string[];
    shareProjectTitle: string;
    shareProjectBody: string;
    financialSupportTitle: string;
    financialSupportBody: string;
    shareProjectButton: string;
    supportFinancialButton: string;
    closingNote: string;
  };
  legend: {
    title: string;
    description: string;
    backToMap: string;
    iconTableTitle: string;
    attributesTitle: string;
    iconHeader: string;
    descriptionHeader: string;
    rows: {
      fountain: { title: string; description: string };
      waterHouse: { title: string; description: string };
      toilet: { title: string; description: string };
      bicycleParking: { title: string; description: string };
      playground: { title: string; description: string };
    };
    attributeRows: {
      paidOrFree: string;
      changingTable: string;
      coveredOrOpen: string;
      indoorOrOutdoor: string;
      surveillance: string;
      capacity: string;
      supervised: string;
    };
  };
  search: {
    resultTitle: string;
    noResults: string;
    error: string;
  };
  share: {
    appTitle: string;
    appText: string;
    appUnavailable: string;
    positionTitle: string;
    positionPrefix: string;
    positionSuffix: string;
    positionUnavailable: string;
    copied: string;
    shared: string;
  };
  jsonld: {
    potableWaterQuestion: string;
    potableWaterAnswer: string;
    offlineQuestion: string;
    offlineAnswer: string;
    contributeQuestion: string;
    contributeAnswer: string;
    searchQuestion: string;
    searchAnswer: string;
    coverageQuestion: string;
    coverageAnswer: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  it: {
    languages: {
      it: "Italiano",
      en: "English",
    },
    manifest: {
      name: "Fontanelle in Italia",
      shortName: "Fontanelle",
    },
    common: {
      backToMap: "Torna alla mappa",
      legend: "Legenda",
      credits: "Crediti",
      theme: "Tema",
      language: "Lingua",
      mapStyle: "Stile mappa",
      openStreetMap: "OpenStreetMap",
      cyclosm: "CyclOSM",
      copyLink: "Link copiato",
      linkCopied: "Link copiato",
      unableToShareApp: "Non è possibile condividere l'app",
      unableToSharePosition: "Non è possibile condividere la posizione",
      openInMaps: "Apri in Google Maps",
      close: "Chiudi",
    },
    app: {
      title: "Mappa Interattiva",
      description:
        "Usa la mappa interattiva per trovare fontanelle, bagni pubblici, parcheggi per biciclette e parchi giochi in tutta Italia.",
      searchPlaceholder: "Cerca un luogo...",
      searchNoResult: "Nessun risultato trovato",
      searchError: "Errore durante la ricerca",
      searchPausedTitle: "Ricerca in pausa",
      searchPausedDescription:
        "L'area visualizzata è troppo grande. Aumenta lo zoom per riattivare la ricerca.",
      locationLoading: "Localizzazione in corso...",
      locationPermissionDenied: "Permesso negato",
      locationUnavailable: "Posizione non disponibile",
      locationTimeout: "Timeout",
      locationError: "Errore",
      locateMe: "Trova la mia posizione",
      sharingLabel: "Condividi",
      appMenuLabel: "Menu applicazione",
      installApp: "Installa App",
      installTitle: "Installa Fontanelle",
      installSubtitle: "Aggiungi l'app alla tua schermata Home",
      installStep1: "Tocca",
      installStep2: "Scorri e seleziona",
      installStep3: "Conferma toccando",
      installMenuAction: "Aggiungi a Home",
      installAction: "Aggiungi",
      installedHint: "L'app apparirà nella tua schermata Home",
      capacitySingular: "posto",
      capacityPlural: "posti",
      themeLabel: "Tema",
      overlayLabel: "Filtri mappa",
      overlays: {
        stations: "Fontanelle",
        toilets: "Bagni pubblici",
        bicycleParkings: "Parcheggi bici",
        playgrounds: "Parchi giochi",
      },
      markerLabels: {
        fountain: "Fontanella",
        waterHouse: "Casa dell'acqua",
        toilet: "Bagno pubblico",
        bicycleParking: "Parcheggio bici",
        playground: "Parco giochi",
        customPoint: "Punto personalizzato",
        searchResult: "Risultato ricerca",
      },
      markerTypes: {
        fountain: "una fontanella",
        customPoint: "un punto personalizzato",
        playground: "un parco giochi",
        toilet: "un bagno",
        bicycleParking: "un parcheggio bici",
        searchResult: "un risultato della ricerca",
      },
    },
    landing: {
      eyebrow: "Mappa fontanelle d'acqua potabile in Italia",
      title: "Trova fontanelle gratuite vicino a te",
      descriptionParts: {
        prefix: "La mappa interattiva per trovare ",
        bold1: "acqua potabile gratuita",
        middle: " in tutta Italia: ",
        pointsLabel: "punti",
        suffix:
          " tra fontanelle, bagni pubblici, parcheggi bici e parchi giochi.",
      },
      descriptionSecondary:
        "Ideale per ciclisti, turisti e famiglie che vogliono muoversi leggeri e sostenibili.",
      cta: "Apri la mappa",
      scrollDownAria: "Scorri per vedere di più",
      scrollDownHint: "Scorri per saperne di più",
      statsTitle: "La mappa più completa d'Italia",
      statsSubtitle:
        "Migliaia di punti di interesse verificati e costantemente aggiornati",
      totalPoints: "Totale punti di interesse",
      totalPointsSuffix: "in tutta Italia",
      stats: [
        { title: "Fontanelle", description: "Acqua potabile gratuita" },
        {
          title: "Parcheggi bici",
          description: "Posti sicuri per biciclette",
        },
        { title: "Bagni pubblici", description: "Servizi igienici" },
        { title: "Parchi giochi", description: "Aree per bambini" },
      ],
      benefitsTitle: "Perché usare la nostra mappa delle fontanelle?",
      benefits: [
        {
          title: "Cerca luoghi",
          description:
            "Trova istantaneamente fontanelle in qualsiasi città grazie al nuovo potente motore di ricerca",
        },
        {
          title: "Acqua potabile gratis",
          description:
            "Bevi acqua potabile di qualità ovunque ti trovi in Italia, senza spendere un centesimo",
        },
        {
          title: "Rispetto dell'ambiente",
          description:
            "Riduci l'uso di bottiglie di plastica e contribuisci attivamente alla sostenibilità",
        },
        {
          title: "Per tutti",
          description:
            "Ideale per turisti, cittadini, ciclisti e famiglie in movimento",
        },
        {
          title: "Sempre aggiornata",
          description:
            "Dati costantemente aggiornati grazie alla community di OpenStreetMap",
        },
      ],
      howItWorksTitle: "Come funziona la mappa delle fontanelle",
      howItWorksSubtitle:
        "In tre passaggi trovi acqua potabile gratuita ovunque in Italia.",
      steps: [
        {
          title: "Apri la mappa",
          description:
            "Accedi alla mappa interattiva e visualizza subito tutte le fontanelle, i bagni pubblici e i parcheggi bici.",
        },
        {
          title: "Cerca la tua zona",
          description:
            "Usa la ricerca per città, comune o via e centra la mappa esattamente dove ti serve.",
        },
        {
          title: "Filtra i servizi",
          description:
            "Seleziona solo ciò che ti interessa: fontanelle, bagni, parcheggi bici o parchi giochi.",
        },
      ],
      citiesTitle: "Fontanelle nelle principali città italiane",
      citiesSubtitle:
        "Trova fontanelle d'acqua potabile nelle città più importanti d'Italia",
      cities: [
        {
          title: "Fontanelle a Roma",
          description:
            'La Capitale offre centinaia di fontanelle storiche e moderne. Dalle iconiche "nasoni" ai punti d\'acqua nei parchi, trova sempre dove dissetarti gratuitamente.',
        },
        {
          title: "Fontanelle a Milano",
          description:
            "Nel capoluogo lombardo trova facilmente fontanelle nei parchi, nelle stazioni e nei quartieri. Perfetto per chi si muove in bicicletta o a piedi per la città.",
        },
        {
          title: "Fontanelle a Firenze",
          description:
            "Nella culla del Rinascimento scopri fontanelle artistiche e funzionali. Ideali per turisti che visitano i musei e i monumenti storici.",
        },
        {
          title: "Fontanelle a Torino",
          description:
            "La città sabauda offre numerosi punti d'acqua nei suoi eleganti parchi e lungo le vie del centro storico. Acqua fresca di montagna sempre disponibile.",
        },
        {
          title: "Fontanelle a Napoli",
          description:
            "Nel capoluogo campano trova refrigerio presso le fontanelle pubbliche. Particolarmente utili durante le calde giornate estive mentre esplori la città partenopea.",
        },
        {
          title: "E molte altre città",
          description:
            "La nostra mappa copre tutta l'Italia! Trova fontanelle anche a Bologna, Genova, Palermo, Bari, Venezia e in centinaia di altre città e paesi.",
        },
      ],
      faqTitle: "Domande frequenti",
      faq: [
        {
          question: "L'acqua delle fontanelle è potabile?",
          answer:
            "Sì, l'acqua delle fontanelle pubbliche in Italia è generalmente potabile e sicura da bere. Viene regolarmente controllata dalle autorità sanitarie locali. In caso di problemi temporanei, vengono esposti cartelli che ne sconsigliano l'uso.",
        },
        {
          question: "Posso segnalare una nuova fontanella?",
          answer:
            "I dati provengono da OpenStreetMap, un progetto collaborativo. Puoi contribuire direttamente modificando i dati su OpenStreetMap per aggiungere nuove fontanelle o aggiornare informazioni esistenti. Le modifiche saranno visibili anche sulla nostra mappa.",
        },
        {
          question: "Come posso cercare una città specifica?",
          answer:
            "È semplicissimo! Sulla mappa troverai una barra di ricerca in alto. Scrivi il nome della città, di un comune o di una via specifica e la mappa si centrerà automaticamente mostrandoti tutti i punti di interesse in quella zona.",
        },
        {
          question: "È disponibile in tutta Italia?",
          answer:
            "Sì, la copertura si estende a tutta l'Italia! La disponibilità dei dati dipende da quanto le singole zone sono state mappate su OpenStreetMap. Le grandi città hanno una copertura più completa, ma stiamo costantemente espandendo la mappa anche nei centri più piccoli.",
        },
        {
          question: "L'app funziona anche offline?",
          answer:
            "L'app è progettata come Progressive Web App (PWA) e può funzionare con connettività limitata. Una volta caricata la mappa, potrai consultare le informazioni anche senza connessione internet.",
        },
      ],
      finalTitle: "Inizia subito a trovare fontanelle vicino a te!",
      finalDescription:
        "Unisciti a migliaia di persone che hanno già scoperto come bere acqua gratis in tutta Italia contribuendo alla sostenibilità ambientale.",
      footerNote: "Dati da OpenStreetMap",
    },
    credits: {
      title: "Crediti",
      description:
        "Informazioni sul progetto Fontanelle in Italia, motivazioni, fonte dei dati OpenStreetMap e come supportare lo sviluppo dell'app.",
      backToMap: "Torna alla mappa",
      motivationTitle: "Motivazione",
      motivationBody: [
        "Ho iniziato a usare la bicicletta per i miei spostamenti quotidiani e ho subito notato la necessità di avere informazioni rapide su servizi essenziali durante i miei percorsi:",
        "Fontanelle d'acqua potabile per riempire la borraccia",
        "Bagni pubblici per le necessità durante i percorsi più lunghi",
        "Parcheggi per biciclette sicuri",
        "Parchi giochi dove portare mia figlia durante le nostre gite in bici",
        "Inizialmente ho concentrato l'app su Milano, ma vista l'utilità ho deciso di espanderla a tutta l'Italia, creando uno strumento pratico e immediato per tutti i ciclisti e le famiglie in movimento.",
      ],
      dataTitle: "Fonte dei dati",
      dataBody: [
        "Tutti i dati visualizzati sulla mappa provengono da OpenStreetMap, un progetto collaborativo per creare una mappa libera e modificabile del mondo.",
        "OpenStreetMap è creato da una comunità di mappatori che contribuiscono e mantengono i dati sulle strade, sentieri, caffè, stazioni ferroviarie e molto altro ancora in tutto il mondo.",
        "Se trovi informazioni mancanti o imprecise, puoi contribuire direttamente a OpenStreetMap per migliorare i dati non solo su questa app ma anche per l'intera comunità.",
      ],
      developmentTitle: "Sviluppo",
      developmentBody: [
        "Questa applicazione è stata sviluppata con Next.js e utilizza diverse librerie open source, tra cui Leaflet per la visualizzazione delle mappe e DaisyUI per l'interfaccia utente.",
        "Il codice di questa app è completamente open source, disponibile su GitHub. Ho scelto di rendere il progetto open source come modo per restituire qualcosa alla comunità, riconoscendo che questa app non sarebbe stata possibile senza altri straordinari progetti open source che l'hanno preceduta.",
      ],
      supportTitle: "Supportaci",
      supportBody: [
        "Questa app è sviluppata e mantenuta nel tempo libero, con passione e dedizione. I costi di hosting, dominio e manutenzione sono sostenuti personalmente, e ogni aiuto è prezioso per garantire che il servizio rimanga attivo, aggiornato e in continuo miglioramento.",
        "Il tuo supporto è un incentivo fondamentale per continuare a investire tempo ed energie in questo progetto, permettendoci di espandere le funzionalità e mantenere l'infrastruttura necessaria.",
      ],
      shareProjectTitle: "Condividi il progetto",
      shareProjectBody:
        "La condivisione è il modo più semplice ma potente per supportarci! Parlane con amici, familiari o sui social media per far conoscere questa risorsa ad altri ciclisti e famiglie.",
      financialSupportTitle: "Supporto finanziario",
      financialSupportBody:
        "Se l'app ti è utile e vuoi sostenerla economicamente, puoi farlo attraverso:",
      shareProjectButton: "Condividi App",
      supportFinancialButton: "Supporto finanziario",
      closingNote:
        "Ogni contributo, grande o piccolo, fa la differenza. Grazie per supportare questo progetto open source!",
    },
    legend: {
      title: "Legenda",
      description:
        "Legenda dei simboli della mappa delle fontanelle d'acqua potabile, case dell'acqua, bagni pubblici, parcheggi per biciclette e parchi giochi in Italia.",
      backToMap: "Torna alla mappa",
      iconTableTitle: "Icone sulla mappa",
      attributesTitle: "Attributi",
      iconHeader: "Icona",
      descriptionHeader: "Descrizione",
      rows: {
        fountain: {
          title: "Fontanella",
          description: "Punto acqua potabile pubblico gratuito",
        },
        waterHouse: {
          title: "Casa dell'acqua",
          description: "Distributore automatico di acqua potabile",
        },
        toilet: {
          title: "Bagno pubblico",
          description: "Servizi igienici pubblici",
        },
        bicycleParking: {
          title: "Parcheggio bici",
          description: "Area dedicata al parcheggio delle biciclette",
        },
        playground: {
          title: "Parco giochi",
          description: "Area giochi per bambini",
        },
      },
      attributeRows: {
        paidOrFree: "A pagamento / Gratuito",
        changingTable: "Con / Senza fasciatoio per neonati",
        coveredOrOpen: "Coperto / Non coperto",
        indoorOrOutdoor: "Al chiuso / All'aperto",
        surveillance: "Con / Senza videosorveglianza",
        capacity: "Capacità (numero di posti disponibili)",
        supervised: "Con / Senza supervisione",
      },
    },
    search: {
      resultTitle: "Risultato ricerca",
      noResults: "Nessun risultato trovato",
      error: "Errore durante la ricerca",
    },
    share: {
      appTitle: "Fontanelle in Italia",
      appText: "Trova velocemente dove bere in Italia",
      appUnavailable: "Non è possibile condividere l'app",
      positionTitle: "Posizione",
      positionPrefix: "Ecco qui",
      positionSuffix: "L'ho trovato grazie a questa app:",
      positionUnavailable: "Non è possibile condividere la posizione",
      copied: "Link copiato",
      shared: "Elemento condiviso",
    },
    jsonld: {
      potableWaterQuestion: "L'acqua delle fontanelle è potabile?",
      potableWaterAnswer:
        "Sì, l'acqua delle fontanelle pubbliche in Italia è generalmente potabile e sicura da bere. Viene regolarmente controllata dalle autorità sanitarie locali. In caso di problemi temporanei, vengono esposti cartelli che ne sconsigliano l'uso.",
      offlineQuestion: "L'app funziona anche offline?",
      offlineAnswer:
        "L'app è progettata come una Progressive Web App (PWA) e può funzionare con connettività limitata. Una volta caricata la mappa, potrai continuare a consultare le informazioni anche senza connessione internet.",
      contributeQuestion: "Posso segnalare una nuova fontanella?",
      contributeAnswer:
        "I dati provengono da OpenStreetMap, un progetto collaborativo. Puoi contribuire direttamente modificando i dati su OpenStreetMap per aggiungere nuove fontanelle o aggiornare informazioni esistenti. Le modifiche saranno visibili anche sulla nostra mappa.",
      searchQuestion: "Come posso cercare una città specifica?",
      searchAnswer:
        "È semplicissimo! Sulla mappa troverai una barra di ricerca in alto. Scrivi il nome della città, di un comune o di una via specifica e la mappa si centrerà automaticamente mostrandoti tutti i punti di interesse in quella zona.",
      coverageQuestion: "È disponibile in tutta Italia?",
      coverageAnswer:
        "Sì, la copertura si estende a tutta l'Italia! La disponibilità dei dati dipende da quanto le singole zone sono state mappate su OpenStreetMap. Le grandi città hanno una copertura più completa, ma stiamo costantemente espandendo la mappa anche nei centri più piccoli.",
    },
  },
  en: {
    languages: {
      it: "Italiano",
      en: "English",
    },
    manifest: {
      name: "Drinking Fountains in Italy",
      shortName: "Fountains",
    },
    common: {
      backToMap: "Back to map",
      legend: "Legend",
      credits: "Credits",
      theme: "Theme",
      language: "Language",
      mapStyle: "Map style",
      openStreetMap: "OpenStreetMap",
      cyclosm: "CyclOSM",
      copyLink: "Link copied",
      linkCopied: "Link copied",
      unableToShareApp: "The app cannot be shared",
      unableToSharePosition: "The location cannot be shared",
      openInMaps: "Open in Google Maps",
      close: "Close",
    },
    app: {
      title: "Interactive Map",
      description:
        "Use the interactive map to find fountains, public toilets, bicycle parking, and playgrounds across Italy.",
      searchPlaceholder: "Search for a place...",
      searchNoResult: "No results found",
      searchError: "Error while searching",
      searchPausedTitle: "Search paused",
      searchPausedDescription:
        "The current area is too large. Zoom in to re-enable search.",
      locationLoading: "Locating...",
      locationPermissionDenied: "Permission denied",
      locationUnavailable: "Location unavailable",
      locationTimeout: "Timeout",
      locationError: "Error",
      locateMe: "Find my location",
      sharingLabel: "Share",
      appMenuLabel: "Application menu",
      installApp: "Install app",
      installTitle: "Install Fontanelle",
      installSubtitle: "Add the app to your Home Screen",
      installStep1: "Tap",
      installStep2: "Swipe and select",
      installStep3: "Confirm by tapping",
      installMenuAction: "Add to Home Screen",
      installAction: "Add",
      installedHint: "The app will appear on your Home Screen",
      capacitySingular: "space",
      capacityPlural: "spaces",
      themeLabel: "Theme",
      overlayLabel: "Map filters",
      overlays: {
        stations: "Fountains",
        toilets: "Public toilets",
        bicycleParkings: "Bike parking",
        playgrounds: "Playgrounds",
      },
      markerLabels: {
        fountain: "Fountain",
        waterHouse: "Water house",
        toilet: "Public toilet",
        bicycleParking: "Bike parking",
        playground: "Playground",
        customPoint: "Custom point",
        searchResult: "Search result",
      },
      markerTypes: {
        fountain: "a fountain",
        customPoint: "a custom point",
        playground: "a playground",
        toilet: "a toilet",
        bicycleParking: "a bike parking",
        searchResult: "a search result",
      },
    },
    landing: {
      eyebrow: "Drinking fountains map in Italy",
      title: "Find free fountains near you",
      descriptionParts: {
        prefix: "The interactive map for finding ",
        bold1: "free drinking water",
        middle: " across Italy: ",
        pointsLabel: "points",
        suffix:
          " including fountains, public toilets, bike parking, and playgrounds.",
      },
      descriptionSecondary:
        "Ideal for cyclists, tourists, and families who want to travel light and sustainably.",
      cta: "Open the map",
      scrollDownAria: "Scroll to see more",
      scrollDownHint: "Scroll to learn more",
      statsTitle: "Italy's most complete map",
      statsSubtitle:
        "Thousands of verified points of interest, continuously updated",
      totalPoints: "Total points of interest",
      totalPointsSuffix: "across Italy",
      stats: [
        { title: "Fountains", description: "Free drinking water" },
        { title: "Bike parking", description: "Safe bicycle parking spots" },
        { title: "Public toilets", description: "Sanitary facilities" },
        { title: "Playgrounds", description: "Children's areas" },
      ],
      benefitsTitle: "Why use our fountain map?",
      benefits: [
        {
          title: "Search places",
          description:
            "Find fountains instantly in any city with the new powerful search engine",
        },
        {
          title: "Free drinking water",
          description:
            "Drink quality water wherever you are in Italy without spending a cent",
        },
        {
          title: "Respect the environment",
          description:
            "Reduce plastic bottle waste and actively contribute to sustainability",
        },
        {
          title: "For everyone",
          description:
            "Ideal for tourists, locals, cyclists, and families on the move",
        },
        {
          title: "Always updated",
          description:
            "Data continuously updated thanks to the OpenStreetMap community",
        },
      ],
      howItWorksTitle: "How the fountain map works",
      howItWorksSubtitle:
        "Find free drinking water anywhere in Italy in three steps.",
      steps: [
        {
          title: "Open the map",
          description:
            "Open the interactive map and instantly see fountains, public toilets, and bike parking.",
        },
        {
          title: "Search your area",
          description:
            "Use the search by city, town, or street to center the map exactly where you need it.",
        },
        {
          title: "Filter services",
          description:
            "Select only what matters to you: fountains, toilets, bike parking, or playgrounds.",
        },
      ],
      citiesTitle: "Fountains in Italy's main cities",
      citiesSubtitle:
        "Find drinking fountains in the country's most important cities",
      cities: [
        {
          title: "Fountains in Rome",
          description:
            'The capital offers hundreds of historic and modern fountains. From the iconic "nasoni" to water points in parks, there is always a free place to get a drink.',
        },
        {
          title: "Fountains in Milan",
          description:
            "In Lombardy's capital, find fountains easily in parks, train stations, and neighborhoods. Perfect for anyone traveling by bike or on foot.",
        },
        {
          title: "Fountains in Florence",
          description:
            "In the cradle of the Renaissance, discover artistic and functional fountains. Ideal for tourists visiting museums and historic monuments.",
        },
        {
          title: "Fountains in Turin",
          description:
            "The Savoy capital offers many water points in its elegant parks and along the historic center. Fresh mountain water is always available.",
        },
        {
          title: "Fountains in Naples",
          description:
            "In Campania's capital, find relief at public fountains. They are especially useful during hot summer days while exploring the city.",
        },
        {
          title: "And many more cities",
          description:
            "Our map covers all of Italy! Find fountains in Bologna, Genoa, Palermo, Bari, Venice, and hundreds of other cities and towns.",
        },
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          question: "Is fountain water drinkable?",
          answer:
            "Yes, public fountain water in Italy is generally drinkable and safe to drink. It is regularly checked by local health authorities. In case of temporary issues, signs are displayed warning against use.",
        },
        {
          question: "Can I report a new fountain?",
          answer:
            "The data comes from OpenStreetMap, a collaborative project. You can contribute directly by editing OpenStreetMap to add new fountains or update existing information. Changes will also appear on our map.",
        },
        {
          question: "How can I search for a specific city?",
          answer:
            "It's easy! The map includes a search bar at the top. Type the name of a city, town, or specific street and the map will center itself automatically, showing all points of interest in that area.",
        },
        {
          question: "Is it available across Italy?",
          answer:
            "Yes, coverage extends throughout Italy! Availability depends on how thoroughly each area has been mapped in OpenStreetMap. Major cities have more complete coverage, and we keep expanding into smaller towns.",
        },
        {
          question: "Does the app work offline?",
          answer:
            "The app is designed as a Progressive Web App (PWA) and can work with limited connectivity. Once the map has loaded, you can keep browsing information even without an internet connection.",
        },
      ],
      finalTitle: "Start finding fountains near you now!",
      finalDescription:
        "Join thousands of people who already discovered how to drink free water across Italy while contributing to environmental sustainability.",
      footerNote: "Data from OpenStreetMap",
    },
    credits: {
      title: "Credits",
      description:
        "Information about the Fontanelle in Italia project, its motivation, OpenStreetMap data sources, and how to support the app.",
      backToMap: "Back to map",
      motivationTitle: "Motivation",
      motivationBody: [
        "I started using a bicycle for my daily trips and quickly realized I needed fast information about essential services along the way:",
        "Drinking fountains to refill my bottle",
        "Public toilets for longer rides",
        "Safe bicycle parking",
        "Playgrounds to take my daughter on our bike outings",
        "I initially focused the app on Milan, but given its usefulness I decided to expand it across Italy, creating a practical and immediate tool for cyclists and families on the move.",
      ],
      dataTitle: "Data source",
      dataBody: [
        "All map data comes from OpenStreetMap, a collaborative project to build a free, editable map of the world.",
        "OpenStreetMap is created by a community of mappers who contribute and maintain data about roads, trails, cafes, train stations, and much more worldwide.",
        "If you find missing or inaccurate information, you can contribute directly to OpenStreetMap to improve the data not only for this app but for the whole community.",
      ],
      developmentTitle: "Development",
      developmentBody: [
        "This application was built with Next.js and uses several open source libraries, including Leaflet for map rendering and DaisyUI for the interface.",
        "The code for this app is fully open source and available on GitHub. I chose to open source the project as a way to give back to the community, recognizing that this app would not have been possible without the many open source projects that came before it.",
      ],
      supportTitle: "Support us",
      supportBody: [
        "This app is developed and maintained in my spare time, with passion and dedication. Hosting, domain, and maintenance costs are personally covered, and every bit of help matters to keep the service alive, updated, and improving.",
        "Your support is a key incentive to keep investing time and energy into this project, letting us expand features and maintain the necessary infrastructure.",
      ],
      shareProjectTitle: "Share the project",
      shareProjectBody:
        "Sharing is the simplest but most powerful way to support us! Tell friends, family, or social media followers so more cyclists and families can discover this resource.",
      financialSupportTitle: "Financial support",
      financialSupportBody:
        "If the app is useful to you and you'd like to support it financially, you can do so through:",
      shareProjectButton: "Share app",
      supportFinancialButton: "Financial support",
      closingNote:
        "Every contribution, big or small, makes a difference. Thanks for supporting this open source project!",
    },
    legend: {
      title: "Legend",
      description:
        "Legend of the map symbols for drinking fountains, water houses, public toilets, bike parking, and playgrounds in Italy.",
      backToMap: "Back to map",
      iconTableTitle: "Map icons",
      attributesTitle: "Attributes",
      iconHeader: "Icon",
      descriptionHeader: "Description",
      rows: {
        fountain: {
          title: "Fountain",
          description: "Free public drinking water point",
        },
        waterHouse: {
          title: "Water house",
          description: "Automatic drinking water dispenser",
        },
        toilet: {
          title: "Public toilet",
          description: "Public sanitary facilities",
        },
        bicycleParking: {
          title: "Bike parking",
          description: "Dedicated bicycle parking area",
        },
        playground: {
          title: "Playground",
          description: "Play area for children",
        },
      },
      attributeRows: {
        paidOrFree: "Paid / Free",
        changingTable: "With / without changing table",
        coveredOrOpen: "Covered / Uncovered",
        indoorOrOutdoor: "Indoor / Outdoor",
        surveillance: "With / without surveillance",
        capacity: "Capacity (number of available spaces)",
        supervised: "With / without supervision",
      },
    },
    search: {
      resultTitle: "Search result",
      noResults: "No results found",
      error: "Error while searching",
    },
    share: {
      appTitle: "Fontanelle in Italia",
      appText: "Find where to drink in Italy quickly",
      appUnavailable: "The app cannot be shared",
      positionTitle: "Location",
      positionPrefix: "Here is",
      positionSuffix: "I found it thanks to this app:",
      positionUnavailable: "The location cannot be shared",
      copied: "Link copied",
      shared: "Shared item",
    },
    jsonld: {
      potableWaterQuestion: "Is fountain water drinkable?",
      potableWaterAnswer:
        "Yes, public fountain water in Italy is generally drinkable and safe to drink. It is regularly checked by local health authorities. In case of temporary issues, signs are displayed warning against use.",
      offlineQuestion: "Does the app work offline?",
      offlineAnswer:
        "The app is designed as a Progressive Web App (PWA) and can work with limited connectivity. Once the map has loaded, you can continue browsing information even without an internet connection.",
      contributeQuestion: "Can I report a new fountain?",
      contributeAnswer:
        "The data comes from OpenStreetMap, a collaborative project. You can contribute directly by editing OpenStreetMap to add new fountains or update existing information. Changes will also appear on our map.",
      searchQuestion: "How can I search for a specific city?",
      searchAnswer:
        "It's easy! The map includes a search bar at the top. Type the name of a city, town, or specific street and the map will center itself automatically, showing all points of interest in that area.",
      coverageQuestion: "Is it available across Italy?",
      coverageAnswer:
        "Yes, coverage extends throughout Italy! Availability depends on how thoroughly each area has been mapped in OpenStreetMap. Major cities have more complete coverage, and we keep expanding into smaller towns.",
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
