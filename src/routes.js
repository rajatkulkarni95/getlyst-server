const {
  login,
  callback,
  token_refresh,
} = require("./controllers/authentication");

const express = require("express");

const routes = express.Router({
  mergeParams: true,
});

routes.get("/", (req, res) => res.send("Testing"));
routes.get("/login", login);
routes.get("/callback", callback);
routes.get("/refresh-token", token_refresh);

module.exports = {
  routes,
};
