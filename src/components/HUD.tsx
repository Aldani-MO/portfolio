"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";

const STATIONS = [
  { id: "depot",      en: "DEPOT",    ar: "المحطة الرئيسية" },
  { id: "about",      en: "STOP 01",  ar: "المحطة 01" },
  { id: "projects",   en: "STOP 02",  ar: "المحطة 02" },
  { id: "experience", en: "STOP 03",  ar: "المحطة 03" },
  { id: "skills",     en: "STOP 04",  ar: "المحطة 04" },
  { id: "certificates", en: "STOP 05", ar: "المحطة 05" },
  { id: "contact",    en: "TERMINUS", ar: "المحطة النهائية" },
];

type DecisionState = "STOP" | "SKIP" | "EARLY-DEPART";

const DECISION_LABELS: Record<DecisionState, { en: string; ar: string }> = {
  STOP: { en: "STOP", ar: "توقف" },
  SKIP: { en: "SKIP", ar: "تخطّ" },
  "EARLY-DEPART": { en: "EARLY-DEPART", ar: "انطلاق مبكر" },
};

export function HUD() {
  const t = useTranslations("hud");
  const locale = useLocale();
  const isAr = locale === "ar";
  const [currentIdx, setCurrentIdx] = useState(0);
  const [decision, setDecision] = useState<DecisionState>("STOP");
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());

  useEffect(() => {
    const updateStation = () => {
      const scrollY = window.scrollY;
      const now = Date.now();
      const dt = now - lastScrollTime.current;
      const velocity = Math.abs(scrollY - lastScrollY.current) / Math.max(dt, 1);

      // Determine decision state from scroll velocity
      if (velocity > 4) {
        setDecision("SKIP");
      } else if (velocity > 1.5) {
        setDecision("EARLY-DEPART");
      } else {
        setDecision("STOP");
      }

      lastScrollY.current = scrollY;
      lastScrollTime.current = now;

      // Find current station
      for (let i = STATIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(STATIONS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5) {
            setCurrentIdx(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", updateStation, { passive: true });
    return () => window.removeEventListener("scroll", updateStation);
  }, []);

  const current = STATIONS[currentIdx];
  const next = currentIdx < STATIONS.length - 1 ? STATIONS[currentIdx + 1] : null;

  const currentLabel = isAr ? current.ar : current.en;
  const nextLabel = next ? (isAr ? next.ar : next.en) : "——";
  const decisionText = DECISION_LABELS[decision][isAr ? "ar" : "en"];

  const stateClass =
    decision === "STOP"
      ? "hud-state-stop"
      : decision === "SKIP"
      ? "hud-state-skip"
      : "hud-state-early";

  return (
    <aside className="hud" aria-label="Route HUD">
      {/* Route dots */}
      <div className="hud-dots" >
        {STATIONS.map((s, i) => (
          <button
            key={s.id}
            className={`hud-dot${i === currentIdx ? " active" : ""}`}
            onClick={() => {
              document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
            }}
            aria-label={`Go to ${isAr ? s.ar : s.en}`}
          />
        ))}
      </div>

      <div className="hud-line">
        <span className="hud-label">{t("now")}</span>
        <span className="hud-value">{currentLabel}</span>
      </div>
      <div className="hud-line">
        <span className="hud-label">{t("next")}</span>
        <span className="hud-value">{nextLabel}</span>
      </div>
      <div className="hud-line">
        <span className="hud-label">{t("state")}</span>
        <span className={`hud-value ${stateClass}`}>{decisionText}</span>
      </div>

      <div style={{ marginBlockStart: "0.5em", borderBlockStart: "1px solid var(--color-rule)", paddingBlockStart: "0.5em" }}>
        <a
          href="#projects" onClick={() => document.documentElement.dataset.ride = "static"}
          className="hud-label"
          style={{ textDecoration: "underline", textUnderlineOffset: "2px", cursor: "pointer", fontSize: "var(--text-xs)" }}
        >
          {t("skipRide")}
        </a>
      </div>
    </aside>
  );
}
