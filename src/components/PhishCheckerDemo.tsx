"use client";

import { useState, useTransition } from "react";
import { useTranslations, useLocale } from "next-intl";
import { analyzeUrl, type PhishResult } from "@/lib/phish-scorer";

export function PhishCheckerDemo() {
  const t = useTranslations("projects.phish");
  const locale = useLocale();
  const isAr = locale === "ar";
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<PhishResult | null>(null);
  const [isPending, startTransition] = useTransition();

  const analyse = () => {
    if (!url.trim()) return;
    startTransition(() => {
      const res = analyzeUrl(url);
      setResult(res);
    });
  };

  const riskClass =
    result?.riskLevel === "safe"
      ? "risk-safe"
      : result?.riskLevel === "suspicious"
      ? "risk-suspicious"
      : "risk-phish";

  return (
    <div>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          color: "var(--color-muted)",
          marginBlockEnd: "var(--space-3)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          borderBlockEnd: "1px solid var(--color-rule)",
          paddingBlockEnd: "var(--space-1)",
        }}
      >
        ⚠ {t("demoNote")}
      </p>

      {/* URL Input */}
      <div className="phish-input-wrap">
        <input
          id="phish-url-input"
          className="phish-input"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={t("inputPlaceholder")}
          onKeyDown={(e) => e.key === "Enter" && analyse()}
          aria-label="URL to analyse"
          autoComplete="off"
          spellCheck={false}
        />
        <button
          className="phish-submit"
          onClick={analyse}
          disabled={isPending || !url.trim()}
          aria-label="Analyse URL"
        >
          {isPending ? "..." : t("analyseBtn")}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div aria-live="polite" aria-label="Analysis results">
          {/* Score meter */}
          <div className="risk-meter" aria-hidden="true">
            <div
              className={`risk-meter-fill ${riskClass}`}
              style={{ width: `${result.score}%` }}
            />
          </div>

          {/* Score + label */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-3)", marginBlockEnd: "var(--space-2)" }}>
            <span
              className={`risk-label ${riskClass}`}
              style={{
                color:
                  result.riskLevel === "safe"
                    ? "var(--color-line-green)"
                    : result.riskLevel === "suspicious"
                    ? "var(--color-line-amber)"
                    : "var(--color-line-red)",
              }}
            >
              {isAr ? result.riskLabelAr : result.riskLabelEn}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-md)",
                color: "var(--color-muted)",
              }}
            >
              {result.score}/100
            </span>
          </div>

          {result.parsedHost && (
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--color-muted)", marginBlockEnd: "var(--space-2)" }}>
              {isAr ? `المضيف: ${result.parsedHost}` : `Host: ${result.parsedHost}`}
            </div>
          )}

          {/* Rule list */}
          <div style={{ marginBlockStart: "var(--space-2)" }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                color: "var(--color-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBlockEnd: "var(--space-1)",
              }}
            >
              {t("checks")}
            </div>
            <ul className="rule-list" aria-label="Check results">
              {result.rules.map((rule) => (
                <li
                  key={rule.id}
                  className={`rule-item ${rule.triggered ? "rule-triggered" : "rule-clean"}`}
                >
                  <span
                    className={`rule-indicator ${rule.triggered ? "rule-indicator-hit" : "rule-indicator-ok"}`}
                    aria-label={rule.triggered ? "triggered" : "clear"}
                  >
                    {rule.triggered ? `+${rule.points}` : "✓"}
                  </span>
                  <span>{isAr ? rule.nameAr : rule.name}</span>
                  {rule.triggered && (
                    <span style={{ marginInlineStart: "auto", color: "var(--color-muted)", fontSize: "0.85em" }}>
                      {isAr ? rule.descriptionAr : rule.description}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Link to original repo */}
      <div style={{ marginBlockStart: "var(--space-4)", paddingBlockStart: "var(--space-2)", borderBlockStart: "1px solid var(--color-rule)" }}>
        <a
          href="https://github.com/Aldani-MO/phish-Checker"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
          style={{ fontSize: "var(--text-xs)" }}
        >
          {t("repoLink")}
        </a>
      </div>
    </div>
  );
}
