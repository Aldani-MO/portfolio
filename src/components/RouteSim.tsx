"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { advance, CAPACITY, createSim, pointAt, ROUTE, stepToNextStop, THRESHOLD, type SimState } from "@/lib/route-sim";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { decisionLabel, type Locale } from "@/content/portfolio";

const copy = {
  en: {
    label: `Animated simulation: a bus runs a six-stop line. At each stop the Smart Dynamic Bus System rules choose stop, skip or leave early from the passengers waiting and the seats free (capacity ${CAPACITY}, threshold ${THRESHOLD}).`,
    pause: "Pause", play: "Play", step: "Next stop", idle: "Bus leaving the depot",
    log: (stop: string, w: number, occ: number, d: string) => `Stop ${stop} · ${w} waiting · ${occ}/${CAPACITY} on board → ${d}`,
    note: "Simulated passengers, real decision rules from the app.",
  },
  ar: {
    label: `محاكاة متحركة: حافلة تسير على خط من ست محطات. في كل محطة تختار قواعد نظام الحافلات الذكي التوقف أو التخطي أو الانطلاق المبكر بحسب المنتظرين والمقاعد المتاحة (السعة ${CAPACITY}، والحد ${THRESHOLD}).`,
    pause: "إيقاف مؤقت", play: "تشغيل", step: "المحطة التالية", idle: "الحافلة تغادر المرآب",
    log: (stop: string, w: number, occ: number, d: string) => `المحطة ${stop} · ${w} بالانتظار · ${occ}/${CAPACITY} داخل الحافلة ← ${d}`,
    note: "ركاب افتراضيون، وقواعد القرار نفسها المستخدمة في التطبيق.",
  },
};

const snap = (s: SimState) => ({ occ: s.occ, busD: s.busD, waiting: s.stops.map(x => x.waiting), flags: s.stops.map(x => x.flag), log: s.log });
const busTransform = (d: number) => { const p = pointAt(d); return `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${p.angle.toFixed(1)})`; };
const code = (i: number) => String(i + 1).padStart(2, "0");
const STOPS = createSim().stops.map(({ x, y }) => ({ x, y }));

export function RouteSim({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const [sim] = useState(createSim); // mutable engine state, advanced outside render
  const [view, setView] = useState(() => snap(sim));
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotion();
  const busRef = useRef<SVGGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const running = !paused && !reduced && visible;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    let raf = 0, last = performance.now();
    const loop = (now: number) => {
      const s = sim;
      if (advance(s, Math.min(0.05, (now - last) / 1000))) setView(snap(s));
      last = now;
      busRef.current?.setAttribute("transform", busTransform(s.busD));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running, sim]);

  const step = useCallback(() => {
    stepToNextStop(sim);
    setView(snap(sim));
  }, [sim]);

  const log = view.log;
  const points = ROUTE.map(p => p.join(",")).join(" ");

  return (
    <div className="sim" ref={wrapRef}>
      <svg className="sim-svg" viewBox="0 0 480 186" role="img" aria-label={c.label}>
        <polyline points={points} className="sim-route" />
        {STOPS.map((stop, i) => {
          const w = view.waiting[i];
          const flag = view.flags[i];
          const label = flag ? decisionLabel[flag][locale] : "";
          const pw = label.length * 6.2 + 16;
          const px = Math.min(Math.max(stop.x, pw / 2 + 2), 478 - pw / 2);
          return (
            <g key={i}>
              {Array.from({ length: Math.min(w, 10) }, (_, k) => (
                <circle key={k} className="sim-pax" cx={stop.x - 10 + (k % 5) * 5} cy={stop.y - 16 - Math.floor(k / 5) * 5.5} r={2.2} />
              ))}
              {w > 10 && <text className="sim-more" x={stop.x + 17} y={stop.y - 18}>+{w - 10}</text>}
              <circle className="sim-stop" cx={stop.x} cy={stop.y} r={6.5} />
              <text className="sim-code" x={stop.x} y={stop.y + 23} textAnchor="middle">{code(i)}</text>
              {flag && (
                <g className={`sim-flag flag-${flag.toLowerCase()}`} key={`${i}-${log?.stop}-${view.occ}`}>
                  <rect x={px - pw / 2} y={stop.y - 48} width={pw} height={17} rx={8.5} />
                  <text x={px} y={stop.y - 36} textAnchor="middle">{label}</text>
                </g>
              )}
            </g>
          );
        })}
        <g ref={busRef} transform={busTransform(view.busD)} className="sim-bus">
          <rect x={-14} y={-7.5} width={28} height={15} rx={3.5} />
          <rect className="sim-load-track" x={-10} y={-2.5} width={20} height={5} rx={1.5} />
          <rect className="sim-load" x={-10} y={-2.5} width={(20 * view.occ) / CAPACITY} height={5} rx={1.5} />
        </g>
      </svg>
      <div className="sim-bar">
        <p className="sim-log">{log ? c.log(code(log.stop), log.waiting, log.occ, decisionLabel[log.decision][locale]) : c.idle}</p>
        {reduced || paused
          ? <button type="button" className="sim-btn" onClick={step}>{c.step}</button>
          : null}
        {!reduced && (
          <button type="button" className="sim-btn" aria-pressed={paused} onClick={() => setPaused(p => !p)}>{paused ? c.play : c.pause}</button>
        )}
      </div>
      <p className="sim-note">{c.note}</p>
    </div>
  );
}
