"use client";

const TICKER_ITEMS = [
  { category: "Gaming", product: "Soporte triple monitor curvo", material: "PLA Silk Blanco", color: "#6C3CE1" },
  { category: "Mesa & Rol", product: "Miniaturas D&D Barbarian 32mm", material: "Resina gris", color: "#06D6A0" },
  { category: "Decoración", product: "Maceta geométrica hexagonal Ø18", material: "PLA Silk Dorado", color: "#F59E0B" },
  { category: "Cosplay", product: "Casco Iron Man MK50 1:1", material: "PLA Estándar + Pintado", color: "#EC4899" },
  { category: "Gaming", product: "Mini Rack Periféricos modular", material: "PLA Silk Negro", color: "#6C3CE1" },
  { category: "Mesa & Rol", product: "Torre de Dados Medieval", material: "PLA Estándar Madera", color: "#06D6A0" },
  { category: "Decoración", product: "Lámpara paramétrica E27", material: "PLA Silk Iridiscente", color: "#F59E0B" },
  { category: "Cosplay", product: "Espada Prop Fantasía 70cm", material: "PETG Gris", color: "#EC4899" },
  { category: "B2B", product: "Lote 50 piezas técnicas", material: "PETG Industrial", color: "#06D6A0" },
  { category: "Gaming", product: "Caja Raspberry Pi 5 con ventilación", material: "PETG Negro", color: "#6C3CE1" },
  { category: "Decoración", product: "Litofanía familiar 20×15cm", material: "PLA Estándar Blanco", color: "#F59E0B" },
  { category: "Mesa & Rol", product: "Inserto organizador Wingspan", material: "PLA Estándar Beige", color: "#06D6A0" },
];

// Duplicamos para el loop infinito
const ITEMS = [...TICKER_ITEMS, ...TICKER_ITEMS];

export default function OrderTicker() {
  return (
    <div className="relative overflow-hidden bg-gray-900 dark:bg-black border-y border-gray-800 py-3 select-none">
      {/* Fades en los bordes */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-gray-900 dark:from-black to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-gray-900 dark:from-black to-transparent pointer-events-none" />

      <div className="flex w-max animate-ticker">
        {ITEMS.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-6 border-l border-white/10 whitespace-nowrap"
          >
            {/* Dot */}
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            />
            {/* Badge categoría */}
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
              style={{ backgroundColor: item.color + "25", color: item.color }}
            >
              {item.category}
            </span>
            {/* Producto */}
            <span className="text-sm text-gray-300 font-medium">{item.product}</span>
            {/* Material */}
            <span className="text-xs text-gray-500">{item.material}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
