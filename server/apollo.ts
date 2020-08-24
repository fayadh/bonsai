import { ApolloServer } from "apollo-server-express";

import schema from "./modules/schema";
import User from "./models/User";

const server = new ApolloServer({
  schema,
  context: ({ req, res }) => {
    const { user } = req;

    return {
      req,
      res,
      user,
      models: {
        User,
      },
    };
  },
});

export default server;
