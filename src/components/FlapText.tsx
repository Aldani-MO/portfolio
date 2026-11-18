"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+·/";

/** Departure-board text: characters spin and settle left to right once the text scrolls into view. */
export function FlapText({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  const [shown, setShown] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now() + delay;
      const per = 38; // ms between characters settling
      const tick = (now: number) => {
        const elapsed = now - start;
        if (elapsed < 0) { raf = requestAnimationFrame(tick); return; }
        const settled = Math.floor(elapsed / per);
        if (settled >= text.length) { setShown(text); return; }
        setShown(Array.from(text, (ch, i) => i < settled || ch === " " ? ch : GLYPHS[(Math.floor(now / 45) + i * 7) % GLYPHS.length]).join(""));
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [text, delay]);

  return (
    <span className={className} ref={ref}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}

const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kuwait" });
const subscribe = (cb: () => void) => { const id = setInterval(cb, 15000); return () => clearInterval(id); };

/** Kuwait time on the board. Empty on the server so the markup never mismatches. */
export function BoardClock({ label }: { label: string }) {
  const time = useSyncExternalStore(subscribe, () => fmt.format(Date.now()), () => "");
  if (!time) return null;
  return (
    <span className="board-clock" dir="ltr">
      <span className="sr-only">{label} {time}</span>
      {time.split("").map((ch, i) => <span key={`${i}-${ch}`} className="flip-digit" aria-hidden="true">{ch}</span>)}
      <span aria-hidden="true"> KWT</span>
    </span>
  );
}
