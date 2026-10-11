import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import contactRouter from "./routes/contact.js";
import { healthRouter } from "./routes/health.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

const app = express();

/* ---------- security & parsing ---------- */
app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(helmet());
app.use(express.json({ limit: "16kb" }));

/* ---------- CORS: explicit allow-list via FRONTEND_URL ---------- */
const allowList = (process.env.FRONTEND_URL || "http://localhost:3001")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      // allow same-origin/no-origin tools (curl, health checks) and listed origins
      if (!origin || allowList.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST"],
  })
);

/* ---------- global rate limit ---------- */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { success: false, message: "Too many requests. Please try again later." },
});
app.use("/api", limiter);

/* ---------- routes ---------- */
app.use("/api/health", healthRouter);
app.use("/api/contact", contactRouter);

/* ---------- 404 + centralized errors ---------- */
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API listening on port ${PORT} (allowed origins: ${allowList.join(", ") || "none"})`);
});

export default app;
