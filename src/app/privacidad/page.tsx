import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad | Impresion-arte",
  description: "Política de privacidad y protección de datos de Impresion-arte conforme al RGPD.",
};

export default function PrivacidadPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-10">
          <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
          <span>/</span>
          <span className="text-primary font-medium">Política de Privacidad</span>
        </nav>

        <h1 className="text-3xl font-black mb-2">Política de Privacidad</h1>
        <p className="text-sm text-gray-400 mb-10">Última actualización: abril 2025</p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="text-xl font-bold mb-3">1. Responsable del tratamiento</h2>
            <p>
              <strong>Impresion-arte</strong> (en adelante, &quot;nosotros&quot;) es responsable del tratamiento de tus
              datos personales. Para cualquier consulta relacionada con privacidad, puedes contactarnos en{" "}
              <a href="mailto:info@impresion-arte.es" className="text-primary hover:underline">
                info@impresion-arte.es
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. Datos que recogemos</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Nombre y dirección de email (formularios de contacto y pedido)</li>
              <li>Archivos 3D que subes voluntariamente para solicitar presupuesto</li>
              <li>Datos de navegación (cookies técnicas y analíticas, con tu consentimiento)</li>
              <li>Datos de pago procesados por Stripe (nosotros no almacenamos datos de tarjeta)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. Finalidad y base legal</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Gestión de pedidos:</strong> necesario para la ejecución del contrato.</li>
              <li><strong>Respuesta a consultas:</strong> interés legítimo en atender al cliente.</li>
              <li><strong>Cookies analíticas:</strong> consentimiento del usuario.</li>
              <li><strong>Cumplimiento legal:</strong> obligaciones contables y fiscales.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Conservación de datos</h2>
            <p>
              Los datos de pedidos se conservan durante el tiempo necesario para la relación comercial y
              las obligaciones legales (mínimo 5 años por legislación fiscal). Los mensajes de contacto
              se conservan durante 2 años.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. Tus derechos</h2>
            <p>Puedes ejercer los siguientes derechos enviando un email a info@impresion-arte.es:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Acceso:</strong> conocer qué datos tenemos sobre ti.</li>
              <li><strong>Rectificación:</strong> corregir datos inexactos.</li>
              <li><strong>Supresión:</strong> solicitar la eliminación de tus datos.</li>
              <li><strong>Portabilidad:</strong> recibir tus datos en formato estructurado.</li>
              <li><strong>Oposición y limitación:</strong> oponerte a ciertos tratamientos.</li>
            </ul>
            <p className="mt-3">
              También puedes presentar una reclamación ante la{" "}
              <strong>Agencia Española de Protección de Datos (AEPD)</strong> en aepd.es.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Transferencias internacionales</h2>
            <p>
              Utilizamos Stripe (EE.UU.) para el procesamiento de pagos, que está acogido a las
              Cláusulas Contractuales Tipo aprobadas por la Comisión Europea. No se realizan otras
              transferencias internacionales de datos.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
