import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Número 404 decorativo */}
        <p className="text-9xl font-black text-primary/15 dark:text-primary/20 select-none leading-none mb-4">
          404
        </p>
        <h1 className="text-3xl font-black mb-4">
          Página <span className="gradient-text">no encontrada</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          Parece que esta página no existe o ha sido movida. Pero no te preocupes,
          puedes seguir explorando nuestro catálogo.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/" className="btn-primary">
            Ir al inicio
          </Link>
          <Link href="/catalogo" className="btn-secondary">
            Ver catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}
