import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { initDB } from "./db.js";
import apiRouter from "./routes/index.js";
import swaggerUi from "swagger-ui-express";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const openapi = {
  openapi: "3.0.3",
  info: { title: "Workout Log API", version: "1.0.0" },
  servers: [{ url: "http://localhost:8080" }],
  paths: {
    "/api/test": {
      get: { summary: "Test GET endpoint" },
      post: { summary: "Test POST endpoint" }
    },
    "/api/workouts": {
      get: { summary: "List workouts" },
      post: { summary: "Create workout" }
    },
    "/api/workouts/{id}": {
      get: { summary: "Get workout by ID (coming next week)" },
      put: { summary: "Update workout (coming next week)" },
      delete: { summary: "Delete workout (coming next week)" }
    }
  }
};
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api", apiRouter);

const port = process.env.PORT || 8080;
initDB().then(() => {
  app.listen(port, () => console.log(`API running on :${port}`));
});

