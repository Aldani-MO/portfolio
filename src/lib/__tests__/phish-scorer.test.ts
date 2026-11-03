import { describe, it, expect } from "vitest";
import { analyzeUrl } from "../phish-scorer";

describe("phish-scorer heuristic engine", () => {
  it.each(["", "   ", "not a url", "https://", "javascript:alert(1)", "data:text/html,test", "ftp://example.com", "https://" + "x".repeat(5000)])("does not label invalid input as low risk: %s", raw => {
    const result = analyzeUrl(raw);
    expect(result.valid).toBe(false);
    expect(result.riskLevel).toBe("invalid");
  });
  it.each(["example.com/path", "example.com:8080/path", "//example.com/path", " https://EXAMPLE.com./path "])("accepts a web address and normalizes the host: %s", raw => {
    const result = analyzeUrl(raw);
    expect(result.valid).toBe(true);
    expect(result.parsedHost).toBe("example.com");
  });
  it("flags a brand-prefixed attacker domain", () => {
    expect(analyzeUrl("https://paypal-login.com").rules.find(r => r.id === "brand-impersonation")?.triggered).toBe(true);
  });
  it("does not interpret an @ in a path as URL credentials", () => {
    expect(analyzeUrl("https://example.com/@profile").rules.find(r => r.id === "at-sign")?.triggered).toBe(false);
  });
  it("recognizes an IPv6 literal", () => {
    expect(analyzeUrl("http://[::1]/").rules.find(r => r.id === "ip-hostname")?.triggered).toBe(true);
  });
  it("flags an encoded IDN hostname", () => {
    expect(analyzeUrl("https://xn--pple-43d.com").rules.find(r => r.id === "punycode")?.triggered).toBe(true);
  });
  it("scores legitimate HTTPS domain with low score (safe)", () => {
    const result = analyzeUrl("https://github.com/Aldani-MO");
    expect(result.score).toBeLessThan(30);
    expect(result.riskLevel).toBe("safe");
  });

  it("detects non-HTTPS URLs (+15 points)", () => {
    const result = analyzeUrl("http://example.com");
    const noHttps = result.rules.find((r) => r.id === "no-https");
    expect(noHttps?.triggered).toBe(true);
    expect(result.score).toBeGreaterThanOrEqual(15);
  });

  it("detects URL shortener domains (+25 points)", () => {
    const result = analyzeUrl("https://bit.ly/3xyzABC");
    const shortener = result.rules.find((r) => r.id === "shortener");
    expect(shortener?.triggered).toBe(true);
    expect(result.score).toBeGreaterThanOrEqual(25);
  });

  it("detects IP address as hostname (+25 points)", () => {
    const result = analyzeUrl("http://192.168.1.1/login");
    const ipHost = result.rules.find((r) => r.id === "ip-hostname");
    expect(ipHost?.triggered).toBe(true);
  });

  it("detects @ symbol in URL (+25 points)", () => {
    const result = analyzeUrl("https://legit.com@phishing.site/account");
    const atSign = result.rules.find((r) => r.id === "at-sign");
    expect(atSign?.triggered).toBe(true);
  });

  it("detects suspicious TLD (+10 points)", () => {
    const result = analyzeUrl("https://secure-login.xyz/portal");
    const tldRule = result.rules.find((r) => r.id === "suspicious-tld");
    expect(tldRule?.triggered).toBe(true);
  });

  it("detects brand impersonation (+25 points)", () => {
    const result = analyzeUrl("https://paypal-security-update.fake-domain.com");
    const brandRule = result.rules.find((r) => r.id === "brand-impersonation");
    expect(brandRule?.triggered).toBe(true);
  });

  it("detects multiple subdomains (+20 points)", () => {
    const result = analyzeUrl("https://a.b.c.d.malicious.com");
    const subdomainsRule = result.rules.find((r) => r.id === "subdomains");
    expect(subdomainsRule?.triggered).toBe(true);
  });

  it("caps score at 100 max and marks as likely-phish", () => {
    // Non-https (+15), brand impersonation (+25), suspicious TLD (+10), subdomains (+20), @ (+25), redirect (+15) = 110 -> 100
    const result = analyzeUrl("http://user@paypal-verify.security.alert.portal.xyz/login?redirect=http://evil.com");
    expect(result.score).toBe(100);
    expect(result.riskLevel).toBe("likely-phish");
  });
});
