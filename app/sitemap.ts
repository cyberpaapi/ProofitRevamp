import type { MetadataRoute } from "next";
import { services } from "@/lib/content";
import { getPublicCaseStudies, getPublicPosts } from "@/lib/admin/public-content";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, caseStudies] = await Promise.all([getPublicPosts(), getPublicCaseStudies()]);
  const staticPages = ["", "/about", "/process", "/services", "/care-plus", "/blog", "/careers", "/case-studies", "/contact"];

  return [
    ...staticPages.map((p) => ({
      url: `${site.url}${p}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.8,
    })),
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...caseStudies.map((study) => ({
      url: `${site.url}/case-studies/${study.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
