import * as React from "react";

import { useApolloClient, useLazyQuery } from "@apollo/client";

import { isLoggedInVar } from "../../../../apollo/variables";
import { LOGIN } from "../../../../apollo/operations/queries";

export const LoginButton: React.FC = () => {
  const client = useApolloClient();

  const [login, { loading, error }] = useLazyQuery(LOGIN, {
    onCompleted() {
      isLoggedInVar(true);
    },
  });

  return <a href={`http://localhost:3000/auth/google`}>Login Google</a>;
};

export default LoginButton;
