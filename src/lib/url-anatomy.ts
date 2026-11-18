import { BRAND_KEYWORDS, tryParseUrl } from "./phish-scorer";

export type TokenKind = "scheme" | "user" | "sub" | "domain" | "tld" | "ip" | "port" | "path" | "query";
export interface UrlToken { text: string; kind: TokenKind; flags: string[] }

/** Split a URL into labelled parts and attach the ids of triggered rules that each part explains. */
export function urlAnatomy(raw: string, triggered: string[]): UrlToken[] {
  const url = tryParseUrl(raw.trim());
  if (!url) return [];
  const on = new Set(triggered);
  const brand = (s: string) => on.has("brand-impersonation") && BRAND_KEYWORDS.some(b => s.toLowerCase().includes(b));
  const tokens: UrlToken[] = [{ text: `${url.protocol}//`, kind: "scheme", flags: on.has("no-https") ? ["no-https"] : [] }];

  if (url.username || url.password) tokens.push({ text: `${decodeURIComponent(url.username)}${url.password ? ":***" : ""}@`, kind: "user", flags: on.has("at-sign") ? ["at-sign"] : [] });

  const host = url.hostname.replace(/\.$/, "");
  if (on.has("ip-hostname")) {
    tokens.push({ text: host, kind: "ip", flags: ["ip-hostname"] });
  } else {
    const labels = host.split(".");
    labels.forEach((label, i) => {
      const kind: TokenKind = i === labels.length - 1 ? "tld" : i === labels.length - 2 ? "domain" : "sub";
      const flags: string[] = [];
      if (kind === "tld" && on.has("suspicious-tld")) flags.push("suspicious-tld");
      if (kind === "sub" && on.has("subdomains")) flags.push("subdomains");
      if (kind !== "tld" && on.has("shortener")) flags.push("shortener");
      if (label.startsWith("xn--") && on.has("punycode")) flags.push("punycode");
      if (kind !== "tld" && brand(label)) flags.push("brand-impersonation");
      tokens.push({ text: i < labels.length - 1 ? `${label}.` : label, kind, flags });
    });
  }
  if (url.port) tokens.push({ text: `:${url.port}`, kind: "port", flags: [] });
  if (url.pathname && url.pathname !== "/") tokens.push({ text: url.pathname, kind: "path", flags: brand(url.pathname) ? ["brand-impersonation"] : [] });
  if (url.search) tokens.push({ text: url.search, kind: "query", flags: on.has("redirect-param") ? ["redirect-param"] : [] });
  return tokens;
}
