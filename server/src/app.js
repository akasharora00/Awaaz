import cors from "cors";
import express from "express";
import postRoutes from "./routes/postRoutes.js";

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173"
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser or same-origin requests with no origin header.
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      // eslint-disable-next-line no-console
      console.warn("[cors] blocked origin:", origin);
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    }
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, _res, next) => {
  // eslint-disable-next-line no-console
  console.log(`[request] ${req.method} ${req.originalUrl}`);
  next();
});

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/posts", postRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

app.use((err, _req, res, _next) => {
  // eslint-disable-next-line no-console
  console.error("[global-error-handler]", err);
  if (err?.type === "entity.parse.failed") {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON body."
    });
  }
  if (err?.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      details: Object.values(err.errors).map((item) => item.message)
    });
  }
  if (err?.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid id format."
    });
  }
  return res.status(500).json({
    success: false,
    message: "Something went wrong."
  });
});

export default app;
