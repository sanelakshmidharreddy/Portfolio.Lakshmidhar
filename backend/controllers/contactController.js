import transporter from "../services/mailer.js";
import { CONTACT_EMAIL } from "../services/mailer.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_MAX = 100;
const MESSAGE_MAX = 5000;

/** Basic control-char/angle-bracket scrub to keep payloads clean. */
const sanitize = (v = "") =>
  String(v)
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/[<>]/g, "")
    .trim();

export async function submitContact(req, res, next) {
  try {
    const name = sanitize(req.body?.name);
    const email = sanitize(req.body?.email).toLowerCase();
    const message = sanitize(req.body?.message);

    if (!name) return res.status(400).json({ success: false, message: "Please enter your name." });
    if (name.length > NAME_MAX)
      return res.status(400).json({ success: false, message: "Name is too long." });
    if (!email)
      return res.status(400).json({ success: false, message: "Please provide your email address." });
    if (!EMAIL_RE.test(email))
      return res.status(400).json({ success: false, message: "Please provide a valid email address." });
    if (!message)
      return res.status(400).json({ success: false, message: "Please enter a message." });
    if (message.length > MESSAGE_MAX)
      return res
        .status(400)
        .json({ success: false, message: `Message must be under ${MESSAGE_MAX} characters.` });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Portfolio contact: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p>
             <p><strong>Email:</strong> ${escapeHtml(email)}</p>
             <hr />
             <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`,
    });

    console.log(`[contact] accepted from ${email} (id: ${info?.messageId ?? "n/a"})`);
    return res.json({ success: true, message: "Message sent successfully." });
  } catch (err) {
    // log details server-side only — never leak internals to the client
    console.error("[contact] failed:", err?.message);
    return next(err);
  }
}

function escapeHtml(s = "") {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
