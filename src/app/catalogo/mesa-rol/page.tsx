import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getProductsByCategory } from "@/data/products";
import AddToCartButton from "@/components/AddToCartButton";

export const metadata: Metadata = {
  title: "Juegos de Mesa y Rol | Impresion-arte",
  description: "Torres de dados, insertos organizadores, miniaturas en resina y tokens para tus partidas de rol y juegos de mesa.",
};

export default async function MesaRolPage() {
  const products = await getProductsByCategory("mesa-rol");

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-10">
          <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/catalogo" className="hover:text-primary transition-colors">Catálogo</Link>
          <span>/</span>
          <span className="text-primary font-medium">Juegos de Mesa y Rol</span>
        </nav>

        <div className="mb-14">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-accent/10 text-accent rounded-full mb-4 uppercase tracking-widest">
            Mesa & Rol
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">
            Juegos de Mesa <span className="gradient-text">y Rol</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl">
            Torres de dados, insertos organizadores, miniaturas en resina ultra-detalladas y tokens para partidas épicas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {products.map((p) => (
            <div key={p.id} className="card p-6 group hover:border-accent/40 transition-all duration-300">
              <div className="w-full h-36 rounded-xl mb-5 overflow-hidden bg-accent/5 group-hover:bg-accent/10 transition-colors flex items-center justify-center relative">
                {p.imageUrl ? (
                  <Image src={p.imageUrl} alt={p.name} fill className="object-cover" />
                ) : (
                  <svg className="w-12 h-12 text-accent/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313" />
                  </svg>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {p.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-lg font-bold mb-1">{p.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{p.description}</p>

              <div className="flex items-center justify-between mt-auto">
                <div>
                  <p className="text-xs text-gray-400">{p.material}</p>
                  <p className="text-xl font-black text-accent">{p.price.toFixed(2).replace(".", ",")}€</p>
                </div>
                <AddToCartButton product={p} />
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-accent/30 bg-accent/5 p-8 text-center">
          <h3 className="text-xl font-black mb-3">¿Buscas miniaturas personalizadas?</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-5">
            Imprimimos tus propios diseños de personajes, monstruos o escenografía.
          </p>
          <Link href="/personalizado" className="btn-accent">Pedir personalizado</Link>
        </div>
      </div>
    </div>
  );
}
