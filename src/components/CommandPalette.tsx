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

  const close = useCallback(() => { setOpen(false); setQuery(""); setSelected(0); }, []);

  const navigate = useCallback(
    (id: string) => {
      close();
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [close]
  );

  const switchLocale = useCallback(
    (newLocale: string) => {
      close();
      const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
      router.push(newPath);
    },
    [close, locale, pathname, router]
  );

  const copyEmail = useCallback(async () => {
    try { await navigator.clipboard.writeText("Mohammedaldani03@gmail.com"); }
    catch { window.location.href = "mailto:Mohammedaldani03@gmail.com"; return; }
    setCopied(true);
    close();
    setTimeout(() => setCopied(false), 2000);
  }, [close]);

  const isAr = locale === "ar";
  const items: CmdItem[] = [
    { id: "goto-depot", icon: "00", label: t("actions.depot"), action: () => navigate("depot") },
    { id: "goto-projects", icon: "01", label: t("actions.projects"), action: () => navigate("projects") },
    { id: "goto-experience", icon: "02", label: t("actions.experience"), action: () => navigate("experience") },
    { id: "goto-skills", icon: "03", label: t("actions.skills"), action: () => navigate("skills") },
    { id: "goto-about", icon: "04", label: t("actions.about"), action: () => navigate("about") },
    { id: "goto-certificates", icon: "05", label: t("actions.certificates"), action: () => navigate("certificates") },
    { id: "goto-contact", icon: "06", label: t("actions.contact"), action: () => navigate("contact") },
    locale === "en"
      ? { id: "switch-ar", icon: "AR", label: t("actions.switchAr"), action: () => switchLocale("ar") }
      : { id: "switch-en", icon: "EN", label: t("actions.switchEn"), action: () => switchLocale("en") },
    {
      id: "toggle-theme",
      icon: "UI",
      label: isAr ? "تبديل المظهر بين الداكن والفاتح" : "Switch between dark and light theme",
      action: () => { close(); toggleTheme(); },
    },
    { id: "download-cv", icon: "CV", label: t("actions.downloadCv"), action: () => { close(); window.open("/cv.pdf", "_blank", "noopener"); } },
    { id: "copy-email", icon: "@", label: copied ? (isAr ? "تم النسخ" : "Copied") : t("actions.copyEmail"), action: copyEmail },
  ];

  const filtered = query
    ? items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))
    : items;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) close(); else setOpen(true);
      }
      if (!open) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.max(0, Math.min(s + 1, filtered.length - 1))); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
      if (e.key === "Enter" && document.activeElement === inputRef.current) { e.preventDefault(); filtered[selected]?.action(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [close, open, selected, filtered]);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
      inputRef.current?.focus();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  useEffect(() => {
    if (open) document.getElementById(filtered[selected]?.id)?.scrollIntoView({ block: "nearest" });
  }, [open, selected, filtered]);

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      className="cmd-overlay"
      onCancel={close}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      role="dialog"
      aria-modal="true"
      aria-label={locale === "ar" ? "قائمة الأوامر" : "Command palette"}
    >
      <div className="cmd-panel">
        <div className="cmd-input-wrap">
                    <input
            ref={inputRef}
            className="cmd-input"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
            placeholder={t("placeholder")}
            aria-label={t("placeholder")}
            autoComplete="off"
            spellCheck={false}
            role="combobox"
            aria-expanded="true"
            aria-controls="command-options"
            aria-activedescendant={filtered[selected]?.id}
          />
          <button className="nav-control" onClick={close} aria-label={locale === "ar" ? "إغلاق" : "Close"}>ESC</button>
        </div>
        <ul className="cmd-list" id="command-options" role="listbox" aria-label={t("placeholder")}>
          {filtered.map((item, i) => (
            <li
              key={item.id}
              id={item.id}
              role="option"
              aria-selected={i === selected}
              className="cmd-item"
              onClick={item.action}
              onMouseEnter={() => setSelected(i)}
            >
              <span className="cmd-item-icon" aria-hidden="true">{item.icon}</span>
              <span className="cmd-item-label">{item.label}</span>
              {item.hint && <span className="cmd-item-hint">{item.hint}</span>}
            </li>
          ))}
        </ul>
        {filtered.length === 0 && <p className="demo-note cmd-empty" role="status">{locale === "ar" ? "لا توجد نتائج. جرّب اسم قسم آخر." : "No matching commands. Try a section name."}</p>}
      </div>
    </dialog>
  );
}

function toggleTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  root.dataset.themePreference = next;
  try { localStorage.setItem("portfolio-theme", next); } catch {}
}

// Hook to trigger cmd palette from outside
export function useCmdPalette() {
  const open = () => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }));
  };
  return { open };
}
