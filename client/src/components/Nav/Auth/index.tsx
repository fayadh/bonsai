import * as React from "react";
import { GoogleLogin } from "react-google-login";
import { useQuery, useApolloClient, useLazyQuery } from "@apollo/client";

import { isLoggedInVar } from "../../../apollo/variables";
import { IS_LOGGED_IN, LOGIN } from "../../../apollo/operations/queries";

const {
  GOOGLE_CLIENT_ID = "959206730822-j30lnpejcaab8ckvdhnakpr09fu1e2gq.apps.googleusercontent.com",
} = process.env;

export const Auth: React.FC = () => {
  const client = useApolloClient();

  const [login, { loading, error }] = useLazyQuery(LOGIN, {
    onCompleted() {
      isLoggedInVar(true);
    },
  });

  const {
    data: { isLoggedIn },
  } = useQuery(IS_LOGGED_IN);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <button
            type="button"
            onClick={() => {
              client.cache.evict({ fieldName: "user" });
              client.cache.gc();
              document.cookie = "";
              isLoggedInVar(false);
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={(res: any) => {
            const jwt = res.tokenId;
            document.cookie = `jwt=${jwt}`;
            login();
          }}
          onFailure={(err) => console.log(err)}
          cookiePolicy={"single_host_origin"}
        />
      )}
    </div>
  );
};

export default Auth;
