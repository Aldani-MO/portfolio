"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { sendContact } from "@/app/actions/contact";

export function ContactForm({ enabled = false }: { enabled?: boolean }) {
  const t = useTranslations("contact");
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const submitting = useRef(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting.current || !e.currentTarget.reportValidity()) return;
    submitting.current = true;
    setStatus("sending");
    const fd = new FormData(e.currentTarget);
    try {
      const result = await sendContact(fd);
      setStatus(result.success ? "success" : "error");
      if (result.success) formRef.current?.reset();
    } catch {
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  };

  // Without a configured provider the page shows the direct email link instead.
  if (!enabled) return null;

  return (
    <form className="contact-form" ref={formRef} onSubmit={handleSubmit} aria-label={t("title")} aria-busy={status === "sending"}>
      {/* Honeypot — hidden from humans */}
      <div hidden aria-hidden="true">
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
          maxLength={100}
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
          dir="ltr"
          maxLength={254}
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
          maxLength={2000}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={status === "sending" || status === "success"}
        aria-disabled={status === "sending" || status === "success"}
      >
        {status === "sending"
          ? t("sending")
          : status === "success"
          ? t("success")
          : t("sendBtn")}
      </button>

      {status === "success" && (
        <p role="status" className="form-note form-ok">
          {t("success")}
        </p>
      )}

      {status === "error" && (
        <p role="alert" className="form-note form-err">
          {t("error")}
        </p>
      )}
    </form>
  );
}
