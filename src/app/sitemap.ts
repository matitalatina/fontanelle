import { MetadataRoute } from "next";
import { BASE_URL } from "./seo-config";

// Define the routes with their relative priorities
const routes = [
  { path: "", priority: 1.0 },
  { path: "app", priority: 0.9 },
  { path: "legend", priority: 0.8 },
  { path: "credits", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${BASE_URL}${route.path ? `/${route.path}` : ""}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
