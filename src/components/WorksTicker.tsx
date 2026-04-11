interface TickerItem {
  cat: string;
  text: string;
  mat: string;
  color: string;
}

const ITEMS: TickerItem[] = [
  { cat: "Gaming",      text: "Soporte triple monitor curvo",         mat: "PLA Silk",          color: "#6C3CE1" },
  { cat: "Mesa & Rol",  text: "Set miniaturas D&D 32mm × 8",          mat: "Resina UV",          color: "#06D6A0" },
  { cat: "Decoración",  text: "Maceta geométrica hexagonal",           mat: "PLA Silk Dorado",   color: "#F59E0B" },
  { cat: "Cosplay",     text: "Casco Iron Man MK50 1:1",               mat: "PLA + Pintura",     color: "#EC4899" },
  { cat: "B2B",         text: "Maqueta arquitectónica 1:100",          mat: "PETG Blanco",       color: "#06D6A0" },
  { cat: "Gaming",      text: "Base mecánica para palancas arcade",    mat: "PETG Negro",        color: "#6C3CE1" },
  { cat: "Mesa & Rol",  text: "Torre de dados personalizada",          mat: "Resina UV",          color: "#06D6A0" },
  { cat: "Decoración",  text: "Litofanía familiar 20×15cm",            mat: "PLA Translúcido",   color: "#F59E0B" },
];

// Duplicate for seamless loop
const ALL_ITEMS = [...ITEMS, ...ITEMS];

function TickerCard({ item }: { item: TickerItem }) {
  return (
    <>
      {/* Separator */}
      <span className="border-l border-white/10 h-4 mx-2 shrink-0" aria-hidden="true" />

      {/* Dot */}
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ backgroundColor: item.color }}
        aria-hidden="true"
      />

      {/* Category chip */}
      <span
        className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0"
        style={{
          backgroundColor: `${item.color}22`,
          color: item.color,
        }}
      >
        {item.cat}
      </span>

      {/* Order text */}
      <span className="text-sm text-gray-300 whitespace-nowrap">
        {item.text}
      </span>

      {/* Material */}
      <span className="text-xs text-gray-500 ml-1 whitespace-nowrap">
        {item.mat}
      </span>
    </>
  );
}

export default function WorksTicker() {
  return (
    <div className="relative overflow-hidden bg-dark-card border-y border-dark-border py-3">
      {/* "PEDIDOS RECIENTES" fixed label on the left */}
      <div
        className="absolute left-0 top-0 bottom-0 flex items-center
                   bg-gradient-to-r from-dark-card to-transparent
                   pl-3 pr-8 z-10"
        aria-hidden="true"
      >
        <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
          Pedidos recientes
        </span>
      </div>

      {/* Scrolling strip */}
      <div
        className="flex gap-8 items-center ticker-scroll"
        aria-label="Pedidos recientes"
      >
        {ALL_ITEMS.map((item, i) => (
          <div key={i} className="flex items-center gap-2 shrink-0">
            <TickerCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
