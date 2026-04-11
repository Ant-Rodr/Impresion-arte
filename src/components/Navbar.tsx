"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";

const navLinks = [
  {
    label: "Catálogo",
    href: "/catalogo",
    submenu: [
      { label: "Setup Gamer y Gadgets", href: "/catalogo/gamer" },
      { label: "Juegos de Mesa y Rol", href: "/catalogo/mesa-rol" },
      { label: "Decoración Moderna", href: "/catalogo/decorativos" },
      { label: "Cosplay / Props", href: "/catalogo/cosplay" },
    ],
  },
  { label: "Personalizar", href: "/personalizado" },
  { label: "Materiales", href: "/materiales" },
  { label: "Blog", href: "/blog" },
  { label: "Seguimiento", href: "/seguimiento" },
  { label: "Empresas B2B", href: "/#empresas" },
  { label: "Contacto", href: "/contacto" },
  { label: "Mis Pedidos", href: "/mis-pedidos" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const closeTimer = useState<ReturnType<typeof setTimeout> | null>(null);
  const { theme, toggleTheme } = useTheme();
  const { count, openCart } = useCart();
  const { data: session } = useSession();

  function openCatalog() {
    if (closeTimer[0]) clearTimeout(closeTimer[0]);
    setCatalogOpen(true);
  }
  function closeCatalog() {
    closeTimer[1](setTimeout(() => setCatalogOpen(false), 120));
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight whitespace-nowrap">
              Impresion<span className="text-emerald-400">arte</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.submenu ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={openCatalog}
                  onMouseLeave={closeCatalog}
                >
                  <Link
                    href={link.href}
                    className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-1"
                  >
                    {link.label}
                    <svg
                      className={`w-4 h-4 transition-transform ${catalogOpen ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </Link>
                  {catalogOpen && (
                    <div
                      className="absolute top-full left-0 w-60 bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border shadow-xl py-2"
                      onMouseEnter={openCatalog}
                      onMouseLeave={closeCatalog}
                    >
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setCatalogOpen(false)}
                          className="block px-4 py-2.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                      <div className="border-t border-light-border dark:border-dark-border mt-2 pt-2">
                        <Link
                          href="/catalogo"
                          onClick={() => setCatalogOpen(false)}
                          className="block px-4 py-2 text-xs font-semibold text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          Ver catálogo completo →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Cart button */}
            <button
              onClick={openCart}
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Carrito de compra"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Cambiar tema"
            >
              {theme === "dark" ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 006.002-2.998z" />
                </svg>
              )}
            </button>

            {/* Mi cuenta */}
            <Link
              href={session ? "/cuenta" : "/cuenta-login"}
              className="hidden sm:flex items-center gap-1.5 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium"
              title={session ? "Mi cuenta" : "Iniciar sesión"}
            >
              {session ? (
                <span className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-[10px] font-black">
                  {(session.user?.name ?? session.user?.email ?? "U").slice(0, 2).toUpperCase()}
                </span>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              )}
            </Link>

            <Link
              href="/personalizado"
              className="hidden sm:inline-flex btn-primary text-sm !py-2"
            >
              Pedir Ahora
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Menú"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-light-card dark:bg-dark-card border-t border-light-border dark:border-dark-border">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) =>
              link.submenu ? (
                <div key={link.label}>
                  <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">{link.label}</p>
                  {link.submenu.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2.5 pl-6 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-3 border-t border-light-border dark:border-dark-border">
              <Link
                href="/personalizado"
                className="btn-primary w-full text-sm"
                onClick={() => setMobileOpen(false)}
              >
                Pedir Ahora
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
