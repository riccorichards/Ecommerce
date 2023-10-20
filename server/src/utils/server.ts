import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import config from "config";
import cors from "cors";
import routes from "../routes";
import pool from "./connectionDB";
import log from "./logger";
const createServer = () => {
  const app = express();
  dotenv.config();
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: config.get<string>("origin"),
    })
  );
  pool.getConnection((err: any) => {
    if (err) {
      log.error("Error connecting to the database:", err);
    } else {
      log.info(`Connected to the database at http://localhost:${config.get("port")}`);
    }
  });
  routes(app);
  return app;
};

export default createServer;
