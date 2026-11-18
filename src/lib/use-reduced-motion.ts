"use client";
import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const mq = matchMedia(query);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/** Server render assumes motion is allowed; the client corrects it before the first animation frame. */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, () => matchMedia(query).matches, () => false);
}
