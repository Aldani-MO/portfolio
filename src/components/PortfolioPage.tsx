import Image from "next/image";
import { Nav } from "@/components/Nav";
import { PhishCheckerDemo } from "@/components/PhishCheckerDemo";
import { EdgeAIDemo } from "@/components/EdgeAIDemo";
import { ContactForm } from "@/components/ContactForm";
import { CommandPalette } from "@/components/CommandPalette";
import {
  board, contact, credentials, credentialText, CV, decisionLabel, education, EMAIL, experience, fmtDate,
  GITHUB, hero, pharmacy, phish, sdbs, sections, skills, skillsNote, usedIn, type L, type Locale,
} from "@/content/portfolio";

export function Arrow({ external = false }: { external?: boolean }) {
  return (
    <svg className={external ? "icon icon-ext" : "icon icon-arrow"} viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
      {external ? <path d="M5 11 11 5M6 5h5v5" /> : <path d="M3 8h10M9 4l4 4-4 4" />}
    </svg>
  );
}

function StationHead({ code, id, title, lede }: { code: string; id: string; title: string; lede?: string }) {
  return (
    <header className="station-head">
      <h2 id={id}><span className="stop-plate" aria-hidden="true">{code}</span>{title}</h2>
      {lede && <p className="station-lede">{lede}</p>}
    </header>
  );
}

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;


export function PortfolioPage({ locale: raw, contactEnabled = false }: { locale: string; contactEnabled?: boolean }) {
  const locale: Locale = raw === "ar" ? "ar" : "en";
  const t = (v: L) => v[locale];
  const isAr = locale === "ar";
  const newTab = isAr ? " (يفتح في نافذة جديدة)" : " (opens in a new tab)";

  return (
    <>
      <a href="#main-content" className="skip-link">{isAr ? "انتقل إلى المحتوى" : "Skip to content"}</a>
      <CommandPalette locale={locale} />
      <Nav locale={locale} />

      <div className="page-grid">
        <div className="route-col" aria-hidden="true"><span className="route-bus" /></div>

        <main className="content-col" id="main-content" tabIndex={-1}>
          {/* Hero */}
          <section id="depot" className="station hero" aria-labelledby="hero-name">
            <div className="hero-copy">
              <div className="hero-id">
                <Image className="hero-photo" src="/mypic.jpeg" width={598} height={691} alt={isAr ? "صورة محمد الضاني" : "Portrait of Mohamed Aldani"} sizes="(max-width: 600px) 96px, 168px" loading="eager" fetchPriority="high" />
                <h1 id="hero-name" className="hero-name">
                  {t(hero.name).split("\n").map(line => <span key={line}>{line}</span>)}
                </h1>
              </div>
              <p className="hero-role">{t(hero.role)}</p>
              <p className="hero-lede">{t(hero.lede)}</p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#projects">{t(hero.primary)}<Arrow /></a>
                <a className="btn" href={CV} download="Mohamed-Aldani-CV.pdf">{t(hero.cv)}</a>
                <a className="text-link" href={`mailto:${EMAIL}`}>{t(hero.email)}</a>
              </div>
              <dl className="hero-facts">
                {hero.facts.map(f => <div key={f.k.en}><dt>{t(f.k)}</dt><dd>{t(f.v)}</dd></div>)}
              </dl>
            </div>

            <nav className="board" aria-labelledby="board-title">
              <div className="board-head"><span id="board-title">{t(hero.board)}</span><span>{board.length} {isAr ? "خطوط" : "lines"}</span></div>
              <ol className="board-rows">
                {board.map(row => (
                  <li key={row.id}>
                    <a href={`#${row.id}`}>
                      <span className="line-no" dir="ltr">{row.n}</span>
                      <span className="board-title">{t(row.title)}<small dir="ltr">{row.stack}</small><span className="board-blurb">{t(row.blurb)}</span></span>
                      <span className="board-status">{t(row.status)}</span>
                    </a>
                  </li>
                ))}
              </ol>
              <div className="board-foot">
                <span className="live-dot" aria-hidden="true" />
                <span>{t(hero.status)}</span>
                <a href={`mailto:${EMAIL}`}>{t(hero.email)}<Arrow /></a>
              </div>
            </nav>
          </section>

          {/* 01 Work */}
          <section id="projects" className="station" aria-labelledby="projects-heading">
            <StationHead code="1" id="projects-heading" title={t(sections.work)} />

            <article className="case" id="project-sdbs" aria-labelledby="sdbs-title">
              <div className="case-intro">
                <h3 id="sdbs-title" className="project-title"><span className="line-no" dir="ltr">1</span>{t(sdbs.title)}</h3>
                <p className="project-summary">{t(sdbs.summary)}</p>
                <dl className="meta-list">
                  {sdbs.meta.map(m => <div key={m.k.en}><dt>{t(m.k)}</dt><dd>{t(m.v)}</dd></div>)}
                </dl>
                <a className="btn" href={sdbs.repo} {...ext}>{isAr ? "الكود على GitHub" : "Source on GitHub"}<Arrow external /><span className="sr-only">{newTab}</span></a>
              </div>

              <div className="gallery" role="list" tabIndex={0} aria-label={isAr ? "لقطات من التطبيق" : "App screenshots"}>
                {sdbs.shots.map(s => (
                  <figure key={s.src} role="listitem" className={s.wide ? "shot shot-wide" : "shot"}>
                    <Image src={s.src} width={s.w} height={s.h} alt={t(s.cap)} sizes={s.wide ? "(max-width: 768px) 88vw, 560px" : "(max-width: 768px) 46vw, 180px"} />
                    <figcaption>{t(s.cap)}</figcaption>
                  </figure>
                ))}
              </div>

              <div className="flow">
                <h4>{t(sdbs.flowTitle)}</h4>
                <ol className="flow-line">
                  {sdbs.flow.map(f => <li key={f.t.en}><strong>{t(f.t)}</strong><p>{t(f.d)}</p></li>)}
                </ol>
              </div>

              <div className="case-logic">
                <div>
                  <h4>{t(sdbs.rulesTitle)}</h4>
                  <ol className="rules">
                    {sdbs.rules.map(r => (
                      <li key={r.if.en}><span>{t(r.if)}</span><span className={`signal signal-${r.then.toLowerCase()}`}>{t(decisionLabel[r.then])}</span></li>
                    ))}
                  </ol>
                </div>
                <div className="demo-panel">
                  <h4>{t(sdbs.demoTitle)}</h4>
                  <EdgeAIDemo />
                </div>
              </div>
            </article>

            <article className="case case-split" id="project-phish" aria-labelledby="phish-title">
              <div className="case-intro">
                <h3 id="phish-title" className="project-title"><span className="line-no" dir="ltr">2</span>{t(phish.title)}</h3>
                <p className="project-summary">{t(phish.summary)}</p>
                <p className="stack" dir="ltr">{phish.stack}</p>
                <figure className="shot shot-terminal">
                  <Image src={phish.shot.src} width={phish.shot.w} height={phish.shot.h} alt={t(phish.shot.cap)} sizes="(max-width: 768px) 92vw, 520px" />
                  <figcaption>{t(phish.shot.cap)}</figcaption>
                </figure>
                <a className="btn" href={phish.repo} {...ext}>{isAr ? "الكود على GitHub" : "Source on GitHub"}<Arrow external /><span className="sr-only">{newTab}</span></a>
              </div>
              <div className="demo-panel">
                <h4>{t(phish.demoTitle)}</h4>
                <PhishCheckerDemo />
              </div>
            </article>

            <article className="case case-compact" id="project-pharmacy" aria-labelledby="pharmacy-title">
              <h3 id="pharmacy-title" className="project-title"><span className="line-no" dir="ltr">3</span>{t(pharmacy.title)}</h3>
              <div>
                <p className="project-summary">{t(pharmacy.summary)}</p>
                <p className="stack" dir="ltr">{pharmacy.stack}</p>
              </div>
              <div>
                <ul className="plain-list">{pharmacy.points.map(p => <li key={p.en}>{t(p)}</li>)}</ul>
                <p className="muted">{t(pharmacy.note)}</p>
              </div>
            </article>
          </section>

          {/* 02 Experience */}
          <section id="experience" className="station" aria-labelledby="experience-heading">
            <StationHead code="2" id="experience-heading" title={t(sections.experience)} />
            <ol className="timetable">
              {experience.map(job => (
                <li key={job.role.en}>
                  <p className="tt-time">{t(job.period)}</p>
                  <div>
                    <h3 className="tt-role">{t(job.role)}</h3>
                    <p className="tt-org">{t(job.org)}</p>
                    <p className="stack" dir="ltr">{job.stack}</p>
                  </div>
                  <ul className="plain-list">{job.points.map(p => <li key={p.en}>{t(p)}</li>)}</ul>
                </li>
              ))}
            </ol>
          </section>

          {/* 03 Skills */}
          <section id="skills" className="station" aria-labelledby="skills-heading">
            <StationHead code="3" id="skills-heading" title={t(sections.skills)} />
            <dl className="skill-table">
              {skills.map(s => (
                <div key={s.label.en}>
                  <dt>{t(s.label)}</dt>
                  <dd className="skill-items" dir="ltr">{s.items}</dd>
                  <dd className="skill-used"><span className="sr-only">{t(usedIn)}: </span>{t(s.used)}</dd>
                </div>
              ))}
            </dl>
            <p className="muted skills-note">{t(skillsNote)}</p>
          </section>

          {/* 04 Education */}
          <section id="about" className="station" aria-labelledby="about-heading">
            <StationHead code="4" id="about-heading" title={t(sections.education)} />
            <div className="edu">
              <div>
                <h3 className="edu-degree">{t(education.degree)}</h3>
                <p className="edu-school">{t(education.school)}</p>
                <p className="tt-time">{t(education.where)}</p>
                <p className="muted">{t(education.note)}</p>
                <h4 className="minor-head">{t(education.courseLabel)}</h4>
                <p>{t(education.courses)}</p>
              </div>
              <div>
                <h4 className="minor-head">{t(education.actLabel)}</h4>
                <ul className="activity-list">
                  {education.activities.map(a => (
                    <li key={a.t.en}><strong>{t(a.t)}</strong> <span className="tt-time">{t(a.when)}</span><p>{t(a.d)}</p></li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 05 Certificates */}
          <section id="certificates" className="station" aria-labelledby="certificates-heading">
            <StationHead code="5" id="certificates-heading" title={t(sections.certificates)} lede={t(credentialText.lede)} />
            <ul className="cred-list">
              {credentials.map(c => (
                <li key={c.id} className="cred">
                  {c.image && c.preview ? (
                    <a className="cred-art cred-cert" href={c.image} {...ext} aria-label={`${t(credentialText.view)}: ${c.title}${newTab}`}>
                      <Image src={c.image} width={720} height={556} alt="" sizes="128px" />
                    </a>
                  ) : (
                    <div className="cred-art" aria-hidden="true">
                      {c.image ? <Image src={c.image} width={400} height={400} alt="" sizes="96px" /> : <span className="cred-mono">{c.issuer.en.split(",")[0]}</span>}
                    </div>
                  )}
                  <div className="cred-body">
                    <h3 lang="en" dir="ltr">{c.title}</h3>
                    <p className="cred-issuer">{t(c.issuer)} · {t(credentialText.kinds[c.kind])}</p>
                    <p className="muted">{t(c.context)}</p>
                  </div>
                  <dl className="cred-dates">
                    <div><dt>{t(credentialText.issued)}</dt><dd><time dateTime={c.issued}>{fmtDate(c.issued, locale)}</time></dd></div>
                    {c.validUntil && <div><dt>{t(credentialText.valid)}</dt><dd><time dateTime={c.validUntil}>{fmtDate(c.validUntil, locale)}</time></dd></div>}
                  </dl>
                  <a className="btn btn-small" href={c.url} {...ext} aria-label={`${t(credentialText.verify)}: ${c.title}${newTab}`}>{t(credentialText.verify)}<Arrow external /></a>
                </li>
              ))}
            </ul>
          </section>


          {/* Terminus */}
          <section id="contact" className="station terminus" aria-labelledby="contact-heading">
            <header className="station-head">
              <h2 id="contact-heading"><span className="stop-plate stop-plate-end" aria-hidden="true" />{t(sections.contact)}</h2>
              <p className="station-lede">{t(contact.lede)}</p>
            </header>
            <a className="contact-email" href={`mailto:${EMAIL}`} dir="ltr">{EMAIL}</a>
            <ul className="contact-links">
              {contact.links.map(l => (
                <li key={l.k}>
                  <a href={l.href} {...(l.href.startsWith("http") ? ext : { download: "Mohamed-Aldani-CV.pdf" })}>
                    <span className="contact-k">{l.k}</span>
                    <span className="contact-v" dir={typeof l.v === "string" ? "ltr" : undefined}>{typeof l.v === "string" ? l.v : t(l.v)}</span>
                    <Arrow external={l.href.startsWith("http")} />
                    {l.href.startsWith("http") && <span className="sr-only">{newTab}</span>}
                  </a>
                </li>
              ))}
            </ul>
            <ContactForm enabled={contactEnabled} />
          </section>

          <footer className="colophon">
            <p>{isAr ? "بُني هذا الموقع باستخدام Next.js وReact وTypeScript، ويُختبر بـ Vitest وPlaywright." : "Built with Next.js, React and TypeScript. Tested with Vitest and Playwright."}</p>
            <p><a href={GITHUB} {...ext}>GitHub</a> · <a href="/humans.txt">humans.txt</a> · © {new Date().getFullYear()} Mohamed Aldani</p>
          </footer>
        </main>
      </div>
    </>
  );
}
