import * as React from "react";

import { useApolloClient } from "@apollo/client";
import { isLoggedInVar } from "../../../../apollo/variables";

export const LoginButton: React.FC = () => {
  const client = useApolloClient();

  return (
    <button
      type="button"
      onClick={() => {
        fetch("http://localhost:3000/auth/google/logout", {
          method: "get",
          credentials: "include",
          redirect: "follow",
        })
          .then(() => {
            client.cache.evict({ fieldName: "me" });
            client.cache.gc();
            isLoggedInVar(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }}
    >
      Logout
    </button>
  );
};

export default LoginButton;
