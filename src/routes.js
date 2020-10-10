import * as authentication from "./controllers/authentication.js";

export const Routes = (app) => {
  // Authentication Routes
  app.get("/login", authentication.login);
  app.get("/callback", authentication.callback);
  app.get("/refresh-token", authentication.token_refresh);
};
