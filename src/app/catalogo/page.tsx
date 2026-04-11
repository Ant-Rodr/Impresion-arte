import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo | Impresion-arte",
  description: "Explora nuestro catálogo de impresión 3D: accesorios gamer, juegos de mesa y rol, decoración moderna y cosplay/props.",
};

const categories = [
  {
    title: "Setup Gamer y Gadgets",
    desc: "Soportes para mandos y auriculares, organizadores de escritorio y accesorios que elevan tu setup.",
    href: "/catalogo/gamer",
    tag: "Gaming",
    count: "60+ accesorios",
    color: "#6C3CE1",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h.01M10 12h.01M7 9h.01M9 15h.01M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9A2.25 2.25 0 015.25 16.5v-9zM3.75 15.75a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H3.75zM3.75 7.5a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Juegos de Mesa y Rol",
    desc: "Torres de dados, insertos organizadores, miniaturas en resina ultra-detalladas y tokens para partidas épicas.",
    href: "/catalogo/mesa-rol",
    tag: "Mesa & Rol",
    count: "80+ piezas",
    color: "#06D6A0",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-9 5.25-9-5.25v-2.25l9-5.25 9 5.25z" />
      </svg>
    ),
  },
  {
    title: "Decoración Moderna",
    desc: "Macetas geométricas en PLA Silk y Wood, litofanías personalizadas y arte paramétrico para el hogar.",
    href: "/catalogo/decorativos",
    tag: "Decoración",
    count: "120+ modelos",
    color: "#F59E0B",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    title: "Cosplay / Props",
    desc: "Réplicas a escala, cascos en gran formato, armas prop y accesorios con acabados de pintura a mano.",
    href: "/catalogo/cosplay",
    tag: "Cosplay",
    count: "40+ réplicas",
    color: "#EC4899",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

export default function CatalogoPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Inicio
          </Link>
          <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-4 uppercase tracking-widest">
            Catálogo
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">
            Explora nuestras <span className="gradient-text">categorías</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-lg">
            Nichos de alta demanda con calidad premium. O pide algo completamente a medida.
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="card p-8 group cursor-pointer block relative overflow-hidden"
            >
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-300 translate-x-12 -translate-y-12"
                style={{ backgroundColor: cat.color }}
              />
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: cat.color + "1A", color: cat.color }}
              >
                {cat.icon}
              </div>
              <span
                className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4"
                style={{ backgroundColor: cat.color + "1A", color: cat.color }}
              >
                {cat.tag}
              </span>
              <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{cat.title}</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">{cat.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{cat.count}</span>
                <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                  Ver todo
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA piezas a medida */}
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
          <h3 className="text-2xl font-black mb-3">¿No encuentras lo que buscas?</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Pide cualquier pieza 100% a medida. Sube tu archivo STL o descríbenos la idea.
          </p>
          <Link href="/personalizado" className="btn-primary">
            Solicitar pieza personalizada
          </Link>
        </div>
      </div>
    </div>
  );
}
