import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Meta from "./meta";
import { baseMetadata, createViewport } from "./seo-config";
import { InstallPromptProvider } from "@/contexts/InstallPromptContext";
import "@/lib/fontawesome";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = baseMetadata;
export const viewport: Viewport = createViewport({ themeColor: undefined });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        <Meta />
        <link rel="icon" href="/icon.png" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
        <Script
          src="https://umami.serina.mattianatali.com/script.js"
          data-website-id="0532f00f-c7ff-4e8f-80ac-f09b1ad90d01"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <InstallPromptProvider>{children}</InstallPromptProvider>
      </body>
    </html>
  );
}
