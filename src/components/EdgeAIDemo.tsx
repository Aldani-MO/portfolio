"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { computeDecision } from "@/lib/transit-decision";

const SCENES = [
  [0.94, 0.88, 0.76, 0.68, 0.55, 0.43, 0.32],
  [0.97, 0.93, 0.91, 0.86, 0.82, 0.78, 0.64],
  [0.54, 0.48, 0.39, 0.31],
];

export function EdgeAIDemo() {
  const t = useTranslations("projects.sdbs");
  const isAr = useLocale() === "ar";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [confidence, setConfidence] = useState(60);
  const [occupancy, setOccupancy] = useState(18);
  const [scene, setScene] = useState(0);
  const people = SCENES[scene];
  const detected = people.filter(p => p * 100 >= confidence).length;
  const decision = computeDecision(detected, occupancy);
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#17221d";
    ctx.fillRect(0, 0, 640, 360);
    ctx.strokeStyle = "#34473a";
    ctx.lineWidth = 1;
    for (let x = 0; x < 640; x += 40) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,360); ctx.stroke(); }
    for (let y = 0; y < 360; y += 40) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(640,y); ctx.stroke(); }
    ctx.font = "14px monospace";
    ctx.fillStyle = "#f5d28b";
    ctx.fillText("SIMULATION / FRAME 0" + (scene + 1), 18, 28);
    people.forEach((p, i) => {
      const x = 30 + i * 83;
      const y = 92 + (i % 3) * 26;
      const accepted = p * 100 >= confidence;
      ctx.fillStyle = "#819086";
      ctx.beginPath(); ctx.arc(x + 25, y + 28, 13, 0, Math.PI*2); ctx.fill();
      ctx.fillRect(x + 12,y + 46,26,55);
      ctx.fillRect(x + 12,y + 101,10,35); ctx.fillRect(x + 28,y + 101,10,35);
      ctx.strokeStyle = accepted ? "#71cf9a" : "#ff9385";
      ctx.lineWidth = 2;
      ctx.strokeRect(x,y,50,146);
      ctx.fillStyle = ctx.strokeStyle;
      ctx.font = "12px monospace";
      ctx.fillText(Math.round(p * 100) + "%",x,y - 8);
    });
    ctx.fillStyle = "#c5cfc8";
    ctx.font = "14px monospace";
    ctx.fillText("CONFIDENCE >= " + confidence + "%  /  ACCEPTED " + detected,18,336);
  }, [confidence, detected, people, scene]);

  return (
    <div className="edge-demo-wrap">
      <p className="demo-note">{t("demoNote")}</p>
      <canvas ref={canvasRef} className="edge-canvas" width={640} height={360} role="img" aria-label={isAr ? "محاكاة الكشف عن الركاب. النتيجة موضحة أسفل الرسم." : "Simulated passenger detection. Results are also shown below the image."} />
      <div className="demo-controls">
        <label htmlFor="confidence-gate">{t("confidenceLabel")}: {confidence}%
          <input id="confidence-gate" type="range" min={0} max={100} value={confidence} onChange={e => setConfidence(Number(e.target.value))} />
        </label>
        <label htmlFor="occupancy">{t("occupancyLabel")}: {occupancy}/50
          <input id="occupancy" type="range" min={0} max={50} value={occupancy} onChange={e => setOccupancy(Number(e.target.value))} />
        </label>
      </div>
      <button type="button" className="btn btn-ghost" onClick={() => setScene((scene + 1) % SCENES.length)}>{isAr ? "جرّب مشهداً آخر" : "Try another scene"}</button>
      <div className="demo-result" aria-live="polite" role="status">
        <span>{t("passengersLabel")}: {detected}</span>
        <strong className={"decision-display " + (decision === "STOP" ? "decision-stop" : decision === "SKIP" ? "decision-skip" : "decision-early")}>{decision}</strong>
      </div>
    </div>
  );
}
