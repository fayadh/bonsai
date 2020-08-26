import * as dotenv from "dotenv";
dotenv.config();

import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { google } from "googleapis";

import cookieParser = require("cookie-parser");

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
} = process.env;

console.log({ GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI });

const oauthClient = new google.auth.OAuth2({
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  redirectUri: GOOGLE_REDIRECT_URI,
});

import connectToDB from "./db";
import server from "./apollo";
import { authenticationMiddleware } from "./middleware";
import passport from "./passport";

const { PORT = 3000, CLIENT_URL } = process.env;

const app = express();

const corsOptions = {
  origin: CLIENT_URL,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(
  bodyParser({
    extended: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());

app.get("/auth/google/callback", async (req, res, next) => {
  const { code } = req.query;
  console.log("callback code", code);
  try {
    const tokens = await oauthClient.getToken({ code });
    console.log({ tokens });
  } catch (e) {
    console.log({ e });
    console.log({ data: e.response.data });
  }
  res.sendStatus(200);
});

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "/auth/google/success",
//   })
// );

app.get("/auth/google/success", (req, res, next) => {
  console.log("success!");
  res.sendStatus(200);
});

// app.use(authenticationMiddleware);

server.applyMiddleware({ app, cors: false });

const main = async () => {
  await connectToDB();
  app.listen({ port: PORT }, () => {
    console.log(
      `Server running on http://localhost:${PORT}${server.graphqlPath}`
    );
  });
};

main();
