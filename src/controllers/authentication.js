import dotenv from "dotenv";
import queryString from "query-string";
import axios from "axios";
dotenv.config();

const client_id = process.env.CLIENT_ID;
const client_secret_id = process.env.CLIENT_SECRET;
const redirect_uri =
  process.env.REDIRECT_URI || "http://localhost:8080/callback";
const frontend_uri = process.env.FRONTEND_URI || "http://localhost:3000/";

const generateRandomString = function (length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = "spotify_auth_state";

export const login = (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const scope = "user-read-private user-read-email playlist-modify-public";

  res.redirect(
    `https://accounts.spotify.com/authorize?${queryString.stringify({
      response_type: "code",
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
    })}`
  );
};

export const callback = (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(`/#${queryString.stringify({ error: "state_mismatch" })}`);
  } else {
    res.clearCookie(stateKey);

    const buff = new Buffer.from(`${client_id}:${client_secret_id}`);

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${buff.toString("base64")}`,
      },
    };

    const body = queryString.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirect_uri,
    });
    axios
      .post("https://accounts.spotify.com/api/token", body, config)
      .then(({ data: { access_token, refresh_token } }) => {
        res.redirect(
          `${frontend_uri}#${queryString.stringify({
            access_token,
            refresh_token,
          })}`
        );
      })
      .catch((error) => {
        console.log(error);
        res.redirect(`/#${queryString.stringify({ error: "invalid_token" })}`);
      });
  }
};

export const token_refresh = (req, res) => {
  const refresh_token = req.query.refresh_token;

  const buff = new Buffer.from(`${client_id}:${client_secret_id}`);

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${buff.toString("base64")}`,
    },
  };
  const body = queryString.stringify({
    grant_type: "refresh_token",
    refresh_token,
  });

  axios
    .post("https://accounts.spotify.com/api/token", body, config)
    .then(({ access_token }) => {
      res.send({ access_token });
    });
};
