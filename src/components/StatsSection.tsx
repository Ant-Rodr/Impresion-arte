"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  isDecimal?: boolean;
}

const STATS: Stat[] = [
  { value: 500, suffix: "+",  label: "Pedidos completados" },
  { value: 48,  prefix: "<", suffix: "h",  label: "Entrega media" },
  { value: 4.9, suffix: "★", label: "Valoración media", isDecimal: true },
  { value: 98,  suffix: "%", label: "Clientes satisfechos" },
];

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function useCountUp(target: number, isDecimal: boolean, triggered: boolean) {
  const [display, setDisplay] = useState(isDecimal ? "0.0" : "0");
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!triggered) return;

    const duration = 1500;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = eased * target;

      setDisplay(isDecimal ? current.toFixed(1) : Math.floor(current).toString());

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setDisplay(isDecimal ? target.toFixed(1) : target.toString());
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [triggered, target, isDecimal]);

  return display;
}

function StatItem({ stat, triggered }: { stat: Stat; triggered: boolean }) {
  const display = useCountUp(stat.value, !!stat.isDecimal, triggered);

  return (
    <div className="flex flex-col items-center justify-center text-center px-4">
      <div className="flex items-baseline gap-1">
        {stat.prefix && (
          <span className="text-2xl font-black text-primary">{stat.prefix}</span>
        )}
        <span className="text-5xl font-black text-primary leading-none">
          {display}
        </span>
        <span className="text-2xl font-black text-primary">{stat.suffix}</span>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-12 sm:py-16 bg-primary/5 dark:bg-primary/10 border-y border-primary/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <StatItem key={stat.label} stat={stat} triggered={triggered} />
          ))}
        </div>
      </div>
    </section>
  );
}
