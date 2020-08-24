import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    email: String
  }
  extend type Query {
    user: User
    users: [User!]!
  }
  extend type Mutation {
    loginAdmin(email: String!, password: String!): User
  }
`;

export default typeDefs;
