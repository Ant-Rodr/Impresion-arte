"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const prevPath = useRef<string>(pathname);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      setLoading(true);
      prevPath.current = pathname;
      const timer = setTimeout(() => setLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center bg-dark-bg/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* 3D Printer SVG Animation */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Printer frame */}
          <rect x="10" y="30" width="100" height="70" rx="6" fill="#12121A" stroke="#1E1E2E" strokeWidth="2" />
          {/* Bed */}
          <rect x="20" y="80" width="80" height="8" rx="3" fill="#1E1E2E" stroke="#6C3CE1" strokeWidth="1.5" />
          {/* X-axis rail */}
          <rect x="15" y="42" width="90" height="4" rx="2" fill="#1E1E2E" stroke="#6C3CE1" strokeWidth="1" />
          {/* Nozzle carriage — moves horizontally */}
          <g>
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 50,0; 0,0"
              dur="1.2s"
              repeatCount="indefinite"
              calcMode="ease-in-out"
            />
            {/* Carriage body */}
            <rect x="15" y="38" width="20" height="12" rx="3" fill="#6C3CE1" />
            {/* Nozzle */}
            <polygon points="22,50 28,50 25,60" fill="#8B5CF6" />
            {/* Hot end glow */}
            <circle cx="25" cy="60" r="2.5" fill="#06D6A0">
              <animate attributeName="opacity" values="1;0.3;1" dur="0.6s" repeatCount="indefinite" />
            </circle>
          </g>
          {/* Printed layers */}
          <rect x="35" y="76" width="50" height="4" rx="1" fill="#06D6A0" opacity="0.9" />
          <rect x="38" y="72" width="44" height="4" rx="1" fill="#06D6A0" opacity="0.7">
            <animate attributeName="opacity" values="0;0.7;0.7" dur="1.2s" repeatCount="indefinite" />
          </rect>
          <rect x="41" y="68" width="38" height="4" rx="1" fill="#6C3CE1" opacity="0.6">
            <animate attributeName="opacity" values="0;0;0.6;0.6" dur="1.2s" repeatCount="indefinite" />
          </rect>
          <rect x="44" y="64" width="32" height="4" rx="1" fill="#8B5CF6" opacity="0.4">
            <animate attributeName="opacity" values="0;0;0;0.4;0.4" dur="1.2s" repeatCount="indefinite" />
          </rect>
          {/* Top bar */}
          <rect x="10" y="24" width="100" height="8" rx="4" fill="#1E1E2E" stroke="#6C3CE1" strokeWidth="1.5" />
          {/* Vertical rods */}
          <rect x="16" y="28" width="4" height="74" rx="2" fill="#1E1E2E" stroke="#6C3CE1" strokeWidth="1" />
          <rect x="100" y="28" width="4" height="74" rx="2" fill="#1E1E2E" stroke="#6C3CE1" strokeWidth="1" />
        </svg>

        <p
          className="text-white font-semibold text-sm tracking-widest uppercase animate-pulse"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Imprimiendo...
        </p>
      </div>
    </div>
  );
}
