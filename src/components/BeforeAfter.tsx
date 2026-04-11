"use client";

import { useState, useRef, useCallback } from "react";

export default function BeforeAfter() {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => { if (dragging) updatePosition(e.clientX); },
    [dragging, updatePosition]
  );
  const onTouchMove = useCallback(
    (e: React.TouchEvent) => { updatePosition(e.touches[0].clientX); },
    [updatePosition]
  );

  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Texto */}
          <div>
            <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-4 uppercase tracking-widest">
              Del diseño a la realidad
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mb-6">
              De archivo 3D a{" "}
              <span className="gradient-text">pieza en tus manos</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
              Subes tu modelo STL o nos describes tu idea — nosotros nos encargamos del resto.
              Materiales premium, acabados profesionales y envío a toda España.
            </p>

            <div className="space-y-4">
              {[
                { step: "01", text: "Sube tu archivo STL/OBJ o descríbenos la pieza" },
                { step: "02", text: "Recibe presupuesto detallado en menos de 24h" },
                { step: "03", text: "Confirmamos y comenzamos la producción" },
                { step: "04", text: "Enviamos con seguimiento a toda España" },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-4">
                  <span className="text-4xl font-black leading-none w-12 shrink-0" style={{ color: "#6C3CE1" }}>{s.step}</span>
                  <p className="text-gray-600 dark:text-gray-300 pt-1">{s.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Comparador interactivo */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-6 text-sm font-semibold text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-primary/60" />
                Modelo 3D
              </span>
              <span className="flex-1 h-px bg-light-border dark:bg-dark-border" />
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-accent" />
                Pieza impresa
              </span>
            </div>

            <div
              ref={containerRef}
              className="relative w-full aspect-square max-w-md rounded-2xl overflow-hidden cursor-col-resize select-none border border-light-border dark:border-dark-border shadow-xl"
              onMouseMove={onMouseMove}
              onMouseDown={() => setDragging(true)}
              onMouseUp={() => setDragging(false)}
              onMouseLeave={() => setDragging(false)}
              onTouchMove={onTouchMove}
              onTouchStart={() => setDragging(true)}
              onTouchEnd={() => setDragging(false)}
            >
              {/* Lado izquierdo: wireframe / modelo 3D */}
              <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-4/5 h-4/5 opacity-80">
                  {/* Cubo wireframe */}
                  <g stroke="#6C3CE1" strokeWidth="1.5" fill="none" opacity="0.9">
                    {/* Cara frontal */}
                    <rect x="50" y="70" width="80" height="80" />
                    {/* Cara superior */}
                    <polygon points="50,70 80,45 160,45 130,70" />
                    {/* Cara lateral */}
                    <polygon points="130,70 160,45 160,125 130,150" />
                    {/* Aristas internas */}
                    <line x1="50" y1="70" x2="80" y2="45" strokeDasharray="4,3" />
                    <line x1="130" y1="70" x2="160" y2="45" strokeDasharray="4,3" />
                    <line x1="80" y1="45" x2="160" y2="45" strokeDasharray="4,3" />
                    {/* Grid en cara frontal */}
                    <line x1="50" y1="96" x2="130" y2="96" strokeOpacity="0.3" />
                    <line x1="50" y1="122" x2="130" y2="122" strokeOpacity="0.3" />
                    <line x1="76" y1="70" x2="76" y2="150" strokeOpacity="0.3" />
                    <line x1="102" y1="70" x2="102" y2="150" strokeOpacity="0.3" />
                    {/* Puntos de vértice */}
                    {[[50,70],[130,70],[130,150],[50,150],[80,45],[160,45],[160,125],[80,125]].map(([cx,cy],i) => (
                      <circle key={i} cx={cx} cy={cy} r="3" fill="#6C3CE1" strokeWidth="0" />
                    ))}
                  </g>
                  {/* Etiqueta */}
                  <text x="100" y="185" textAnchor="middle" fill="#6C3CE1" fontSize="11" fontFamily="monospace" opacity="0.7">model.stl</text>
                </svg>
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 rounded-lg bg-primary/20 text-primary text-xs font-bold border border-primary/30">
                    Modelo 3D
                  </span>
                </div>
              </div>

              {/* Lado derecho: pieza impresa (con clip) */}
              <div
                className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
                style={{ clipPath: `inset(0 0 0 ${position}%)` }}
              >
                <svg viewBox="0 0 200 200" className="w-4/5 h-4/5">
                  {/* Cubo "sólido" impreso */}
                  <g>
                    {/* Cara lateral (sombra) */}
                    <polygon points="130,70 160,45 160,125 130,150" fill="#9CA3AF" />
                    {/* Cara superior */}
                    <polygon points="50,70 80,45 160,45 130,70" fill="#D1D5DB" />
                    {/* Cara frontal */}
                    <rect x="50" y="70" width="80" height="80" fill="#E5E7EB" />
                    {/* Contornos suaves */}
                    <rect x="50" y="70" width="80" height="80" fill="none" stroke="#9CA3AF" strokeWidth="1" />
                    <polygon points="50,70 80,45 160,45 130,70" fill="none" stroke="#9CA3AF" strokeWidth="1" />
                    <polygon points="130,70 160,45 160,125 130,150" fill="none" stroke="#6B7280" strokeWidth="1" />
                    {/* Líneas de capas FDM */}
                    {[78,86,94,102,110,118,126,134,142].map((y, i) => (
                      <line key={i} x1="50" y1={y} x2="130" y2={y} stroke="#D1D5DB" strokeWidth="0.8" />
                    ))}
                    {/* Brillo */}
                    <rect x="55" y="75" width="20" height="8" fill="white" opacity="0.3" rx="2" />
                  </g>
                  <text x="100" y="185" textAnchor="middle" fill="#6B7280" fontSize="11" fontFamily="sans-serif" opacity="0.7">PLA Silk · Lijado</text>
                </svg>
                <div className="absolute bottom-4 right-4">
                  <span className="px-3 py-1 rounded-lg bg-accent/20 text-accent text-xs font-bold border border-accent/30">
                    Pieza impresa
                  </span>
                </div>
              </div>

              {/* Divisor */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
                style={{ left: `${position}%` }}
              >
                {/* Handle */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 bg-white rounded-full shadow-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                  </svg>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-400 text-center">
              Arrastra el divisor para comparar modelo digital vs. pieza impresa
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
