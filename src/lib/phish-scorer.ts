/**
 * Phish Checker — Browser port of github.com/Aldani-MO/phish-Checker
 *
 * Pure string analysis. NEVER fetches the URL.
 * Scoring rules taken directly from the Python CLI README.
 *
 * This is a client-side TypeScript port. For the original Python CLI, see the repo above.
 */

export interface PhishRule {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  points: number;
  triggered: boolean;
}

export interface PhishResult {
  score: number;              // 0–100 (capped)
  riskLevel: "safe" | "suspicious" | "likely-phish";
  riskLabelEn: string;
  riskLabelAr: string;
  rules: PhishRule[];
  url: string;
  parsedHost: string | null;
}

// Known URL shortener domains
const URL_SHORTENERS = new Set([
  "bit.ly", "t.co", "tinyurl.com", "ow.ly", "goo.gl", "short.io",
  "rebrand.ly", "buff.ly", "is.gd", "v.gd", "cutt.ly", "shorturl.at",
  "tiny.cc", "bl.ink", "po.st", "su.pr", "cli.gs", "snipurl.com",
  "snurl.com", "tr.im", "urlcut.com", "u.to", "bc.vc", "j.mp",
]);

// Suspicious TLDs
const SUSPICIOUS_TLDS = new Set([
  ".xyz", ".top", ".tk", ".ml", ".ga", ".cf", ".gq", ".pw", ".cc",
  ".click", ".download", ".link", ".win", ".loan", ".work", ".party",
  ".racing", ".stream", ".accountant", ".date", ".faith", ".review",
  ".bid", ".trade", ".cricket", ".science", ".club", ".icu",
]);

// Common brands to check for impersonation
const BRAND_KEYWORDS = [
  "paypal", "apple", "microsoft", "google", "amazon", "netflix", "facebook",
  "instagram", "twitter", "whatsapp", "ebay", "chase", "bankofamerica",
  "wellsfargo", "citibank", "hsbc", "barclays", "lloyds", "natwest",
  "santander", "halifax", "dhl", "fedex", "ups", "usps",
];

// Redirect parameter names
const REDIRECT_PARAMS = new Set([
  "redirect", "redirect_url", "redirect_uri", "next", "return",
  "returnurl", "return_url", "url", "goto", "link", "target",
  "dest", "destination", "continue", "forward",
]);

function tryParseUrl(raw: string): URL | null {
  // Try as-is
  try { return new URL(raw); } catch {}
  // Try with https://
  try { return new URL("https://" + raw); } catch {}
  return null;
}

function isPunycode(host: string): boolean {
  // Punycode labels start with xn--
  return host.split(".").some((label) => label.toLowerCase().startsWith("xn--"));
}

function hasHomoglyphs(host: string): boolean {
  // Check for common Unicode homograph characters (non-ASCII in domain)
  return /[^\x00-\x7F]/.test(host);
}

function isBrandImpersonation(host: string, pathname: string): boolean {
  const combined = (host + pathname).toLowerCase();
  // Impersonation = brand keyword appears in domain but is NOT the registrable domain
  // e.g. "paypal-login.verify-account.xyz" — "paypal" in subdomain or path, not the actual domain
  for (const brand of BRAND_KEYWORDS) {
    if (!combined.includes(brand)) continue;
    // If the host IS the brand (e.g. paypal.com), not impersonation
    const parts = host.toLowerCase().split(".");
    const registrable = parts.slice(-2).join(".");
    if (registrable.startsWith(brand)) continue;
    return true;
  }
  return false;
}

export function analyzeUrl(raw: string): PhishResult {
  const trimmed = raw.trim();
  const parsed = tryParseUrl(trimmed);
  const host = parsed?.hostname ?? null;
  const protocol = parsed?.protocol ?? "";
  const pathname = parsed?.pathname ?? "";
  const search = parsed?.search ?? "";

  let totalScore = 0;

  const rules: PhishRule[] = [
    // Rule 1: Not HTTPS (+15)
    {
      id: "no-https",
      name: "Not using HTTPS",
      nameAr: "لا يستخدم HTTPS",
      description: "HTTP connections are unencrypted and can be intercepted.",
      descriptionAr: "اتصالات HTTP غير مشفّرة وقابلة للاعتراض.",
      points: 15,
      triggered: !!parsed && protocol !== "https:",
    },

    // Rule 2: URL shortener (+25)
    {
      id: "shortener",
      name: "URL shortener domain",
      nameAr: "نطاق مختصر للروابط",
      description: "Short URLs hide the real destination and are commonly used in phishing.",
      descriptionAr: "الروابط المختصرة تخفي الوجهة الحقيقية وتُستخدم كثيراً في التصيد.",
      points: 25,
      triggered: !!host && URL_SHORTENERS.has(host.toLowerCase()),
    },

    // Rule 3: IP address as hostname (+25)
    {
      id: "ip-hostname",
      name: "IP address used as hostname",
      nameAr: "عنوان IP كاسم مضيف",
      description: "Legitimate services use domain names, not bare IP addresses.",
      descriptionAr: "الخدمات الشرعية تستخدم أسماء النطاقات، لا عناوين IP مباشرة.",
      points: 25,
      triggered: !!host && /^(\d{1,3}\.){3}\d{1,3}$/.test(host),
    },

    // Rule 4: Too many subdomains (+20)
    {
      id: "subdomains",
      name: "Excessive subdomains (≥3 levels)",
      nameAr: "نطاقات فرعية مفرطة (3 مستويات أو أكثر)",
      description: "Many subdomains (e.g. login.account.verify.example.com) are a phishing indicator.",
      descriptionAr: "النطاقات الفرعية الكثيرة كـ login.account.verify.example.com من علامات التصيد.",
      points: 20,
      triggered: !!host && host.split(".").length >= 4,
    },

    // Rule 5: Punycode/IDN lookalike (+20)
    {
      id: "punycode",
      name: "Punycode / IDN homograph",
      nameAr: "نطاق Punycode أو IDN مشابه",
      description: "Domains using xn-- encoding or Unicode characters can visually mimic real brands.",
      descriptionAr: "النطاقات التي تستخدم ترميز xn-- أو Unicode قد تبدو مشابهة لعلامات تجارية حقيقية.",
      points: 20,
      triggered: !!host && (isPunycode(host) || hasHomoglyphs(host)),
    },

    // Rule 6: @ trick in URL (+25)
    {
      id: "at-sign",
      name: '"@" character in URL',
      nameAr: 'علامة "@" في الرابط',
      description: 'Everything before @ is ignored by browsers — used to fake a legitimate-looking prefix.',
      descriptionAr: 'كل ما قبل @ يُتجاهل من المتصفحات — يُستخدم لإيهام المستخدم بشرعية الرابط.',
      points: 25,
      triggered: trimmed.includes("@") && !!parsed,
    },

    // Rule 7: Suspicious TLD (+10)
    {
      id: "suspicious-tld",
      name: "Suspicious TLD",
      nameAr: "نطاق مستوى أعلى مشبوه",
      description: "Free or rarely-used TLDs like .xyz, .tk, .top are disproportionately used in phishing.",
      descriptionAr: "نطاقات مثل .xyz و.tk و.top تُستخدم بشكل غير متناسب في هجمات التصيد.",
      points: 10,
      triggered: !!host && SUSPICIOUS_TLDS.has(
        "." + host.split(".").pop()?.toLowerCase()
      ),
    },

    // Rule 8: Brand impersonation (+25)
    {
      id: "brand-impersonation",
      name: "Brand impersonation",
      nameAr: "انتحال هوية علامة تجارية",
      description: "A known brand name appears in the URL but is not the actual registered domain.",
      descriptionAr: "اسم علامة تجارية معروفة يظهر في الرابط لكنه ليس النطاق الفعلي.",
      points: 25,
      triggered: !!host && isBrandImpersonation(host, pathname),
    },

    // Rule 9: Redirect parameter (+15)
    {
      id: "redirect-param",
      name: "Redirect parameter in query string",
      nameAr: "معامل إعادة توجيه في رابط الاستعلام",
      description: "Query parameters like ?redirect=, ?url=, or ?next= are used to chain open redirects.",
      descriptionAr: "معاملات مثل ?redirect= أو ?url= تُستخدم لتسلسل إعادة التوجيه المفتوح.",
      points: 15,
      triggered: (() => {
        if (!search) return false;
        const params = new URLSearchParams(search);
        for (const key of params.keys()) {
          if (REDIRECT_PARAMS.has(key.toLowerCase())) return true;
        }
        return false;
      })(),
    },
  ];

  for (const rule of rules) {
    if (rule.triggered) totalScore += rule.points;
  }

  const score = Math.min(totalScore, 100);

  let riskLevel: PhishResult["riskLevel"];
  let riskLabelEn: string;
  let riskLabelAr: string;

  if (score < 20) {
    riskLevel = "safe";
    riskLabelEn = "LOW RISK";
    riskLabelAr = "خطر منخفض";
  } else if (score < 50) {
    riskLevel = "suspicious";
    riskLabelEn = "SUSPICIOUS";
    riskLabelAr = "مشبوه";
  } else {
    riskLevel = "likely-phish";
    riskLabelEn = "LIKELY PHISH";
    riskLabelAr = "تصيد محتمل";
  }

  return {
    score,
    riskLevel,
    riskLabelEn,
    riskLabelAr,
    rules,
    url: trimmed,
    parsedHost: host,
  };
}
