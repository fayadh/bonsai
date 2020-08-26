import { Strategy } from "passport-google-oauth20";
import User from "../../models/User";

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
} = process.env;

console.log({ GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI });

export default new Strategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
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
