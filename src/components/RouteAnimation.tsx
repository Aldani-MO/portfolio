"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);



export function RouteAnimation() {
  const busRef = useRef<SVGRectElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || window.innerWidth <= 768 || document.documentElement.dataset.ride === "static") return;

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

      // Content is always visible; only the route marker animates.
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
            x: point.x - 36,
            y: point.y - 60,
          });
        },
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
