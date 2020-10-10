/* GetLyst NodeApp Entry Point */

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Routes } from "./routes.js";

const whitelist = ["http://127.0.0.1:3000", "http://localhost:3000"];
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

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000/"); // update to match the domain you will make the request from
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  app.use(cors());
  app.use(cookieParser());

  Routes(app);

  app.listen(process.env.PORT || 8080);
};

initializeExpress();
