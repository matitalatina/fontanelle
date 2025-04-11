"use client";

import { useState, useEffect } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import CookieConsent from "./CookieConsent";

export default function AnalyticsProvider({ gaId }: { gaId: string }) {
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user has already made a choice on page load
    const cookieConsent = localStorage.getItem("cookie-consent");
    if (cookieConsent === "accepted") {
      setConsentGiven(true);
    } else if (cookieConsent === "rejected") {
      setConsentGiven(false);
    }
  }, []);

  const handleAccept = () => {
    setConsentGiven(true);
  };

  const handleReject = () => {
    setConsentGiven(false);
  };

  return (
    <>
      {consentGiven && <GoogleAnalytics gaId={gaId} />}
      <CookieConsent onAccept={handleAccept} onReject={handleReject} />
    </>
  );
}
