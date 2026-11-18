"use client";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { computeDecision } from "@/lib/transit-decision";
import { decisionLabel } from "@/content/portfolio";
import { useReducedMotion } from "@/lib/use-reduced-motion";

// Preset confidence scores for drawn figures. Nothing here runs a model.
const SCENES = [
  [0.94, 0.88, 0.76, 0.68, 0.55, 0.43, 0.32],
  [0.97, 0.93, 0.91, 0.86, 0.82, 0.78, 0.71, 0.64],
  [0.54, 0.48, 0.39, 0.31],
];
const SEATS = 8; // Small bus so each detection visibly changes the outcome.
const THRESHOLD = 5;

const copy = {
  en: {
    note: "Browser simulation with drawn figures and preset confidence scores. The real YOLOv8n model runs in Python on a Raspberry Pi, not in this page.",
    canvas: "Simulated on-board camera frame. The detection count and decision are also given as text below.",
    conf: "Detection confidence threshold", waiting: "Passengers checked in at the stop",
    scene: "Next camera frame", onboard: "On board", free: "Free seats", decision: "Decision",
    legend: `${SEATS}-seat bus, stop threshold ${THRESHOLD}`,
  },
  ar: {
    note: "محاكاة داخل المتصفح بأشكال مرسومة ودرجات ثقة محددة مسبقاً. نموذج YOLOv8n الحقيقي يعمل بلغة Python على Raspberry Pi، وليس في هذه الصفحة.",
    canvas: "إطار محاكاة من كاميرا الحافلة. عدد الركاب المكتشفين والقرار مكتوبان أيضاً أسفل الصورة.",
    conf: "حد الثقة في الكشف", waiting: "الركاب المسجّلون في المحطة",
    scene: "الإطار التالي من الكاميرا", onboard: "داخل الحافلة", free: "المقاعد المتاحة", decision: "القرار",
    legend: `حافلة من ${SEATS} مقاعد، وحد المحطة ${THRESHOLD}`,
  },
};

export function EdgeAIDemo() {
  const locale = useLocale() === "ar" ? "ar" : "en";
  const c = copy[locale];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const sweptScene = useRef(-1);
  const [confidence, setConfidence] = useState(60);
  const [waiting, setWaiting] = useState(6);
  const [scene, setScene] = useState(0);
  const people = SCENES[scene];
  const onboard = Math.min(SEATS, people.filter(p => p * 100 >= confidence).length);
  const decision = computeDecision(waiting, onboard, SEATS, THRESHOLD);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    // sweep: 0..1 position of the scan line; boxes appear once the line has passed them.
    const draw = (sweep: number) => {
      const lineX = sweep * 660 - 10;
      ctx.fillStyle = "#11191b";
      ctx.fillRect(0, 0, 640, 360);
      ctx.strokeStyle = "#1f2c2f";
      ctx.lineWidth = 1;
      for (let x = 0; x <= 640; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 360); ctx.stroke(); }
      for (let y = 0; y <= 360; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(640, y); ctx.stroke(); }
      ctx.font = "13px monospace";
      ctx.fillStyle = "#9fb3b0";
      ctx.fillText(`SIMULATION · FRAME 0${scene + 1}`, 18, 28);
      let counted = 0;
      people.forEach((p, i) => {
        const x = 22 + i * 76;
        const y = 84 + (i % 3) * 24;
        ctx.fillStyle = "#6f8582";
        ctx.beginPath(); ctx.arc(x + 25, y + 28, 13, 0, Math.PI * 2); ctx.fill();
        ctx.fillRect(x + 12, y + 46, 26, 55);
        ctx.fillRect(x + 12, y + 101, 10, 35); ctx.fillRect(x + 28, y + 101, 10, 35);
        if (x + 50 > lineX) return;
        const accepted = p * 100 >= confidence;
        if (accepted) counted++;
        ctx.strokeStyle = accepted ? "#5cc2b3" : "#ff8a7a";
        ctx.setLineDash(accepted ? [] : [4, 4]);
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, 50, 146);
        ctx.setLineDash([]);
        ctx.fillStyle = ctx.strokeStyle;
        ctx.font = "12px monospace";
        ctx.fillText(`${Math.round(p * 100)}%`, x, y - 8);
      });
      if (sweep < 1) {
        ctx.fillStyle = "rgba(92, 194, 179, 0.16)";
        ctx.fillRect(lineX - 36, 40, 36, 280);
        ctx.fillStyle = "#5cc2b3";
        ctx.fillRect(lineX, 40, 2, 280);
      }
      ctx.fillStyle = "#d9e2df";
      ctx.font = "13px monospace";
      ctx.fillText(`CONF >= ${confidence}%   PERSON x${sweep < 1 ? counted : onboard}`, 18, 338);
    };
    const newFrame = sweptScene.current !== scene;
    sweptScene.current = scene;
    if (reduced || !newFrame) { draw(1); return; }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 520);
      draw(t);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [confidence, onboard, people, scene, reduced]);

  return (
    <div className="edge-demo">
      <p className="demo-note">{c.note}</p>
      <canvas ref={canvasRef} className="edge-canvas" width={640} height={360} role="img" aria-label={c.canvas} />
      <div className="demo-controls">
        <label htmlFor="confidence-gate"><span>{c.conf}</span><output dir="ltr">{confidence}%</output>
          <input id="confidence-gate" type="range" min={0} max={100} value={confidence} onChange={e => setConfidence(Number(e.target.value))} />
        </label>
        <label htmlFor="waiting"><span>{c.waiting}</span><output dir="ltr">{waiting}</output>
          <input id="waiting" type="range" min={0} max={12} value={waiting} onChange={e => setWaiting(Number(e.target.value))} />
        </label>
      </div>
      <button type="button" className="btn btn-small" onClick={() => setScene((scene + 1) % SCENES.length)}>{c.scene}</button>
      <div className="demo-result" role="status" aria-live="polite">
        <dl>
          <div><dt>{c.onboard}</dt><dd dir="ltr">{onboard}/{SEATS}</dd></div>
          <div><dt>{c.free}</dt><dd dir="ltr">{SEATS - onboard}</dd></div>
          <div><dt>{c.decision}</dt><dd><strong key={decision} className={`signal signal-${decision.toLowerCase()} pop`} data-decision={decision}>{decisionLabel[decision][locale]}</strong></dd></div>
        </dl>
        <p className="demo-note">{c.legend}</p>
      </div>
    </div>
  );
}
