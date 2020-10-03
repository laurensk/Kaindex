import { resolve } from "path";
import mysql from "mysql";

import dotenv from "dotenv";
dotenv.config({ path: resolve(__dirname, "../.env") });

export const Sql = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});
