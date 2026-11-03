"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

interface CmdItem {
  id: string;
  icon: string;
  label: string;
  hint?: string;
  action: () => void;
}

interface CommandPaletteProps {
  locale: string;
}

export function CommandPalette({ locale }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("cmd");

  const navigate = useCallback(
    (id: string) => {
      setOpen(false);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    []
  );

  const switchLocale = useCallback(
    (newLocale: string) => {
      setOpen(false);
      const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
      router.push(newPath);
    },
    [locale, pathname, router]
  );

  const copyEmail = useCallback(async () => {
    try { await navigator.clipboard.writeText("Mohammedaldani03@gmail.com"); }
    catch { window.location.href = "mailto:Mohammedaldani03@gmail.com"; return; }
    setCopied(true);
    setOpen(false);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const items: CmdItem[] = [
    { id: "goto-depot",      icon: "▶", label: t("actions.depot"),      action: () => navigate("depot") },
    { id: "goto-about",      icon: "○", label: t("actions.about"),      action: () => navigate("about") },
    { id: "goto-projects",   icon: "○", label: t("actions.projects"),   action: () => navigate("projects") },
    { id: "goto-experience", icon: "○", label: t("actions.experience"), action: () => navigate("experience") },
    { id: "goto-skills",     icon: "○", label: t("actions.skills"),     action: () => navigate("skills") },
    { id: "goto-contact",    icon: "●", label: t("actions.contact"),    action: () => navigate("contact") },
    ...(locale === "en"
      ? [{ id: "switch-ar", icon: "AR", label: t("actions.switchAr"), action: () => switchLocale("ar") }]
      : [{ id: "switch-en", icon: "EN", label: t("actions.switchEn"), action: () => switchLocale("en") }]),
    {
      id: "toggle-theme",
      icon: "◐",
      label: locale === "ar" ? "تبديل المظهر (داكن / فاتح)" : "Toggle Theme (Dark / Light)",
      hint: "THEME",
      action: () => {
        setOpen(false);
        const current = (document.documentElement.getAttribute("data-theme") as "dark" | "light") || "dark";
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        try { localStorage.setItem("portfolio-theme", next); } catch {}
      },
    },
    { id: "download-cv",  icon: "↓", label: t("actions.downloadCv"),  hint: "PDF", action: () => { setOpen(false); window.open("/cv.pdf", "_blank"); } },
    { id: "copy-email",   icon: "@", label: copied ? "Copied!" : t("actions.copyEmail"), action: copyEmail },
  ];

  const filtered = query
    ? items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))
    : items;

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (!open) return;
      if (e.key === "Escape") { setOpen(false); setQuery(""); }
      if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
      if (e.key === "Enter") { e.preventDefault(); filtered[selected]?.action(); setQuery(""); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, selected, filtered]);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
      inputRef.current?.focus();
    } else {
      dialogRef.current?.close();
      setQuery("");
    }
  }, [open]);

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      className="cmd-overlay"
      onCancel={() => setOpen(false)}
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
      role="dialog"
      aria-modal="true"
      aria-label={locale === "ar" ? "قائمة الأوامر" : "Command palette"}
    >
      <div className="cmd-panel">
        <div className="cmd-input-wrap">
          <span className="cmd-prompt">{">"}</span>
          <input
            ref={inputRef}
            className="cmd-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("placeholder")}
            aria-label={t("placeholder")}
            autoComplete="off"
            spellCheck={false}
            role="combobox"
            aria-expanded="true"
            aria-controls="command-options"
            aria-activedescendant={filtered[selected]?.id}
          />
          <button className="nav-control" onClick={() => setOpen(false)} aria-label={locale === "ar" ? "إغلاق" : "Close"}>ESC</button>
        </div>
        <ul className="cmd-list" id="command-options" role="listbox" aria-label={t("placeholder")}>
          {filtered.map((item, i) => (
            <li
              key={item.id}
              id={item.id}
              role="option"
              aria-selected={i === selected}
              className="cmd-item"
              onClick={() => { item.action(); setQuery(""); }}
              onMouseEnter={() => setSelected(i)}
            >
              <span className="cmd-item-icon">{item.icon}</span>
              <span className="cmd-item-label">{item.label}</span>
              {item.hint && <span className="cmd-item-hint">{item.hint}</span>}
            </li>
          ))}
        </ul>
        {filtered.length === 0 && <p className="demo-note" style={{ padding: "1rem" }}>{locale === "ar" ? "لا توجد نتائج. جرّب اسم قسم آخر." : "No matching commands. Try a section name."}</p>}
      </div>
    </dialog>
  );
}

// Hook to trigger cmd palette from outside
export function useCmdPalette() {
  const open = () => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }));
  };
  return { open };
}
