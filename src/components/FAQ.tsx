"use client";

import { useState } from "react";

const faqs = [
  {
    q: "¿Qué formatos de archivo aceptáis para impresión personalizada?",
    a: "Aceptamos los formatos más comunes: STL, OBJ, 3MF y STEP. Si no tienes un archivo 3D, podemos ayudarte a crear el diseño desde cero describiendo tu idea.",
  },
  {
    q: "¿Cuánto tiempo tarda en llegar mi pedido?",
    a: "El tiempo de producción varía según la complejidad y material, generalmente entre 2 y 5 días laborables. Una vez impreso, el envío tarda 24-48h dentro de España.",
  },
  {
    q: "¿Puedo elegir el color de mi pieza?",
    a: "Sí. Disponemos de más de 20 colores en PLA y PLA Silk. Para PETG y Resina la disponibilidad puede variar. Consúltanos antes de hacer el pedido.",
  },
  {
    q: "¿El presupuesto online es el precio final?",
    a: "El presupuesto online es una estimación basada en el volumen y material. El precio definitivo se confirma tras revisar tu diseño, ya que la geometría puede afectar al tiempo de impresión.",
  },
  {
    q: "¿Hacéis envíos fuera de España?",
    a: "Actualmente solo realizamos envíos dentro de la Península Ibérica e Islas Canarias. Si te encuentras en otro país europeo, contáctanos y estudiaremos tu caso.",
  },
  {
    q: "¿Qué pasa si la pieza llega dañada?",
    a: "Todas nuestras piezas van protegidas con embalaje especializado. Si aun así llega dañada, contáctanos en 48h con fotos y te reimprimimos la pieza sin coste adicional.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-light-card dark:bg-dark-card section-padding border-y border-light-border dark:border-dark-border">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-4 uppercase tracking-widest">
            FAQ
          </span>
          <h2 className="text-4xl font-black mb-4">Preguntas <span className="gradient-text">frecuentes</span></h2>
          <p className="text-gray-500 dark:text-gray-400">
            ¿Tienes dudas? Aquí resolvemos las más comunes.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-light-border dark:border-dark-border rounded-2xl overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <span className="font-semibold text-sm pr-4">{faq.q}</span>
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center transition-transform duration-200 ${
                    open === i ? "rotate-180" : ""
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              {open === i && (
                <div className="px-5 pb-5">
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
