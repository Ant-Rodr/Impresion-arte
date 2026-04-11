import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="bg-light-bg dark:bg-dark-bg section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-primary-light to-accent p-px">
          <div className="relative rounded-3xl bg-gradient-to-br from-primary/90 to-accent/80 p-10 sm:p-14 text-white text-center overflow-hidden">
            {/* Fondo decorativo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/5" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/3" />
            </div>

            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-white/20 rounded-full mb-5 uppercase tracking-widest">
                ¿Listo para empezar?
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-5 leading-tight">
                Tu idea merece<br />hacerse realidad
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                Desde 4€. Sin pedido mínimo. Con garantía de calidad y envío rápido a toda España.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/personalizado"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base"
                >
                  Pedir ahora
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/60 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 text-base"
                >
                  Hablar con nosotros
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-8 flex flex-wrap gap-6 justify-center text-sm text-white/70">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                  Garantía de calidad
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H3m9 6h3.75M3 10.5h18M3 6h18M3 3h18" />
                  </svg>
                  Envío 24-48h
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Precio justo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
