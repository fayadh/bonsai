import * as React from "react";
import { gql, useMutation } from "@apollo/client";

import LoginForm from "./Form";
import { isLoggedInVar } from "../../apollo/variables";

export const LOGIN_ADMIN = gql`
  mutation LoginAdmin($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
      email
    }
  }
`;

export default function Login() {
  const [login, { error }] = useMutation<any, any>(LOGIN_ADMIN, {
    onCompleted() {
      isLoggedInVar(true);
    },
  });

  if (error) {
    console.log({ error });
    return <p>An error occurred</p>;
  }

  return <LoginForm login={login} />;
}
