import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const NAV_LINKS = [
  { href: "/admin", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { href: "/admin/pedidos", label: "Pedidos", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
  { href: "/admin/productos", label: "Productos", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
  { href: "/admin/contactos", label: "Contactos", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const role = (session?.user as { role?: string })?.role;

  if (!session || role !== "admin") {
    redirect("/admin-login");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex flex-col">
      {/* Top bar */}
      <header className="bg-white dark:bg-dark-card border-b border-light-border dark:border-dark-border px-4 py-3 flex items-center justify-between gap-4 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
          </div>
          <span className="font-black text-sm">
            <span className="text-primary">Admin</span> · Impresion-arte
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 hidden sm:block">{session.user?.email}</span>
          <a
            href="/api/auth/signout"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-light-border dark:border-dark-border hover:border-red-300 hover:text-red-500 transition-colors"
          >
            Salir
          </a>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-52 shrink-0 bg-white dark:bg-dark-card border-r border-light-border dark:border-dark-border hidden sm:flex flex-col py-6 px-3 gap-1 sticky top-[57px] h-[calc(100vh-57px)]">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-primary/5 hover:text-primary transition-colors group"
            >
              <svg className="w-4 h-4 shrink-0 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
              </svg>
              {link.label}
            </a>
          ))}
        </aside>

        {/* Mobile bottom nav */}
        <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-dark-card border-t border-light-border dark:border-dark-border flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium text-gray-500 hover:text-primary transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
              </svg>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Main content */}
        <main className="flex-1 px-4 sm:px-8 py-8 pb-24 sm:pb-8 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
