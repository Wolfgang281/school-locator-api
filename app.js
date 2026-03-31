import express from "express";
import { StatusCodes } from "http-status-codes";

const app = express();

app.use(express.json());

app.use((req, res) =>
  res.status(StatusCodes.NOT_FOUND).json({ error: "Route not found" }),
);

export default app;
