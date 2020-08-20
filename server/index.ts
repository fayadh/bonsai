import * as dotenv from "dotenv";
dotenv.config();

import * as express from "express";
import { ApolloServer } from "apollo-server-express";

import typeDefs from "./modules/merchant/graphqlSchema";
import resolvers from "./modules/merchant/resolvers";
import connectToDB from "./db";

const { PORT = 3000 } = process.env;

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

const main = async () => {
  await connectToDB();
  app.listen({ port: PORT }, () => {
    console.log(
      `Server running on http://localhost:${PORT}${server.graphqlPath}`
    );
  });
};

main();
