import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { initDB } from "./db.js";
import apiRouter from "./routes/index.js";

import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";
const openapi = JSON.parse(readFileSync(new URL("./swagger.json", import.meta.url)));

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapi));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api", apiRouter);

// Error handling middleware should be last
import { errorHandler } from "./middleware/errorHandler.js";
app.use(errorHandler);

const port = process.env.PORT || 8080;
initDB().then(() => {
  app.listen(port, () => console.log(`API running on port ${port}`));
});


