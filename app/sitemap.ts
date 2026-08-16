import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/data/blog-posts";
import { METIERS } from "@/lib/data/metiers";

const BASE_URL = "https://www.cvento.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/tarifs`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/diagnostic`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/exemples-cv`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/signup`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/login`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/cgu`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/confidentialite`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/cookies`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const metierPages: MetadataRoute.Sitemap = METIERS.map((metier) => ({
    url: `${BASE_URL}/exemples-cv/${metier.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages, ...metierPages];
}
