"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
export function Nav({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const isAr = locale === "ar";
  useEffect(() => {
    const sync = () => setTheme(document.documentElement.dataset.theme || "light");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("portfolio-theme", next); } catch {}
  };
  return (
    <nav className="site-nav" aria-label={isAr ? "التنقل الرئيسي" : "Main navigation"}>
      <a className="nav-logo" href="#depot" aria-label="Mohamed Aldani">MA<span>/01</span></a>
      <button className="nav-menu nav-control" aria-expanded={menuOpen} aria-controls="station-links" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? (isAr ? "إغلاق" : "Close") : (isAr ? "القائمة" : "Menu")}
      </button>
      <ul id="station-links" className={"nav-links" + (menuOpen ? " is-open" : "")}>
        {(["about", "projects", "experience", "skills", "contact"] as const).map((id) => (
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
