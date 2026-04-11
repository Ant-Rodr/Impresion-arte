import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getProductsByCategory } from "@/data/products";
import AddToCartButton from "@/components/AddToCartButton";

export const metadata: Metadata = {
  title: "Setup Gamer y Gadgets | Impresion-arte",
  description: "Soportes para mandos, auriculares, organizadores de escritorio y accesorios gamer impresos en 3D.",
};

export default async function GamerPage() {
  const products = await getProductsByCategory("gamer");

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-10">
          <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/catalogo" className="hover:text-primary transition-colors">Catálogo</Link>
          <span>/</span>
          <span className="text-primary font-medium">Setup Gamer y Gadgets</span>
        </nav>

        <div className="mb-14">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-4 uppercase tracking-widest">
            Gaming
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">
            Setup Gamer <span className="gradient-text">y Gadgets</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl">
            Accesorios impresos en 3D para llevar tu espacio de juego y trabajo al siguiente nivel.
            Diseños funcionales, limpios y personalizables.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {products.map((p) => (
            <div key={p.id} className="card p-6 group hover:border-primary/40 transition-all duration-300">
              <div className="w-full h-36 rounded-xl mb-5 overflow-hidden bg-primary/5 group-hover:bg-primary/10 transition-colors flex items-center justify-center relative">
                {p.imageUrl ? (
                  <Image src={p.imageUrl} alt={p.name} fill className="object-cover" />
                ) : (
                  <svg className="w-12 h-12 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                  </svg>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {p.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-lg font-bold mb-1">{p.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{p.description}</p>

              <div className="flex items-center justify-between mt-auto">
                <div>
                  <p className="text-xs text-gray-400">{p.material}</p>
                  <p className="text-xl font-black text-primary">
                    {p.price.toFixed(2).replace(".", ",")}€
                  </p>
                </div>
                <AddToCartButton product={p} />
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
          <h3 className="text-xl font-black mb-3">¿Necesitas algo diferente?</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-5">
            Personalizamos cualquier accesorio gamer con tus medidas exactas y colores.
          </p>
          <Link href="/personalizado" className="btn-primary">
            Pedir personalizado
          </Link>
        </div>
      </div>
    </div>
  );
}
