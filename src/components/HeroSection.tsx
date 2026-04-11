"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100);
    camera.position.set(0, 0, 5);

    // Wireframe cube
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({ color: 0x6c3ce1, linewidth: 1.5 });
    const cube = new THREE.LineSegments(edges, material);
    scene.add(cube);

    // Ambient particles
    const particleGeo = new THREE.BufferGeometry();
    const count = 300;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 20;
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0x06d6a0, size: 0.05 });
    scene.add(new THREE.Points(particleGeo, particleMat));

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      cube.rotation.x += 0.005;
      cube.rotation.y += 0.008;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
      camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  // Parallax effect on scroll
  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;
    const handleScroll = () => {
      const offset = window.scrollY * 0.4;
      bg.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="hero-noise relative min-h-[85vh] flex items-center overflow-hidden bg-dark-bg pb-16">

      {/* Video de fondo — coloca tu vídeo en /public/videos/timelapse.mp4 */}
      <div ref={bgRef} className="absolute inset-0 overflow-hidden will-change-transform" style={{ top: '-10%', height: '120%' }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          aria-hidden="true"
        >
          <source src="/videos/timelapse.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-dark-bg/90 via-dark-bg/75 to-dark-bg/60" />
      </div>

      {/* Three.js canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30 z-[2]" />

      <div className="relative z-10 max-w-7xl mx-auto section-padding w-full">
        <div className="max-w-3xl">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">
            Impresión 3D Profesional
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl leading-tight mb-6 text-white">
            {"Damos vida a\u00A0".split("").map((char, i) => (
              <span
                key={i}
                className="letter-in"
                style={{ animationDelay: `${i * 0.055}s` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
            <span
              className="gradient-text letter-in"
              style={{ animationDelay: `${13 * 0.055}s` }}
            >
              tus ideas
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
            Accesorios gamer, miniaturas de rol, decoración premium, cosplay y piezas 100% personalizables.
            Alta calidad, envío rápido y presupuesto instantáneo online.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/personalizado" className="btn-primary text-base px-8 py-4">
              Personalizar Ahora
            </Link>
            <Link href="#catalogo" className="btn-secondary text-base px-8 py-4 border-white/30 text-white hover:border-white/60">
              Ver Catálogo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
