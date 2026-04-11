"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const MATERIALS = [
  { id: "PLA", label: "PLA", multiplier: 1, color: "#06D6A0" },
  { id: "PETG", label: "PETG", multiplier: 1.4, color: "#6C3CE1" },
  { id: "Resina", label: "Resina", multiplier: 2.1, color: "#EC4899" },
] as const;

type MaterialId = "PLA" | "PETG" | "Resina";

function calcPrice(volume: number, infill: number, materialId: MaterialId, qty: number) {
  const mat = MATERIALS.find(m => m.id === materialId)!;
  return volume * 0.08 * (infill / 100 + 0.5) * mat.multiplier * qty;
}

function AnimatedPrice({ value }: { value: number }) {
  const [displayed, setDisplayed] = useState(value);
  const prev = useRef(value);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const start = prev.current;
    const end = value;
    const duration = 400;
    const startTime = performance.now();

    cancelAnimationFrame(animRef.current);
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(start + (end - start) * eased);
      if (progress < 1) animRef.current = requestAnimationFrame(tick);
      else prev.current = end;
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [value]);

  return <>{displayed.toFixed(2)}</>;
}

export default function PriceCalculator() {
  const [volume, setVolume] = useState(50);
  const [infill, setInfill] = useState(30);
  const [material, setMaterial] = useState<MaterialId>("PLA");
  const [qty, setQty] = useState(1);

  const price = calcPrice(volume, infill, material, qty);
  const selectedMat = MATERIALS.find(m => m.id === material)!;

  return (
    <section id="calculadora" className="bg-light-bg dark:bg-dark-bg section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-4 uppercase tracking-widest">
            Presupuesto
          </span>
          <h2 className="text-4xl font-black mb-4">
            Calculadora de <span className="gradient-text">precios</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Ajusta los parámetros y obtén un precio estimado al instante.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="card p-8 space-y-7">
            {/* Material */}
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                Material
              </label>
              <div className="flex gap-2">
                {MATERIALS.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setMaterial(m.id)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 border-2 ${
                      material === m.id
                        ? "border-transparent text-white shadow-lg"
                        : "border-light-border dark:border-dark-border text-gray-500 hover:border-primary/40"
                    }`}
                    style={material === m.id ? { backgroundColor: m.color } : {}}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Multiplicador: ×{selectedMat.multiplier.toFixed(1)}
              </p>
            </div>

            {/* Volume */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Volumen</label>
                <span className="text-sm font-bold text-primary">{volume} cm³</span>
              </div>
              <input
                type="range" min={1} max={500} step={1} value={volume}
                onChange={e => setVolume(Number(e.target.value))}
                className="w-full accent-primary h-2 rounded-full"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1 cm³</span><span>500 cm³</span>
              </div>
            </div>

            {/* Infill */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Relleno (Infill)</label>
                <span className="text-sm font-bold text-primary">{infill}%</span>
              </div>
              <input
                type="range" min={10} max={100} step={5} value={infill}
                onChange={e => setInfill(Number(e.target.value))}
                className="w-full accent-primary h-2 rounded-full"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>10% (ligero)</span><span>100% (sólido)</span>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Cantidad</label>
                <span className="text-sm font-bold text-primary">{qty} ud.</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-xl border border-light-border dark:border-dark-border flex items-center justify-center text-xl font-bold hover:border-primary/60 transition-colors"
                >
                  −
                </button>
                <input
                  type="range" min={1} max={10} step={1} value={qty}
                  onChange={e => setQty(Number(e.target.value))}
                  className="flex-1 accent-primary h-2 rounded-full"
                />
                <button
                  onClick={() => setQty(q => Math.min(10, q + 1))}
                  className="w-9 h-9 rounded-xl border border-light-border dark:border-dark-border flex items-center justify-center text-xl font-bold hover:border-primary/60 transition-colors"
                >
                  +
                </button>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1 unidad</span><span>10 unidades</span>
              </div>
            </div>
          </div>

          {/* Price display */}
          <div className="flex flex-col gap-6">
            <div
              className="card p-8 flex-1 flex flex-col items-center justify-center text-center"
              style={{ background: `linear-gradient(135deg, ${selectedMat.color}0D 0%, transparent 60%)` }}
            >
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                Precio estimado
              </p>
              <div className="text-6xl font-black mb-2" style={{ color: selectedMat.color }}>
                <AnimatedPrice value={price} />€
              </div>
              <p className="text-xs text-gray-400 mb-6">IVA no incluido · Envío calculado al finalizar</p>

              {/* Breakdown */}
              <div className="w-full space-y-2 text-left mb-6">
                {[
                  ["Material", material],
                  ["Volumen", `${volume} cm³`],
                  ["Infill", `${infill}%`],
                  ["Cantidad", `${qty} ud.`],
                  ["Precio/ud.", `${calcPrice(volume, infill, material, 1).toFixed(2)}€`],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">{label}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{val}</span>
                  </div>
                ))}
              </div>

              <Link href="/personalizado" className="btn-primary w-full text-center text-sm">
                Pedir con este presupuesto
              </Link>
            </div>

            <div className="card p-4 flex items-start gap-3">
              <span className="text-xl">💡</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                <strong className="text-gray-700 dark:text-gray-300">Precio orientativo.</strong>{" "}
                El precio final se confirma tras revisar tu diseño. Incluye impresión, post-procesado básico y embalaje.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
