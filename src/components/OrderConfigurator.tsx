"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Gamepad2,
  Dices,
  Gem,
  Shield,
  Building2,
  Upload,
} from "lucide-react";

interface ConfigState {
  step: number;
  category: string | null;
  material: string | null;
  finish: string | null;
  volume: number;
}

const categories = [
  { id: "gaming", label: "Gaming", desc: "Soportes, gadgets, setup", Icon: Gamepad2 },
  { id: "rol", label: "Mesa y Rol", desc: "Dados, miniaturas, tokens", Icon: Dices },
  { id: "deco", label: "Decoración", desc: "Macetas, litofanías, arte", Icon: Gem },
  { id: "cosplay", label: "Cosplay", desc: "Props, réplicas, cascos", Icon: Shield },
  { id: "biz", label: "Empresas B2B", desc: "Prototipos, maquetas", Icon: Building2 },
  { id: "custom", label: "Diseño propio", desc: "Sube tu archivo STL/OBJ", Icon: Upload },
];

const materials = [
  {
    id: "pla",
    name: "PLA Estándar",
    price: 0.08,
    tag: "Económico · Biodegradable",
    props: { detalle: 60, resistencia: 45, acabado: 55, velocidad: 80 },
  },
  {
    id: "pla-silk",
    name: "PLA Silk",
    price: 0.12,
    tag: "Premium · Acabado brillante",
    props: { detalle: 75, resistencia: 50, acabado: 90, velocidad: 70 },
  },
  {
    id: "petg",
    name: "PETG",
    price: 0.10,
    tag: "Técnico · Alta resistencia",
    props: { detalle: 65, resistencia: 85, acabado: 60, velocidad: 65 },
  },
  {
    id: "resina",
    name: "Resina",
    price: 0.18,
    tag: "Ultra detalle · Miniaturas",
    props: { detalle: 98, resistencia: 55, acabado: 92, velocidad: 50 },
  },
];

const finishes = [
  { id: "crudo", label: "Pieza en crudo", detail: "Sin post-proceso", mult: 1.00 },
  { id: "lijado", label: "Lijado", detail: "+ limpieza de capas", mult: 1.18 },
  { id: "imprimacion", label: "Lijado + Imprimación", detail: "+ base para pintar", mult: 1.35 },
  { id: "pintado", label: "Pintado a mano", detail: "+ acabado de estudio", mult: 1.65 },
];

const STEP_LABELS = ["Categoría", "Material", "Acabado", "Resumen"];

export default function OrderConfigurator() {
  const router = useRouter();
  const [config, setConfig] = useState<ConfigState>({
    step: 0,
    category: null,
    material: null,
    finish: null,
    volume: 30,
  });

  const selectedMaterial = materials.find((m) => m.id === config.material);
  const selectedFinish = finishes.find((f) => f.id === config.finish);

  const estimatedPrice =
    selectedMaterial && selectedFinish
      ? (selectedMaterial.price * config.volume * selectedFinish.mult).toFixed(2)
      : null;

  const canNext =
    (config.step === 0 && config.category !== null) ||
    (config.step === 1 && config.material !== null) ||
    (config.step === 2 && config.finish !== null);

  function goNext() {
    setConfig((c) => ({ ...c, step: c.step + 1 }));
  }
  function goBack() {
    setConfig((c) => ({ ...c, step: c.step - 1 }));
  }

  return (
    <section className="bg-light-bg dark:bg-dark-bg section-padding">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-4 uppercase tracking-widest">
            Configurador
          </span>
          <h2 className="text-4xl font-black mb-4">
            Calcula tu <span className="text-purple-500">presupuesto</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Configura tu pieza en 4 pasos y obtén una estimación al instante.
          </p>
        </div>

        {/* Progress bar */}
        <div className="flex items-center justify-between mb-10">
          {STEP_LABELS.map((label, i) => (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    i < config.step
                      ? "bg-emerald-500/15 border border-emerald-500 text-emerald-400"
                      : i === config.step
                      ? "bg-purple-600 text-white"
                      : "border border-white/20 text-white/30"
                  }`}
                >
                  {i < config.step ? "✓" : i + 1}
                </div>
                <span
                  className={`text-xs hidden sm:block ${
                    i === config.step ? "text-white" : i < config.step ? "text-emerald-400" : "text-white/30"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEP_LABELS.length - 1 && (
                <div className="flex-1 h-px mx-2 transition-all duration-500 mb-5"
                  style={{ backgroundColor: i < config.step ? "#10b981" : "rgba(255,255,255,0.1)" }}
                />
              )}
            </div>
          ))}
        </div>

        {/* ── PASO 1: Categoría ── */}
        {config.step === 0 && (
          <div>
            <h3 className="text-lg font-bold mb-1">¿Qué quieres imprimir?</h3>
            <p className="text-sm text-gray-400 mb-6">Elige la categoría que mejor describe tu proyecto</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {categories.map(({ id, label, desc, Icon }) => (
                <button
                  key={id}
                  onClick={() => setConfig((c) => ({ ...c, category: id }))}
                  className={`text-left rounded-xl p-4 transition-all duration-150 ${
                    config.category === id
                      ? "border border-purple-500 bg-purple-500/10"
                      : "border border-white/10 bg-white/5 hover:border-purple-500/50"
                  }`}
                >
                  <Icon className={`w-6 h-6 mb-2 ${config.category === id ? "text-purple-400" : "text-gray-400"}`} />
                  <p className="font-semibold text-sm">{label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── PASO 2: Material ── */}
        {config.step === 1 && (
          <div>
            <h3 className="text-lg font-bold mb-1">Elige el material</h3>
            <p className="text-sm text-gray-400 mb-6">Cada material tiene características diferentes según tu uso</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {materials.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setConfig((c) => ({ ...c, material: m.id }))}
                  className={`text-left rounded-xl p-4 transition-all duration-150 ${
                    config.material === m.id
                      ? "border border-purple-500 bg-purple-500/10"
                      : "border border-white/10 bg-white/5 hover:border-purple-500/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-semibold text-sm">{m.name}</p>
                    <span className="text-xs text-purple-400 font-medium">desde {m.price}€/cm³</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">{m.tag}</p>
                  <div className="space-y-1.5">
                    {Object.entries(m.props).map(([key, val]) => (
                      <div key={key} className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-500 w-16 capitalize">{key}</span>
                        <div className="flex-1 bg-white/10 h-1 rounded-full overflow-hidden">
                          <div
                            className="bg-purple-500 h-full rounded-full transition-all duration-700"
                            style={{ width: `${val}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── PASO 3: Acabado + Volumen ── */}
        {config.step === 2 && (
          <div>
            <h3 className="text-lg font-bold mb-1">Acabado y volumen</h3>
            <p className="text-sm text-gray-400 mb-6">Personaliza el nivel de post-procesado</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {finishes.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setConfig((c) => ({ ...c, finish: f.id }))}
                  className={`flex items-center gap-3 text-left rounded-xl p-4 transition-all duration-150 ${
                    config.finish === f.id
                      ? "border border-purple-500 bg-purple-500/10"
                      : "border border-white/10 bg-white/5 hover:border-purple-500/50"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                      config.finish === f.id ? "border-purple-600 bg-purple-600" : "border-white/30"
                    }`}
                  >
                    {config.finish === f.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{f.label}</p>
                    <p className="text-xs text-gray-400">{f.detail}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Slider de volumen */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Volumen estimado</label>
                <span className="text-sm font-bold text-purple-400">{config.volume} cm³</span>
              </div>
              <input
                type="range"
                min={5}
                max={800}
                step={5}
                value={config.volume}
                onChange={(e) => setConfig((c) => ({ ...c, volume: Number(e.target.value) }))}
                className="w-full accent-purple-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5 cm³ (mini)</span>
                <span>400 cm³ (mediano)</span>
                <span>800 cm³ (grande)</span>
              </div>
            </div>

            {/* Precio en tiempo real */}
            {selectedMaterial && (
              <div className="bg-white/5 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{selectedMaterial.name} × {config.volume} cm³</span>
                  <span>{(selectedMaterial.price * config.volume).toFixed(2)}€</span>
                </div>
                {selectedFinish && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Post-procesado</span>
                    <span>
                      {selectedFinish.mult === 1 ? "Incluido" : `+${Math.round((selectedFinish.mult - 1) * 100)}%`}
                    </span>
                  </div>
                )}
                <div className="border-t border-white/10 pt-2 flex justify-between font-medium">
                  <span>Estimación total</span>
                  <span className="text-purple-400">
                    {selectedFinish
                      ? (selectedMaterial.price * config.volume * selectedFinish.mult).toFixed(2)
                      : (selectedMaterial.price * config.volume).toFixed(2)}€
                  </span>
                </div>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2 text-center">
              IVA no incluido · Precio final confirmado tras revisar diseño
            </p>
          </div>
        )}

        {/* ── PASO 4: Resumen ── */}
        {config.step === 3 && (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500 flex items-center justify-center mb-6">
              <span className="text-2xl text-emerald-400">✓</span>
            </div>

            <div className="w-full bg-white/5 rounded-xl p-4 space-y-3 mb-6">
              {[
                {
                  label: "Categoría",
                  value: categories.find((c) => c.id === config.category)?.label ?? "—",
                },
                {
                  label: "Material",
                  value: selectedMaterial
                    ? `${selectedMaterial.name} (${selectedMaterial.price}€/cm³)`
                    : "—",
                },
                {
                  label: "Acabado",
                  value: selectedFinish?.label ?? "—",
                },
                {
                  label: "Volumen",
                  value: `${config.volume} cm³`,
                },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-gray-400">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>

            {estimatedPrice && (
              <p className="text-3xl font-bold text-purple-400 mb-4">{estimatedPrice}€</p>
            )}
            <p className="text-xs text-gray-500 mb-6">Estimación total · IVA no incluido</p>

            <div className="flex gap-2 flex-wrap justify-center mb-6">
              {["Envío 24-48h", "Sin pedido mínimo", "Garantía de calidad"].map((b) => (
                <span key={b} className="text-xs border border-white/10 rounded-full px-3 py-1 text-gray-400">
                  {b}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Navegación de pasos */}
        <div className={`mt-8 flex ${config.step === 0 ? "justify-end" : "justify-between"}`}>
          {config.step > 0 && config.step < 3 && (
            <button
              onClick={goBack}
              className="text-sm text-gray-400 hover:text-white transition-colors px-4 py-2"
            >
              ← Volver
            </button>
          )}

          {config.step === 3 && (
            <button
              onClick={() => setConfig((c) => ({ ...c, step: 1 }))}
              className="text-sm text-gray-400 hover:text-white transition-colors px-4 py-2"
            >
              ← Modificar configuración
            </button>
          )}

          {config.step < 3 && (
            <button
              onClick={goNext}
              disabled={!canNext}
              className={`bg-purple-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                canNext ? "hover:bg-purple-700" : "opacity-50 cursor-not-allowed"
              }`}
            >
              Siguiente →
            </button>
          )}

          {config.step === 3 && (
            <button
              onClick={() => {
                const params = new URLSearchParams({
                  categoria: config.category ?? "",
                  material: config.material ?? "",
                  acabado: config.finish ?? "",
                  volumen: String(config.volume),
                });
                router.push(`/personalizado?${params.toString()}`);
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors text-sm"
            >
              Pedir ahora →
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
