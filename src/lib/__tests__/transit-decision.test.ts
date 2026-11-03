import { describe, it, expect } from "vitest";
import { computeDecision } from "../transit-decision";

describe("transit decision priorities", () => {
  it("skips empty stops and full buses", () => {
    expect(computeDecision(0, 18)).toBe("SKIP");
    expect(computeDecision(7, 50)).toBe("SKIP");
  });
  it("keeps STOP when demand exceeds seats, ahead of the early-depart rule", () => {
    expect(computeDecision(7, 46)).toBe("STOP");
  });
  it("departs early at the threshold when everyone fits", () => {
    expect(computeDecision(5, 45)).toBe("EARLY-DEPART");
  });
  it("stops for a small waiting group", () => {
    expect(computeDecision(4, 18)).toBe("STOP");
  });
});
