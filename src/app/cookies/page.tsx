import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Cookies | Impresion-arte",
  description: "Información sobre el uso de cookies en Impresion-arte conforme al RGPD.",
};

export default function CookiesPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-10">
          <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
          <span>/</span>
          <span className="text-primary font-medium">Política de Cookies</span>
        </nav>

        <h1 className="text-3xl font-black mb-2">Política de Cookies</h1>
        <p className="text-sm text-gray-400 mb-10">Última actualización: abril 2025</p>

        <div className="space-y-8 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-bold mb-3">¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo.
              Sirven para mejorar la experiencia de usuario, recordar preferencias y analizar el tráfico.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Cookies que usamos</h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-light-border dark:border-dark-border rounded-xl overflow-hidden text-xs">
                <thead className="bg-gray-50 dark:bg-dark-bg">
                  <tr>
                    {["Nombre", "Tipo", "Duración", "Finalidad"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-semibold text-gray-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-border dark:divide-dark-border">
                  {[
                    { name: "theme", type: "Técnica", duration: "Persistente", purpose: "Recordar preferencia de tema (oscuro/claro)" },
                    { name: "cookie_consent", type: "Técnica", duration: "1 año", purpose: "Registrar tu decisión sobre cookies" },
                    { name: "next-auth.session", type: "Técnica", duration: "Sesión", purpose: "Autenticación de usuarios (admin)" },
                  ].map((c) => (
                    <tr key={c.name}>
                      <td className="px-4 py-3 font-mono">{c.name}</td>
                      <td className="px-4 py-3">{c.type}</td>
                      <td className="px-4 py-3">{c.duration}</td>
                      <td className="px-4 py-3">{c.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">Gestión de cookies</h2>
            <p>
              Puedes configurar tu navegador para rechazar cookies o alertarte cuando se instalen.
              Ten en cuenta que algunas funcionalidades del sitio pueden verse afectadas.
              También puedes retirar tu consentimiento en cualquier momento desde el banner de cookies.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
