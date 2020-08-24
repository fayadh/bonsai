import { Handler } from "express";
import { OAuth2Client } from "google-auth-library";
import * as bcrypt from "bcrypt";

import User, { User as IUser } from "./models/User";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);

async function verify(token: string) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
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

const loginJWT = async ({ req, res, next, token }: any) => {
  try {
    const userGoogleInfomation = await verify(token);
    let user = await findOrCreateUser(userGoogleInfomation);
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send();
  }
};

const loginAdmin = async ({
  req,
  res,
  next,
  email,
  password,
}: any): Promise<IUser | null> => {
  try {
    const userWithAuth = await User.findOne({ email }).select({ auth: 1 });

    const invalidCredentialsMessage = "Incorrect email or password.";
    if (!userWithAuth) {
      throw new Error(invalidCredentialsMessage);
    }

    if (!userWithAuth.auth) {
      return null;
    }

    const validPassword = await bcrypt.compare(
      password,
      userWithAuth.auth.password.bcrypt
    );

    if (!validPassword) {
      throw new Error(invalidCredentialsMessage);
    }

    const user = await User.findOne({ email });

    req.user = user;
    next();
  } catch (e) {
    res.status(401).send();
  }
};

export const authenticationMiddleware: Handler = async (
  req: any,
  res: any,
  next: any
) => {
  // if trying to login with email, password combo, use password lookup strategy
  const { operationName, variables } = req.body;
  if (operationName == "LoginAdmin") {
    const { email, password } = variables;
    loginAdmin({ req, res, next, email, password });
    return;
  }

  // if token present, login with jwt strategy
  const token = req.cookies["jwt"] || "";
  if (token) {
    loginJWT({ req, res, next, token });
    return;
  }

  // otherwise user is empty
  next();
};
