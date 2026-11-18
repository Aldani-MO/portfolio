"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { analyzeUrl, type PhishResult } from "@/lib/phish-scorer";
import { urlAnatomy, type TokenKind } from "@/lib/url-anatomy";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const KIND: Record<TokenKind, { en: string; ar: string }> = {
  scheme: { en: "scheme", ar: "البروتوكول" }, user: { en: "login", ar: "بيانات دخول" }, sub: { en: "subdomain", ar: "نطاق فرعي" },
  domain: { en: "domain", ar: "النطاق" }, tld: { en: "TLD", ar: "النطاق العلوي" }, ip: { en: "IP host", ar: "عنوان IP" },
  port: { en: "port", ar: "المنفذ" }, path: { en: "path", ar: "المسار" }, query: { en: "query", ar: "الاستعلام" },
};

/** Counts up to the score so the number reads as a measurement being taken. */
function useCountUp(target: number, run: boolean) {
  const [value, setValue] = useState(target);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 700);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run]);
  return run ? value : target;
}

const SAMPLES = { regular: "https://github.com/Aldani-MO", suspicious: "http://paypal-login.verify-account.xyz/signin" };

export function PhishCheckerDemo() {
  const t = useTranslations("projects.phish");
  const isAr = useLocale() === "ar";
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<PhishResult | null>(null);

  const run = (value: string) => { if (value.trim()) setResult(analyzeUrl(value)); };
  const sample = (value: string) => { setUrl(value); run(value); };
  const reduced = useReducedMotion();
  const score = useCountUp(result?.valid ? result.score : 0, !reduced && !!result?.valid);
  const tokens = result?.valid ? urlAnatomy(result.url, result.rules.filter(r => r.triggered).map(r => r.id)) : [];
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
            <span className="risk-score" dir="ltr"><span aria-hidden="true">{score}</span><span className="sr-only">{result.score}</span>/100</span>
          </div>
          <div className="risk-meter" aria-hidden="true"><div className={`risk-meter-fill risk-${level}`} style={{ inlineSize: `${result.score}%` }} /></div>
          <ol className="anatomy" dir="ltr" aria-label={isAr ? "أجزاء الرابط" : "Parts of the URL"} key={result.url}>
            {tokens.map((tok, i) => (
              <li key={i} className={tok.flags.length ? "tok tok-flag" : "tok"} style={{ animationDelay: `${i * 70}ms` }}>
                <code>{tok.text}</code>
                <span className="tok-kind" dir={isAr ? "rtl" : "ltr"}>{KIND[tok.kind][isAr ? "ar" : "en"]}{tok.flags.length ? <span className="sr-only">{isAr ? "، مشبوه" : ", flagged"}</span> : null}</span>
              </li>
            ))}
          </ol>
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
