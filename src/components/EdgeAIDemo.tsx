"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";

// ─── SDBS Decision Engine — exact rules from README ─────────────────────────
interface Passenger {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  confidence: number;
  detected: boolean;
}

type Decision = "STOP" | "SKIP" | "EARLY-DEPART";

function computeDecision(
  waitingCount: number,
  occupancy: number,
  capacity: number,
  threshold: number
): Decision {
  const available = capacity - occupancy;
  // Priority 1: No passengers waiting → SKIP
  if (waitingCount === 0) return "SKIP";
  // Priority 2: Bus full → SKIP
  if (occupancy >= capacity) return "SKIP";
  // Priority 3: Waiting > available seats → STOP (but that's still STOP)
  if (waitingCount > available) return "STOP";
  // Priority 4: Waiting >= threshold AND seats exist → EARLY-DEPART
  if (waitingCount >= threshold && available > 0) return "EARLY-DEPART";
  // Default → STOP
  return "STOP";
}

export function EdgeAIDemo() {
  const t = useTranslations("projects.sdbs");
  const locale = useLocale();
  const isAr = locale === "ar";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.6);
  const [occupancy, setOccupancy] = useState(18);
  const [capacity] = useState(50);
  const [stopThreshold] = useState(5);
  const [detectedCount, setDetectedCount] = useState(0);
  const [decision, setDecision] = useState<Decision>("STOP");
  const passengersRef = useRef<Passenger[]>([]);
  const frameRef = useRef(0);

  const initPassengers = useCallback(() => {
    const count = Math.floor(Math.random() * 7) + 3; // 3–9
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: 30 + Math.random() * 540,
      y: 40 + Math.random() * 350,
      w: 40 + Math.random() * 30,
      h: 80 + Math.random() * 40,
      confidence: 0.3 + Math.random() * 0.7,
      detected: true,
    }));
  }, []);

  useEffect(() => {
    passengersRef.current = initPassengers();
  }, [initPassengers]);

  // Re-randomise passengers every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      passengersRef.current = initPassengers();
    }, 4000);
    return () => clearInterval(interval);
  }, [initPassengers]);

  // Update decision whenever relevant values change
  useEffect(() => {
    const detected = passengersRef.current.filter(
      (p) => p.confidence >= confidenceThreshold
    ).length;
    setDetectedCount(detected);
    setDecision(computeDecision(detected, occupancy, capacity, stopThreshold));
  });

  // Canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    const draw = () => {
      frameRef.current++;
      ctx.clearRect(0, 0, W, H);

      // Dark background
      ctx.fillStyle = "#080b07";
      ctx.fillRect(0, 0, W, H);

      // Scanlines effect
      for (let y = 0; y < H; y += 4) {
        ctx.fillStyle = "rgba(0,0,0,0.15)";
        ctx.fillRect(0, y, W, 1);
      }

      // Draw bounding boxes for each passenger
      const passengers = passengersRef.current;
      const detected = passengers.filter((p) => p.confidence >= confidenceThreshold);
      setDetectedCount(detected.length);
      setDecision(computeDecision(detected.length, occupancy, capacity, stopThreshold));

      passengers.forEach((p) => {
        const isAboveThreshold = p.confidence >= confidenceThreshold;
        const color = isAboveThreshold
          ? `rgba(39, 174, 96, ${0.7 + Math.sin(frameRef.current * 0.05 + p.id) * 0.2})`
          : "rgba(192, 57, 43, 0.5)";

        // Bounding box
        ctx.strokeStyle = color;
        ctx.lineWidth = isAboveThreshold ? 2 : 1;
        ctx.strokeRect(p.x, p.y, p.w, p.h);

        if (isAboveThreshold) {
          // Fill (very faint)
          ctx.fillStyle = "rgba(39, 174, 96, 0.06)";
          ctx.fillRect(p.x, p.y, p.w, p.h);

          // Corner accents
          const cs = 8;
          ctx.strokeStyle = "#27AE60";
          ctx.lineWidth = 2;
          [[p.x, p.y], [p.x + p.w, p.y], [p.x, p.y + p.h], [p.x + p.w, p.y + p.h]].forEach(([cx, cy], ci) => {
            ctx.beginPath();
            ctx.moveTo(cx + (ci % 2 === 0 ? cs : -cs), cy);
            ctx.lineTo(cx, cy);
            ctx.lineTo(cx, cy + (ci < 2 ? cs : -cs));
            ctx.stroke();
          });
        }

        // Label
        ctx.font = "11px 'Martian Mono', monospace";
        ctx.fillStyle = color;
        const conf = `${(p.confidence * 100).toFixed(0)}%`;
        const label = isAboveThreshold ? `PERSON ${conf}` : `LOW ${conf}`;
        ctx.fillText(label, p.x, p.y - 6);
      });

      // Overlay: frame counter + confidence gate
      ctx.font = "10px 'Martian Mono', monospace";
      ctx.fillStyle = "rgba(245, 166, 35, 0.7)";
      ctx.fillText(`FRAME ${String(frameRef.current % 9999).padStart(4, "0")}`, 12, 20);
      ctx.fillText(`GATE ≥${(confidenceThreshold * 100).toFixed(0)}%`, 12, 36);
      ctx.fillText(`DETECTED: ${detected.length}`, 12, 52);

      // Decision badge
      const decColor =
        decision === "STOP" ? "#27AE60"
          : decision === "SKIP" ? "#C0392B"
          : "#F5A623";
      ctx.font = "bold 13px 'Martian Mono', monospace";
      ctx.fillStyle = decColor;
      ctx.fillText(`▶ ${decision}`, W - 120, 20);

      animRef.current = requestAnimationFrame(draw);
    };

    // Check reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReduced) {
      animRef.current = requestAnimationFrame(draw);
    } else {
      // Static frame under reduced motion
      ctx.fillStyle = "#080b07";
      ctx.fillRect(0, 0, W, H);
      ctx.font = "14px 'Martian Mono', monospace";
      ctx.fillStyle = "#F5A623";
      ctx.fillText("SIMULATION — reduced motion mode", 20, H / 2);
    }

    return () => cancelAnimationFrame(animRef.current);
  }, [confidenceThreshold, occupancy, capacity, stopThreshold, decision]);

  const decClass =
    decision === "STOP" ? "decision-stop"
      : decision === "SKIP" ? "decision-skip"
      : "decision-early";

  return (
    <div className="edge-demo-wrap">
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          color: "var(--color-muted)",
          marginBlockEnd: "var(--space-2)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          borderBlockEnd: "1px solid var(--color-rule)",
          paddingBlockEnd: "var(--space-1)",
        }}
      >
        ⚠ {t("demoNote")}
      </p>

      <canvas
        ref={canvasRef}
        className="edge-canvas"
        width={640}
        height={360}
        aria-label="Simulated edge-AI passenger detection feed showing bounding boxes and confidence scores"
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)", marginBlockStart: "var(--space-3)" }}>
        {/* Confidence gate slider */}
        <div>
          <label
            htmlFor="confidence-gate"
            style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBlockEnd: "0.5em" }}
          >
            {t("confidenceLabel")}: {(confidenceThreshold * 100).toFixed(0)}%
          </label>
          <input
            id="confidence-gate"
            type="range"
            min="0"
            max="100"
            value={Math.round(confidenceThreshold * 100)}
            onChange={(e) => setConfidenceThreshold(Number(e.target.value) / 100)}
            style={{ width: "100%", accentColor: "var(--color-line-amber)" }}
          />
        </div>

        {/* Occupancy slider */}
        <div>
          <label
            htmlFor="occupancy"
            style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBlockEnd: "0.5em" }}
          >
            {t("occupancyLabel")}: {occupancy}/{capacity}
          </label>
          <input
            id="occupancy"
            type="range"
            min="0"
            max={capacity}
            value={occupancy}
            onChange={(e) => setOccupancy(Number(e.target.value))}
            style={{ width: "100%", accentColor: "var(--color-line-amber)" }}
          />
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          background: "var(--color-rule)",
          marginBlockStart: "var(--space-3)",
          border: "1px solid var(--color-rule)",
        }}
      >
        {[
          { label: t("passengersLabel"), value: detectedCount },
          { label: t("occupancyLabel"),  value: `${occupancy}/${capacity}` },
          { label: t("capacityLabel"),   value: capacity },
        ].map(({ label, value }) => (
          <div
            key={label}
            style={{ background: "var(--color-surface)", padding: "var(--space-2)", textAlign: "center" }}
          >
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xl)", fontWeight: 700, color: "var(--color-ink)", marginBlockStart: "0.2em" }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Decision output */}
      <div style={{ marginBlockStart: "var(--space-3)", display: "flex", alignItems: "baseline", gap: "var(--space-2)", flexWrap: "wrap" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{t("decisionLabel")}:</span>
        <span className={`decision-display ${decClass}`}>
          {isAr
            ? (decision === "STOP" ? "توقف · STOP" : decision === "SKIP" ? "تخطّ · SKIP" : "انطلاق مبكر · EARLY-DEPART")
            : decision}
        </span>
      </div>
    </div>
  );
}
