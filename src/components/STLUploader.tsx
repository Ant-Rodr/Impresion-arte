"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

interface FileInfo {
  name: string;
  size: string;
  dims: { x: number; y: number; z: number } | null;
}

export default function STLUploader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dragging, setDragging] = useState(false);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animRef = useRef<number>(0);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const isPointerDown = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0, y: 0 });

  // Setup Three.js scene once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.offsetWidth / canvas.offsetHeight, 0.01, 1000);
    camera.position.set(0, 0, 5);

    const light1 = new THREE.DirectionalLight(0xffffff, 1.5);
    light1.position.set(3, 3, 5);
    scene.add(light1);
    const light2 = new THREE.DirectionalLight(0x6c3ce1, 0.5);
    light2.position.set(-3, -2, -3);
    scene.add(light2);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    const group = new THREE.Group();
    scene.add(group);

    const animate = () => {
      animRef.current = requestAnimationFrame(animate);
      if (meshRef.current) {
        group.rotation.x = rotationRef.current.x;
        group.rotation.y = rotationRef.current.y;
        if (!isPointerDown.current) {
          rotationRef.current.y += 0.005;
        }
      }
      renderer.render(scene, camera);
    };
    animate();

    // Pointer events for orbit-like rotation
    const onPointerDown = (e: PointerEvent) => {
      isPointerDown.current = true;
      lastPointer.current = { x: e.clientX, y: e.clientY };
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isPointerDown.current) return;
      const dx = e.clientX - lastPointer.current.x;
      const dy = e.clientY - lastPointer.current.y;
      rotationRef.current.y += dx * 0.01;
      rotationRef.current.x += dy * 0.01;
      lastPointer.current = { x: e.clientX, y: e.clientY };
    };
    const onPointerUp = () => { isPointerDown.current = false; };

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    const handleResize = () => {
      if (!canvas) return;
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
      camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Store group ref for later geometry injection
    (canvas as unknown as { __threeGroup: THREE.Group; __threeScene: THREE.Scene; __threeCamera: THREE.PerspectiveCamera })
      .__threeGroup = group;
    (canvas as unknown as { __threeGroup: THREE.Group; __threeScene: THREE.Scene; __threeCamera: THREE.PerspectiveCamera })
      .__threeScene = scene;
    (canvas as unknown as { __threeGroup: THREE.Group; __threeScene: THREE.Scene; __threeCamera: THREE.PerspectiveCamera })
      .__threeCamera = camera;

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  const loadSTL = useCallback((buffer: ArrayBuffer, name: string, size: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const c = canvas as unknown as { __threeGroup: THREE.Group; __threeCamera: THREE.PerspectiveCamera };
    const group = c.__threeGroup;
    const camera = c.__threeCamera;

    // Remove existing mesh
    while (group.children.length > 0) group.remove(group.children[0]);
    meshRef.current = null;

    try {
      const loader = new STLLoader();
      const geometry = loader.parse(buffer);
      geometry.computeBoundingBox();
      geometry.center();
      geometry.computeVertexNormals();

      const bb = geometry.boundingBox!;
      const dims = {
        x: parseFloat((bb.max.x - bb.min.x).toFixed(1)),
        y: parseFloat((bb.max.y - bb.min.y).toFixed(1)),
        z: parseFloat((bb.max.z - bb.min.z).toFixed(1)),
      };

      // Normalize to fit in view
      const maxDim = Math.max(dims.x, dims.y, dims.z);
      const scale = 3 / maxDim;
      geometry.scale(scale, scale, scale);

      const material = new THREE.MeshPhongMaterial({
        color: 0x6c3ce1,
        shininess: 60,
        specular: 0x333333,
      });
      const mesh = new THREE.Mesh(geometry, material);
      group.add(mesh);
      meshRef.current = mesh;

      camera.position.z = 5;
      rotationRef.current = { x: 0.3, y: 0 };

      const sizeStr = size < 1024 * 1024
        ? `${(size / 1024).toFixed(1)} KB`
        : `${(size / (1024 * 1024)).toFixed(2)} MB`;

      setFileInfo({ name, size: sizeStr, dims });
      setError(null);
    } catch {
      setError("Error al cargar el archivo STL. Asegúrate de que es un archivo STL válido.");
    }
  }, []);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.name.toLowerCase().endsWith(".stl")) {
      setError("Solo se aceptan archivos .stl");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        loadSTL(e.target.result as ArrayBuffer, file.name, file.size);
      }
    };
    reader.readAsArrayBuffer(file);
  }, [loadSTL]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  return (
    <section className="bg-dark-bg section-padding">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-accent/10 text-accent rounded-full mb-4 uppercase tracking-widest">
            Visualizador STL
          </span>
          <h2 className="text-4xl font-black text-white mb-4">
            Previsualiza tu <span className="gradient-text">modelo 3D</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Sube tu archivo STL y comprueba cómo quedará antes de pedirlo. Arrastra para rotar el modelo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Drop zone */}
          <div>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer p-10 text-center ${
                dragging
                  ? "border-primary bg-primary/10"
                  : "border-dark-border hover:border-primary/50 bg-dark-card"
              }`}
              onClick={() => document.getElementById("stl-input")?.click()}
            >
              <input
                id="stl-input"
                type="file"
                accept=".stl"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
              <div className="text-5xl mb-4">📁</div>
              <p className="text-white font-semibold mb-2">Arrastra tu archivo STL aquí</p>
              <p className="text-gray-500 text-sm mb-4">o haz clic para seleccionar</p>
              <span className="inline-block px-4 py-2 bg-primary/20 text-primary text-xs rounded-lg font-semibold">
                Solo archivos .stl
              </span>
            </div>

            {error && (
              <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {error}
              </div>
            )}

            {fileInfo && (
              <div className="mt-4 card p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🖨️</span>
                  <div>
                    <p className="font-bold text-white text-sm truncate max-w-[200px]">{fileInfo.name}</p>
                    <p className="text-xs text-gray-500">{fileInfo.size}</p>
                  </div>
                </div>
                {fileInfo.dims && (
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-dark-border">
                    {["X", "Y", "Z"].map((axis, i) => (
                      <div key={axis} className="text-center">
                        <p className="text-xs text-gray-500 uppercase">{axis}</p>
                        <p className="font-bold text-primary text-sm">
                          {[fileInfo.dims!.x, fileInfo.dims!.y, fileInfo.dims!.z][i]} mm
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                <a href="/personalizado" className="btn-primary w-full text-sm text-center block mt-2">
                  Pedir esta pieza
                </a>
              </div>
            )}
          </div>

          {/* 3D canvas */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-dark-card border border-dark-border shadow-2xl">
            <canvas ref={canvasRef} className="w-full h-full" />
            {!fileInfo && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center text-gray-600">
                  <div className="text-6xl mb-3 opacity-30">🧊</div>
                  <p className="text-sm">Tu modelo aparecerá aquí</p>
                </div>
              </div>
            )}
            {fileInfo && (
              <p className="absolute bottom-3 right-3 text-xs text-gray-500 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg pointer-events-none">
                Arrastra para rotar
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
