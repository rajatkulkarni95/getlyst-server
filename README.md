# GetLyst - Playlist Generator

## Node.js API

### OAuth Authentication Backend for the Spotify API

### Hosted on AWS Lambda using `aws-serverless`

## To get it working on your system

- Clone the repo
- `yarn` to install dependencies
- Create a .env file in the root with `CLIENT_ID` and `CLIENT_SECRET` with your spotify provided IDs.
- Create another variable `REDIRECT_URI` with the callback route for your spotify OAuth process . Example -> http://localhost:8080/callback (This needs to be the registered callback in your Spotify Developer Account).
- `yarn start` to run development server
- `yarn dev` for nodemon run to look for changes
