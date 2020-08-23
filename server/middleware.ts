import { Handler } from "express";
import { OAuth2Client } from "google-auth-library";

import User from "./models/User";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);

async function verify(token: string) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload;
  } catch (e) {
    throw new Error(e);
  }
}

const findOrCreateUser = async ({
  email,
  givenName,
  familyName,
  name,
}: any) => {
  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      email,
      profile: {
        name,
        givenName,
        familyName,
      },
    });
  }

  return user;
};

export const authMiddleware: Handler = async (req: any, _: any, next: any) => {
  const token = req.cookies["jwt"] || "";
  const userGoogleInfomation = await verify(token);
  let user = await findOrCreateUser(userGoogleInfomation);
  //@ts-ignore
  req.user = user;
  next();
};
