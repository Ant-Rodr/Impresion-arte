"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const COLORS = [
  { label: "Blanco", hex: "#FFFFFF", three: 0xffffff },
  { label: "Negro", hex: "#1a1a1a", three: 0x1a1a1a },
  { label: "Rojo", hex: "#E53E3E", three: 0xe53e3e },
  { label: "Verde", hex: "#38A169", three: 0x38a169 },
  { label: "Azul", hex: "#3182CE", three: 0x3182ce },
  { label: "Amarillo", hex: "#ECC94B", three: 0xecc94b },
  { label: "Naranja", hex: "#ED8936", three: 0xed8936 },
  { label: "Morado", hex: "#6C3CE1", three: 0x6c3ce1 },
  { label: "Rosa", hex: "#ED64A6", three: 0xed64a6 },
  { label: "Gris", hex: "#718096", three: 0x718096 },
];

export default function ColorConfigurator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const materialRef = useRef<THREE.MeshPhongMaterial | null>(null);
  const [selectedColor, setSelectedColor] = useState(COLORS[7]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 4);

    const geometry = new THREE.BoxGeometry(2, 2, 2, 4, 4, 4);
    const material = new THREE.MeshPhongMaterial({
      color: selectedColor.three,
      shininess: 100,
      specular: 0x444444,
    });
    materialRef.current = material;
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Edges
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.15 });
    mesh.add(new THREE.LineSegments(edges, lineMat));

    const light1 = new THREE.DirectionalLight(0xffffff, 1.2);
    light1.position.set(3, 3, 4);
    scene.add(light1);
    const light2 = new THREE.DirectionalLight(0x6c3ce1, 0.4);
    light2.position.set(-3, -2, -2);
    scene.add(light2);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    const animate = () => {
      animRef.current = requestAnimationFrame(animate);
      mesh.rotation.x += 0.008;
      mesh.rotation.y += 0.012;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!canvas) return;
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update color in real time
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.color.setHex(selectedColor.three);
    }
  }, [selectedColor]);

  return (
    <section className="bg-light-bg dark:bg-dark-bg section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-4 uppercase tracking-widest">
            Personalización
          </span>
          <h2 className="text-4xl font-black mb-4">
            Elige tu <span className="gradient-text">Color de Filamento</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Selecciona un color PLA y visualiza tu pieza en tiempo real.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* 3D Canvas */}
          <div className="relative aspect-square max-w-sm mx-auto w-full rounded-3xl overflow-hidden bg-dark-card border border-dark-border shadow-2xl">
            <canvas ref={canvasRef} className="w-full h-full" />
            <div
              className="absolute bottom-4 left-4 right-4 rounded-xl px-4 py-2 text-center text-sm font-semibold"
              style={{ backgroundColor: selectedColor.hex + "22", color: selectedColor.hex, border: `1px solid ${selectedColor.hex}44` }}
            >
              {selectedColor.label}
            </div>
          </div>

          {/* Color palette */}
          <div>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-5">
              Colores PLA disponibles
            </p>
            <div className="grid grid-cols-5 gap-3">
              {COLORS.map((c) => (
                <button
                  key={c.label}
                  onClick={() => setSelectedColor(c)}
                  title={c.label}
                  className={`relative w-full aspect-square rounded-2xl transition-all duration-200 hover:scale-110 focus:outline-none ${
                    selectedColor.hex === c.hex
                      ? "ring-2 ring-offset-2 ring-primary scale-110 shadow-lg"
                      : ""
                  }`}
                  style={{ backgroundColor: c.hex }}
                >
                  {selectedColor.hex === c.hex && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-5 h-5 drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} style={{ color: c.hex === "#FFFFFF" || c.hex === "#ECC94B" ? "#333" : "white" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-8 p-5 rounded-2xl bg-dark-card border border-dark-border">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Color seleccionado</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg shadow" style={{ backgroundColor: selectedColor.hex }} />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{selectedColor.label}</p>
                  <p className="text-xs text-gray-400">{selectedColor.hex}</p>
                </div>
              </div>
            </div>

            <a href="/personalizado" className="btn-primary mt-6 w-full text-center">
              Pedir en este color
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
