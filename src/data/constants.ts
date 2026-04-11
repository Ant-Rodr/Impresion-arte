// Static constants — safe to import in both client and server components

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
