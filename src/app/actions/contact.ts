"use server";

import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
  // Honeypot — must be empty
  website: z.string().max(0),
});

export interface ContactResult {
  success: boolean;
  error?: string;
}

export async function sendContact(formData: FormData): Promise<ContactResult> {
  const raw = {
    name:    formData.get("name"),
    email:   formData.get("email"),
    message: formData.get("message"),
    website: formData.get("website") ?? "", // honeypot
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: "Invalid form data." };
  }

  // Honeypot check (should be empty)
  if (parsed.data.website !== "") {
    // Silent discard for bots
    return { success: true };
  }

  const { name, email, message } = parsed.data;

  // If RESEND_API_KEY is not set, log and return success in dev
  if (!process.env.RESEND_API_KEY) {
    console.log("[Contact form] RESEND_API_KEY not set. Would send:", { name, email, message });
    return { success: true };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Portfolio Contact <noreply@mohamedaldani.dev>",
      to: "Mohammedaldani03@gmail.com",
      replyTo: email,
      subject: `Portfolio: Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap">${message.replace(/</g, "&lt;")}</p>
      `,
    });

    return { success: true };
  } catch (err) {
    console.error("[Contact form] Resend error:", err);
    return { success: false, error: "Failed to send. Please email me directly." };
  }
}
