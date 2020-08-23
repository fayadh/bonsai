import { ApolloServer } from "apollo-server-express";

import schema from "./modules/schema";
import User from "./models/User";

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const { user } = req;

    return {
      user,
      models: {
        User,
      },
    };
  },
});

export default server;
