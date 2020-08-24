import { gql } from "apollo-server-express";

const typeDefs = gql`
  type UserProfile {
    name: String!
    givenName: String
    familyName: String
  }

  type User {
    email: String
    profile: UserProfile
    role: String
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
