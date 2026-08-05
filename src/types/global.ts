import type { routing } from "@/i18n/routing";
import enMessages from "../../messages/en.json";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof enMessages;
  }
}

declare global {
  interface Window {
    umami: (typeof globalThis)["umami"];
  }
}
