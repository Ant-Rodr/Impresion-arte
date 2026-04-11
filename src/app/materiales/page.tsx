import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Materiales | Impresion-arte",
  description: "Comparativa detallada de materiales para impresión 3D: PLA, PLA Silk, PETG y Resina. Elige el ideal para tu proyecto.",
};

const materials = [
  {
    name: "PLA Estándar",
    color: "#6C3CE1",
    badge: "Más popular",
    price: "0,08€/cm³",
    desc: "El filamento más versátil y económico. Ideal para la mayoría de proyectos decorativos y funcionales no críticos. Fácil de imprimir y con gran variedad de colores.",
    pros: ["Precio bajo", "Gran variedad de colores", "Biodegradable", "Fácil de imprimir", "Buena resistencia estética"],
    cons: ["Sensible al calor extremo", "Menor resistencia mecánica que PETG"],
    uses: ["Figuras decorativas", "Prototipos", "Arte y diseño", "Uso interior"],
  },
  {
    name: "PLA Silk",
    color: "#06D6A0",
    badge: "Premium",
    price: "0,12€/cm³",
    desc: "Variante premium del PLA con un acabado brillante y satinado único. El material favorito para coleccionables y figuras de exposición.",
    pros: ["Acabado brillante excepcional", "Gran detalle", "Efecto metálico/satinado", "Colores llamativos"],
    cons: ["Más frágil que PLA estándar", "Precio ligeramente superior"],
    uses: ["Figuras coleccionables", "Joyería decorativa", "Trofeos", "Exhibición"],
  },
  {
    name: "PETG",
    color: "#F59E0B",
    badge: "Resistente",
    price: "0,10€/cm³",
    desc: "La opción técnica por excelencia. Combina la facilidad del PLA con la resistencia del ABS. Aguanta temperaturas más elevadas y es más flexible.",
    pros: ["Alta resistencia mecánica", "Tolerante al calor", "Resistente a impactos", "Semitransparente disponible"],
    cons: ["Más difícil de lijar", "Menos colores disponibles"],
    uses: ["Piezas funcionales", "Uso exterior", "Componentes mecánicos", "Envases"],
  },
  {
    name: "Resina",
    color: "#EF4444",
    badge: "Ultra detalle",
    price: "0,18€/cm³",
    desc: "Tecnología de fotopolimerización para el máximo detalle posible. Superficies lisas y acabados profesionales que ningún filamento puede igualar.",
    pros: ["Detalle extremo", "Superficies perfectamente lisas", "Ideal para miniaturas", "Geometrías complejas"],
    cons: ["Requiere post-proceso", "Mayor precio", "Más frágil ante impactos"],
    uses: ["Miniaturas", "Joyería", "Figuras detalladas", "Prototipos industriales"],
  },
];

export default function MaterialesPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-10">
          <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
          <span>/</span>
          <span className="text-primary font-medium">Materiales</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-4 uppercase tracking-widest">
            Guía de materiales
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">
            Elige el <span className="gradient-text">material ideal</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Cada proyecto necesita un material diferente. Te ayudamos a elegir el mejor para tu caso.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {materials.map((mat) => (
            <div key={mat.name} className="card p-8 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: mat.color }}
              />
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span
                    className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2"
                    style={{ backgroundColor: mat.color + "1A", color: mat.color }}
                  >
                    {mat.badge}
                  </span>
                  <h2 className="text-2xl font-black">{mat.name}</h2>
                </div>
                <span className="text-lg font-bold" style={{ color: mat.color }}>{mat.price}</span>
              </div>

              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">{mat.desc}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider mb-2">Ventajas</p>
                  <ul className="space-y-1.5">
                    {mat.pros.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-red-500 dark:text-red-400 uppercase tracking-wider mb-2">Limitaciones</p>
                  <ul className="space-y-1.5">
                    {mat.cons.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-2 text-gray-400">Usos ideales</p>
                <div className="flex flex-wrap gap-2">
                  {mat.uses.map((u) => (
                    <span key={u} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                      {u}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center p-10 rounded-2xl bg-primary/5 dark:bg-primary/10 border border-primary/10">
          <h2 className="text-2xl font-black mb-3">¿Aún tienes dudas sobre qué material elegir?</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Escríbenos y te ayudamos a elegir el material perfecto para tu proyecto.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contacto" className="btn-primary">Consultar gratis</Link>
            <Link href="/#presupuesto" className="btn-secondary">Calcular presupuesto</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
