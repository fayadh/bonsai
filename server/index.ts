import * as express from "express";
import { ApolloServer } from "apollo-server-express";

import * as typeDefs from "./modules/merchant/graphqlSchema";
import * as resolvers from "./modules/merchant/resolvers";

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });
app.listen({ port: 3000 }, () => {
  console.log(`Server running on http://localhost:3000${server.graphqlPath}`);
});
