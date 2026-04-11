import Link from "next/link";

const materials = [
  {
    name: "PLA Estándar",
    desc: "Ideal para decoración. Fácil de imprimir, gran variedad de colores.",
    color: "#6C3CE1",
    badge: "Más popular",
    price: "desde 0,08€/cm³",
    props: ["Económico", "Muchos colores", "Biodegradable"],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    name: "PLA Silk",
    desc: "Acabado brillante y satinado. Perfecto para figuras y coleccionables premium.",
    color: "#06D6A0",
    badge: "Premium",
    price: "desde 0,12€/cm³",
    props: ["Acabado brillante", "Muy detallado", "Decoración"],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    name: "PETG",
    desc: "Resistente y duradero. Para piezas funcionales o de uso exterior.",
    color: "#F59E0B",
    badge: "Técnico",
    price: "desde 0,10€/cm³",
    props: ["Alta resistencia", "Duradero", "Exterior"],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    name: "Resina",
    desc: "Máximo detalle. Ideal para miniaturas y piezas con geometría compleja.",
    color: "#EF4444",
    badge: "Ultra detalle",
    price: "desde 0,18€/cm³",
    props: ["Ultra detalle", "Sup. lisas", "Miniaturas"],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
];

export default function MaterialsPreview() {
  return (
    <section className="bg-light-card dark:bg-dark-card section-padding border-y border-light-border dark:border-dark-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-4 uppercase tracking-widest">
            Materiales
          </span>
          <h2 className="text-4xl font-black mb-4">Nuestros <span className="gradient-text">Materiales</span></h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Trabajamos con los mejores filamentos y resinas del mercado para garantizar resultados excepcionales.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {materials.map((mat) => (
            <div
              key={mat.name}
              className="card p-6 group relative overflow-hidden"
              style={{ borderTopColor: mat.color + "60" }}
            >
              {/* Barra superior de color */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: mat.color }}
              />

              {/* Icono */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: mat.color + "1A", color: mat.color }}
              >
                {mat.icon}
              </div>

              {/* Badge */}
              <span
                className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-3"
                style={{ backgroundColor: mat.color + "1A", color: mat.color }}
              >
                {mat.badge}
              </span>

              <h3 className="text-lg font-bold mb-2">{mat.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">{mat.desc}</p>

              {/* Precio */}
              <p className="text-xs font-semibold mb-4" style={{ color: mat.color }}>{mat.price}</p>

              {/* Props */}
              <div className="flex flex-wrap gap-1.5">
                {mat.props.map((p) => (
                  <span
                    key={p}
                    className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/materiales" className="btn-secondary text-sm">
            Comparar materiales en detalle
          </Link>
        </div>
      </div>
    </section>
  );
}
