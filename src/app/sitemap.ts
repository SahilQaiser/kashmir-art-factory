import type { MetadataRoute } from "next";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const BASE = "https://kashmirartfactory.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { env } = await getCloudflareContext();
  const { results: collections } = await env.DB
    .prepare("SELECT slug FROM collections")
    .all<{ slug: string }>();

  const collectionUrls: MetadataRoute.Sitemap = collections.map((c) => ({
    url: `${BASE}/collections/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE}/collections`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...collectionUrls,
    {
      url: `${BASE}/custom-orders`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
