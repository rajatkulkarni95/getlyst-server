/* GetLyst NodeApp Entry Point */

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Routes } from "./routes.js";

const initializeExpress = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  Routes(app);

  app.listen(process.env.PORT || 8080);
};

initializeExpress();

export { app };
