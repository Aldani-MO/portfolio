import { describe, expect, it } from "vitest";
import { analyzeUrl } from "../phish-scorer";
import { urlAnatomy } from "../url-anatomy";

const run = (url: string) => urlAnatomy(url, analyzeUrl(url).rules.filter(r => r.triggered).map(r => r.id));

describe("urlAnatomy", () => {
  it("labels and flags the parts of a look-alike URL", () => {
    const tokens = run("http://paypal-login.verify-account.xyz/signin");
    expect(tokens.map(t => t.kind)).toEqual(["scheme", "sub", "domain", "tld", "path"]);
    expect(tokens[0].flags).toContain("no-https");
    expect(tokens[1].flags).toContain("brand-impersonation");
    expect(tokens[3].flags).toContain("suspicious-tld");
    expect(tokens.map(t => t.text).join("")).toBe("http://paypal-login.verify-account.xyz/signin");
  });

  it("leaves a clean URL unflagged", () => {
    expect(run("https://github.com/Aldani-MO").every(t => t.flags.length === 0)).toBe(true);
  });

  it("treats IP hosts, credentials and redirect queries as their own parts", () => {
    const tokens = run("http://user@192.168.0.1:8080/x?redirect=https://evil.example");
    expect(tokens.map(t => t.kind)).toEqual(["scheme", "user", "ip", "port", "path", "query"]);
    expect(tokens.find(t => t.kind === "ip")?.flags).toContain("ip-hostname");
    expect(tokens.find(t => t.kind === "query")?.flags).toContain("redirect-param");
  });

  it("returns nothing for input the scorer rejects", () => {
    expect(run("javascript:alert(1)")).toEqual([]);
  });
});
