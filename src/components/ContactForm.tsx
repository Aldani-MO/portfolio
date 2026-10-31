"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { sendContact } from "@/app/actions/contact";

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const fd = new FormData(e.currentTarget);
    const result = await sendContact(fd);
    setStatus(result.success ? "success" : "error");
    if (result.success) formRef.current?.reset();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate aria-label="Contact form">
      {/* Honeypot — hidden from humans */}
      <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-field">
        <label htmlFor="name" className="form-label">{t("nameLabel")}</label>
        <input
          id="name"
          name="name"
          type="text"
          className="form-input"
          placeholder={t("namePlaceholder")}
          required
          autoComplete="name"
        />
      </div>

      <div className="form-field">
        <label htmlFor="email" className="form-label">{t("emailLabel")}</label>
        <input
          id="email"
          name="email"
          type="email"
          className="form-input"
          placeholder={t("emailPlaceholder")}
          required
          autoComplete="email"
        />
      </div>

      <div className="form-field">
        <label htmlFor="message" className="form-label">{t("messageLabel")}</label>
        <textarea
          id="message"
          name="message"
          className="form-textarea"
          placeholder={t("messagePlaceholder")}
          required
          minLength={10}
        />
      </div>

      <button
        type="submit"
        className="btn"
        disabled={status === "sending" || status === "success"}
        aria-disabled={status === "sending" || status === "success"}
      >
        {status === "sending"
          ? t("sending")
          : status === "success"
          ? "✓"
          : t("sendBtn")}
      </button>

      {status === "success" && (
        <p
          role="status"
          style={{
            marginBlockStart: "var(--space-3)",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-sm)",
            color: "var(--color-line-green)",
          }}
        >
          {t("success")}
        </p>
      )}

      {status === "error" && (
        <p
          role="alert"
          style={{
            marginBlockStart: "var(--space-3)",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-sm)",
            color: "var(--color-line-red)",
          }}
        >
          {t("error")}
        </p>
      )}
    </form>
  );
}
