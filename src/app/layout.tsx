import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Meta from "./meta";
import { baseMetadata, createViewport } from "./seo-config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = baseMetadata;
export const viewport: Viewport = createViewport({ themeColor: undefined });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="flex h-full w-full">
      <head>
        <Meta />
        <link rel="icon" href="/icon.png" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
        <script
          defer
          src="https://umami.serina.mattianatali.com/script.js"
          data-website-id="0532f00f-c7ff-4e8f-80ac-f09b1ad90d01"
        ></script>
      </head>
      <body className={`flex flex-1 ${inter.className}`}>{children}</body>
    </html>
  );
}
