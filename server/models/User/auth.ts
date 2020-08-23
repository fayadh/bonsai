import { Schema } from "mongoose";

export interface Password {
  bcrypt: string;
}

export interface Auth {
  password: Password;
}

const password: Schema = new Schema(
  {
    bcrypt: { type: String, select: false },
  },
  { _id: false }
);

const google: Schema = new Schema({});

const Auth: Schema = new Schema(
  {
    password,
    google,
  },
  { _id: false }
);

export default Auth;
