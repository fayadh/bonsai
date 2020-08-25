import { Strategy } from "passport-google-oauth2";
import User from "../../models/User";

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
  async function (
    req: any,
    accessToken: any,
    refreshToken: any,
    profile: any,
    done: any
  ) {
    await User.storeGoogleRefreshToken(profile.email, refreshToken);
    req.res.cookie("jwt", accessToken);
    done(null, profile.email);
  }
);
