"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

interface NavProps {
  locale: string;
}

export function Nav({ locale }: NavProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="site-nav" role="navigation" aria-label="Site navigation">
      <button
        className="nav-logo"
        onClick={() => scrollTo("depot")}
        aria-label="Go to top"
        style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
      >
        MA_
      </button>

      <ul className="nav-links">
        {[
          { key: "about",      id: "about" },
          { key: "projects",   id: "projects" },
          { key: "experience", id: "experience" },
          { key: "skills",     id: "skills" },
          { key: "contact",    id: "contact" },
        ].map(({ key, id }) => (
          <li key={key}>
            <button
              className="nav-link"
              onClick={() => scrollTo(id)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              {t(key as "about")}
            </button>
          </li>
        ))}

        <li>
          <button
            className="nav-link"
            onClick={toggleLocale}
            aria-label={`Switch to ${locale === "en" ? "Arabic" : "English"}`}
            style={{
              background: "none",
              border: "1px solid var(--color-rule)",
              cursor: "pointer",
              padding: "0.2em 0.6em",
              color: "var(--color-line-amber)",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
            }}
          >
            {t("switchLang")}
          </button>
        </li>

        <li>
          <button
            className="nav-link"
            onClick={() =>
              window.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
              )
            }
            aria-label="Open command palette"
            style={{
              background: "none",
              border: "1px solid var(--color-rule)",
              cursor: "pointer",
              padding: "0.2em 0.6em",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
            }}
          >
            ⌘K
          </button>
        </li>
      </ul>
    </nav>
  );
}
