"use client";

// Major Spanish cities with approximate SVG coordinates on a simplified Spain outline
const cities = [
  { name: "Madrid", cx: 310, cy: 295, delay: 0 },
  { name: "Barcelona", cx: 495, cy: 210, delay: 0.3 },
  { name: "Valencia", cx: 420, cy: 330, delay: 0.6 },
  { name: "Sevilla", cx: 215, cy: 420, delay: 0.9 },
  { name: "Bilbao", cx: 310, cy: 145, delay: 1.2 },
  { name: "Zaragoza", cx: 390, cy: 225, delay: 1.5 },
  { name: "Málaga", cx: 270, cy: 460, delay: 1.8 },
];

const shippingInfo = [
  { icon: "📦", label: "Sin pedido mínimo", desc: "Desde 1 pieza" },
  { icon: "⚡", label: "Envío express disponible", desc: "Entrega 24h" },
  { icon: "🛡️", label: "Embalaje seguro", desc: "Protegido para el transporte" },
  { icon: "🔄", label: "Devoluciones fáciles", desc: "30 días sin preguntas" },
];

export default function ShippingMap() {
  return (
    <section className="bg-light-bg dark:bg-dark-bg section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-4 uppercase tracking-widest">
            Cobertura
          </span>
          <h2 className="text-4xl font-black mb-4">
            Envío <span className="gradient-text">24-48h</span> a toda España
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Enviamos a todas las provincias españolas. Recibe tu pedido cómodamente en casa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* SVG Map */}
          <div className="relative mx-auto w-full max-w-md">
            <svg
              viewBox="0 0 600 550"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full drop-shadow-xl"
            >
              {/* Simplified Spain outline */}
              <path
                d="M 80 200
                   L 95 155 L 130 130 L 165 115 L 210 108
                   L 255 95 L 290 88 L 330 90
                   L 380 92 L 420 98 L 460 105
                   L 500 118 L 530 135 L 545 155
                   L 550 180 L 545 210 L 540 240
                   L 530 270 L 520 295 L 505 315
                   L 490 335 L 480 360 L 475 385
                   L 470 410 L 460 435 L 445 455
                   L 420 468 L 390 472 L 360 470
                   L 330 465 L 300 462 L 270 468
                   L 240 475 L 210 470 L 185 455
                   L 165 440 L 150 420 L 140 400
                   L 130 378 L 120 355 L 108 330
                   L 95 305 L 82 280 L 78 255
                   L 75 230 L 80 200 Z"
                fill="currentColor"
                className="text-primary/10 dark:text-primary/15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
                style={{ stroke: "#6C3CE1", opacity: 0.4 }}
              />

              {/* Portugal region (lighter) */}
              <path
                d="M 80 200 L 78 255 L 75 230 L 80 200 Z
                   M 95 305 L 82 280 L 78 255 L 80 200
                   L 95 155 L 130 130 L 140 155
                   L 128 180 L 118 210 L 108 240
                   L 100 270 L 95 305 Z"
                fill="currentColor"
                className="text-gray-400/20 dark:text-gray-600/20"
              />

              {/* City dots with pulse animation */}
              {cities.map((city) => (
                <g key={city.name}>
                  {/* Pulse ring */}
                  <circle
                    cx={city.cx}
                    cy={city.cy}
                    r="14"
                    fill="none"
                    stroke="#6C3CE1"
                    strokeWidth="1.5"
                    opacity="0.5"
                  >
                    <animate
                      attributeName="r"
                      values="8;18;8"
                      dur="2.5s"
                      begin={`${city.delay}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.6;0;0.6"
                      dur="2.5s"
                      begin={`${city.delay}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  {/* Dot */}
                  <circle cx={city.cx} cy={city.cy} r="5" fill="#6C3CE1" />
                  <circle cx={city.cx} cy={city.cy} r="2.5" fill="#06D6A0" />
                  {/* Label */}
                  <text
                    x={city.cx + 10}
                    y={city.cy + 4}
                    fontSize="11"
                    fill="currentColor"
                    className="text-gray-700 dark:text-gray-300"
                    style={{ fill: "#9ca3af", fontFamily: "system-ui", fontWeight: 600 }}
                  >
                    {city.name}
                  </text>
                </g>
              ))}

              {/* Canary Islands inset */}
              <g transform="translate(100, 460)">
                <rect x="0" y="0" width="80" height="50" rx="6"
                  fill="none" stroke="#6C3CE1" strokeWidth="1" strokeDasharray="4,2" opacity="0.4" />
                <ellipse cx="18" cy="25" rx="10" ry="7" fill="#6C3CE1" stroke="#6C3CE1" strokeWidth="1" opacity="0.3" />
                <ellipse cx="38" cy="22" rx="8" ry="6" fill="#6C3CE1" stroke="#6C3CE1" strokeWidth="1" opacity="0.3" />
                <ellipse cx="55" cy="28" rx="9" ry="6" fill="#6C3CE1" stroke="#6C3CE1" strokeWidth="1" opacity="0.3" />
                <text x="40" y="45" fontSize="9" textAnchor="middle"
                  style={{ fill: "#9ca3af", fontFamily: "system-ui" }}>Canarias</text>
              </g>
            </svg>

            {/* Coverage badge */}
            <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-2 rounded-xl shadow-lg shadow-primary/30">
              🚚 Envío nacional
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {shippingInfo.map((item) => (
                <div
                  key={item.label}
                  className="card p-5 flex items-start gap-4 group hover:border-primary/40 transition-colors duration-200"
                >
                  <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                    {item.icon}
                  </span>
                  <div>
                    <p className="font-bold text-sm text-gray-900 dark:text-white">{item.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="card p-6 bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-xl">
                  📍
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Almacén en España</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Envíos desde la Península</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Todos nuestros pedidos se preparan y envían desde España, garantizando tiempos de entrega rápidos
                y sin aduanas ni cargos adicionales.
              </p>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary inline-block" />
                <span className="text-gray-500 dark:text-gray-400">Principal (24h)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-accent inline-block" />
                <span className="text-gray-500 dark:text-gray-400">Estándar (48h)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
