import * as dotenv from "dotenv";
dotenv.config();

import * as express from "express";
import * as cors from "cors";

import connectToDB from "./db";
import server from "./apollo";
import { authMiddleware } from "./middleware";
import cookieParser = require("cookie-parser");

const { PORT = 3000 } = process.env;

const corsOptions = {
  origin: "http://localhost:8080",
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(authMiddleware);
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
