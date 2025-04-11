import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Meta from "./meta";
import { baseMetadata, createViewport } from "./seo-config";
import AnalyticsProvider from "@/components/AnalyticsProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = baseMetadata;
export const viewport: Viewport = createViewport({ themeColor: undefined });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" data-theme="light" className="flex h-full w-full">
      <Meta />
      <link rel="icon" href="/icon.png" sizes="any" />
      <link rel="manifest" href="/manifest.json" />
      <body className={`flex flex-1 ${inter.className}`}>
        {children}
        <AnalyticsProvider gaId="G-N9WYWY07X6" />
      </body>
    </html>
  );
}
