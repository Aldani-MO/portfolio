"use client";

import { useTranslations } from "next-intl";
import { Nav } from "@/components/Nav";
import { HUD } from "@/components/HUD";
import { RouteAnimation } from "@/components/RouteAnimation";
import { PhishCheckerDemo } from "@/components/PhishCheckerDemo";
import { EdgeAIDemo } from "@/components/EdgeAIDemo";
import { ContactForm } from "@/components/ContactForm";
import { CommandPalette } from "@/components/CommandPalette";
import { useEffect } from "react";

interface PortfolioPageProps {
  locale: string;
}

export function PortfolioPage({ locale }: PortfolioPageProps) {
  const isAr = locale === "ar";
  const depot = useTranslations("depot");
  const nav = useTranslations("nav");
  const about = useTranslations("about");
  const projects = useTranslations("projects");
  const experience = useTranslations("experience");
  const skills = useTranslations("skills");
  const contact = useTranslations("contact");
  const skipRide = useTranslations();

  // Console greeting
  useEffect(() => {
    console.log(
      isAr ? "%c MA_ — محمد الضاني" : "%c MA_ — Mohamed Aldani",
      "font-family: monospace; font-size: 16px; color: #F5A623; font-weight: bold;"
    );
    console.log(
      isAr
        ? "%c مطوّر متكامل · الكويت · عمّان\n%c github.com/Aldani-MO\n\nNext.js 16 · TypeScript · GSAP · Tailwind v4"
        : "%c Full-Stack Developer · Kuwait · Amman\n%c github.com/Aldani-MO\n\nBuilt with Next.js 16 · TypeScript · GSAP · Tailwind v4\nFonts: Bricolage Grotesque · Martian Mono · Readex Pro",
      "font-family: monospace; color: #E8E3D8;",
      "font-family: monospace; color: #6B6E63;"
    );
  }, [isAr]);

  // Mobile scroll progress bar
  useEffect(() => {
    const fill = document.querySelector(".mobile-route-fill") as HTMLElement;
    if (!fill) return;
    const update = () => {
      const scrollable = document.body.scrollHeight - window.innerHeight;
      fill.style.width = `${(window.scrollY / scrollable) * 100}%`;
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <>
      {/* Skip link */}
      <a
        href="#static"
        className="visually-hidden"
        style={{ position: "fixed", top: "var(--space-2)", insetInlineStart: "var(--route-col-width)", zIndex: 9999 }}
        onFocus={(e) => (e.currentTarget.style.clip = "unset")}
      >
        {skipRide("skipRide")}
      </a>

      {/* Mobile route progress bar */}
      <div className="mobile-route-bar" aria-hidden="true">
        <div className="mobile-route-fill" />
      </div>

      {/* Command Palette */}
      <CommandPalette locale={locale} />

      {/* Navigation */}
      <Nav locale={locale} />

      {/* HUD */}
      <HUD />

      {/* Page grid */}
      <div className="page-grid" id="static">

        {/* Route column with animated SVG */}
        <div className="route-col" aria-hidden="true">
          <RouteAnimation />
        </div>

        {/* Content */}
        <main className="content-col" style={{ paddingBlockStart: "calc(var(--space-8) + 48px)" }}>

          {/* ── DEPOT — Hero ──────────────────────────────────────────── */}
          <section id="depot" className="station hero" aria-labelledby="hero-name">
            <div className="grain-overlay" aria-hidden="true" />

            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  display: "flex",
                  gap: "var(--space-2)",
                  alignItems: "center",
                  marginBlockEnd: "var(--space-2)",
                }}
              >
                <span className="route-badge">LINE 01</span>
                <span className="station-id">{depot("stationId")}</span>
              </div>

              <p className="hero-tag">{depot("tag")}</p>

              <h1 id="hero-name" className="hero-name">
                {depot("name").split("\n").map((line, i) => (
                  <span key={i} style={{ display: "block" }}>
                    {line}
                  </span>
                ))}
              </h1>

              <p className="hero-title">Full-Stack Developer</p>

              <p className="hero-bio">{depot("bio")}</p>

              <div className="hero-actions">
                <button
                  className="btn"
                  onClick={() =>
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  {depot("cta")}
                </button>
                <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  {depot("cv")}
                </a>
              </div>

              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  color: "var(--color-muted)",
                  marginBlockStart: "var(--space-4)",
                }}
              >
                {depot("cmdHint")}
              </p>
            </div>
          </section>

          {/* ── STOP 01 — About ───────────────────────────────────────── */}
          <section id="about" className="station" aria-labelledby="about-heading">
            <div className="station-header">
              <span className="station-id">{about("stationId")}</span>
              <h2 id="about-heading" className="station-name">{about("title")}</h2>
            </div>

            <div className="station-content">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-8)" }}>

                {/* Education */}
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-xs)",
                      color: "var(--color-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      marginBlockEnd: "var(--space-3)",
                    }}
                  >
                    {about("education.label")}
                  </h3>

                  <div
                    style={{
                      borderInlineStart: "2px solid var(--color-line-amber)",
                      paddingInlineStart: "var(--space-3)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-xs)",
                        color: "var(--color-line-amber)",
                        marginBlockEnd: "0.25em",
                      }}
                    >
                      {about("education.period")}
                    </p>
                    <p style={{ fontSize: "var(--text-md)", fontWeight: 700, marginBlockEnd: "0.15em" }}>
                      {about("education.degree")}
                    </p>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--color-muted)", marginBlockEnd: "0.15em" }}>
                      {about("education.school")}
                    </p>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--color-muted)", marginBlockEnd: "var(--space-2)" }}>
                      {about("education.location")}
                    </p>
                    <p style={{ fontSize: "var(--text-sm)", color: "var(--color-muted)" }}>
                      {about("education.note")}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-xs)",
                        color: "var(--color-muted)",
                        marginBlockStart: "var(--space-2)",
                        lineHeight: 1.8,
                      }}
                    >
                      {about("education.coursework")}
                    </p>
                  </div>
                </div>

                {/* Activities */}
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-xs)",
                      color: "var(--color-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      marginBlockEnd: "var(--space-3)",
                    }}
                  >
                    {about("activities.label")}
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                    {(["ieee", "sec"] as const).map((key) => (
                      <div
                        key={key}
                        style={{
                          borderInlineStart: "2px solid var(--color-rule)",
                          paddingInlineStart: "var(--space-3)",
                          fontSize: "var(--text-sm)",
                          color: "var(--color-muted)",
                        }}
                      >
                        {about(`activities.${key}`)}
                      </div>
                    ))}
                  </div>

                  {/* Location info */}
                  <div style={{ marginBlockStart: "var(--space-6)" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-xs)",
                        color: "var(--color-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        marginBlockEnd: "var(--space-2)",
                      }}
                    >
                      {isAr ? "اللغات" : "Languages"}
                    </h3>
                    <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
                      {[
                        { lang: isAr ? "العربية" : "Arabic", level: isAr ? "اللغة الأم" : "Native" },
                        { lang: isAr ? "الإنجليزية" : "English", level: isAr ? "طلاقة" : "Fluent" },
                      ].map(({ lang, level }) => (
                        <div
                          key={lang}
                          style={{
                            border: "1px solid var(--color-rule)",
                            padding: "0.4em 0.8em",
                            fontFamily: "var(--font-mono)",
                            fontSize: "var(--text-xs)",
                          }}
                        >
                          <span style={{ color: "var(--color-ink)" }}>{lang}</span>
                          <span style={{ color: "var(--color-muted)", marginInlineStart: "0.5em" }}>· {level}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── STOP 02 — Projects ────────────────────────────────────── */}
          <section id="projects" className="station" aria-labelledby="projects-heading">
            <div className="station-header">
              <span className="station-id">{projects("stationId")}</span>
              <h2 id="projects-heading" className="station-name">{projects("title")}</h2>
            </div>

            <div className="station-content">

              {/* PROJECT 01 — SDBS (Flagship) */}
              <div className="project-panel">
                <div className="project-info">
                  <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", marginBlockEnd: "var(--space-1)" }}>
                    <span className="route-badge">LINE {projects("sdbs.number")}</span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--text-xs)",
                        color: "var(--color-line-amber)",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {projects("flagship")}
                    </span>
                  </div>
                  <div className="project-number" aria-hidden="true">
                    {projects("sdbs.number")}
                  </div>
                  <h3 className="project-title">{projects("sdbs.title")}</h3>
                  <p className="project-desc">{projects("sdbs.description")}</p>

                  <div className="tech-tags">
                    {projects("sdbs.subtitle").split(" · ").map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>

                  {/* Decision engine highlights */}
                  <ul
                    style={{
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.4em",
                      marginBlockEnd: "var(--space-4)",
                    }}
                  >
                    {((projects.raw("sdbs.highlights") as string[]) || []).map((highlight, i) => (
                      <li
                        key={i}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "var(--text-xs)",
                          color: "var(--color-muted)",
                          paddingInlineStart: "var(--space-2)",
                          borderInlineStart: "1px solid var(--color-rule)",
                        }}
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="https://github.com/Aldani-MO/smart-dynamic-bus-system"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                  >
                    {projects("viewRepo")}
                  </a>
                </div>

                <div className="project-demo">
                  <div style={{ marginBlockEnd: "var(--space-2)" }}>
                    <span className="station-id">{projects("sdbs.demoLabel")}</span>
                  </div>
                  <EdgeAIDemo />
                </div>
              </div>

              {/* PROJECT 02 — Phish Checker */}
              <div className="project-panel">
                <div className="project-demo">
                  <div style={{ marginBlockEnd: "var(--space-2)" }}>
                    <span className="station-id">{projects("phish.demoLabel")}</span>
                  </div>
                  <PhishCheckerDemo />
                </div>

                <div className="project-info">
                  <div className="route-badge" style={{ marginBlockEnd: "var(--space-1)" }}>LINE {projects("phish.number")}</div>
                  <div className="project-number" aria-hidden="true">
                    {projects("phish.number")}
                  </div>
                  <h3 className="project-title">{projects("phish.title")}</h3>
                  <p className="project-desc">{projects("phish.description")}</p>

                  <div className="tech-tags">
                    {projects("phish.subtitle").split(" · ").map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>

                  <a
                    href="https://github.com/Aldani-MO/phish-Checker"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                  >
                    {projects("viewRepo")}
                  </a>
                </div>
              </div>

              {/* PROJECT 03 — Pharmacy */}
              <div className="project-panel" style={{ gridTemplateColumns: "1fr" }}>
                <div className="project-info">
                  <div className="route-badge" style={{ marginBlockEnd: "var(--space-1)" }}>LINE {projects("pharmacy.number")}</div>
                  <div className="project-number" aria-hidden="true">
                    {projects("pharmacy.number")}
                  </div>
                  <h3 className="project-title">{projects("pharmacy.title")}</h3>
                  <p className="project-desc">{projects("pharmacy.description")}</p>

                  <div className="tech-tags">
                    {projects("pharmacy.subtitle").split(" · ").map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>

                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4em" }}>
                    {((projects.raw("pharmacy.highlights") as string[]) || []).map((highlight, i) => (
                      <li
                        key={i}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "var(--text-xs)",
                          color: "var(--color-muted)",
                          paddingInlineStart: "var(--space-2)",
                          borderInlineStart: "1px solid var(--color-rule)",
                        }}
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </section>

          {/* ── STOP 03 — Experience ──────────────────────────────────── */}
          <section id="experience" className="station" aria-labelledby="experience-heading">
            <div className="station-header">
              <span className="station-id">{experience("stationId")}</span>
              <h2 id="experience-heading" className="station-name">{experience("title")}</h2>
            </div>

            <div className="station-content">
              <table className="timetable" aria-label="Work experience">
                <thead>
                  <tr>
                    <th scope="col">{experience("cols.period")}</th>
                    <th scope="col">{experience("cols.role")}</th>
                    <th scope="col">{experience("cols.details")}</th>
                  </tr>
                </thead>
                <tbody>
                  {[0, 1].map((i) => {
                    const bullets = (experience.raw(`roles.${i}.bullets`) as string[]) || [];
                    return (
                      <tr key={i}>
                        <td>
                          <span className="exp-period">{experience(`roles.${i}.period` as "roles.0.period")}</span>
                        </td>
                        <td>
                          <div className="exp-role">{experience(`roles.${i}.role` as "roles.0.role")}</div>
                          <div className="exp-company">{experience(`roles.${i}.company` as "roles.0.company")}</div>
                        </td>
                        <td>
                          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4em" }}>
                            {bullets.map((text, j) => (
                              <li
                                key={j}
                                style={{
                                  fontSize: "var(--text-sm)",
                                  color: "var(--color-muted)",
                                  paddingInlineStart: "var(--space-2)",
                                  borderInlineStart: "1px solid var(--color-rule)",
                                }}
                              >
                                {text}
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── STOP 04 — Skills ──────────────────────────────────────── */}
          <section id="skills" className="station" aria-labelledby="skills-heading">
            <div className="station-header">
              <span className="station-id">{skills("stationId")}</span>
              <h2 id="skills-heading" className="station-name">{skills("title")}</h2>
            </div>

            <div className="station-content">
              {[0, 1, 2, 3].map((i) => {
                const groupKey = `groups.${i}` as "groups.0";
                const stops = (skills.raw(`${groupKey}.stops`) as string[]) || [];
                const lineColour = skills(`${groupKey}.lineColour` as "groups.0.lineColour");
                return (
                  <div key={i} className="skill-group">
                    <div className="skill-group-label">
                      {skills(`${groupKey}.label` as "groups.0.label")}
                    </div>
                    <div
                      className="skill-stops"
                      style={{
                        borderInlineStartColor:
                          lineColour === "green"
                            ? "var(--color-line-green)"
                            : lineColour === "muted"
                            ? "var(--color-muted)"
                            : "var(--color-line-amber)",
                      }}
                    >
                      {stops.map((stop) => (
                        <span key={stop} className="skill-stop">
                          {stop.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── TERMINUS — Contact ────────────────────────────────────── */}
          <section id="contact" className="station" aria-labelledby="contact-heading">
            <div className="station-header">
              <span className="station-id">{contact("stationId")}</span>
              <h2 id="contact-heading" className="station-name">{contact("title")}</h2>
            </div>

            <div className="station-content">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-8)" }}>

                {/* Form */}
                <div>
                  <p style={{ color: "var(--color-muted)", marginBlockEnd: "var(--space-4)" }}>
                    {contact("intro")}
                  </p>
                  <ContactForm />
                </div>

                {/* Links */}
                <div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                    {[
                      { label: "Email", value: contact("links.email"), href: `mailto:${contact("links.email")}` },
                      { label: "GitHub", value: contact("links.github"), href: "https://github.com/Aldani-MO" },
                      { label: "LinkedIn", value: contact("links.linkedin"), href: "https://linkedin.com/in/Mohamed-Aldani" },
                    ].map(({ label, value, href }) => (
                      <a
                        key={label}
                        href={href}
                        target={href.startsWith("mailto") ? undefined : "_blank"}
                        rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                        style={{ display: "block", textDecoration: "none" }}
                      >
                        <div
                          style={{
                            border: "1px solid var(--color-rule)",
                            padding: "var(--space-2) var(--space-3)",
                            transition: "border-color var(--duration-fast)",
                          }}
                          onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLElement).style.borderColor =
                              "var(--color-line-amber)")
                          }
                          onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLElement).style.borderColor =
                              "var(--color-rule)")
                          }
                        >
                          <div
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "var(--text-xs)",
                              color: "var(--color-muted)",
                              textTransform: "uppercase",
                              letterSpacing: "0.1em",
                            }}
                          >
                            {label}
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "var(--text-sm)",
                              color: "var(--color-ink)",
                              marginBlockStart: "0.2em",
                            }}
                          >
                            {value}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Colophon ──────────────────────────────────────────────── */}
          <footer className="colophon" role="contentinfo">
            <div>
              Built with Next.js 16 · React 19 · TypeScript · Tailwind v4 · GSAP
            </div>
            <div>
              Fonts: Bricolage Grotesque · Martian Mono · Readex Pro (Google Fonts)
            </div>
            <div style={{ marginBlockStart: "0.5em" }}>
              <a
                href="/humans.txt"
                style={{ color: "var(--color-muted)", textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                humans.txt
              </a>
              {" · "}
              <span>© {new Date().getFullYear()} Mohamed Aldani</span>
            </div>
          </footer>

        </main>
      </div>
    </>
  );
}
