import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getProductsByCategory } from "@/data/products";
import AddToCartButton from "@/components/AddToCartButton";

export const metadata: Metadata = {
  title: "Decoración Moderna | Impresion-arte",
  description: "Macetas geométricas en PLA Silk, litofanías personalizadas y arte paramétrico para el hogar.",
};

export default async function DecorativosPage() {
  const products = await getProductsByCategory("decorativos");

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-10">
          <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/catalogo" className="hover:text-primary transition-colors">Catálogo</Link>
          <span>/</span>
          <span className="text-primary font-medium">Decoración Moderna</span>
        </nav>

        <div className="mb-14">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold rounded-full mb-4 uppercase tracking-widest" style={{ backgroundColor: "#F59E0B1A", color: "#F59E0B" }}>
            Decoración
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">
            Decoración <span className="gradient-text">Moderna</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl">
            Macetas geométricas en PLA Silk, litofanías personalizadas y arte paramétrico para el hogar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {products.map((p) => (
            <div key={p.id} className="card p-6 group transition-all duration-300" style={{ "--hover-color": "#F59E0B" } as React.CSSProperties}>
              <div className="w-full h-36 rounded-xl mb-5 overflow-hidden bg-amber-50 dark:bg-amber-900/10 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/20 transition-colors flex items-center justify-center relative">
                {p.imageUrl ? (
                  <Image src={p.imageUrl} alt={p.name} fill className="object-cover" />
                ) : (
                  <svg className="w-12 h-12 text-amber-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {p.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: "#F59E0B1A", color: "#B45309" }}>
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-lg font-bold mb-1">{p.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{p.description}</p>

              <div className="flex items-center justify-between mt-auto">
                <div>
                  <p className="text-xs text-gray-400">{p.material}</p>
                  <p className="text-xl font-black" style={{ color: "#F59E0B" }}>{p.price.toFixed(2).replace(".", ",")}€</p>
                </div>
                <AddToCartButton product={p} />
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-8 text-center" style={{ border: "1px solid #F59E0B4D", backgroundColor: "#F59E0B0D" }}>
          <h3 className="text-xl font-black mb-3">¿Quieres una litofanía de tu foto?</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-5">Envianos tu imagen y te hacemos una litofanía personalizada.</p>
          <Link href="/personalizado" className="btn-primary">Solicitar personalizado</Link>
        </div>
      </div>
    </div>
  );
}
