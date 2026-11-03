"use client";
import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
export function Nav({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const isAr = locale === "ar";
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const sync = () => setTheme(document.documentElement.dataset.theme || "light");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const systemTheme = () => {
      let saved = document.documentElement.dataset.themePreference;
      try { saved = localStorage.getItem("portfolio-theme") || saved; } catch {}
      document.documentElement.dataset.theme = saved === "light" || saved === "dark" ? saved : media.matches ? "dark" : "light";
    };
    const storageTheme = (event: StorageEvent) => {
      if (event.key !== "portfolio-theme") return;
      delete document.documentElement.dataset.themePreference;
      systemTheme();
    };
    systemTheme();
    media.addEventListener("change", systemTheme);
    window.addEventListener("storage", storageTheme);
    window.addEventListener("focus", systemTheme);
    document.addEventListener("visibilitychange", systemTheme);
    const resize = new ResizeObserver(() => {
      document.documentElement.style.setProperty("--nav-height", `${navRef.current?.offsetHeight || 72}px`);
    });
    if (navRef.current) resize.observe(navRef.current);
    return () => { resize.disconnect(); media.removeEventListener("change", systemTheme); window.removeEventListener("storage", storageTheme); window.removeEventListener("focus", systemTheme); document.removeEventListener("visibilitychange", systemTheme); };
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); menuRef.current?.focus(); }
    };
    const outside = (event: PointerEvent) => { if (!navRef.current?.contains(event.target as Node)) setMenuOpen(false); };
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("keydown", escape); document.removeEventListener("pointerdown", outside); };
  }, [menuOpen]);
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document.documentElement.dataset.themePreference = next;
    try { localStorage.setItem("portfolio-theme", next); } catch {}
  };
  return (
    <nav ref={navRef} className="site-nav" aria-label={isAr ? "التنقل الرئيسي" : "Main navigation"}>
      <a className="nav-logo" href="#depot" aria-label="Mohamed Aldani">MA<span>/01</span></a>
      <button ref={menuRef} className="nav-menu nav-control" aria-expanded={menuOpen} aria-controls="station-links" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? (isAr ? "إغلاق" : "Close") : (isAr ? "القائمة" : "Menu")}
      </button>
      <ul id="station-links" className={"nav-links" + (menuOpen ? " is-open" : "")}>
        {(["about", "projects", "experience", "skills", "certificates", "contact"] as const).map((id) => (
          <li key={id}><a className="nav-link" href={"#" + id} onClick={() => setMenuOpen(false)}>{t(id)}</a></li>
        ))}
      </ul>
      <div className="nav-tools">
        <button className="nav-control" onClick={toggleTheme} aria-label={isAr ? "تبديل المظهر" : "Switch color theme"}>
          {theme === "dark" ? (isAr ? "فاتح" : "Light") : (isAr ? "داكن" : "Dark")}
        </button>
        <a className="nav-control" href={pathname.replace('/' + locale, '/' + (isAr ? 'en' : 'ar'))} hrefLang={isAr ? "en" : "ar"} lang={isAr ? "en" : "ar"}>{t("switchLang")}</a>
        <button className="nav-control cmd-trigger" onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))} aria-label={isAr ? "فتح قائمة الأوامر" : "Open command menu"}>Ctrl K</button>
      </div>
    </nav>
  );
}
