"use server";

import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(2000),
  // Honeypot — must be empty
  website: z.string().max(0),
});

export interface ContactResult {
  success: boolean;
  error?: string;
}

export async function sendContact(formData: FormData): Promise<ContactResult> {
  if (formData.get("website")) return { success: true };
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

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL) {
    return { success: false, error: "Email is unavailable. Please use the direct email link." };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL,
      to: "Mohammedaldani03@gmail.com",
      replyTo: email,
      subject: `Portfolio: Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) return { success: false, error: "Email delivery failed." };
    return { success: true };
  } catch (err) {
    console.error("[Contact form] Resend error:", err);
    return { success: false, error: "Failed to send. Please email me directly." };
  }
}
