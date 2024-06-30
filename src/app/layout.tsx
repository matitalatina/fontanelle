import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fontanelle a Milano",
  description: "Trova velocemente dove bere a Milano quando sei in bicicletta!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" className="flex h-full w-full">
      <link rel="icon" href="/icon.png" sizes="any" />
      <link rel="manifest" href="/manifest.json" />
      <body className={`flex flex-1 ${inter.className}`}>{children}</body>
      <GoogleAnalytics gaId="G-N9WYWY07X6" />
    </html>
  );
}
