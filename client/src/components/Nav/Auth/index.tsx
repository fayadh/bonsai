import * as dotenv from "dotenv";
dotenv.config();

import * as React from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { useQuery, useApolloClient, useLazyQuery } from "@apollo/client";

import { isLoggedInVar } from "../../../apollo/variables";
import { IS_LOGGED_IN, LOGIN } from "../../../apollo/operations/queries";
import LoginButton from "./LoginButton";

const GOOGLE_CLIENT_ID =
  "959206730822-j30lnpejcaab8ckvdhnakpr09fu1e2gq.apps.googleusercontent.com";

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
              client.cache.evict({ fieldName: "me" });
              client.cache.gc();
              document.cookie = "";
              isLoggedInVar(false);
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        // <LoginButton />
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={(res: any) => {
            console.log({ res });
            // const jwt = res.tokenId;
            // document.cookie = `jwt=${jwt}`;
            // login();
            const { code } = res;
            console.log({ code });

            axios
              .get(`http://localhost:3000/auth/google/callback?code=${code}`)
              .then((res) => {
                console.log(res);
              });
          }}
          onFailure={(err) => console.log(err)}
          cookiePolicy={"single_host_origin"}
          redirectUri={"http://localhost:3000/auth/google/callback"}
          accessType="offline"
          responseType="code"
        />
      )}
    </div>
  );
};

export default Auth;
