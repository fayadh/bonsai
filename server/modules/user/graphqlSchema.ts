import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    email: String
  }
  extend type Query {
    user: User
  }
`;

export default typeDefs;
