const postProcessBadges = [
  { label: "Pieza en crudo", color: "bg-gray-500/15 text-gray-400" },
  { label: "Lijado", color: "bg-blue-500/15 text-blue-400" },
  { label: "Imprimación", color: "bg-yellow-500/15 text-yellow-400" },
  { label: "Pintado a mano", color: "bg-pink-500/15 text-pink-400" },
];

const steps = [
  {
    num: "01",
    title: "Elige o diseña",
    desc: "Selecciona del catálogo o sube tu propio diseño 3D en formato STL u OBJ.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
    extra: null,
  },
  {
    num: "02",
    title: "Configura",
    desc: "Elige material, color, tamaño y acabado. También puedes añadir servicios de post-procesado:",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
      </svg>
    ),
    extra: (
      <div className="flex flex-wrap gap-1.5 mt-3">
        {postProcessBadges.map((b) => (
          <span key={b.label} className={`text-xs font-medium px-2 py-0.5 rounded-full ${b.color}`}>
            {b.label}
          </span>
        ))}
      </div>
    ),
  },
  {
    num: "03",
    title: "Presupuesto",
    desc: "Obtén un precio instantáneo sin sorpresas. Confirmación tras revisar tu diseño.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    extra: null,
  },
  {
    num: "04",
    title: "Recíbelo",
    desc: "Imprimimos con precisión milimétrica y te lo enviamos en tiempo récord a cualquier punto de España.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H3m9 6h3.75M3 10.5h18M3 6h18M3 3h18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5" />
      </svg>
    ),
    extra: null,
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-light-card dark:bg-dark-card section-padding border-y border-light-border dark:border-dark-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-4 uppercase tracking-widest">
            Proceso
          </span>
          <h2 className="text-4xl font-black mb-4">¿Cómo <span className="gradient-text">funciona</span>?</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            En 4 sencillos pasos tienes tu pieza 3D en casa.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Línea conectora en desktop */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/20 via-primary/60 to-primary/20 z-0" />

          {steps.map((step, index) => (
            <div
              key={step.num}
              className="relative p-6 rounded-2xl border border-light-border dark:border-dark-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 bg-light-card dark:bg-dark-card z-10"
            >
              {/* Número + Icono */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  {step.icon}
                </div>
                <span className="text-3xl font-black select-none leading-none" style={{ color: "#6C3CE1" }}>
                  {step.num}
                </span>
              </div>

              <h3 className="text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>

              {/* Extra content (post-process badges) */}
              {step.extra}

              {/* Flecha (excepto en el último) */}
              {index < steps.length - 1 && (
                <div className="lg:hidden absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary/40 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
