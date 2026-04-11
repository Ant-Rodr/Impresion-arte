"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type * as THREE from "three";

type ViewerState = "idle" | "uploading" | "loading" | "loaded" | "error";

interface UploadedFile {
  name: string;
  url: string;
  size: number;
}

export default function Viewer3D({
  onFileUploaded,
}: {
  onFileUploaded?: (file: UploadedFile) => void;
}) {
  const [viewerState, setViewerState] = useState<ViewerState>("idle");
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<{ dispose: () => void } | null>(null);

  const initThreeViewer = useCallback(async (fileUrl: string, fileName: string) => {
    if (!canvasRef.current) return;

    setViewerState("loading");

    try {
      const THREE = await import("three");
      const { STLLoader } = await import("three/examples/jsm/loaders/STLLoader.js");
      const { OBJLoader } = await import("three/examples/jsm/loaders/OBJLoader.js");
      const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");

      const container = canvasRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight || 320;

      // Setup renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      container.innerHTML = "";
      container.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 10000);

      // Lights
      scene.add(new THREE.AmbientLight(0xffffff, 0.6));
      const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
      dirLight.position.set(1, 2, 3);
      scene.add(dirLight);
      const fillLight = new THREE.DirectionalLight(0x8B5CF6, 0.3);
      fillLight.position.set(-2, -1, -1);
      scene.add(fillLight);

      // Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;

      // Load model
      const ext = fileName.split(".").pop()?.toLowerCase();
      let mesh: THREE.Object3D;

      if (ext === "stl") {
        const loader = new STLLoader();
        const geometry = await new Promise<THREE.BufferGeometry>((resolve, reject) => {
          loader.load(fileUrl, resolve, undefined, reject);
        });
        const material = new THREE.MeshPhongMaterial({
          color: 0x6C3CE1,
          specular: 0x444444,
          shininess: 60,
        });
        mesh = new THREE.Mesh(geometry, material);
      } else if (ext === "obj") {
        const loader = new OBJLoader();
        mesh = await new Promise<THREE.Object3D>((resolve, reject) => {
          loader.load(fileUrl, resolve, undefined, reject);
        });
        mesh.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            (child as THREE.Mesh).material = new THREE.MeshPhongMaterial({
              color: 0x6C3CE1,
              specular: 0x444444,
              shininess: 60,
            });
          }
        });
      } else {
        throw new Error("Formato no soportado en visor");
      }

      // Center and scale
      const box = new THREE.Box3().setFromObject(mesh);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      mesh.position.sub(center);
      scene.add(mesh);

      camera.position.set(0, maxDim * 0.5, maxDim * 2);
      controls.update();

      // Animate
      let animId: number;
      const animate = () => {
        animId = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      // Responsive resize
      const handleResize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight || 320;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", handleResize);

      rendererRef.current = {
        dispose: () => {
          cancelAnimationFrame(animId);
          window.removeEventListener("resize", handleResize);
          renderer.dispose();
          controls.dispose();
        },
      };

      setViewerState("loaded");
    } catch (err) {
      console.error("[Viewer3D]", err);
      setErrorMsg("No se pudo renderizar el modelo. Asegúrate de que el archivo es válido.");
      setViewerState("error");
    }
  }, []);

  useEffect(() => {
    return () => {
      rendererRef.current?.dispose();
    };
  }, []);

  const uploadFile = async (file: File) => {
    setViewerState("uploading");
    setUploadProgress(0);

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!["stl", "obj", "3mf"].includes(ext)) {
      setErrorMsg("Solo se aceptan archivos .STL, .OBJ o .3MF");
      setViewerState("error");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setErrorMsg("El archivo supera el límite de 50 MB");
      setViewerState("error");
      return;
    }

    // Simulamos progreso de subida
    const progressInterval = setInterval(() => {
      setUploadProgress((p) => Math.min(p + 15, 85));
    }, 200);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Error al subir");
      }

      const data = await res.json();
      const uploaded: UploadedFile = {
        name: data.fileName,
        url: data.fileUrl,
        size: data.fileSize,
      };

      setUploadedFile(uploaded);
      onFileUploaded?.(uploaded);

      // Solo renderizar STL/OBJ en el visor (3MF no soportado en three.js base)
      if (ext === "stl" || ext === "obj") {
        await initThreeViewer(data.fileUrl, data.fileName);
      } else {
        setViewerState("loaded");
      }
    } catch (err) {
      clearInterval(progressInterval);
      setErrorMsg(err instanceof Error ? err.message : "Error al subir el archivo");
      setViewerState("error");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const reset = () => {
    rendererRef.current?.dispose();
    rendererRef.current = null;
    if (canvasRef.current) canvasRef.current.innerHTML = "";
    setViewerState("idle");
    setUploadedFile(null);
    setErrorMsg("");
    setUploadProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold">3. Archivo 3D y Visor</label>
        {viewerState !== "idle" && (
          <button
            type="button"
            onClick={reset}
            className="text-xs text-gray-400 hover:text-primary transition-colors"
          >
            Cambiar archivo
          </button>
        )}
      </div>

      <div
        className={`relative rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
          viewerState === "error"
            ? "border-red-400/50 bg-red-400/5"
            : viewerState === "loaded"
            ? "border-accent/50"
            : "border-dashed border-light-border dark:border-dark-border hover:border-primary/50"
        }`}
        style={{ minHeight: "280px" }}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {/* IDLE */}
        {viewerState === "idle" && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center cursor-pointer"
            onClick={() => inputRef.current?.click()}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Arrastra tu modelo 3D aquí
            </p>
            <p className="text-xs text-gray-400 mb-4">
              Formatos:{" "}
              <span className="font-medium text-primary">.STL</span>,{" "}
              <span className="font-medium text-primary">.OBJ</span>,{" "}
              <span className="font-medium text-primary">.3MF</span>
              {" "}· Máx 50 MB
            </p>
            <button
              type="button"
              className="btn-primary text-sm !py-2.5 !px-6"
              onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
            >
              Subir Archivo
            </button>
          </div>
        )}

        {/* UPLOADING */}
        {viewerState === "uploading" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
            <div className="w-full max-w-xs">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>Subiendo archivo...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 dark:bg-dark-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* LOADING THREE.JS */}
        {viewerState === "loading" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="w-14 h-14 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            <p className="text-sm font-semibold text-primary">Renderizando modelo 3D...</p>
          </div>
        )}

        {/* CANVAS THREE.JS */}
        <div
          ref={canvasRef}
          className="w-full"
          style={{
            minHeight: "280px",
            display: viewerState === "loaded" ? "block" : "none",
          }}
        />

        {/* HEADER cuando está cargado */}
        {viewerState === "loaded" && uploadedFile && (
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-2.5 bg-black/60 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-semibold text-white truncate max-w-[180px]">
                {uploadedFile.name}
              </span>
            </div>
            <span className="text-xs text-gray-300">{formatSize(uploadedFile.size)}</span>
          </div>
        )}

        {/* 3MF: no renderizable pero subido */}
        {viewerState === "loaded" && uploadedFile?.name.endsWith(".3mf") && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center mt-10">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 text-accent flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-accent">Archivo .3MF recibido</p>
            <p className="text-xs text-gray-400">Vista previa no disponible para .3MF, pero lo procesaremos correctamente.</p>
          </div>
        )}

        {/* ERROR */}
        {viewerState === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-400/10 text-red-400 flex items-center justify-center">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-red-400">{errorMsg || "Error al procesar el archivo"}</p>
            <button type="button" onClick={reset} className="btn-secondary text-xs !py-2 !px-4">
              Intentar de nuevo
            </button>
          </div>
        )}
      </div>

      {viewerState === "loaded" && uploadedFile && !uploadedFile.name.endsWith(".3mf") && (
        <p className="text-xs text-gray-400 text-center">
          Usa el ratón para rotar · Rueda para zoom · Click derecho para desplazar
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".stl,.obj,.3mf"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
