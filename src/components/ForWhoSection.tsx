"use client";

const cards = [
  {
    emoji: "🎮",
    title: "Gamers",
    desc: "Accesorios, soportes y mods para tu setup",
    color: "#6C3CE1",
    bg: "from-primary/10 to-primary/5",
  },
  {
    emoji: "🎭",
    title: "Cosplayers",
    desc: "Props, armaduras y detalles para tu disfraz",
    color: "#EC4899",
    bg: "from-pink-500/10 to-pink-500/5",
  },
  {
    emoji: "🏗️",
    title: "Arquitectos",
    desc: "Maquetas y prototipos de precisión",
    color: "#F59E0B",
    bg: "from-amber-500/10 to-amber-500/5",
  },
  {
    emoji: "🏢",
    title: "Empresas",
    desc: "Piezas funcionales y prototipos en serie",
    color: "#06D6A0",
    bg: "from-accent/10 to-accent/5",
  },
];

export default function ForWhoSection() {
  return (
    <section className="bg-light-bg dark:bg-dark-bg section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-4 uppercase tracking-widest">
            Para todos
          </span>
          <h2 className="text-4xl font-black mb-4">
            ¿Para quién es <span className="gradient-text">Impresionarte</span>?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Tanto si eres un creador, profesional o empresa, tenemos la solución perfecta para ti.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="group relative card p-8 flex flex-col items-center text-center overflow-hidden transition-all duration-300 hover:-translate-y-2"
              style={{ "--glow-color": card.color } as React.CSSProperties}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
                style={{ boxShadow: `0 0 40px ${card.color}33, inset 0 0 40px ${card.color}0A` }}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}
              />
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{ backgroundColor: card.color + "1A" }}
                >
                  {card.emoji}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    <span className="group-hover:text-[var(--glow-color)] transition-colors duration-200">
                      {card.title}
                    </span>
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
                <div
                  className="mt-2 h-0.5 w-0 group-hover:w-12 transition-all duration-300 rounded-full"
                  style={{ backgroundColor: card.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
