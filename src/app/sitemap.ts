import { MetadataRoute } from "next";
import { BASE_URL } from "./seo-config";
import { SUPPORTED_LOCALES } from "@/i18n/locales";

// Define the routes with their relative priorities
const routes = [
  { path: "app", priority: 0.9 },
  { path: "legend", priority: 0.8 },
  { path: "credits", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return SUPPORTED_LOCALES.flatMap((locale) => [
    {
      url: `${BASE_URL}/${locale}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
    ...routes.map((route) => ({
      url: `${BASE_URL}/${locale}/${route.path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: route.priority,
    })),
  ]);
}
