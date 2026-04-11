import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-light-card dark:bg-dark-card border-t border-light-border dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight whitespace-nowrap">
                Impresion<span className="text-emerald-400">arte</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5">
              Impresión 3D profesional a tu medida. Damos vida a tus ideas con precisión y calidad.
            </p>
            {/* Redes sociales */}
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-light-border dark:border-dark-border flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary/50 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-light-border dark:border-dark-border flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary/50 transition-colors"
                aria-label="Twitter / X"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-light-border dark:border-dark-border flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary/50 transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.84 1.56V6.79a4.85 4.85 0 01-1.07-.1z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Catálogo */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-5">Catálogo</h3>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              {[
                { label: "Setup Gamer y Gadgets", href: "/catalogo/gamer" },
                { label: "Juegos de Mesa y Rol", href: "/catalogo/mesa-rol" },
                { label: "Decoración Moderna", href: "/catalogo/decorativos" },
                { label: "Cosplay / Props", href: "/catalogo/cosplay" },
                { label: "Piezas a Medida", href: "/personalizado" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-primary transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary/40"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-5">Empresa</h3>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              {[
                { label: "Presupuesto Online", href: "/#presupuesto" },
                { label: "Cómo funciona", href: "/#como-funciona" },
                { label: "Servicios B2B", href: "/#empresas" },
                { label: "Materiales", href: "/materiales" },
                { label: "Contacto", href: "/contacto" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-primary transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary/40"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-5">Contacto</h3>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <a href="mailto:info@impresion-arte.es" className="hover:text-primary transition-colors">
                  info@impresion-arte.es
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>España</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Respuesta en 24h</span>
              </li>
              <li className="mt-2">
                <Link
                  href="/contacto?tipo=b2b"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent/80 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                  Contacto B2B empresas
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-light-border dark:border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Impresion-arte. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/privacidad" className="hover:text-primary transition-colors">Privacidad</Link>
            <Link href="/cookies" className="hover:text-primary transition-colors">Cookies</Link>
            <Link href="/terminos" className="hover:text-primary transition-colors">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
