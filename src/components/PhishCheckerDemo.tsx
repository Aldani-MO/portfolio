"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { analyzeUrl, type PhishResult } from "@/lib/phish-scorer";

const SAMPLES = { regular: "https://github.com/Aldani-MO", suspicious: "http://paypal-login.verify-account.xyz/signin" };

export function PhishCheckerDemo() {
  const t = useTranslations("projects.phish");
  const isAr = useLocale() === "ar";
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<PhishResult | null>(null);

  const run = (value: string) => { if (value.trim()) setResult(analyzeUrl(value)); };
  const sample = (value: string) => { setUrl(value); run(value); };
  const level = result?.riskLevel === "safe" ? "low" : result?.riskLevel === "suspicious" ? "mid" : "high";

  return (
    <div className="phish-demo">
      <p className="demo-note">{t("demoNote")}</p>
      <form className="phish-input-wrap" onSubmit={e => { e.preventDefault(); run(url); }}>
        <input
          id="phish-url-input" className="phish-input" type="text" inputMode="url" dir="ltr" value={url}
          onChange={e => { setUrl(e.target.value); setResult(null); }}
          placeholder={t("inputPlaceholder")} aria-label={isAr ? "الرابط المراد فحصه" : "URL to analyse"}
          maxLength={4096} aria-invalid={result?.valid === false} aria-describedby={result?.valid === false ? "url-error" : "phish-hint"}
          autoComplete="off" spellCheck={false}
        />
        <button className="btn btn-primary phish-submit" type="submit" disabled={!url.trim()}>{t("analyseBtn")}</button>
      </form>
      <div className="phish-samples">
        <button type="button" className="btn btn-small" onClick={() => sample(SAMPLES.regular)}>{isAr ? "جرّب رابطاً عادياً" : "Try a regular URL"}</button>
        <button type="button" className="btn btn-small" onClick={() => sample(SAMPLES.suspicious)}>{isAr ? "جرّب رابطاً مشبوهاً" : "Try a suspicious URL"}</button>
      </div>

      {!result && <p id="phish-hint" className="demo-note">{isAr ? "اختر مثالاً أو الصق رابطاً لعرض الفحوصات. الدرجة المنخفضة لا تضمن أن الرابط آمن." : "Pick an example or paste a URL to see each check. A low score does not mean a link is safe."}</p>}
      {result && !result.valid && <p id="url-error" role="alert" className="demo-error">{isAr ? "أدخل رابط HTTP أو HTTPS، مثل https://example.com. لا يمكن فحص هذا النص." : "Enter an HTTP or HTTPS URL, such as https://example.com. This text can't be analysed."}</p>}
      {result?.valid && (
        <div className="phish-result" aria-live="polite">
          <div className="risk-head">
            <strong className={`risk-label risk-${level}`}>{isAr ? result.riskLabelAr : result.riskLabelEn}</strong>
            <span className="risk-score" dir="ltr">{result.score}/100</span>
          </div>
          <div className="risk-meter" aria-hidden="true"><div className={`risk-meter-fill risk-${level}`} style={{ inlineSize: `${result.score}%` }} /></div>
          {result.parsedHost && <p className="risk-host">{isAr ? "المضيف: " : "Host: "}<span dir="ltr">{result.parsedHost}</span></p>}
          <ul className="rule-list" aria-label={t("checks")}>
            {result.rules.map(rule => (
              <li key={rule.id} className={`rule-item ${rule.triggered ? "rule-triggered" : "rule-clean"}`}>
                <span className="rule-points" dir="ltr">{rule.triggered ? `+${rule.points}` : "0"}<span className="sr-only">{rule.triggered ? (isAr ? " نقاط، تم رصده" : " points, flagged") : (isAr ? "، سليم" : ", clear")}</span></span>
                <span>{isAr ? rule.nameAr : rule.name}{rule.triggered && <small>{isAr ? rule.descriptionAr : rule.description}</small>}</span>
              </li>
            ))}
          </ul>
          <p className="demo-note">{isAr ? "فحص تقريبي قائم على قواعد، يعمل داخل متصفحك ولا يفتح الرابط. لا يغني عن الحذر." : "Rule-based estimate that runs in your browser and never opens the link. It is not a guarantee."}</p>
        </div>
      )}
    </div>
  );
}
