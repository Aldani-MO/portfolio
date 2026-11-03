import { afterEach, describe, expect, it, vi } from "vitest";
import { sendContact } from "../../app/actions/contact";

const send = vi.hoisted(() => vi.fn());
vi.mock("resend", () => ({ Resend: class { emails = { send }; } }));

function form() {
  const data = new FormData();
  data.set("name", "Visitor"); data.set("email", "visitor@example.com");
  data.set("message", "A legitimate test message."); data.set("website", "");
  return data;
}
afterEach(() => { vi.unstubAllEnvs(); vi.clearAllMocks(); });

describe("contact delivery", () => {
  it("never claims success when email is not configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    expect((await sendContact(form())).success).toBe(false);
    expect(send).not.toHaveBeenCalled();
  });
  it("handles a provider error returned without throwing", async () => {
    vi.stubEnv("RESEND_API_KEY", "test"); vi.stubEnv("CONTACT_FROM_EMAIL", "contact@example.com");
    send.mockResolvedValue({ error: { message: "Provider error" } });
    expect((await sendContact(form())).success).toBe(false);
  });
  it("rejects invalid fields before contacting the provider", async () => {
    const data = form(); data.set("email", "invalid");
    expect((await sendContact(data)).success).toBe(false);
    expect(send).not.toHaveBeenCalled();
  });
});
