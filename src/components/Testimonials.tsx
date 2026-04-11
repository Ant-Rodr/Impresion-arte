import Image from "next/image";

const testimonials = [
  {
    name: "Carlos M.",
    fullName: "Carlos M",
    role: "Coleccionista",
    text: "Pedí el escudo de mi equipo en resina y quedó espectacular. Calidad increíble y llegó antes de lo esperado.",
    date: "Hace 2 semanas",
  },
  {
    name: "Laura P.",
    fullName: "Laura P",
    role: "Diseñadora de interiores",
    text: "Encargué varias figuras decorativas personalizadas. El acabado es perfecto y el servicio muy profesional.",
    date: "Hace 1 mes",
  },
  {
    name: "Iván G.",
    fullName: "Ivan G",
    role: "Ingeniero",
    text: "Necesitaba una pieza funcional de PETG y la adaptaron exactamente a mis medidas. Cliente recurrente desde el primer pedido.",
    date: "Hace 3 semanas",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-light-bg dark:bg-dark-bg section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-4 uppercase tracking-widest">
            Testimonios
          </span>
          <h2 className="text-4xl font-black mb-4">Lo que dicen <span className="gradient-text">nuestros clientes</span></h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Más de 500 clientes satisfechos en toda España. Calidad que habla por sí sola.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="card p-7 flex flex-col relative">
              {/* Comillas decorativas */}
              <svg
                className="absolute top-5 right-6 w-10 h-10 text-primary/8 dark:text-primary/15"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              {/* Avatar + nombre + rol */}
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(t.fullName)}&backgroundColor=7c3aed`}
                  alt={t.name}
                  width={44}
                  height={44}
                  className="rounded-full flex-shrink-0"
                />
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role} · {t.date}</p>
                </div>
              </div>

              {/* Badge verificado */}
              <div className="mb-3">
                <span className="text-xs text-emerald-400 border border-emerald-400/30 rounded-full px-2 py-0.5">
                  ✓ Compra verificada
                </span>
              </div>

              {/* Estrellas */}
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>

              {/* Texto */}
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-12 grid grid-cols-3 gap-4 p-6 rounded-2xl bg-primary/5 dark:bg-primary/10 border border-primary/10">
          {[
            { value: "500+", label: "Pedidos completados" },
            { value: "98%", label: "Clientes satisfechos" },
            { value: "4.9/5", label: "Valoración media" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-black text-primary">{value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
