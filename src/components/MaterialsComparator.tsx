"use client";

import { useState } from "react";

type Rating = "high" | "medium" | "low";

interface Row {
  property: string;
  pla: { rating: Rating; label: string };
  petg: { rating: Rating; label: string };
  resin: { rating: Rating; label: string };
}

const rows: Row[] = [
  {
    property: "Precio",
    pla: { rating: "high", label: "Económico" },
    petg: { rating: "medium", label: "Moderado" },
    resin: { rating: "low", label: "Alto" },
  },
  {
    property: "Resistencia",
    pla: { rating: "medium", label: "Media" },
    petg: { rating: "high", label: "Alta" },
    resin: { rating: "medium", label: "Media-alta" },
  },
  {
    property: "Flexibilidad",
    pla: { rating: "low", label: "Rígido" },
    petg: { rating: "medium", label: "Semi-flexible" },
    resin: { rating: "low", label: "Muy rígida" },
  },
  {
    property: "Detalle",
    pla: { rating: "medium", label: "Bueno" },
    petg: { rating: "medium", label: "Bueno" },
    resin: { rating: "high", label: "Excelente" },
  },
  {
    property: "Temperatura máx.",
    pla: { rating: "low", label: "~60°C" },
    petg: { rating: "medium", label: "~80°C" },
    resin: { rating: "medium", label: "~70°C" },
  },
  {
    property: "Ideal para",
    pla: { rating: "high", label: "Decoración / Prototipado" },
    petg: { rating: "high", label: "Piezas funcionales" },
    resin: { rating: "high", label: "Miniaturas / Cosplay" },
  },
];

const ratingStyles: Record<Rating, string> = {
  high: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  medium: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",
  low: "bg-red-500/15 text-red-400 border border-red-500/30",
};

const ratingDot: Record<Rating, string> = {
  high: "bg-emerald-400",
  medium: "bg-yellow-400",
  low: "bg-red-400",
};

function Cell({ data }: { data: { rating: Rating; label: string } }) {
  return (
    <td className="px-4 py-4 text-center">
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${ratingStyles[data.rating]}`}>
        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${ratingDot[data.rating]}`} />
        {data.label}
      </span>
    </td>
  );
}

export default function MaterialsComparator() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <section className="bg-light-bg dark:bg-dark-bg section-padding">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-4 uppercase tracking-widest">
            Materiales
          </span>
          <h2 className="text-4xl font-black mb-4">
            Comparador de <span className="gradient-text">Materiales</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Elige el material que mejor se adapta a tu proyecto con esta comparativa interactiva.
          </p>
        </div>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-light-border dark:border-dark-border bg-gray-50 dark:bg-dark-card">
                  <th className="px-4 py-4 text-left font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-xs">
                    Característica
                  </th>
                  <th className="px-4 py-4 text-center">
                    <span className="inline-flex flex-col items-center gap-1">
                      <span className="font-black text-base text-gray-900 dark:text-white">PLA</span>
                      <span className="text-xs text-gray-400">Filamento</span>
                    </span>
                  </th>
                  <th className="px-4 py-4 text-center">
                    <span className="inline-flex flex-col items-center gap-1">
                      <span className="font-black text-base text-primary">PETG</span>
                      <span className="text-xs text-gray-400">Filamento</span>
                    </span>
                  </th>
                  <th className="px-4 py-4 text-center">
                    <span className="inline-flex flex-col items-center gap-1">
                      <span className="font-black text-base text-accent">Resina</span>
                      <span className="text-xs text-gray-400">Fotopolímero</span>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.property}
                    onMouseEnter={() => setHoveredRow(i)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className={`border-b border-light-border dark:border-dark-border transition-colors duration-150 cursor-default ${
                      hoveredRow === i
                        ? "bg-primary/5 dark:bg-primary/8"
                        : "hover:bg-gray-50 dark:hover:bg-dark-card"
                    }`}
                  >
                    <td className="px-4 py-4 font-semibold text-gray-700 dark:text-gray-300">
                      {row.property}
                    </td>
                    <Cell data={row.pla} />
                    <Cell data={row.petg} />
                    <Cell data={row.resin} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="px-4 py-3 bg-gray-50 dark:bg-dark-card border-t border-light-border dark:border-dark-border flex flex-wrap gap-4 justify-center text-xs text-gray-400">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Bueno / Ventaja</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-400" /> Medio</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-400" /> Limitación</span>
          </div>
        </div>
      </div>
    </section>
  );
}
