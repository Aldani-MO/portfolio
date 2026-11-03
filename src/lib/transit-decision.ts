export type Decision = "STOP" | "SKIP" | "EARLY-DEPART";

// Priority order mirrors the SDBS capacity-aware decision service.
export function computeDecision(waiting: number, occupancy: number, capacity = 50, threshold = 5): Decision {
  if (waiting === 0 || occupancy >= capacity) return "SKIP";
  if (waiting > capacity - occupancy) return "STOP";
  return waiting >= threshold ? "EARLY-DEPART" : "STOP";
}
