import express from "express";
import { StatusCodes } from "http-status-codes";

import errorHandler from "./src/middlewares/error.middleware.js";
import schoolRoutes from "./src/routes/school.routes.js";

const app = express();

app.use(express.json());

app.use("/", schoolRoutes);

app.use((req, res) =>
  res.status(StatusCodes.NOT_FOUND).json({ error: "Route not found" }),
);

app.use(errorHandler);

export default app;
