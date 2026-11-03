"use client";

import { useTranslations } from "next-intl";
import { Nav } from "@/components/Nav";
import { HUD } from "@/components/HUD";
import { RouteAnimation } from "@/components/RouteAnimation";
import { PhishCheckerDemo } from "@/components/PhishCheckerDemo";
import { EdgeAIDemo } from "@/components/EdgeAIDemo";
import { ContactForm } from "@/components/ContactForm";
import { CommandPalette } from "@/components/CommandPalette";
import { Certificates, PersonalDetails } from "@/components/ProfileDetails";
import { useEffect } from "react";

interface PortfolioPageProps {
  locale: string;
  contactEnabled?: boolean;
}

export function PortfolioPage({ locale, contactEnabled = false }: PortfolioPageProps) {
  const isAr = locale === "ar";
  const depot = useTranslations("depot");
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
        ? "%c مهندس برمجيات · الكويت · عمّان\n%c github.com/Aldani-MO"
        : "%c Software Engineer · Kuwait · Amman\n%c github.com/Aldani-MO",
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
      fill.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <>
      {/* Skip link */}
      <a
        href="#projects" onClick={() => document.documentElement.dataset.ride = "static"}
        className="skip-link"
        style={{ position: "fixed", top: "var(--space-2)", insetInlineStart: "var(--route-col-width)", zIndex: 9999 }}
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

      {/* Page grid */}
      <div className="page-grid" id="static">

        {/* Route column with animated SVG */}
        <div className="route-col" aria-hidden="true">
          <RouteAnimation />
        </div>

        {/* Content */}
        <main className="content-col" id="main-content" tabIndex={-1}>

          {/* ── DEPOT — Hero ──────────────────────────────────────────── */}
          <section id="depot" className="station hero" aria-labelledby="hero-name">


            <div className="hero-layout"><div className="hero-copy">
              <p className="hero-tag">{depot("tag")}</p>

              <h1 id="hero-name" className="hero-name">
                {depot("name").split("\n").map((line, i) => (
                  <span key={i} style={{ display: "block" }}>
                    {line}
                  </span>
                ))}
              </h1>

              <p className="hero-title">
                {isAr ? "مهندس برمجيات" : "Software Engineer"}
              </p>

              <p className="hero-bio">{depot("bio")}</p>

              <div className="hero-actions">
                <a className="btn" href="#projects">{depot("cta")}</a>
                <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="text-link">
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
              <aside className="route-index" aria-label={isAr ? "دليل الأعمال" : "Selected work index"}>
                <div className="index-heading"><span>{isAr ? "أعمال مختارة" : "SELECTED WORK"}</span><span dir="ltr">01 / 03</span></div>
                <p className="index-intro">{isAr ? "تطبيقات ويب، نقل، وأدوات أمنية." : "Web applications, transit and security."}</p>
                <a href="#project-sdbs"><span className="index-number">01</span><span><strong>{isAr ? "نظام الحافلات الذكي" : "Smart Dynamic Bus System"}</strong><small dir="ltr">Flutter / Firebase / Python</small></span><span aria-hidden="true">↗</span></a>
                <a href="#project-phish"><span className="index-number">02</span><span><strong>{isAr ? "كاشف روابط التصيّد" : "Phish Checker"}</strong><small dir="ltr">Python / TypeScript / Docker</small></span><span aria-hidden="true">↗</span></a>
                <a href="#project-pharmacy"><span className="index-number">03</span><span><strong>{isAr ? "نظام إدارة الصيدلية" : "Pharmacy Management System"}</strong><small dir="ltr">C++ / OOP</small></span><span aria-hidden="true">↗</span></a>
                <p className="index-foot">{isAr ? "تجارب تفاعلية وروابط الكود أدناه." : "Interactive demos and source code below."}</p>
              </aside>
            </div>
          </section>

          {/* ── STOP 01 — About ───────────────────────────────────────── */}
          <section id="about" className="station" aria-labelledby="about-heading">
            <div className="station-header">
              <span className="station-id">{about("stationId")}</span>
              <h2 id="about-heading" className="station-name">{about("title")}</h2>
            </div>

            <div className="station-content">
              <div className="split-layout">

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

          <PersonalDetails locale={isAr ? "ar" : "en"} />

          {/* ── STOP 02 — Projects ────────────────────────────────────── */}
          <section id="projects" className="station" aria-labelledby="projects-heading">
            <div className="station-header">
              <span className="station-id">{projects("stationId")}</span>
              <h2 id="projects-heading" className="station-name">{projects("title")}</h2>
            </div>

            <div className="station-content">

              {/* PROJECT 01 — SDBS (Flagship) */}
              <article className="project-panel" id="project-sdbs">
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
              </article>

              {/* PROJECT 02 — Phish Checker */}
              <article className="project-panel" id="project-phish">
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
              </article>

              {/* PROJECT 03 — Pharmacy */}
              <article className="project-panel project-compact" id="project-pharmacy">
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
              </article>

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
              {(skills.raw("groups") as { label: string; lineColour: string; stops: string[] }[]).map((_, i) => {
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

          <Certificates locale={isAr ? "ar" : "en"} />

          {/* ── TERMINUS — Contact ────────────────────────────────────── */}
          <section id="contact" className="station" aria-labelledby="contact-heading">
            <div className="station-header">
              <span className="station-id">{contact("stationId")}</span>
              <h2 id="contact-heading" className="station-name">{contact("title")}</h2>
            </div>

            <div className="station-content">
              <div className="split-layout">

                {/* Form */}
                <div>
                  <p style={{ color: "var(--color-muted)", marginBlockEnd: "var(--space-4)" }}>
                    {contact("intro")}
                  </p>
                  <ContactForm enabled={contactEnabled} />
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
                            borderBlockStart: "1px solid var(--color-rule)",
                            paddingBlock: "var(--space-2)",
                          }}
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

          <HUD />
          {/* ── Colophon ──────────────────────────────────────────────── */}
          <footer className="colophon" role="contentinfo">
            <div>
              {isAr ? "تقنيات الموقع" : "Built with"}: Next.js 16 · React 19 · TypeScript · Tailwind v4 · GSAP · next-intl
            </div>
            <div>
              {isAr ? "الخطوط" : "Type"}: Bricolage Grotesque · Martian Mono · IBM Plex Sans Arabic
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
