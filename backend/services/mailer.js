import nodemailer from "nodemailer";

export const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "";

const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD } = process.env;

/**
 * SMTP transport configured entirely through environment variables.
 * If credentials are missing the transport is created but sends will fail —
 * the controller returns a generic 500 and logs the real reason server-side.
 */
const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT ? Number(EMAIL_PORT) : undefined,
  secure: Number(EMAIL_PORT) === 465,
  auth: EMAIL_USER && EMAIL_PASSWORD ? { user: EMAIL_USER, pass: EMAIL_PASSWORD } : undefined,
});

export const mailConfigured = Boolean(EMAIL_HOST && EMAIL_USER && EMAIL_PASSWORD);

if (!mailConfigured) {
  console.warn("[mailer] SMTP env vars not fully set — contact emails will fail until configured.");
}

export default transporter;
