import './server_BQw1ihUG.mjs';
import * as z from 'zod/v4';
import { Resend } from 'resend';
import { S as STRAPI_URL, a as STRAPI_API_TOKEN, b as STRAPI_TOKEN, E as EMAIL_API_KEY } from './server_B9JDO9Nt.mjs';
import { d as defineAction, A as ActionError } from './server_ZGudQw4a.mjs';

const NOTIFY_FROM = "onboarding@resend.dev";
const NOTIFY_TO = "kanaan.ngutu@gmail.com";
async function sendNotificationEmail(input) {
  if (!EMAIL_API_KEY) return;
  const resend = new Resend(EMAIL_API_KEY);
  const subject = `New contact form submission from ${input.name}`;
  const text = `Name: ${input.name}
Email: ${input.email}

Message:
${input.message}`;
  const html = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(input.email)}">${escapeHtml(input.email)}</a></p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(input.message).replace(/\n/g, "<br/>")}</p>
  `;
  try {
    const { error } = await resend.emails.send({
      from: NOTIFY_FROM,
      to: NOTIFY_TO,
      replyTo: input.email,
      subject,
      text,
      html
    });
    if (error) {
      console.error("Resend notification failed:", error);
    }
  } catch (err) {
    console.error("Resend notification threw:", err);
  }
}
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
const server = {
  submitContact: defineAction({
    accept: "form",
    input: z.object({
      name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
      email: z.email("Please enter a valid email address"),
      message: z.string().min(10, "Message must be at least 10 characters").max(5e3, "Message is too long"),
      honeypot: z.string().max(0).optional()
    }),
    handler: async ({ name, email, message, honeypot }) => {
      if (honeypot) {
        return { documentId: null, swallowed: true };
      }
      const bearer = STRAPI_API_TOKEN ?? STRAPI_TOKEN;
      const headers = {
        "Content-Type": "application/json"
      };
      if (bearer) headers["Authorization"] = `Bearer ${bearer}`;
      const res = await fetch(`${STRAPI_URL}/api/web-forms`, {
        method: "POST",
        headers,
        body: JSON.stringify({ data: { name, email, message } })
      });
      if (!res.ok) {
        const body = await res.text().catch(() => "");
        if (res.status === 401 || res.status === 403) {
          throw new ActionError({
            code: "FORBIDDEN",
            message: "Submissions are not currently accepted. Grant the Public role `create` on web-form in Strapi, or set STRAPI_API_TOKEN."
          });
        }
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Strapi rejected the submission (${res.status} ${res.statusText})${body ? `: ${body}` : ""}`
        });
      }
      const json = await res.json();
      await sendNotificationEmail({ name, email, message });
      return { documentId: json.data.documentId, swallowed: false };
    }
  })
};

export { server };
