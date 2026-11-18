import { describe, expect, it } from "vitest";
import { advance, CAPACITY, createSim, pointAt, stepToNextStop, THRESHOLD, TOTAL } from "../route-sim";
import { computeDecision } from "../transit-decision";

describe("route simulation", () => {
  it("is deterministic from the same start", () => {
    const a = createSim(), b = createSim();
    for (let i = 0; i < 600; i++) { advance(a, 1 / 30); advance(b, 1 / 30); }
    expect(a).toEqual(b);
  });

  it("applies the real decision rules and keeps occupancy within capacity", () => {
    const s = createSim();
    const seen = new Set<string>();
    for (let i = 0; i < 40; i++) {
      const stop = s.stops[s.next >= s.stops.length ? 0 : s.next];
      const before = { occ: s.next >= s.stops.length ? null : s.occ, waiting: stop.waiting };
      stepToNextStop(s);
      const log = s.log!;
      if (before.occ !== null) expect(log.decision).toBe(computeDecision(before.waiting, before.occ, CAPACITY, THRESHOLD));
      expect(s.occ).toBeGreaterThanOrEqual(0);
      expect(s.occ).toBeLessThanOrEqual(CAPACITY);
      seen.add(log.decision);
    }
    expect(seen).toEqual(new Set(["STOP", "SKIP", "EARLY-DEPART"]));
  });

  it("follows the drawn route", () => {
    expect(pointAt(0)).toMatchObject({ x: 24, y: 150 });
    expect(pointAt(TOTAL)).toMatchObject({ x: 458, y: 58 });
  });
});
