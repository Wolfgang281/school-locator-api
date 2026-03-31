import mysql from "mysql2/promise";

import { DB } from "./index.js";

const rootPool = mysql.createPool({
  host: DB.HOST,
  port: DB.PORT,
  user: DB.USER,
  password: DB.PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
});

let pool;

const initDB = async () => {
  await rootPool.execute(`CREATE DATABASE IF NOT EXISTS \`${DB.NAME}\``);

  pool = mysql.createPool({
    host: DB.HOST,
    port: DB.PORT,
    user: DB.USER,
    password: DB.PASSWORD,
    database: DB.NAME,
    waitForConnections: true,
    connectionLimit: 10,
  });

  await pool.execute(`
  CREATE TABLE IF NOT EXISTS schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    address VARCHAR(500) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
  )
`);

  console.log("DB initialized.");
};

const getPool = () => pool;

export { getPool, initDB };
