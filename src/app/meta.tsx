import React from "react";
import { APP_NAME } from "./seo-config";

export default function Meta() {
  return (
    <>
      <meta name="application-name" content={APP_NAME} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={APP_NAME} />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="format-detection" content="telephone=no" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
    </>
  );
}
