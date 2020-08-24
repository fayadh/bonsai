import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser {
    user {
      email
      profile {
        name
      }
    }
  }
`;

export const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;
