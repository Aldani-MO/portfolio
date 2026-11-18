"use client";
import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Image from "next/image";
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
  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const next = theme === "dark" ? "light" : "dark";
    const apply = () => {
      root.dataset.theme = next;
      root.dataset.themePreference = next;
      try { localStorage.setItem("portfolio-theme", next); } catch {}
    };
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    if (!doc.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) { apply(); return; }
    // New theme grows as a circle from the button that was pressed.
    const box = event.currentTarget.getBoundingClientRect();
    const x = box.left + box.width / 2, y = box.top + box.height / 2;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    doc.startViewTransition(apply).ready.then(() => {
      root.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] }, { duration: 650, easing: "cubic-bezier(0.16, 1, 0.3, 1)", pseudoElement: "::view-transition-new(root)" });
    }).catch(() => {});
  };
  return (
    <nav ref={navRef} className="site-nav" aria-label={isAr ? "التنقل الرئيسي" : "Main navigation"}>
      <a className="nav-logo" href="#depot" aria-label={isAr ? "محمد الضاني، إلى الأعلى" : "Mohamed Aldani, back to top"}><Image className="nav-avatar" src="/portrait.jpg" width={445} height={556} alt="" sizes="36px" /><span className="nav-name">{isAr ? "محمد الضاني" : "Mohamed Aldani"}</span></a>
      <button ref={menuRef} className="nav-menu nav-control" aria-expanded={menuOpen} aria-controls="station-links" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? (isAr ? "إغلاق" : "Close") : (isAr ? "القائمة" : "Menu")}
      </button>
      <ul id="station-links" className={"nav-links" + (menuOpen ? " is-open" : "")}>
        {(["projects", "experience", "skills", "about", "certificates", "contact"] as const).map((id) => (
          <li key={id}><a className="nav-link" href={"#" + id} onClick={() => setMenuOpen(false)}>{t(id)}</a></li>
        ))}
      </ul>
      <div className="nav-tools">
        <button className="nav-control theme-toggle" onClick={toggleTheme} aria-label={isAr ? "تبديل المظهر" : "Switch color theme"}>
          <svg className="theme-icon" key={theme} viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
            {theme === "dark"
              ? <g className="sun"><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" /></g>
              : <><path className="moon" d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" /><path className="star" d="M18 2.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6Z" /><path className="star" d="M21.5 8l.4.9.9.4-.9.4-.4.9-.4-.9-.9-.4.9-.4Z" /></>}
          </svg>
          <span>{theme === "dark" ? (isAr ? "فاتح" : "Light") : (isAr ? "داكن" : "Dark")}</span>
        </button>
        <a className="nav-control" href={pathname.replace('/' + locale, '/' + (isAr ? 'en' : 'ar'))} hrefLang={isAr ? "en" : "ar"} lang={isAr ? "en" : "ar"}>{t("switchLang")}</a>
        <button className="nav-control cmd-trigger" onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))} aria-label={isAr ? "فتح قائمة الأوامر" : "Open command menu"}>Ctrl K</button>
      </div>
    </nav>
  );
}
