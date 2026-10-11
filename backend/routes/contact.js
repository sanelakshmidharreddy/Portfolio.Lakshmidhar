import { Router } from "express";
import rateLimit from "express-rate-limit";
import { submitContact } from "../controllers/contactController.js";

const contactRouter = Router();

// stricter limit for the public form: 5 messages / 15 min / IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { success: false, message: "Too many messages. Please try again later." },
});

contactRouter.post("/", contactLimiter, submitContact);

export default contactRouter;
