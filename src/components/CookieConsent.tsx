"use client";

import { useEffect, useState } from "react";

interface CookieConsentProps {
  onAccept: () => void;
  onReject: () => void;
}

interface ConsentData {
  decision: "accepted" | "rejected";
  timestamp: string;
}

export default function CookieConsent({
  onAccept,
  onReject,
}: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consentDataString = localStorage.getItem("cookie-consent");

    if (!consentDataString) {
      setIsVisible(true);
      return;
    }

    try {
      const consentData = JSON.parse(consentDataString) as ConsentData;
      const decisionDate = new Date(consentData.timestamp);
      const oneMonthAgo = new Date();
      oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

      if (consentData.decision === "accepted") {
        onAccept();
      } else if (
        consentData.decision === "rejected" &&
        decisionDate < oneMonthAgo
      ) {
        setIsVisible(true);
      }
    } catch {
      setIsVisible(true);
    }
  }, [onAccept]);

  const handleAccept = () => {
    const consentData: ConsentData = {
      decision: "accepted",
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("cookie-consent", JSON.stringify(consentData));
    setIsVisible(false);
    onAccept();
  };

  const handleReject = () => {
    const consentData: ConsentData = {
      decision: "rejected",
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("cookie-consent", JSON.stringify(consentData));
    setIsVisible(false);
    onReject();
  };

  if (!isVisible) return null;

  return (
    <div className="toast toast-bottom toast-center z-50 min-w-[calc(100%-var(--spacing)*8)] sm:min-w-96 m-4 start-[calc(1/2*100%-var(--spacing)*4)] end-[calc(1/2*100%-var(--spacing)*4)]">
      <div role="alert" className="alert alert-vertical shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 shrink-0 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span className="text-wrap">
          Utilizziamo i cookie di Google Analytics per capire come viene usato
          il sito e migliorare l&apos;esperienza di navigazione.
        </span>
        <div>
          <button onClick={handleReject} className="btn">
            Rifiuta
          </button>
          <button onClick={handleAccept} className="btn btn-primary ml-2">
            Accetta
          </button>
        </div>
      </div>
    </div>
  );
}
