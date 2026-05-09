import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { setSocketInstance } from "./controllers/postController.js";

dotenv.config();

const port = Number(process.env.PORT) || 5000;

await connectDB();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PATCH"]
  }
});

setSocketInstance(io);

process.on("unhandledRejection", (error) => {
  // eslint-disable-next-line no-console
  console.error("[process] Unhandled Promise Rejection:", error);
});

process.on("uncaughtException", (error) => {
  // eslint-disable-next-line no-console
  console.error("[process] Uncaught Exception:", error);
});

// httpServer.listen(port, () => {
//   // eslint-disable-next-line no-console
//   console.log(`[server] Awaaz server running on port ${port}`);
//   // eslint-disable-next-line no-console
//   console.log(`[server] Allowed CLIENT_URL: ${process.env.CLIENT_URL || "http://localhost:5173"}`);
// });
export default app;