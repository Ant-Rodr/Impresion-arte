"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const isDragging = useRef(false);

  const updatePos = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    updatePos(e.clientX);
  };
  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    updatePos(e.touches[0].clientX);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging.current) updatePos(e.clientX);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging.current) updatePos(e.touches[0].clientX);
    };
    const stop = () => { isDragging.current = false; };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", stop);
    };
  }, [updatePos]);

  return (
    <section className="bg-dark-bg section-padding">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-4 uppercase tracking-widest">
            Resultados
          </span>
          <h2 className="text-4xl font-black text-white mb-4">
            Del <span className="gradient-text">diseño digital</span> al objeto real
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Arrastra el control deslizante para comparar el modelo 3D con la pieza impresa terminada.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative w-full aspect-[16/9] max-w-3xl mx-auto rounded-2xl overflow-hidden cursor-ew-resize select-none border border-dark-border shadow-2xl"
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
        >
          {/* BEFORE — 3D model (left side, dark/wireframe style) */}
          <div className="absolute inset-0">
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #0A0A0F 0%, #12121A 40%, #1E1E2E 100%)",
              }}
            >
              {/* Wireframe cube SVG placeholder */}
              <svg viewBox="0 0 200 200" className="w-48 h-48 opacity-80">
                <defs>
                  <style>{`
                    .wf { stroke: #6C3CE1; stroke-width: 1.5; fill: none; opacity: 0.9; }
                    .wf-back { stroke: #6C3CE1; stroke-width: 1; fill: none; opacity: 0.3; }
                  `}</style>
                </defs>
                {/* Front face */}
                <rect x="60" y="80" width="80" height="80" className="wf" />
                {/* Top face */}
                <polygon points="60,80 100,50 180,50 140,80" className="wf" />
                {/* Right face */}
                <polygon points="140,80 180,50 180,130 140,160" className="wf" />
                {/* Back edges */}
                <line x1="100" y1="50" x2="100" y2="130" className="wf-back" />
                <line x1="100" y1="130" x2="60" y2="160" className="wf-back" />
                <line x1="100" y1="130" x2="180" y2="130" className="wf-back" />
                {/* Grid lines */}
                <line x1="80" y1="80" x2="80" y2="160" className="wf-back" />
                <line x1="100" y1="80" x2="100" y2="160" className="wf-back" />
                <line x1="120" y1="80" x2="120" y2="160" className="wf-back" />
                <line x1="60" y1="107" x2="140" y2="107" className="wf-back" />
                <line x1="60" y1="133" x2="140" y2="133" className="wf-back" />
              </svg>
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5 text-white text-xs font-semibold">
                Modelo 3D
              </div>
            </div>
          </div>

          {/* AFTER — finished print (right side, photo style) */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #1a0a2e 0%, #2d1b69 40%, #4c2f9e 100%)",
              }}
            >
              {/* Solid rendered cube placeholder */}
              <svg viewBox="0 0 200 200" className="w-48 h-48 drop-shadow-2xl">
                <defs>
                  <linearGradient id="topFace" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#6C3CE1" />
                  </linearGradient>
                  <linearGradient id="frontFace" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6C3CE1" />
                    <stop offset="100%" stopColor="#4c2f9e" />
                  </linearGradient>
                  <linearGradient id="rightFace" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#4c2f9e" />
                    <stop offset="100%" stopColor="#3b1f7a" />
                  </linearGradient>
                </defs>
                {/* Top face */}
                <polygon points="60,80 100,50 180,50 140,80" fill="url(#topFace)" />
                {/* Front face */}
                <rect x="60" y="80" width="80" height="80" fill="url(#frontFace)" />
                {/* Right face */}
                <polygon points="140,80 180,50 180,130 140,160" fill="url(#rightFace)" />
                {/* Edge highlights */}
                <polygon points="60,80 100,50 180,50 140,80" fill="none" stroke="#a78bfa" strokeWidth="1" opacity="0.5" />
                <rect x="60" y="80" width="80" height="80" fill="none" stroke="#7c3aed" strokeWidth="1" opacity="0.3" />
              </svg>
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5 text-white text-xs font-semibold">
                Pieza impresa
              </div>
            </div>
          </div>

          {/* Slider line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white z-10 pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          />

          {/* Slider handle */}
          <div
            className="absolute top-1/2 z-20 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
            </svg>
          </div>

          {/* Labels */}
          <div className="absolute top-4 left-4 text-xs font-semibold text-white/70 uppercase tracking-wider pointer-events-none">
            Antes
          </div>
          <div className="absolute top-4 right-4 text-xs font-semibold text-white/70 uppercase tracking-wider pointer-events-none">
            Después
          </div>
        </div>
      </div>
    </section>
  );
}
