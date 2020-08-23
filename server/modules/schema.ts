import { merge } from "lodash";
import { gql, makeExecutableSchema } from "apollo-server-express";

import Merchant from "./merchant/graphqlSchema";
import merchantResolvers from "./merchant/resolvers";
import User from "./user/graphqlSchema";
import userResolvers from "./user/resolvers";

const Query = gql`
  type Query {
    _empty: String
  }
`;

const Mutation = gql`
  type Mutation {
    _empty: String
  }
`;

const resolvers = {};
const schema = makeExecutableSchema({
  typeDefs: [Query, Mutation, Merchant, User],
  resolvers: merge(resolvers, merchantResolvers, userResolvers),
});
export default schema;
