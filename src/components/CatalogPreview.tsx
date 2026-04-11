"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const items = [
  {
    title: "Setup Gamer y Gadgets",
    desc: "Soportes para mandos y auriculares, organizadores de escritorio, porta-auriculares y accesorios que elevan tu setup al siguiente nivel.",
    tag: "Gaming",
    href: "/catalogo/gamer",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h.01M10 12h.01M7 9h.01M9 15h.01M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9A2.25 2.25 0 015.25 16.5v-9zM3.75 15.75a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H3.75zM3.75 7.5a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H3.75z" />
      </svg>
    ),
    color: "#6C3CE1",
    count: "60+ accesorios",
    shape: "box" as const,
  },
  {
    title: "Juegos de Mesa y Rol",
    desc: "Torres de dados, insertos organizadores para cajas, miniaturas en resina ultra-detalladas y tokens para tus partidas épicas.",
    tag: "Mesa & Rol",
    href: "/catalogo/mesa-rol",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-9 5.25-9-5.25v-2.25l9-5.25 9 5.25z" />
      </svg>
    ),
    color: "#06D6A0",
    count: "80+ piezas",
    shape: "torus" as const,
  },
  {
    title: "Decoración Moderna",
    desc: "Macetas geométricas en PLA Silk y PLA Wood, litofanías personalizadas con tus fotos y arte paramétrico para el hogar.",
    tag: "Decoración",
    href: "/catalogo/decorativos",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    color: "#F59E0B",
    count: "120+ modelos",
    shape: "sphere" as const,
  },
  {
    title: "Cosplay / Props",
    desc: "Réplicas a escala, cascos en gran formato, armas prop y accesorios para disfraz con acabados de pintura a mano disponibles.",
    tag: "Cosplay",
    href: "/catalogo/cosplay",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    color: "#EC4899",
    count: "40+ réplicas",
    shape: "box" as const,
  },
];

function Card3D({ color, shape, active }: { color: string; shape: "box" | "sphere" | "torus"; active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!active) {
      cancelAnimationFrame(animRef.current);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(80, 80);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 3;

    const hex = parseInt(color.replace("#", ""), 16);
    let geometry: THREE.BufferGeometry;
    if (shape === "box") geometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    else if (shape === "sphere") geometry = new THREE.SphereGeometry(0.8, 24, 24);
    else geometry = new THREE.TorusGeometry(0.7, 0.28, 16, 32);

    const material = new THREE.MeshPhongMaterial({ color: hex, shininess: 80 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const light = new THREE.DirectionalLight(0xffffff, 1.2);
    light.position.set(2, 2, 3);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    const animate = () => {
      animRef.current = requestAnimationFrame(animate);
      mesh.rotation.x += 0.02;
      mesh.rotation.y += 0.03;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      renderer.dispose();
      rendererRef.current = null;
    };
  }, [active, color, shape]);

  return (
    <canvas
      ref={canvasRef}
      width={80}
      height={80}
      className={`transition-opacity duration-300 ${active ? "opacity-100" : "opacity-0"}`}
      style={{ width: 80, height: 80 }}
    />
  );
}

export default function CatalogPreview() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="catalogo" className="bg-light-bg dark:bg-dark-bg section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-4 uppercase tracking-widest">
            Categorías
          </span>
          <h2 className="text-4xl font-black mb-4">Nuestro <span className="gradient-text">Catálogo</span></h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Nichos de alta demanda, calidad premium y acabados profesionales. Encuentra lo que necesitas o pídelo a medida.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {items.map((item, index) => (
            <Link
              key={item.title}
              href={item.href}
              className="card p-7 group cursor-pointer block relative overflow-hidden"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Fondo decorativo */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-300 translate-x-8 -translate-y-8"
                style={{ backgroundColor: item.color }}
              />

              {/* 3D mini canvas on hover */}
              <div className="absolute top-4 right-4 w-20 h-20 pointer-events-none z-10">
                <Card3D color={item.color} shape={item.shape} active={hoveredIndex === index} />
              </div>

              {/* Icono */}
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 ${hoveredIndex === index ? "opacity-0" : "opacity-100"}`}
                style={{ backgroundColor: item.color + "1A", color: item.color }}
              >
                {item.icon}
              </div>

              {/* Tag */}
              <span
                className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3"
                style={{ backgroundColor: item.color + "1A", color: item.color }}
              >
                {item.tag}
              </span>

              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-5 leading-relaxed">{item.desc}</p>

              {/* Footer */}
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs text-gray-400 dark:text-gray-500">{item.count}</span>
                <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                  Explorar
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/catalogo" className="btn-secondary text-sm">
            Ver catálogo completo
          </Link>
        </div>
      </div>
    </section>
  );
}
