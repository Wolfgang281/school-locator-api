import dotenv from "dotenv";
dotenv.config({ quiet: true });

export const PORT = process.env.PORT;

export const DB = {
  HOST: process.env.DB_HOST,
  PORT: process.env.DB_PORT,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  NAME: process.env.DB_NAME,
};
