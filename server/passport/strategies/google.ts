import { Strategy } from "passport-google-oauth2";

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
} = process.env;

export default new Strategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_REDIRECT_URI,
    passReqToCallback: true,
  },
  function (
    req: any,
    accessToken: any,
    refreshToken: any,
    profile: any,
    done: any
  ) {
    console.log({
      accessToken,
      refreshToken,
    });

    done({
      accessToken,
      refreshToken,
    });
  }
);
