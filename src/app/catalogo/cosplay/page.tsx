import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getProductsByCategory } from "@/data/products";
import AddToCartButton from "@/components/AddToCartButton";

export const metadata: Metadata = {
  title: "Cosplay y Props | Impresion-arte",
  description: "Réplicas a escala, cascos, armas prop y accesorios para cosplay con acabados de pintura a mano.",
};

export default async function CosplayPage() {
  const products = await getProductsByCategory("cosplay");

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-10">
          <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/catalogo" className="hover:text-primary transition-colors">Catálogo</Link>
          <span>/</span>
          <span className="text-primary font-medium">Cosplay y Props</span>
        </nav>

        <div className="mb-14">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold rounded-full mb-4 uppercase tracking-widest" style={{ backgroundColor: "#EC48991A", color: "#EC4899" }}>
            Cosplay
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">
            Cosplay <span className="gradient-text">y Props</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl">
            Réplicas a escala, cascos en gran formato, armas prop y accesorios con acabados de pintura a mano.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {products.map((p) => (
            <div key={p.id} className="card p-6 group transition-all duration-300">
              <div className="w-full h-36 rounded-xl mb-5 overflow-hidden bg-pink-50 dark:bg-pink-900/10 group-hover:bg-pink-100 dark:group-hover:bg-pink-900/20 transition-colors flex items-center justify-center relative">
                {p.imageUrl ? (
                  <Image src={p.imageUrl} alt={p.name} fill className="object-cover" />
                ) : (
                  <svg className="w-12 h-12 text-pink-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {p.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: "#EC48991A", color: "#BE185D" }}>
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-lg font-bold mb-1">{p.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{p.description}</p>

              <div className="flex items-center justify-between mt-auto">
                <div>
                  <p className="text-xs text-gray-400">{p.material}</p>
                  <p className="text-xl font-black" style={{ color: "#EC4899" }}>{p.price.toFixed(2).replace(".", ",")}€</p>
                </div>
                <AddToCartButton product={p} />
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-8 text-center" style={{ border: "1px solid #EC48994D", backgroundColor: "#EC48990D" }}>
          <h3 className="text-xl font-black mb-3">¿Tienes un diseño propio?</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-5">
            Imprimimos cualquier réplica o prop a partir de tu archivo 3D o referencia.
          </p>
          <Link href="/personalizado" className="btn-primary">Subir mi diseño</Link>
        </div>
      </div>
    </div>
  );
}
