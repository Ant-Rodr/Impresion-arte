"use client";

const guarantees = [
  {
    emoji: "🔄",
    title: "Devolución fácil",
    desc: "30 días para devolver sin preguntas",
    detail: "Si no estás satisfecho por cualquier motivo, te devolvemos el importe íntegro sin complicaciones.",
    color: "#06D6A0",
    bgClass: "from-accent/10 to-accent/5",
  },
  {
    emoji: "✅",
    title: "Calidad garantizada",
    desc: "Control de calidad en cada pieza",
    detail: "Cada impresión pasa por una revisión exhaustiva antes de enviarse. Si no supera nuestros estándares, la reimprimimos.",
    color: "#6C3CE1",
    bgClass: "from-primary/10 to-primary/5",
  },
  {
    emoji: "🔒",
    title: "Pago seguro",
    desc: "Transacciones cifradas y seguras",
    detail: "Utilizamos cifrado SSL y procesadores de pago certificados PCI-DSS. Tus datos nunca están en riesgo.",
    color: "#F59E0B",
    bgClass: "from-amber-500/10 to-amber-500/5",
  },
];

export default function GuaranteeSection() {
  return (
    <section className="bg-light-bg dark:bg-dark-bg section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-4 uppercase tracking-widest">
            Garantías
          </span>
          <h2 className="text-4xl font-black mb-4">
            Tu compra está <span className="gradient-text">protegida</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Compramos con total tranquilidad. Tu satisfacción es nuestra prioridad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guarantees.map((g) => (
            <div
              key={g.title}
              className="group card p-8 flex flex-col gap-5 overflow-hidden relative transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${g.bgClass} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}
              />
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: `inset 0 0 0 1.5px ${g.color}40` }}
              />
              <div className="relative z-10">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-3deg]"
                  style={{ backgroundColor: g.color + "1A" }}
                >
                  {g.emoji}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{g.title}</h3>
                <p className="text-sm font-semibold mb-3" style={{ color: g.color }}>{g.desc}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{g.detail}</p>
                <div
                  className="mt-5 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                  style={{ backgroundColor: g.color + "60" }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          {[
            { icon: "🏆", text: "+500 clientes satisfechos" },
            { icon: "⭐", text: "4.9/5 valoración media" },
            { icon: "📦", text: "+2.000 pedidos enviados" },
            { icon: "🇪🇸", text: "Fabricado en España" },
          ].map((badge) => (
            <div
              key={badge.text}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-card border border-light-border dark:border-dark-border text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <span>{badge.icon}</span>
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
