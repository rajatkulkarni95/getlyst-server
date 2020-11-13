/* GetLyst NodeApp Entry Point */
"use-strict";

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { routes: routes } = require("./routes");


const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/", routes);

app.listen(process.env.PORT || 8080);


module.exports = app;
