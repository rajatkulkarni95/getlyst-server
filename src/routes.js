import * as authentication from "./controllers/authentication.js";

export const Routes = (app) => {
  app.get("/login", authentication.login);
  app.get("/callback", authentication.callback);
};
