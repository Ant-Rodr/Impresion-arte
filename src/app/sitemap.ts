import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/data/products";

const BASE_URL = process.env.NEXTAUTH_URL ?? "https://impresion-arte.es";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/catalogo`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/catalogo/gamer`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/catalogo/mesa-rol`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/catalogo/decorativos`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/catalogo/cosplay`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/personalizado`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/materiales`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/contacto`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/privacidad`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${BASE_URL}/terminos`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${BASE_URL}/cookies`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${BASE_URL}/envios`, priority: 0.5, changeFrequency: "monthly" as const },
  ];

  const productPages = PRODUCTS.map((p) => ({
    url: `${BASE_URL}/catalogo/${p.category}/${p.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...productPages];
}
