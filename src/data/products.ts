import "server-only";
import type { Product } from "@/types";

export const PRODUCTS: Product[] = [
  // ── GAMER ─────────────────────────────────────────────────────────────────
  {
    id: "gamer-001",
    slug: "soporte-doble-mando",
    name: "Soporte Doble Mando",
    description: "Soporte de pared para 2 mandos de consola. Compatible con PS5, Xbox y Switch.",
    price: 12.9,
    material: "PLA Estándar",
    category: "gamer",
    tags: ["Organización", "Gaming", "Pared"],
    inStock: true,
  },
  {
    id: "gamer-002",
    slug: "porta-auriculares-escritorio",
    name: "Porta-Auriculares Escritorio",
    description: "Soporte de mesa elegante para auriculares gaming con bandeja para cable.",
    price: 18.5,
    material: "PLA Silk",
    category: "gamer",
    tags: ["Escritorio", "Auriculares", "Premium"],
    inStock: true,
  },
  {
    id: "gamer-003",
    slug: "organizador-cable-management",
    name: "Organizador Cable Management",
    description: "Sistema de guías y clips para organizar todos los cables de tu setup.",
    price: 9.9,
    material: "PETG",
    category: "gamer",
    tags: ["Cables", "Organización", "Set 6 piezas"],
    inStock: true,
  },
  {
    id: "gamer-004",
    slug: "soporte-monitor-vertical",
    name: "Soporte Monitor Vertical",
    description: "Elevador de monitor con bandeja inferior para teclado o periféricos.",
    price: 34.0,
    material: "PETG",
    category: "gamer",
    tags: ["Monitor", "Escritorio", "Resistente"],
    inStock: true,
  },
  {
    id: "gamer-005",
    slug: "caja-raspberry-pi",
    name: "Caja Raspberry Pi con Ventilación",
    description: "Carcasa personalizable para Raspberry Pi 4/5 con rejillas de ventilación activa.",
    price: 14.5,
    material: "PETG",
    category: "gamer",
    tags: ["Raspberry Pi", "DIY", "Tech"],
    inStock: true,
  },
  {
    id: "gamer-006",
    slug: "mini-rack-perifericos",
    name: "Mini Rack Periféricos",
    description: "Organizador modular de escritorio para ratón, teclado y accesorios.",
    price: 22.0,
    material: "PLA Silk",
    category: "gamer",
    tags: ["Modular", "Premium", "Escritorio"],
    inStock: true,
  },
  // ── MESA & ROL ────────────────────────────────────────────────────────────
  {
    id: "rol-001",
    slug: "torre-dados-premium",
    name: "Torre de Dados Premium",
    description: "Torre silenciadora para dados de rol con bandeja y diseño medieval.",
    price: 24.5,
    material: "PLA Estándar",
    category: "mesa-rol",
    tags: ["Dados", "RPG", "D&D"],
    inStock: true,
  },
  {
    id: "rol-002",
    slug: "inserto-organizador-catan",
    name: "Inserto Organizador Catan",
    description: "Inserto modular para Catan y expansiones. Encaja perfectamente en la caja original.",
    price: 32.0,
    material: "PLA Estándar",
    category: "mesa-rol",
    tags: ["Catan", "Organización", "Juegos de mesa"],
    inStock: true,
  },
  {
    id: "rol-003",
    slug: "miniatura-resina-heroe",
    name: "Miniatura Héroe en Resina",
    description: "Miniatura en resina ultra-detallada para D&D o Pathfinder. 32mm.",
    price: 8.5,
    material: "Resina",
    category: "mesa-rol",
    tags: ["Miniatura", "D&D", "Resina", "32mm"],
    inStock: true,
  },
  {
    id: "rol-004",
    slug: "tokens-estado-rpg",
    name: "Set Tokens de Estado RPG",
    description: "20 tokens magnéticos para marcar estados (veneno, aturdido, etc.).",
    price: 12.0,
    material: "Resina",
    category: "mesa-rol",
    tags: ["Tokens", "Magneticos", "RPG"],
    inStock: true,
  },
  // ── DECORATIVOS ───────────────────────────────────────────────────────────
  {
    id: "deco-001",
    slug: "maceta-geometrica-pla-silk",
    name: "Maceta Geométrica PLA Silk",
    description: "Maceta poligonal con acabado seda iridiscente. Incluye plato.",
    price: 16.9,
    material: "PLA Silk",
    category: "decorativos",
    tags: ["Maceta", "Geométrico", "Hogar"],
    inStock: true,
  },
  {
    id: "deco-002",
    slug: "litofania-personalizada",
    name: "Litofanía Personalizada",
    description: "Tu foto convertida en litofanía 3D. Impresionante efecto con luz trasera.",
    price: 22.0,
    material: "PLA Estándar",
    category: "decorativos",
    tags: ["Litofanía", "Personalizado", "Regalo"],
    inStock: true,
  },
  {
    id: "deco-003",
    slug: "lampara-parametrica",
    name: "Lámpara Paramétrica",
    description: "Pantalla de lámpara con patrón geométrico paramétrico. Compatible con E27.",
    price: 38.0,
    material: "PLA Silk",
    category: "decorativos",
    tags: ["Lámpara", "Paramétrico", "Diseño"],
    inStock: true,
  },
  {
    id: "deco-004",
    slug: "organizador-escritorio-modular",
    name: "Organizador Escritorio Modular",
    description: "Sistema de módulos encajables para organizar material de escritorio.",
    price: 28.5,
    material: "PLA Estándar",
    category: "decorativos",
    tags: ["Escritorio", "Modular", "Organización"],
    inStock: true,
  },
  // ── COSPLAY ───────────────────────────────────────────────────────────────
  {
    id: "cos-001",
    slug: "casco-mandalorian",
    name: "Casco Mandaloriano",
    description: "Casco a escala real con piezas ensamblables. Pintado a mano disponible.",
    price: 89.0,
    material: "PLA Estándar",
    category: "cosplay",
    tags: ["Star Wars", "Casco", "Réplica"],
    inStock: true,
  },
  {
    id: "cos-002",
    slug: "arma-prop-espada",
    name: "Espada Prop de Fantasía",
    description: "Espada prop de 70cm para cosplay. Ligera y resistente.",
    price: 55.0,
    material: "PETG",
    category: "cosplay",
    tags: ["Arma Prop", "Fantasía", "70cm"],
    inStock: true,
  },
  {
    id: "cos-003",
    slug: "placa-identidad-personalizada",
    name: "Placa de Identidad Personalizada",
    description: "Placa con tu nombre o personaje en relieve. Varios acabados disponibles.",
    price: 14.0,
    material: "Resina",
    category: "cosplay",
    tags: ["Personalizado", "Prop", "Accesorio"],
    inStock: true,
  },
];

// Sync fallback (used internally)
function getStaticByCategory(category: string): Product[] {
  return PRODUCTS.filter((p) => p.category === category && p.inStock);
}

// Async — reads from DB, falls back to static data if DB is empty
export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const { prisma } = await import("@/lib/prisma");
    const rows = await prisma.product.findMany({
      where: { category, inStock: true },
      orderBy: { createdAt: "desc" },
    });
    if (rows.length > 0) {
      return rows.map((p: { id: string; slug: string; name: string; description: string; price: number; material: string; category: string; tags: string; imageUrl: string | null; modelUrl?: string | null; inStock: boolean; createdAt: Date; updatedAt: Date }) => ({
        ...p,
        tags: p.tags ? p.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
        imageUrl: p.imageUrl ?? undefined,
      }));
    }
  } catch {
    // DB not ready yet — use static fallback
  }
  return getStaticByCategory(category);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export const CATEGORIES = [
  {
    slug: "gamer",
    title: "Setup Gamer y Gadgets",
    desc: "Soportes para mandos y auriculares, organizadores de escritorio y accesorios que elevan tu setup.",
    tag: "Gaming",
    color: "#6C3CE1",
  },
  {
    slug: "mesa-rol",
    title: "Juegos de Mesa y Rol",
    desc: "Torres de dados, insertos organizadores, miniaturas en resina ultra-detalladas y tokens para partidas épicas.",
    tag: "Mesa & Rol",
    color: "#06D6A0",
  },
  {
    slug: "decorativos",
    title: "Decoración Moderna",
    desc: "Macetas geométricas en PLA Silk, litofanías personalizadas y arte paramétrico para el hogar.",
    tag: "Decoración",
    color: "#F59E0B",
  },
  {
    slug: "cosplay",
    title: "Cosplay / Props",
    desc: "Réplicas a escala, cascos en gran formato, armas prop y accesorios con acabados de pintura a mano.",
    tag: "Cosplay",
    color: "#EC4899",
  },
] as const;

export const MATERIALS: Record<string, { label: string; pricePerCm3: number; desc: string }> = {
  pla: { label: "PLA Estándar", pricePerCm3: 0.08, desc: "Económico y versátil" },
  "pla-silk": { label: "PLA Silk", pricePerCm3: 0.12, desc: "Acabado brillante" },
  petg: { label: "PETG", pricePerCm3: 0.1, desc: "Alta resistencia" },
  resin: { label: "Resina", pricePerCm3: 0.18, desc: "Ultra detalle" },
};

export const ACABADOS: Record<string, { label: string; multiplier: number }> = {
  raw: { label: "Pieza en crudo", multiplier: 1 },
  sand: { label: "Lijado", multiplier: 1.2 },
  primer: { label: "Imprimación", multiplier: 1.4 },
  paint: { label: "Pintado a mano", multiplier: 2.0 },
};
