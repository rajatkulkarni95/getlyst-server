/* GetLyst NodeApp Entry Point */

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Routes } from "./routes.js";

const whitelist = ["http://localhost:3000", "http://localhost:8080"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const initializeExpress = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  Routes(app);

  app.listen(process.env.PORT || 8080);
};

initializeExpress();
