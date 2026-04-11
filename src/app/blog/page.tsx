import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Impresionarte – Tutoriales de Impresión 3D",
  description: "Guías, tutoriales y consejos sobre impresión 3D: materiales, acabados, cosplay y más.",
};

const articles = [
  {
    slug: "como-preparar-stl",
    title: "Cómo preparar tu modelo STL para imprimir",
    date: "12 marzo 2026",
    category: "Tutorial",
    categoryColor: "#6C3CE1",
    desc: "Aprende a exportar, reparar y orientar tu modelo STL para obtener los mejores resultados en la impresora. Cubrimos Meshmixer, PrusaSlicer y Chitubox.",
  },
  {
    slug: "diferencias-pla-petg-resina",
    title: "Diferencias entre PLA, PETG y Resina",
    date: "5 marzo 2026",
    category: "Materiales",
    categoryColor: "#06D6A0",
    desc: "¿No sabes qué material elegir? Te explicamos las ventajas e inconvenientes de cada uno, con casos de uso reales para gaming, cosplay y decoración.",
  },
  {
    slug: "guia-acabados",
    title: "Guía de acabados: lija, pintura y sellado",
    date: "20 febrero 2026",
    category: "Acabados",
    categoryColor: "#F59E0B",
    desc: "Del gris monocromático a una pieza de museo. Paso a paso: lijado con agua, imprimación, pintura acrílica, lavados y barnizado final para un resultado profesional.",
  },
  {
    slug: "impresion-3d-cosplay",
    title: "Impresión 3D para cosplay: materiales y consejos",
    date: "10 febrero 2026",
    category: "Cosplay",
    categoryColor: "#EC4899",
    desc: "Desde un yelmo completo hasta pequeños detalles de armadura. Te enseñamos qué materiales usar, cómo unir piezas grandes y los mejores trucos de pintado para cosplay.",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg pt-24">
      <div className="max-w-6xl mx-auto section-padding">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-4 uppercase tracking-widest">
            Blog & Tutoriales
          </span>
          <h1 className="text-5xl sm:text-6xl mb-6 text-gray-900 dark:text-white" style={{ fontFamily: "var(--font-display)" }}>
            Aprende <span className="gradient-text">impresión 3D</span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Guías prácticas, comparativas de materiales y trucos para sacarle el máximo partido a la impresión 3D.
          </p>
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="card p-8 flex flex-col gap-4 group"
            >
              {/* Category + Date */}
              <div className="flex items-center justify-between gap-3">
                <span
                  className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
                  style={{
                    backgroundColor: article.categoryColor + "1A",
                    color: article.categoryColor,
                  }}
                >
                  {article.category}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">{article.date}</span>
              </div>

              {/* Title */}
              <h2
                className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors leading-snug"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {article.title}
              </h2>

              {/* Description */}
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed flex-1">
                {article.desc}
              </p>

              {/* CTA */}
              <Link
                href={`/blog/${article.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-200"
              >
                Leer más
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            ¿Tienes alguna duda sobre impresión 3D? ¡Pregúntanos!
          </p>
          <Link href="/contacto" className="btn-primary">
            Contactar con expertos
          </Link>
        </div>
      </div>
    </div>
  );
}
