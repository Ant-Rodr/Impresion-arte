"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem("cookie_consent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white dark:bg-dark-card rounded-2xl border border-light-border dark:border-dark-border shadow-xl p-5">
        <p className="text-sm font-semibold mb-1">Usamos cookies 🍪</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
          Usamos cookies técnicas necesarias para el funcionamiento del sitio.{" "}
          <Link href="/cookies" className="text-primary hover:underline">
            Más información
          </Link>
        </p>
        <div className="flex gap-2">
          <button
            onClick={reject}
            className="flex-1 px-3 py-2 text-xs font-semibold border border-light-border dark:border-dark-border rounded-xl hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors"
          >
            Solo técnicas
          </button>
          <button
            onClick={accept}
            className="flex-1 px-3 py-2 text-xs font-semibold bg-primary text-white rounded-xl hover:bg-primary-light transition-colors"
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  );
}
