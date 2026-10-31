"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const STATION_IDS = ["depot", "about", "projects", "experience", "skills", "contact"];

export function RouteAnimation() {
  const busRef = useRef<SVGRectElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Wait for DOM to be ready
    const init = () => {
      const line = lineRef.current;
      const bus = busRef.current;
      if (!line || !bus) return;

      // Draw the line
      const length = line.getTotalLength();
      gsap.set(line, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      const tl = gsap.timeline();
      tl.to(line, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "power2.inOut",
      });
      tl.from(bus, { opacity: 0, duration: 0.3 }, "-=0.2");

      // Hero text reveal
      tl.from(".hero-tag", { opacity: 0, y: 10, duration: 0.4 }, "-=0.1");
      tl.from(".hero-name", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, "-=0.2");
      tl.from(".hero-title", { opacity: 0, duration: 0.4 }, "-=0.2");
      tl.from(".hero-bio", { opacity: 0, x: -15, duration: 0.4 }, "-=0.1");
      tl.from(".hero-actions", { opacity: 0, y: 10, duration: 0.3 }, "-=0.1");

      // Station dot pulses
      gsap.utils.toArray<Element>(".station-dot").forEach((dot) => {
        tl.from(dot, { scale: 0, opacity: 0, duration: 0.2, transformOrigin: "center" }, "-=0.1");
      });

      // Scroll-driven bus travel
      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          if (!bus || !line) return;
          const progress = self.progress;
          const point = line.getPointAtLength(progress * length);
          gsap.set(bus, {
            x: point.x - 6,
            y: point.y - 10,
          });
        },
      });

      // Station section reveals
      STATION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const header = el.querySelector(".station-header");
        const content = el.querySelector(".station-content");
        if (header) {
          gsap.from(header, {
            scrollTrigger: { trigger: el, start: "top 70%", once: true },
            opacity: 0,
            x: -20,
            duration: 0.6,
            ease: "power2.out",
          });
        }
        if (content) {
          gsap.from(content, {
            scrollTrigger: { trigger: el, start: "top 60%", once: true },
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.15,
          });
        }
      });
    };

    // Small delay for DOM paint
    const timer = setTimeout(init, 100);
    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="route-svg"
      viewBox="0 0 72 2000"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "visible",
      }}
    >
      {/* The route line */}
      <path
        ref={lineRef}
        d="M 36 60 L 36 340 L 36 620 L 36 900 L 36 1180 L 36 1460 L 36 1940"
        stroke="var(--color-line-amber)"
        strokeWidth="2"
        fill="none"
        className="route-line-draw"
        strokeLinecap="round"
      />

      {/* Station dots */}
      {[60, 340, 620, 900, 1180, 1460, 1940].map((y, i) => (
        <g key={i}>
          <circle
            cx="36"
            cy={y}
            r="7"
            fill="var(--color-line-amber)"
            className="station-dot"
          />
          <circle
            cx="36"
            cy={y}
            r="3"
            fill="var(--color-ground)"
          />
        </g>
      ))}

      {/* Bus marker */}
      <rect
        ref={busRef}
        x="30"
        y="50"
        width="12"
        height="20"
        rx="2"
        fill="var(--color-line-amber)"
        className="bus-marker"
        aria-hidden="true"
      />
    </svg>
  );
}
