"use client";

import { useState } from "react";
import Link from "next/link";

const materials = [
  { id: "pla", label: "PLA Estándar", pricePerCm3: 0.08 },
  { id: "pla-silk", label: "PLA Silk", pricePerCm3: 0.12 },
  { id: "resin", label: "Resina", pricePerCm3: 0.18 },
  { id: "petg", label: "PETG", pricePerCm3: 0.10 },
];

// A partir de este volumen la pieza probablemente necesite seccionarse
const MAX_PRINTABLE_VOLUME = 800;

export default function BudgetCalculator() {
  const [volume, setVolume] = useState(30);
  const [material, setMaterial] = useState("pla");

  const selected = materials.find((m) => m.id === material)!;
  const price = (volume * selected.pricePerCm3).toFixed(2);
  const isOverLimit = volume > MAX_PRINTABLE_VOLUME;

  return (
    <section id="presupuesto" className="bg-light-bg dark:bg-dark-bg section-padding">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black mb-4">
            Calcula tu <span className="gradient-text">Presupuesto</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Estimación instantánea. Precio final confirmado tras revisar tu diseño.
          </p>
        </div>

        <div className="card p-8 space-y-6">
          {/* Material */}
          <div>
            <label className="block text-sm font-semibold mb-3">Material</label>
            <div className="grid grid-cols-2 gap-3">
              {materials.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMaterial(m.id)}
                  className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                    material === m.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-light-border dark:border-dark-border hover:border-primary/50"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Volume */}
          <div>
            <label className="block text-sm font-semibold mb-3">
              Volumen estimado:{" "}
              <span className={isOverLimit ? "text-orange-500" : "text-primary"}>
                {volume.toLocaleString("es-ES")} cm³
              </span>
            </label>
            <input
              type="range"
              min={5}
              max={1500}
              step={5}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>5 cm³</span>
              <span className="text-orange-400/70">aviso: 800 cm³</span>
              <span>1.500 cm³</span>
            </div>
          </div>

          {/* Warning de volumen máximo */}
          {isOverLimit && (
            <div className="flex items-start gap-3 rounded-xl border border-orange-400/40 bg-orange-400/8 p-4">
              <svg className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-orange-400 mb-0.5">Pieza de gran volumen detectada</p>
                <p className="text-xs text-orange-300/80 leading-relaxed">
                  Para piezas de este tamaño, es posible que necesitemos seccionarla y ensamblarla.{" "}
                  <Link href="/contacto" className="underline underline-offset-2 hover:text-orange-300 transition-colors">
                    Contacta con nosotros
                  </Link>{" "}
                  para estudiar la mejor solución.
                </p>
              </div>
            </div>
          )}

          {/* Result */}
          <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Precio estimado desde</p>
            <p className={`text-5xl font-black ${isOverLimit ? "text-orange-400" : "text-primary"}`}>
              {price}€
            </p>
            <p className="text-xs text-gray-400 mt-2">IVA no incluido · Envío calculado al finalizar</p>
          </div>

          <Link href="/personalizado" className="btn-primary w-full text-base">
            Pedir con este presupuesto
          </Link>
        </div>
      </div>
    </section>
  );
}
