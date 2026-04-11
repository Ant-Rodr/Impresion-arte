import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Impresion-arte",
  description: "Condiciones generales de venta y uso del servicio de impresión 3D de Impresion-arte.",
};

export default function TerminosPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-10">
          <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
          <span>/</span>
          <span className="text-primary font-medium">Términos y Condiciones</span>
        </nav>

        <h1 className="text-3xl font-black mb-2">Términos y Condiciones</h1>
        <p className="text-sm text-gray-400 mb-10">Última actualización: abril 2025</p>

        <div className="space-y-8 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-bold mb-3">1. Objeto del servicio</h2>
            <p>
              Impresion-arte presta servicios de impresión 3D a medida y venta de productos de
              catálogo impresos en 3D. Al realizar un pedido, el cliente acepta las presentes
              condiciones en su totalidad.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. Proceso de pedido y presupuesto</h2>
            <p>
              Los pedidos personalizados requieren el envío de un archivo 3D o descripción detallada.
              Impresion-arte elaborará un presupuesto en un plazo máximo de 24 horas laborables.
              El presupuesto tendrá una vigencia de 15 días.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. Precios e IVA</h2>
            <p>
              Todos los precios mostrados en el catálogo incluyen IVA (21%) salvo indicación contraria.
              Los presupuestos personalizados detallarán el desglose del IVA correspondiente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Plazos de producción y envío</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Productos de catálogo:</strong> 3–7 días laborables.</li>
              <li><strong>Pedidos personalizados:</strong> 5–15 días laborables según complejidad.</li>
              <li>El envío se realiza mediante mensajería con seguimiento.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. Devoluciones</h2>
            <p>
              Los productos del catálogo pueden devolverse en un plazo de 14 días desde la recepción,
              siempre que estén en perfecto estado. Los pedidos personalizados <strong>no son
              reembolsables</strong> salvo defecto de fabricación imputable a Impresion-arte.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Propiedad intelectual de los archivos</h2>
            <p>
              El cliente declara ser titular o tener los derechos necesarios sobre los archivos 3D
              que sube. Impresion-arte no imprimirá modelos que infrinjan derechos de terceros o
              sean ilegales. Los archivos son tratados con total confidencialidad y eliminados tras
              la finalización del pedido.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Responsabilidad</h2>
            <p>
              Impresion-arte no se responsabiliza del uso que el cliente haga de las piezas
              impresas. La responsabilidad máxima se limita al importe del pedido correspondiente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. Ley aplicable</h2>
            <p>
              Las presentes condiciones se rigen por la legislación española. Para la resolución de
              conflictos, las partes se someten a los juzgados y tribunales competentes de España.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
