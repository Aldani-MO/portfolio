import { computeDecision, type Decision } from "./transit-decision";

// Toy line for the hero animation. Passenger arrivals are random; the decision is the real rule set.
export const CAPACITY = 50;
export const THRESHOLD = 5;
const SPEED = 80; // viewBox units per second
const MAX_WAITING = 14;
export const ROUTE: [number, number][] = [[24, 150], [124, 150], [170, 104], [304, 104], [350, 58], [458, 58]];
const RATES = [0.12, 0.45, 0.3, 0.55, 0.08, 0.35]; // arrivals per second at each stop
const STOP_AT = [0.03, 0.22, 0.43, 0.6, 0.8, 0.97];

const segs = ROUTE.slice(1).map((p, i) => {
  const [x0, y0] = ROUTE[i];
  return { x0, y0, dx: p[0] - x0, dy: p[1] - y0, len: Math.hypot(p[0] - x0, p[1] - y0) };
});
export const TOTAL = segs.reduce((a, s) => a + s.len, 0);

export function pointAt(d: number) {
  let rest = Math.max(0, Math.min(d, TOTAL));
  for (const s of segs) {
    if (rest <= s.len) return { x: s.x0 + (s.dx * rest) / s.len, y: s.y0 + (s.dy * rest) / s.len, angle: (Math.atan2(s.dy, s.dx) * 180) / Math.PI };
    rest -= s.len;
  }
  const s = segs[segs.length - 1];
  return { x: s.x0 + s.dx, y: s.y0 + s.dy, angle: (Math.atan2(s.dy, s.dx) * 180) / Math.PI };
}

export interface SimEvent { stop: number; waiting: number; occ: number; decision: Decision; boarded: number; alighted: number }
export interface SimStop { d: number; x: number; y: number; waiting: number; flag: Decision | null; flagUntil: number }
export interface SimState { t: number; busD: number; occ: number; next: number; dwell: number; seed: number; stops: SimStop[]; log: SimEvent | null }

function rand(s: SimState) {
  // mulberry32: deterministic so the server render and first client render match.
  let t = (s.seed = (s.seed + 0x6d2b79f5) | 0);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

export function createSim(): SimState {
  const start = [0, 2, 6, 1, 0, 4];
  return {
    t: 0, busD: 0, occ: 22, next: 0, dwell: 0, seed: 7, log: null,
    stops: STOP_AT.map((f, i) => { const p = pointAt(f * TOTAL); return { d: f * TOTAL, x: p.x, y: p.y, waiting: start[i], flag: null, flagUntil: 0 }; }),
  };
}

export function arrive(s: SimState) {
  const stop = s.stops[s.next];
  const waiting = stop.waiting;
  const decision = computeDecision(waiting, s.occ, CAPACITY, THRESHOLD);
  let boarded = 0, alighted = 0;
  if (decision !== "SKIP") {
    alighted = Math.min(s.occ, Math.floor(rand(s) * 7));
    s.occ -= alighted;
    boarded = Math.min(waiting, CAPACITY - s.occ);
    s.occ += boarded;
    stop.waiting -= boarded;
    s.dwell = decision === "EARLY-DEPART" ? 0.6 : 1.4;
  }
  stop.flag = decision;
  stop.flagUntil = s.t + 2.2;
  s.log = { stop: s.next, waiting, occ: s.occ, decision, boarded, alighted };
  s.next += 1;
}

function wrap(s: SimState) {
  s.busD = 0;
  s.next = 0;
  s.occ = 12 + Math.floor(rand(s) * 20);
}

/** Advance by dt seconds. Returns true when something other than the bus position changed. */
export function advance(s: SimState, dt: number): boolean {
  s.t += dt;
  let changed = false;
  s.stops.forEach((stop, i) => {
    if (stop.waiting < MAX_WAITING && rand(s) < RATES[i] * dt) { stop.waiting += 1; changed = true; }
    if (stop.flag && stop.flagUntil < s.t) { stop.flag = null; changed = true; }
  });
  if (s.dwell > 0) { s.dwell -= dt; return changed; }
  s.busD += SPEED * dt;
  if (s.next < s.stops.length && s.busD >= s.stops[s.next].d) {
    s.busD = s.stops[s.next].d;
    arrive(s);
    return true;
  }
  if (s.next >= s.stops.length && s.busD >= TOTAL) { wrap(s); return true; }
  return changed;
}

/** Jump straight to the next stop (used when motion is reduced or paused). */
export function stepToNextStop(s: SimState) {
  if (s.next >= s.stops.length) wrap(s);
  s.busD = s.stops[s.next].d;
  s.dwell = 0;
  arrive(s);
}
