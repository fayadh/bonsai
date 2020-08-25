import * as dotenv from "dotenv";
dotenv.config();

import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import cookieParser = require("cookie-parser");

import connectToDB from "./db";
import server from "./apollo";
import { authenticationMiddleware } from "./middleware";
import passport from "./passport";

const { PORT = 3000, CLIENT_URL } = process.env;

const corsOptions = {
  origin: CLIENT_URL,
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));
app.use(
  bodyParser({
    extended: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", {
    // @ts-ignore
    accessType: "offline",
    prompt: "consent",
    scope: ["email", "profile"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
  })
);

app.get("/auth/google/success", async (req, res, next) => {
  const { body } = req;

  console.log({ body });
  res.json(body);
});

app.use(authenticationMiddleware);

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
